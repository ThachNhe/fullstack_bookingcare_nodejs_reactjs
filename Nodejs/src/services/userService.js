import db from "../models/index";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);
let hasUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      return resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmailExist(email);
      if (isExist) {
        //user already exist
        //compare password
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password", "roleId", "firstName", "lastName"],
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
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      //console.log(users);
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmailExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.User.findOne({
        where: { email: email },
      });
      if (check) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data.email);
      let check = await checkEmailExist(data.email);
      console.log("check == ", check);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your email is exist",
        });
      } else {
        let hashPasswordFromBcrypt = await hasUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.role,
          positionId: data.position,
        });
        resolve({
          errCode: 0,
          message: "user is created succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.User.destroy({
        where: { id: id },
      });
      if (check) {
        resolve({
          errCode: 0,
          message: "user is deleted",
        });
      } else {
        resolve({
          errCode: 1,
          message: "user have not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });
      if (!user) {
        resolve({
          errCode: 1,
          message: "user not exist",
        });
      }
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();
      resolve({
        errCode: 0,
        message: "update succeed",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "missing require parameter",
        });
      } else {
        let response = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        response.errCode = 0;
        response.data = allCode;
        resolve(response);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handUserLogin: handUserLogin,
  GetAllUsers: GetAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCodeService: getAllCodeService,
};
