export const adminMenu = [
     //quan li nguoi dung
     {
          name: 'menu.admin.manage-user',
          menus: [
               {
                    name: 'menu.admin.crud',
                    link: '/system/user-crud',
               },
               {
                    name: 'menu.admin.crud-redux',
                    link: '/system/user-redux',
               },
               {
                    name: 'menu.admin.manage-doctor',
                    link: '/system/manage-doctor',
               },
               {
                    name: 'menu.doctor.manage-schedule',
                    link: '/doctor/manage-schedule',
               },
          ],
     },
     //quản lí phòng khám
     {
          //hệ thống
          name: 'menu.admin.clinic',
          menus: [
               {
                    name: 'menu.admin.manage-clinic',
                    link: '/system/manage-clinic',
               },
          ],
     },
     //Quản lí chuyên khoa
     {
          //hệ thống
          name: 'menu.admin.specialty',
          menus: [
               {
                    name: 'menu.admin.manage-specialty',
                    link: '/system/manage-specialty',
               },
          ],
     },
     //Quản lí cẩm năng
     {
          name: 'menu.admin.handbook',
          menus: [
               {
                    name: 'menu.admin.manage-handbook',
                    link: '/system/manage-handbook',
               },
          ],
     },
];

export const doctorMenu = [
     //quan li kế hoạch khám bệnh của bác sĩ

     {
          name: 'menu.admin.manage-user',
          menus: [
               {
                    name: 'menu.doctor.manage-schedule',
                    link: '/doctor/manage-schedule',
               },
          ],
     },

     //quản lí phòng khám
];
