import axios from '../axios';

const handleLoginAPI = (userEmail, userPassword) => {
     return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
     return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
     // console.log("data from message : ", data);
     return axios.post('/api/create-new-user', data);
};
const DeleteUserService = (userId) => {
     console.log('check ID delete user : ', userId);
     return axios.delete(`/api/delete-user`, {
          data: {
               id: userId,
          },
     });
};
const editUserService = (inputData) => {
     return axios.put(`/api/edit-user`, inputData);
};

const getAllCodeService = (input) => {
     return axios.get(`/api/allcode?type=${input}`);
};
const getTopDoctorHomeService = (limit) => {
     return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctor = () => {
     return axios.get(`/api/all-doctor`);
};
const saveDetailDoctor = (data) => {
     return axios.post('/api/save-info-doctors', data);
};
const getDetailInfoDoctor = (id) => {
     return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const createBulkSchedule = (body) => {
     return axios.post('/api/bulk-create-schedule', body);
};
const getScheduleDoctorByDate = (doctorId, date) => {
     return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const getExtraDoctorInfoById = (doctorId) => {
     return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}}`);
};
export {
     handleLoginAPI,
     getAllUsers,
     createNewUserService,
     DeleteUserService,
     editUserService,
     getAllCodeService,
     getTopDoctorHomeService,
     getAllDoctor,
     saveDetailDoctor,
     getDetailInfoDoctor,
     createBulkSchedule,
     getScheduleDoctorByDate,
     getExtraDoctorInfoById,
};
