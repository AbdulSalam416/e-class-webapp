// Get Subjects Actions
export const getSubjectsStart = () => ({
  type: "GET_SUBJECTS_START",
});

export const getSubjectsSuccess = (subjects) => ({
  type: "GET_SUBJECTS_SUCCESS",
  payload: subjects,
});

export const getSubjectsFailure = (error) => ({
  type: "GET_SUBJECTS_FAILURE",
  payload: error,
});

export const addSubjectStart = () => ({
  type: "ADD_SUBJECT_START",
});

export const addSubjectSuccess = (subject) => ({
  type: "ADD_SUBJECT_SUCCESS",
  payload: subject,
});

export const addSubjectFailure = (error) => ({
  type: "ADD_SUBJECT_FAILURE",
  payload: error,
});
