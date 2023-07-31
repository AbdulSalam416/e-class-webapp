import axios from "axios";
import {
  getSchedulesFailure,
  getSchedulesStart,
  getSchedulesSuccess,
} from "./SchedulesActions";

export const getSchedules = async (user, dispatch) => {
  dispatch(getSchedulesStart());

  try {
    const res = await axios.get(`/api/schedule/all?course=${user.course}`, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    // console.log(res.data);
    dispatch(getSchedulesSuccess(res.data));
  } catch (err) {
    dispatch(getSchedulesFailure(err));
  }
};

// Adding Schedule

export const addSchedule = async (newSchedule, user) => {
  try {
    const res = await axios.post("/api/schedule/", newSchedule, {
      headers: {
        token: "Bearer " + user.accessToken,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
