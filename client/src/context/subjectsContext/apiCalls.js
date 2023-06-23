import axios from "axios";
import {
  getSubjectsFailure,
  getSubjectsStart,
  getSubjectsSuccess,
  addSubjectStart,
  addSubjectSuccess,
  addSubjectFailure,
} from "./SubjectsActions";

export const getSubjects = async (user, dispatch) => {
  dispatch(getSubjectsStart());

  try {
    const res = await axios.get(`/api/subject/all?course=${user.course}`, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    console.log(res.data);
    dispatch(getSubjectsSuccess(res.data));
  } catch (err) {
    dispatch(getSubjectsFailure(err));
  }
};

export const addSubject = async (user, newSubject, dispatch) => {
  dispatch(addSubjectStart());

  try {
    const res = await axios.post("/api/subject/", newSubject, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    dispatch(addSubjectSuccess(res.data));
  } catch (err) {
    dispatch(addSubjectFailure(err));
  }
};
