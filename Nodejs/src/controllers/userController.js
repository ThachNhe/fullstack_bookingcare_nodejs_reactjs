import userService from "../services/userService";

let handleLogin = async (req, res) => {
  //check email exist
  //compare password
  //returnInformation
  //access token: JWT
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing input parameter",
    });
  }
  let userData = await userService.handUserLogin(email, password);

  return res.status(200).json({
    userData,
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "missing parameter",
      users,
    });
  }
  let users = await userService.GetAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let data = await userService.createNewUser(req.body);
  console.log("check new req.boy: ", req.body);
  return res.status(200).json(data);
};
let HandleDeleteUser = async (req, res) => {
  console.log("ID  = ", req.query.id);
  if (!req.query.id) {
    return res.status(500).json({
      errCode: 1,
      message: "id not exist",
    });
  }
  let data = await userService.deleteUser(req.query.id);
  console.log(data);
  if (data.errCode === 0) {
    return res.status(200).json(data);
  }
  if (data.errCode === 1) {
    return res.status(500).json(data);
  }
};
let handleEditUser = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 3,
      message: "please fill out the form",
    });
  }
  let data = await userService.editUser(req.body);
  if (data.errCode === 0) {
    return res.status(200).json(data);
  }
  return res.status(500).json(data);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  HandleDeleteUser: HandleDeleteUser,
  handleEditUser: handleEditUser,
};
