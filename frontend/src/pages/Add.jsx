import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [notes, setNotes] = useState({
    title: "",
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    //prevents browser from reloading when clicking button
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/notes", notes);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <button>
        <Link to="/">Cancel</Link>
      </button>
      <h1>Add Notes</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        required
      />
      <textarea
        type="text"
        placeholder="descption"
        name="desc"
        onChange={handleChange}
        required
      />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
};

export default Add;
