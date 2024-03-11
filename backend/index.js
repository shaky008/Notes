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

//gets data from the database, cannot update it bcz its gets
app.get("/notes", (req, res) => {
  const query = "SELECT * FROM notes;";
  connection.query(query, (err, data) => {
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

app.delete("/notes/:id", (req, res) => {
  const query = "DELETE FROM notes WHERE noteid = ?";
  const bookId = req.params.id;

  connection.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Note deleted Successfully");
  });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("backend is running!");
});
