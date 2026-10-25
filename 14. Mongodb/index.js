// getting-started.js
const mongoose = require("mongoose");

// main()
//   .then(() => {
//     console.log("Connection successful !");
//   })
//   .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/college");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
  .then(() => {
    console.log("Connection successful !");
  })
  .catch((err) => console.log(err));

const teacherSchema = mongoose.Schema({
  name: String,
  email: String,
  dept: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// const Teach1 = new Teacher({
//   name: "Akbar",
//   email: "akbarali@gmail.com",
//   dept: "CS",
// });

// Teach1.save();

Teacher.insertMany([
  { name: "Akbar", email: "akbarali@gmail.com", dept: "CS" },
  { name: "Zain", email: "zainali@gmail.com", dept: "SE" },
  { name: "Ali", email: "ali@gmail.com", dept: "IT" },
]).then((res) => {
  console.log(res);
});
