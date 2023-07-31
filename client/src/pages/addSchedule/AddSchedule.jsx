import React, { useState, useContext } from "react";
import { SubjectsContext } from "../../context/subjectsContext/SubjectsContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { addSchedule } from "../../context/schedulesContext/apiCalls";
import { Box, Button, Grid, MenuItem, TextField } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const AddSchedule = () => {
  const { user } = useContext(AuthContext);
  const { subjects } = useContext(SubjectsContext);

  const [scheduleData, setScheduleData] = useState({
    title: "",
    subject: "",
    teachers: [user._id],
    day: "",
    time: "",
    course: user.course,
    semester: user.semester,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user.semester);
    try {
      await addSchedule(scheduleData, user);
      setScheduleData({
        title: "",
        subject: "",
        teachers: [user._id],
        day: "",
        time: "",
        course: user.course,
        semester: user.semester,
      });

      console.log(scheduleData);
    } catch (err) {
      console.error("Error adding schedule:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div>
        <h2>Add Schedule</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>TITLE:</label>
            <input
              type="text"
              name="title"
              value={scheduleData.title}
              onChange={handleChange}
              required
            />{" "}
          </div>

          <div>
            <label>SUBJECT:</label>

            <select
              name="subject"
              value={scheduleData.subject}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label for="day">DAY:</label>

            <input
              type="week"
              name="day"
              value={scheduleData.day}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label for="time">TIME:</label>
            <input
              type="time"
              name="time"
              value={scheduleData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Add Schedule</button>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
