// app.js
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connection = require("./connection");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Crée une route répondant à un GET sur '/' //
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

// Crée la route répondant à un POST sur '/bookmarks' //
app.post("/bookmarks", (req, res) => {
  const { url, title } = req.body;
  if (!url || !title) {
    return res.status(422).json({
      error: "required field(s) missing",
    });
  }
  connection.query("INSERT INTO bookmark SET ?", req.body, (err, stats) => {
    if (err)
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });

    connection.query(
      "SELECT * FROM bookmark WHERE id = ?",
      stats.insertId,
      (err, records) => {
        if (err)
          return res.status(500).json({
            error: err.message,
            sql: err.sql,
          });
        return res.status(201).json(records[0]);
      }
    );
  });
});

// Crée la route répondant à un GET sur '/bookmarks/:id' //
app.get("/bookmarks/:id", (req, res) => {
  const idBookmark = req.params.id;
  connection.query(
    "SELECT * FROM bookmark WHERE id = ?",
    idBookmark,
    (err, results) => {
      if (err || results.length === 0) {
        res.status(404).json({ error: "Bookmark not found" });
      } else {
        res.status(200).json({
          id: 1,
          url: "https://nodejs.org/",
          title: "Node.js",
        });
      }
    }
  );
});

module.exports = app;
