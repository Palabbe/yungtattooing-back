const express = require("express");
const router = express.Router();
const connection = require("../conf");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM about", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

router.put("/", (req, res) => {
  const aboutPropsToUpdate = req.body;
  const sql = `UPDATE about SET ?`;
  connection.query(sql, [aboutPropsToUpdate], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating the text");
    } else {
      res.status(200).send("Text updated successfully 🎉");
    }
  });
});

module.exports = router;
