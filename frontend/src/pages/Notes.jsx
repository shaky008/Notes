import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/notes");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/notes/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>All Notes</h1>
      <button>
        <Link to="/add">+Add</Link>
      </button>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.noteid}>
            <h2>{note.title}</h2>
            <button id="viewNote-btn">
              <Link to={`/update/${note.noteid}`}>View</Link>
            </button>
            <button
              id="deleteNote-btn"
              onClick={() => handleDelete(note.noteid)}
            >
              Delete Note
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
