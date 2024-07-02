const express = require('express');
const app = express(); 
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended : true})); //middleware
app.use(express.json()); //middleware

let posts = [
    {
        id: uuidv4(),
        username: "vishal",
        content: "Coding"
    },
    {
        id: uuidv4(),
        username: "shivam",
        content: "Coding"
    },
    {
        id: uuidv4(),
        username: "vinay",
        content: "Coding"
    }
];

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

app.get('/posts/new', (req, res) => {
    res.render("form.ejs");
});

app.post('/posts', (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
  });

app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("show.ejs", {post});
});

app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id===p.id);
    post.content = newContent;
    res.redirect("/posts")
    console.log(post);
});

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("edit.ejs", {post});
});

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id!==p.id);
    res.redirect("/posts")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})