const express = require("express");
const router = express.Router();
const db = require("../db");

//read
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create
router.post("/add-user", (req, res) => {
  const { name } = req.body;

  db.query("INSERT INTO users (name) VALUES (?)", [name], (err) => {
    if (err) throw err;
    res.send("User added");
  });
});

//update
router.put("/update-user/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  db.query("UPDATE users SET name=? WHERE id=?", [name, id], () => {
    res.send("User updated");
  });
});

//delete
router.patch("/delete-user/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], () => {
    res.send("User deleted");
  });
});
module.exports = router;
