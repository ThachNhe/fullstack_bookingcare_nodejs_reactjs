import db from "../models/index";
import bcrypt from "bcryptjs";
let handUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        //compare password
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password", "roleId"],
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 2;
            userData.arrMessage = `wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.arrMessage = `Your email isn't in your system, please try another email`;
        }
        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't in your system, please try another email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let GetAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }

      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      console.log(users);
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { handUserLogin: handUserLogin, GetAllUsers: GetAllUsers };
