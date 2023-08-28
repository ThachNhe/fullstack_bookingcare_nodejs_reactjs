import docService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  console.log("limit : ", limit);
  if (!limit) {
    limit = 10;
  }
  try {
    let response = await docService.getTopDoctorHomeService(+limit);
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

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
