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
  console.log(message);
  return res.send("post CRUD");
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD,
  postCRUD,
};
