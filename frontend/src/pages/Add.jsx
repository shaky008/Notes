import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [note, setNote] = useState({
    title: "",
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    //prevents browser from reloading when clicking button
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/notes", note);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <h1>Add Notes</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="descption"
        name="desc"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
};

export default Add;
