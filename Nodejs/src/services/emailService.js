require('dotenv').config();
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
let sendSimpleEmail = async (dataSend) => {
     const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
               // TODO: replace `user` and `pass` values from <https://forwardemail.net>
               user: process.env.EMAIL_APP,
               pass: process.env.EMAIL_APP_PASSWORD,
          },
     });
     const info = await transporter.sendMail({
          from: '"vanthach 👻" <thachdinh@example.com>', // sender address
          to: dataSend.receiverEmail, // list of receivers
          subject: 'Thông tin đặt lịch bệnh ✔', // Subject line
          html: GetBodyHTML(dataSend),
     });
};

let GetBodyHTML = (dataSend) => {
     let result = '';
     if (dataSend.language === 'vi') {
          result = `<h3>Xin chào ${dataSend.patientName}</h3>
          <p>Bạn nhận được email vì đã đặt lịch khám bệnh online trên bookingcare.vn</p>
          <p>Thông tin đặt lịch khám bệnh</p>
          <div><b>Thời gian : ${dataSend.time}</b></div>
          <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>
          <p>Nếu các thông tin là đúng vui lòng ấn vào link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh</p>
          <div>
          <a href="https://www.facebook.com/" target="_blank">Click here</a>
          </div>
          <div>Xin chân thành cảm ơn!</div>`;
     }
     if (dataSend.language === 'en') {
          result = `<h3>Xin chào ${dataSend.patientName}</h3>
          <p>You received an email because you made an online medical appointment on bookingcare.vn</p>
          <p>Information on scheduling medical examinations</p>
          <div><b>Time : ${dataSend.time}</b></div>
          <div><b>Doctor : ${dataSend.doctorName}</b></div>
          <p>If the information is correct, please click on the link below to confirm completion of the medical examination appointment procedure</p>
          <div>
          <a href="https://www.facebook.com/" target="_blank">Click here</a>
          </div>
          <div>Sincerely thank!</div>`;
     }
     return result;
};

module.exports = {
     sendSimpleEmail,
};
