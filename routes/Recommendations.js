const express = require("express");
const router = express.Router();
const connection = require("../conf");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM recommendations", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const recommendationId = req.params.id;
  connection.query(
    "SELECT * FROM recommendations WHERE id = ?",
    [recommendationId],
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send("Error retrieving this recommendation from database");
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send("Recommendation not found");
      }
    }
  );
});

router.post("/", (req, res) => {
  const { client_name, client_picture, client_opinion } = req.body;
  connection.query(
    "INSERT INTO recommendations (client_name, client_picture, client_opinion) VALUES (?, ?, ?)",
    [client_name, client_picture, client_opinion],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the recommendation");
      } else {
        const id = result.insertId;
        const createdRecommendation = {
          id,
          client_name,
          client_picture,
          client_opinion,
        };
        res.status(201).json(createdRecommendation);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const recommendationId = req.params.id;
  const sql = `DELETE FROM recommendations WHERE id = ?`;
  connection.query(sql, [recommendationId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting this recommendation");
    } else {
      res.status(200).send("Recommendation deleted 🎉");
    }
  });
});

module.exports = router;
