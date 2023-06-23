const SubjectsReducer = (state, action) => {
  switch (action.type) {
    case "GET_SUBJECTS_START":
      return {
        subjects: [],
        isFetching: true,
        error: false,
      };

    case "GET_SUBJECTS_SUCCESS":
      return {
        subjects: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_SUBJECTS_FAILURE":
      return {
        subjects: [],
        isFetching: false,
        error: action.payload,
      };
    case "ADD_SUBJECT":
      return {
        ...state,
        subjects: [...state.subjects, action.payload],
      };
    default:
      return { ...state };
  }
};

export default SubjectsReducer;
