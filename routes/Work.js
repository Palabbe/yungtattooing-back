const express = require("express");
const router = express.Router();
const connection = require("../conf");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM mywork", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const workId = req.params.id;
  connection.query(
    "SELECT * FROM mywork WHERE id = ?",
    [workId],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving this tattoo from database");
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send("Tattoo not found");
      }
    }
  );
});

router.post("/", (req, res) => {
  const { picture } = req.body;
  connection.query(
    "INSERT INTO mywork (picture) VALUES (?)",
    [picture],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving this tattoo");
      } else {
        const id = result.insertId;
        const createdTattoo = { id, picture };
        res.status(201).json(createdTattoo);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const workId = req.params.id;
  const sql = `DELETE FROM mywork WHERE id = ?`;
  connection.query(sql, [workId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting this tattoo");
    } else {
      res.status(200).send("Tattoo deleted 🎉");
    }
  });
});

module.exports = router;
