import db from '../models/index';

let postBookAppointmentService = (body) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!body.email || !body.doctorId || !body.timeType || !body.date) {
                    resolve({
                         errCode: -1,
                         errMessage: 'missing parameter',
                    });
               } else {
                    let user = await db.User.findOrCreate({
                         where: { email: body.email },
                         defaults: {
                              email: body.email,
                              roleId: 'R3',
                         },
                    });
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
                    // create a booking record
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
