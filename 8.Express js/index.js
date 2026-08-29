// import express from "express"

const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at port no. ${port}`);
});

// app.use((req, res) => {
//   // console.log(req);
//   console.log("Request Received");
//   res.send("<h1>Fruits<h1> <ul><li>Apple<li><ul>");
// });

app.get("/", (req, res) => {
  res.send("Welcome to Homepage...");
});

app.get("/:pageName/:id", (req, res) => {
  let { pageName, id } = req.params;
  console.log(req.params);
  res.send(`Hello to ${pageName} page...`);
});

app.get("/search", (req, res) => {
  // console.log(req);
  let { q } = req.query;
  if (!q) {
    res.send("Nothing Searched");
  }
  res.send(`<h1>You searched for ${q}<h1>`);
});
