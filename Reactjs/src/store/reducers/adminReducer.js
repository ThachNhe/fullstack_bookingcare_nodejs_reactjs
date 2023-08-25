import actionTypes from "../actions/actionTypes";

const initialState = {
  isOpenModal: true,
  isLoadingGender: false,
  genders: [],
  roles: [],
  position: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      // console.log("start : ", action);
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      console.log("success : ", state);
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      state.isLoadingGender = false;
      // console.log("data position : ", state);
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoadingGender = false;
      state.position = [];
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoadingGender = false;
      // console.log("data position : ", state);
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_ALL_USERS__SUCCESS:
      state.users = action.users;
      return {
        ...state,
        started: true,
      };
    case actionTypes.FETCH_ALL_USERS__FAILED:
      state.users = [];
      return {
        ...state,
        started: true,
      };
    case actionTypes.EDIT_USER__SUCCESS:
      state.isOpenModal = false;
      return {
        ...state,
        started: true,
      };
    default:
      return state;
  }
};

export default adminReducer;
