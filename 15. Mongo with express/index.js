const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatos");
}

app.listen(8080, () => {
  console.log("server is listening at 8080");
});

app.get("/", async (req, res) => {
  res.send("App working");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  // res.send("working");
  res.render("index.ejs", { chats });
});

app.get("/chats/newchat", async (req, res) => {
  res.render("newChat.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then(() => {
      console.log("Data saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// let chat1 = new Chat({
//   from: "Latif",
//   to: "hassan",
//   msg: "send me mongodb notes",
//   created_at: new Date(),
// });

// chat1.save();
