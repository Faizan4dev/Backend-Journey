const express = require("express");
const app = express();
const path = require("path");
let port = 8080;

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.send("About page...");
});

app.get("/ig/:username", (req, res) => {
  let instaData = require("./data.json");
  let { username } = req.params;
  let data = instaData[username];
  // console.log(data);
  if (data) {
    res.render("insta.ejs", { data });
  } else {
    res.render("error.ejs");
  }
});

app.get("/rolldice", (req, res) => {
  let rollValue = Math.floor(Math.random() * 6) + 1;
  res.render("rollDice.ejs", { rollValue });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
