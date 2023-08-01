import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import {
  getAllUsers,
  createNewUserService,
  DeleteUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
      isOpenModalUser: false,
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
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrayUsers: response.users,
        },
        () => {}
      );
    }
  };
  createNewUser = async (data) => {
    // alert("call me");
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode !== 0) {
        alert("Your email already in used");
      } else {
        await this.GetAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
      }
      console.log("check res user : ", res);
    } catch (e) {
      console.log(e);
    }

    console.log(">>> data from children : ", data);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  handleDeleteUser = async (userId) => {
    let check = await DeleteUserService(userId);
    if (check) {
      await this.GetAllUsersFromReact();
    }
  };
  render() {
    // console.log("check render", this.state.arrayUsers);
    let arrUsers = this.state.arrayUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center">manage user with Thach</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
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
                        <button className="btn-edit">
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
