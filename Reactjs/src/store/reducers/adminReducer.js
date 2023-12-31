import actionTypes from '../actions/actionTypes';

const initialState = {
     isOpenModal: true,
     isLoadingGender: false,
     genders: [],
     roles: [],
     position: [],
     users: [],
     topDoctors: [],
     allDoctors: [],
     allScheduleTime: [],
     allRequiredDoctorInfo: [],
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
          case actionTypes.FETCH_TOP_DOCTOR__SUCCESS:
               state.topDoctors = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_TOP_DOCTOR__FAILED:
               state.topDoctors = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_ALL_DOCTOR__SUCCESS:
               state.allDoctors = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_ALL_DOCTOR__FAILED:
               state.allDoctors = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
               state.allScheduleTime = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
               state.allScheduleTime = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
               state.allRequiredDoctorInfo = action.data;
               // console.log('all required doctor info : ', state.allRequiredDoctorInfo);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
               state.allRequiredDoctorInfo = [];
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
