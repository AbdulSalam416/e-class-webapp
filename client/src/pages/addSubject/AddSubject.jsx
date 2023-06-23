import React, { useState, useContext } from "react";
import { SubjectsContext } from "../../context/subjectsContext/SubjectsContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { addSubject } from "../../context/subjectsContext/apiCalls";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const AddSubject = () => {
  const [subject, setSubject] = useState({
    name: "",
    course: "",
    semester: "",
  });
  const { dispatch } = useContext(SubjectsContext);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_SUBJECT_START" });
    addSubject(user, subject, dispatch);
    setSubject({
      name: "",
      course: "",
      semester: "",
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
          <div>
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={subject.course}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Semester:</label>
            <input
              type="text"
              name="semester"
              value={subject.semester}
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
