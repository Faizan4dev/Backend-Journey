const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

let posts = [
  {
    id: uuidv4(),
    username: "faizan4dev",
    content: "I love to code! do u ?",
  },
  {
    id: uuidv4(),
    username: "apnadev",
    content: "I love to write! do u like to write or code  ?",
  },
  {
    id: uuidv4(),
    username: "ali",
    content: "Today i decided to learn a new skill!",
  },
];

app.get("/posts", (req, res) => {
  //   res.send("Server working");
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// add new post
app.post("/posts", (req, res) => {
  // console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // res.send("request sent");
  res.redirect("/posts");
});

// post details
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let post = posts.find((u) => id === u.id);
  // res.send(`Searched id ${id}`);
  res.render("detail.ejs", { post });
});

// post edit
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  // console.log(post);
  // res.send("PAtch req sent!");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  // let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Deletion
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});
