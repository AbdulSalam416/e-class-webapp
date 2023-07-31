import React, { useState, useContext } from "react";
import { SubjectsContext } from "../../context/subjectsContext/SubjectsContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { addSubject } from "../../context/subjectsContext/apiCalls";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const AddSubject = () => {
  const { dispatch } = useContext(SubjectsContext);
  const { user } = useContext(AuthContext);

  const [subject, setSubject] = useState({
    name: "",
    course: user.course,
    semester: user.semester,
    teachers: user._id,
  });

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_SUBJECT_START" });
    addSubject(user, subject, dispatch);
    setSubject({
      name: "",
      course: user.course,
      semester: user.course,
      teachers: user._id,
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={subject.name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Subject</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
