import db from '../models/index';

let createNewSpecialtyService = (body) => {
     return new Promise(async (resolve, reject) => {
          try {
               // console.log('check body : ', body);
               if (!body.name || !body.imageBase64 || !body.descriptionHTML || !body.descriptionMarkdown) {
                    resolve({
                         errCode: -1,
                         errMessage: 'missing parameter',
                    });
               } else {
                    await db.Specialty.create({
                         name: body.name,
                         descriptionHTML: body.descriptionHTML,
                         descriptionMarkdown: body.descriptionMarkdown,
                         image: body.imageBase64,
                    });
                    resolve({
                         errCode: 0,
                         errMessage: 'create specialty success',
                    });
               }
          } catch (e) {
               reject(e);
          }
     });
};

module.exports = {
     createNewSpecialtyService,
};
