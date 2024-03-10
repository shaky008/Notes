import React, { useState, useEffect } from "react";
import axios from "axios";
const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    //
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

  return (
    <div>
      <h1>All Notes</h1>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.noteid}>
            <h2>{note.title}</h2>
            <button id="viewNote-btn">View Note</button>
            <button id="deleteNote-btn">Delete Note</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
