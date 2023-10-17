import specialtyService from '../services/SpecialtyService';

let createNewSpecialty = async (req, res) => {
     try {
          // console.log('check body controller :', req.body);
          let response = await specialtyService.createNewSpecialtyService(req.body);
          return res.status(200).json(response);
     } catch (e) {
          return res.status(200).json({
               errCode: -1,
               errMessage: 'Error from server',
          });
     }
};
module.exports = {
     createNewSpecialty,
};
