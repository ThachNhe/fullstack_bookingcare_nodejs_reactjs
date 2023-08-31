import db from "../models/index";
let getTopDoctorHomeService = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        where: { roleId: "R2" },
        limit: limit,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
        //    raw: true
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoctorService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let saveInfoDoctorService = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!body.doctorId || !body.contentHTML || !body.contentMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        await db.Markdown.create({
          contentHTML: body.contentHTML,
          contentMarkdown: body.contentMarkdown,
          description: body.description,
          doctorId: body.doctorId,
        });
        resolve({
          errCode: 0,
          errMessage: "save info doctor success",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
let getDetailDoctorByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("ID : ", id);
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "missing require parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password", "image"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopDoctorHomeService: getTopDoctorHomeService,
  getAllDoctorService: getAllDoctorService,
  saveInfoDoctorService: saveInfoDoctorService,
  getDetailDoctorByIdService: getDetailDoctorByIdService,
};
