import { createContext, useReducer } from "react";
import SubjectsReducer from "./SubjectsReducer";
import { addSubject } from "./apiCalls";

const INITIAL_STATE = {
  subjects: [],
  isFetching: false,
  error: false,
};

export const SubjectsContext = createContext(INITIAL_STATE);

export const SubjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SubjectsReducer, INITIAL_STATE);

  const dispatchAddSubject = async (user, newSubject) => {
    try {
      const addedSubject = await addSubject(user, newSubject);
      dispatch({ type: "ADD_SUBJECT", payload: addedSubject });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SubjectsContext.Provider
      value={{
        subjects: state.subjects,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        dispatchAddSubject,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  );
};
