import React, { Component } from 'react';
// import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import './userManage.scss';
import ModalEditUser from './ModalEditUser';
import { getAllUsers, createNewUserService, DeleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {
     constructor(props) {
          super(props);
          this.state = {
               arrayUsers: [],
               isOpenModalUser: false,
               isOpenModalEditUser: false,
               userEdit: {},
          };
     }

     async componentDidMount() {
          await this.GetAllUsersFromReact();
     }
     /** life cycle
      * run component:
      * 1. run constructor -> init state.
      * 2. componentDidMount (set state)
      * 3. render()
      */
     GetAllUsersFromReact = async () => {
          let response = await getAllUsers('ALL');
          if (response && response.errCode === 0) {
               this.setState(
                    {
                         arrayUsers: response.users,
                    },
                    () => {},
               );
          }
     };
     createNewUser = async (data) => {
          // alert("call me");
          try {
               let res = await createNewUserService(data);
               if (res && res.errCode !== 0) {
                    alert('Your email already in used');
               } else {
                    await this.GetAllUsersFromReact();
                    this.setState({
                         isOpenModalUser: false,
                    });
                    emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id ': 'your id' });
               }
               console.log('check res user : ', res);
          } catch (e) {
               console.log(e);
          }

          // console.log(">>> data from children : ", data);
     };

     handleAddNewUser = () => {
          this.setState({
               isOpenModalUser: true,
          });
     };

     toggleCreateUserModal = () => {
          this.setState({
               isOpenModalUser: !this.state.isOpenModalUser,
          });
     };
     toggleEditUserModal = () => {
          this.setState({
               isOpenModalEditUser: !this.state.isOpenModalEditUser,
          });
     };
     handleDeleteUser = async (userId) => {
          try {
               let response = await DeleteUserService(userId);
               if (response && response.errCode === 0) {
                    await this.GetAllUsersFromReact();
               }
          } catch (e) {
               console.log(e);
          }
     };
     handleOpenModelEditUser = (user) => {
          this.setState({
               isOpenModalEditUser: true,
               userEdit: user,
          });
     };
     doEditUser = async (user) => {
          try {
               let response = await editUserService(user);
               if (response && response.errCode === 0) {
                    this.setState({
                         isOpenModalEditUser: false,
                    });
                    this.GetAllUsersFromReact();
               } else {
                    alert(response.errCode);
               }
          } catch (e) {
               console.log(e);
          }
     };
     render() {
          // console.log("check render", this.state.arrayUsers);
          let arrUsers = this.state.arrayUsers;
          return (
               <div className="users-container">
                    <ModalUser
                         isOpen={this.state.isOpenModalUser}
                         toggleFromParent={this.toggleCreateUserModal}
                         createNewUser={this.createNewUser}
                    />
                    {this.state.isOpenModalEditUser && (
                         <ModalEditUser
                              isOpen={this.state.isOpenModalEditUser}
                              toggleFromParent={this.toggleEditUserModal}
                              currentUser={this.state.userEdit}
                              editUser={this.doEditUser}
                         />
                    )}
                    <div className="title text-center">manage user with Thach</div>
                    <div className="mx-1">
                         <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
                              <i className="fas fa-plus"></i>Add new user
                         </button>
                    </div>
                    <div className="users-table mt-3 mx-1">
                         <table id="customers">
                              <tbody>
                                   <tr>
                                        <th>Email</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                   </tr>
                                   {arrUsers &&
                                        arrUsers.map((item, index) => {
                                             return (
                                                  <tr>
                                                       <td>{item.email}</td>
                                                       <td>{item.firstName}</td>
                                                       <td>{item.lastName}</td>
                                                       <td>{item.address}</td>
                                                       <td>
                                                            <button
                                                                 className="btn-edit"
                                                                 onClick={() => this.handleOpenModelEditUser(item)}
                                                            >
                                                                 <i className="fas fa-pencil-alt"></i>
                                                            </button>
                                                            <button
                                                                 className="btn-delete"
                                                                 onClick={() => this.handleDeleteUser(item.id)}
                                                            >
                                                                 <i className="fas fa-trash"></i>
                                                            </button>
                                                       </td>
                                                  </tr>
                                             );
                                        })}
                              </tbody>
                         </table>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {};
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
