import db from '../models/index';
import emailService from './emailService';
let postBookAppointmentService = (body) => {
     return new Promise(async (resolve, reject) => {
          try {
               console.log('check body : ', body);
               if (!body.fullName || !body.email || !body.doctorId || !body.timeType || !body.date) {
                    resolve({
                         errCode: -1,
                         errMessage: 'missing parameter',
                    });
               } else {
                    await emailService.sendSimpleEmail({
                         receiverEmail: body.email,
                         patientName: body.fullName,
                         time: body.timeString,
                         doctorName: body.doctorName,
                         language: body.language,
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

module.exports = {
     postBookAppointmentService,
};
