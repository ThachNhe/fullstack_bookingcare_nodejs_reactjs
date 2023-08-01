import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  // console.log("data from message : ", data);
  return axios.post("/api/create-new-user", data);
};
const DeleteUserService = (id) => {
  // console.log("check ID delete user : ", id);
  return axios.delete(`/api/delete-user?id=${id}`);
};

export { handleLoginAPI, getAllUsers, createNewUserService, DeleteUserService };
