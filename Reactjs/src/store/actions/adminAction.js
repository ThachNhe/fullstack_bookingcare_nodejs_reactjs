import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  DeleteUserService,
  editUserService,
  getTopDoctorHomeService,
} from "../../services/userService";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchPositionStart", e);
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("fetchGenderStart", e);
    }
  };
};
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users));
      }
    } catch (e) {
      dispatch(fetchAllUserFailed());
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS__SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS__FAILED,
});

export const deleteUserRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await DeleteUserService(id);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserStart());
      }
    } catch (e) {
      dispatch(DeleteUserFailed());
    }
  };
};

export const DeleteUserFailed = () => ({
  type: actionTypes.DELETE_USER__FAILED,
});

export const EditUserRedux = (userEdit) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(userEdit);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserStart());
        dispatch(EditUserSuccess());
      }
    } catch (e) {
      dispatch(EditUserFailed());
    }
  };
};
export const EditUserSuccess = () => ({
  type: actionTypes.EDIT_USER__SUCCESS,
});

export const EditUserFailed = () => ({
  type: actionTypes.EDIT_USER__FAILED,
});
//  let resTopDoctor = await getTopDoctorHomeService("");
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let resTopDoctor = await getTopDoctorHomeService("");
      // console.log("OK : ", resTopDoctor);
      if (resTopDoctor && resTopDoctor.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(resTopDoctor.data));
      }
    } catch (e) {
      dispatch(fetchTopDoctorFailed());
    }
  };
};

export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR__SUCCESS,
  data: data,
});

export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR__FAILED,
});
