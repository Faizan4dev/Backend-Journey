const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let threads = [
  {
    id: uuidv4(),
    name: "Ali",
    dp: "https://www.shutterstock.com/image-photo/smiling-child-boy-over-yellow-260nw-2423345025.jpg",
    caption: "Enjoy the new Day !",
  },
  {
    id: uuidv4(),
    name: "John",
    dp: "https://plus.unsplash.com/premium_photo-1676736592730-bfd847c0c8c8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWwlMjBib3l8ZW58MHx8MHx8fDA%3D",
    caption: "Let's play something !",
  },
];

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { threads });
});

// adding new post
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { name, dp, caption } = req.body;
  let id = uuidv4();
  threads.push({ id, name, dp, caption });
  res.redirect("/");
});

// editing posts
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let thread = threads.find((t) => t.id === id);
  res.render("edit.ejs", { thread });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newCaption = req.body.caption;
  let thread = threads.find((t) => t.id === id);
  thread.caption = newCaption;
  res.redirect("/");
});

// post deletion
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  threads = threads.filter((t) => t.id !== id);
  res.redirect("/");
});
