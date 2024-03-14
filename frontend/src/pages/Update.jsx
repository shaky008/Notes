import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Update = () => {
  const [note, setNote] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getSingleNote = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/notes/${params.id}`);
        //insde data array
        setNote(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleNote();
  }, []);

  return (
    <div className="update">
      <h1>Add Notes</h1>
      <input
        type="text"
        defaultValue={note.title}
        name="title"
        // onChange={handleChange}
      />
      <textarea
        type="text"
        defaultValue={note.desc}
        name="desc"
        rows={10}
        cols={100}
        // onChange={handleChange}
      />
      {/* <button onClick={handleClick}>Update</button> */}
    </div>
  );
};

export default Update;
