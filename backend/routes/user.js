const express = require("express");
const router = express.Router();
const db = require("../db");

const auth = require("../middleware/auth");

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
  db.query("UPDATE users SET name=? WHERE id=?", [name, id], (err) => {
    if (err) throw err;
    res.send("User updated");
  });
});

//disable
router.patch("/disable-user/:id", (req, res) => {
  const { id } = req.params;
  db.query("UPDATE users SET status='inactive' WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.send("User disabled");
  });
});

//enable user
router.patch("/enable-user/:id", (req, res) => {
  const { id } = req.params;
  db.query("UPDATE users SET status='active' WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.send("User enabled");
  });
});

router.get("/users", auth, (req, res) => {
 db.query("SELECT * FROM users", (err, result) => {
 if (err) throw err;
 res.json(result);
 });
});

router.post("/add-user", auth, (req, res) => {
 const { name } = req.body;
 db.query("INSERT INTO users (name) VALUES (?)", [name], (err) => {
 if (err) throw err;
 res.send("User added");
 });
});

module.exports = router;