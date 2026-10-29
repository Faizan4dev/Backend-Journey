const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("connection with db successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatos");
}

const chats = [
  {
    from: "Ali",
    to: "Ahmed",
    msg: "Hey, how are you?",
    created_at: new Date(),
  },
  {
    from: "Sara",
    to: "Ayesha",
    msg: "Did you complete the assignment?",
    created_at: new Date(),
  },
  {
    from: "Ahmed",
    to: "Ali",
    msg: "Yes, I finished it yesterday.",
    created_at: new Date(),
  },
  {
    from: "Usman",
    to: "Hassan",
    msg: "Send me the MongoDB notes.",
    created_at: new Date(),
  },
  {
    from: "Rukhsar",
    to: "Faiz",
    msg: "Send me the MongoDB notes.",
    created_at: new Date(),
  },
];

Chat.insertMany(chats);
