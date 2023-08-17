import actionTypes from "../actions/actionTypes";

// const initContentOfConfirmModal = {
//   isOpen: false,
//   messageId: "",
//   handleFunc: null,
//   dataFunc: null,
// };

const initialState = {
  genders: [],
  roles: [],
  position: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("start : ", action);
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      console.log("success : ", copyState);
      return {
        ...copyState,
        started: true,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        started: true,
      };
    default:
      return state;
  }
};

export default adminReducer;
