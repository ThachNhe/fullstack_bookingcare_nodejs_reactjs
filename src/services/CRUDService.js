import bcrypt from "bcryptjs";
import db from "../models/index";
let salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hasUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("OK create a new user succeed");
    } catch (e) {
      reject(e);
    }
  });
};

let hasUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      return resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { createNewUser, hasUserPassword };
