import mysql from "mysql2";
import express from "express";
import cors from "cors";

const app = express();
const port = 8800; //specifies the port on which we want our app to listen

//connection to database (mysql)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Witcher008!",
  database: "sys",
});

//allow us to send any json file using client
app.use(express.json());

//allows cross ogigin resouce sharing
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello ");
});

//gets all notes from the database
app.get("/notes", (req, res) => {
  const query = "SELECT * FROM notes;";
  connection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//gets a single note
app.get("/notes/:id", (req, res) => {
  const query = "SELECT * FROM notes WHERE noteid = ?;";
  const value = req.params.id;
  connection.query(query, [value], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//to insert data into database, (post) to makes changes
//using req bcz users sends the data
app.post("/notes", (req, res) => {
  const query = "INSERT INTO notes (`title`, `desc`)  VALUES (?)";
  const values = [req.body.title, req.body.desc];

  connection.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Notes sucressfuly created: ");
  });
});

//to delete selected note from DB
app.delete("/notes/:id", (req, res) => {
  const query = "DELETE FROM notes WHERE noteid = ?";
  const bookId = req.params.id;

  connection.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Note deleted Successfully");
  });
});

//to update selected note from DB
app.put("/notes/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "UPDATE notes SET `title` = ?, `desc` = ? WHERE noteid = ?";
  const values = [req.body.title, req.body.desc];

  connection.query(query, [...values, bookId], (err, data) => {
    if (err) return err.json(err);
    return res.json("Notes updated Sucessfully");
  });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("backend is running!");
});
