const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { url } = require("inspector");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function createRandomUser() {
  return [
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// let data = [];
// for (let i = 0; i < 100; i++) {
//   data.push(createRandomUser());
// }

// console.log(createRandomUser());
// let email = faker.internet.email();
// console.log(email);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Faizan123@",
});

// let q = "INSERT INTO users(username , email,password) VALUES ?";

// try {
//   connection.query(q, [data], (err, results) => {
//     if (err) throw err;
//     console.log(results);
//   });
// } catch (err) {
//   console.log(err);
// }

app.listen("8080", () => {
  console.log("App is listening at 8080");
});

// homepage to show users
app.get("/", (req, res) => {
  let q = "Select Count(*) from users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["Count(*)"];
      // res.send("Success");
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
  }
});

// show all users
app.get("/users", (req, res) => {
  let q = "Select * from users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      users = result;
      res.render("users.ejs", { users });
      // console.log(users);
    });
  } catch (err) {
    console.log(err);
  }
});

// edit
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM users WHERE id = ${id}`;
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to load user");
    }
    if (result.length === 0) {
      return res.status(404).send("User not found");
    }
    console.log(result);
    res.render("editForm.ejs", { result: result[0] });
  });
});

// update
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  // console.log(req.params);
  // console.log(id);

  let { username: newName, email: newMail, password: formPass } = req.body;

  let q = `SELECT * FROM users WHERE id = ${id}`;
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to update user");
    }
    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    let user = result[0];
    if (formPass !== user.password) {
      return res.status(401).send("Wrong Password");
    }

    let q2 = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    connection.query(q2, [newName, newMail, id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to update user");
      }
      res.redirect("/users");
    });
  });
});

// Adding new user
app.get("/users/newuser", (req, res) => {
  res.render("newUser.ejs");
});

app.post("/users/newuser/adduser", (req, res) => {
  let { username, email, password } = req.body;
  let q3 = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  connection.query(q3, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to add user");
    }
    console.log(result);
    res.redirect("/users");
  });
});

// delete
app.get("/users/delete", (req, res) => {
  res.render("delete.ejs");
});
app.delete("/users/del", (req, res) => {
  let { email, password } = req.body;

  let q = "SELECT password FROM users WHERE email = ?";
  connection.query(q, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to delete user");
    }
    if (result.length === 0) {
      return res.status(404).send("User not found");
    }
    if (password !== result[0].password) {
      return res.status(401).send("Wrong password");
    }

    connection.query("DELETE FROM users WHERE email = ?", [email], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to delete user");
      }
      res.redirect("/users");
    });
  });
});

// connection.end();
