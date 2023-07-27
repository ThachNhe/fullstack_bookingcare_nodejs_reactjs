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
      arrCode: 1,
      massage: "missing input parameter",
    });
  }
  let userData = await userService.handUserLogin(email, password);

  return res.status(200).json({
    userData,
    arrCode: 0,
    massage: "OK",
  });
};

module.exports = { handleLogin };
