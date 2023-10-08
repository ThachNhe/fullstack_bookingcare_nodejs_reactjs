import db from '../models/index';
import _, { reject } from 'lodash';
// require("dotenv").config();

const MAX_NUMBER_SCHEDULE = 10;
let getTopDoctorHomeService = (limit) => {
     return new Promise(async (resolve, reject) => {
          try {
               let users = await db.User.findAll({
                    where: { roleId: 'R2' },
                    limit: limit,
                    order: [['createdAt', 'DESC']],
                    attributes: {
                         exclude: ['password'],
                    },
                    include: [
                         {
                              model: db.Allcode,
                              as: 'positionData',
                              attributes: ['valueEn', 'valueVi'],
                         },
                         {
                              model: db.Allcode,
                              as: 'genderData',
                              attributes: ['valueEn', 'valueVi'],
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
                    where: { roleId: 'R2' },
                    attributes: {
                         exclude: ['password', 'image'],
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
               //console.log('check body : ', body);
               if (
                    !body.doctorId ||
                    !body.contentHTML ||
                    !body.contentMarkdown ||
                    !body.action ||
                    !body.selectedPrice ||
                    !body.selectedPayment ||
                    !body.selectedProvince ||
                    !body.nameClinic ||
                    !body.addressClinic ||
                    !body.note
               ) {
                    resolve({
                         errCode: 1,
                         errMessage: 'Missing parameter',
                    });
               } else {
                    // update and insert Markdown
                    if (body.action === 'CREATE') {
                         await db.Markdown.create({
                              contentHTML: body.contentHTML,
                              contentMarkdown: body.contentMarkdown,
                              description: body.description,
                              doctorId: body.doctorId,
                         });
                    } else if (body.action === 'EDIT') {
                         let doctorMarkdown = await db.Markdown.findOne({
                              where: { doctorId: body.doctorId },
                              raw: false,
                         });
                         if (doctorMarkdown) {
                              doctorMarkdown.contentHTML = body.contentHTML;
                              doctorMarkdown.contentMarkdown = body.contentMarkdown;
                              doctorMarkdown.description = body.description;
                              doctorMarkdown.doctorId = body.doctorId;
                              await doctorMarkdown.save();
                         }
                    }

                    // upsert doctor_info table
                    let doctorInfo = await db.Doctor_Infor.findOne({
                         where: { doctorId: body.doctorId },
                         raw: false,
                    });
                    if (doctorInfo) {
                         //update

                         doctorInfo.priceId = body.selectedPrice;
                         doctorInfo.provinceId = body.selectedProvince;
                         doctorInfo.paymentId = body.selectedPayment;
                         doctorInfo.nameClinic = body.nameClinic;
                         doctorInfo.addressClinic = body.addressClinic;
                         doctorInfo.note = body.note;
                         await doctorInfo.save();
                    } else {
                         //create
                         db.Doctor_Infor.create({
                              doctorId: body.doctorId,
                              priceId: body.selectedPrice,
                              provinceId: body.selectedProvince,
                              paymentId: body.selectedPayment,
                              nameClinic: body.nameClinic,
                              addressClinic: body.addressClinic,
                              note: body.note,
                         });
                    }
                    resolve({
                         errCode: 0,
                         errMessage: 'save info doctor success',
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
                         errMessage: 'missing require parameter',
                    });
               } else {
                    let data = await db.User.findOne({
                         where: { id: id },
                         attributes: {
                              exclude: ['password'],
                         },
                         include: [
                              {
                                   model: db.Markdown,
                                   attributes: ['description', 'contentHTML', 'contentMarkdown'],
                              },
                              {
                                   model: db.Allcode,
                                   as: 'positionData',
                                   attributes: ['valueEn', 'valueVi'],
                              },
                              {
                                   model: db.Doctor_Infor,
                                   attributes: { exclude: ['id', 'doctorId'] },
                                   include: [
                                        {
                                             model: db.Allcode,
                                             as: 'priceTypeData',
                                             attributes: ['valueVi', 'valueEn'],
                                        },
                                        {
                                             model: db.Allcode,
                                             as: 'provinceTypeData',
                                             attributes: ['valueVi', 'valueEn'],
                                        },
                                        {
                                             model: db.Allcode,
                                             as: 'paymentTypeData',
                                             attributes: ['valueVi', 'valueEn'],
                                        },
                                   ],
                              },
                         ],
                         raw: true,
                         nest: true,
                    });
                    if (data && data.image) {
                         data.image = new Buffer(data.image, 'base64').toString('binary');
                    }
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
let bulkCreateScheduleService = (body) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!body.arrSchedule || !body.doctorId || !body.date) {
                    resolve({
                         errCode: 1,
                         errMessage: 'missing require parameter',
                    });
               } else {
                    let schedule = body.arrSchedule;
                    if (body) {
                         schedule = schedule.map((item) => {
                              item.maxNumber = MAX_NUMBER_SCHEDULE;
                              return item;
                         });
                    }
                    // console.log("check schedule ", schedule);
                    let existing = await db.Schedule.findAll({
                         where: { doctorId: body.doctorId, date: body.date },
                         attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                         raw: true,
                    });
                    // console.log(" chẹck existing : ", existing);
                    let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                         return a.timeType === b.timeType && a.date === b.date;
                    });
                    if (toCreate && toCreate.length > 0) {
                         await db.Schedule.bulkCreate(toCreate);
                    }
                    resolve({
                         errCode: 0,
                         errMessage: 'create bulk Ok',
                    });
               }
          } catch (e) {
               reject(e);
               console.log(e);
          }
     });
};

let getScheduleByDateService = (doctorId, date) => {
     return new Promise(async (resolve, reject) => {
          try {
               // let convertDate = parseInt(date);
               // let dateTimeConvert = unixToDateTime(convertDate);
               console.log('check dcotocId: ', doctorId);
               console.log('check date: ', date);
               ``;
               if (!doctorId || !date) {
                    resolve({
                         errCode: 1,
                         errMessage: 'missing require parameter',
                    });
               } else {
                    let data = await db.Schedule.findAll({
                         where: { doctorId: doctorId, date: date },
                         include: [
                              {
                                   model: db.Allcode,
                                   as: 'timeTypeData',
                                   attributes: ['valueEn', 'valueVi'],
                              },
                              {
                                   model: db.User,
                                   as: 'doctorData',
                                   attributes: ['firstName', 'lastName'],
                              },
                         ],
                         raw: true,
                         nest: true,
                    });
                    if (!data) {
                         data = [];
                    }
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
let getExtraDoctorInfoByIdService = (doctorId) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!doctorId) {
                    resolve({
                         errCode: 1,
                         errMessage: 'Missing require parameter',
                    });
               } else {
                    let data = await db.Doctor_Infor.findOne({
                         where: { doctorId: doctorId },
                         include: [
                              {
                                   model: db.Allcode,
                                   as: 'priceTypeData',
                                   attributes: ['valueVi', 'valueEn'],
                              },
                              {
                                   model: db.Allcode,
                                   as: 'provinceTypeData',
                                   attributes: ['valueVi', 'valueEn'],
                              },
                              {
                                   model: db.Allcode,
                                   as: 'paymentTypeData',
                                   attributes: ['valueVi', 'valueEn'],
                              },
                         ],
                         raw: false,
                         nest: true,
                    });
                    // console.log('check data : ', data);
                    if (!data) {
                         data = [];
                    } else {
                         resolve({
                              errCode: 0,
                              data: data,
                         });
                    }
               }
          } catch (e) {
               reject(e);
          }
     });
};
let getProfileDoctorByIdService = (doctorId) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!doctorId) {
                    resolve({
                         errCode: 1,
                         errMessage: 'missing require parameter',
                    });
               } else {
                    let data = await db.User.findOne({
                         where: { id: doctorId },
                         attributes: {
                              exclude: ['password'],
                         },
                         include: [
                              {
                                   model: db.Markdown,
                                   attributes: ['description', 'contentHTML', 'contentMarkdown'],
                              },
                              {
                                   model: db.Allcode,
                                   as: 'positionData',
                                   attributes: ['valueEn', 'valueVi'],
                              },
                              {
                                   model: db.Doctor_Infor,
                                   attributes: { exclude: ['id', 'doctorId'] },
                                   include: [
                                        {
                                             model: db.Allcode,
                                             as: 'priceTypeData',
                                             attributes: ['valueVi', 'valueEn'],
                                        },
                                        {
                                             model: db.Allcode,
                                             as: 'provinceTypeData',
                                             attributes: ['valueVi', 'valueEn'],
                                        },
                                        {
                                             model: db.Allcode,
                                             as: 'paymentTypeData',
                                             attributes: ['valueVi', 'valueEn'],
                                        },
                                   ],
                              },
                         ],
                         raw: true,
                         nest: true,
                    });
                    if (data && data.image) {
                         data.image = new Buffer(data.image, 'base64').toString('binary');
                    }
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
     bulkCreateScheduleService: bulkCreateScheduleService,
     getScheduleByDateService: getScheduleByDateService,
     getExtraDoctorInfoByIdService,
     getProfileDoctorByIdService,
};
