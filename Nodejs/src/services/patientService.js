import db from '../models/index';
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
let buildUrlEmail = (doctorId, token) => {
     let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
     return result;
};
let postBookAppointmentService = (body) => {
     return new Promise(async (resolve, reject) => {
          try {
               // console.log('check body : ', body);
               if (!body.fullName || !body.email || !body.doctorId || !body.timeType || !body.date) {
                    resolve({
                         errCode: -1,
                         errMessage: 'missing parameter',
                    });
               } else {
                    let token = uuidv4();
                    await emailService.sendSimpleEmail({
                         receiverEmail: body.email,
                         patientName: body.fullName,
                         time: body.timeString,
                         doctorName: body.doctorName,
                         language: body.language,
                         redirectLink: buildUrlEmail(body.doctorId, token),
                    });
                    let user = await db.User.findOrCreate({
                         where: { email: body.email },
                         defaults: {
                              email: body.email,
                              roleId: 'R3',
                         },
                    });
                    // create a booking record
                    if (user && user[0]) {
                         await db.Booking.findOrCreate({
                              where: { patientId: user[0].id },
                              defaults: {
                                   statusId: 'S1',
                                   patientId: user[0].id,
                                   doctorId: body.doctorId,
                                   date: body.date,
                                   timeType: body.timeType,
                                   token: token,
                              },
                         });
                    }
                    resolve({
                         errCode: 0,
                         errMessage: 'save patient success',
                    });
               }
          } catch (e) {
               reject(e);
          }
     });
};
let postVerifyBookAppointmentService = (body) => {
     return new Promise(async (resolve, reject) => {
          try {
               // console.log('check body :', body);
               if (!body.doctorId || !body.token) {
                    resolve({
                         errCode: -1,
                         errMessage: 'missing parameter',
                    });
               } else {
                    let appointment = await db.Booking.findOne({
                         where: { doctorId: body.doctorId, token: body.token, statusId: 'S1' },
                         raw: false,
                    });
                    if (appointment) {
                         appointment.statusId = 'S2';
                         await appointment.save();

                         resolve({
                              errCode: 0,
                              errMessage: 'update appointment success',
                         });
                    } else {
                         resolve({
                              errCode: 2,
                              errMessage: 'appointment has been activated or does not exist',
                         });
                    }
               }
          } catch (e) {
               reject(e);
          }
     });
};
module.exports = {
     postBookAppointmentService,
     postVerifyBookAppointmentService,
};
