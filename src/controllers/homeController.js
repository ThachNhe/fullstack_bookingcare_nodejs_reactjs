import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homepage.ejs", { data: data });
  } catch (e) {}
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  // console.log(req.body);
  let message = await CRUDService.createNewUser(req.body);
  // console.log(message);
  return res.redirect("/get-crud");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log(data);
  return res.render("displayCRUD.ejs", { data: data });
};

let getEditCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let userData = await CRUDService.getUserInfoById(id);
    // console.log(userData);
    return res.render("editCRUD.ejs", { data: userData });
  } else {
    return res.send("user not found");
  }
};
let updateUserCRUD = async (req, res) => {
  let data = req.body;
  // console.log(data);
  await CRUDService.updateUserData(data);

  return res.redirect("/get-crud");
  // updateUserdate()
};

let deleteUser = async (req, res) => {
  let id = req.params.id;
  if (id) {
    await CRUDService.deleteUser(id);
    return res.redirect("/get-crud");
  } else {
    return res.send("user not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  updateUserCRUD,
  deleteUser,
};
