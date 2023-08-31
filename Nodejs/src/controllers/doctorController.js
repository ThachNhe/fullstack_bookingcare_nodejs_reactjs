import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  console.log("limit : ", limit);
  if (!limit) {
    limit = 10;
  }
  try {
    let response = await doctorService.getTopDoctorHomeService(+limit);
    return res.status(200).json(response);
    console.log("respone :", response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctorService();
    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postInfoDoctor = async (req, res) => {
  try {
    console.log("body : ", req.body);
    let response = await doctorService.saveInfoDoctorService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  postInfoDoctor: postInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
};
