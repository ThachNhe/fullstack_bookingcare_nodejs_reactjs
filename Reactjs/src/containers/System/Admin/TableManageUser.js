import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import ModalUpdateUserRedux from "./ModalUpdateUserRedux";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpenModalUser: false,
      currentUser: {},
    };
  }
  componentDidMount() {
    this.props.getAllUserRedux();
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.usersRedux !== this.props.usersRedux) {
      this.setState({
        users: this.props.usersRedux,
      });
    }
  }
  handleOnClickDeleteUser = (id) => {
    this.props.deleteUserRedux(id);
  };
  toggleCreateUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  handleOnClickEditUser = (user) => {
    this.setState({
      isOpenModalUser: true,
      currentUser: user,
    });
  };
  updateUserRedux = async (userEdit) => {
    try {
      await this.props.editUserRedux(userEdit);
      console.log("isOPenModal : ", this.props.isOpenModal);
      this.setState({
        isOpenModalUser: this.props.isOpenModal,
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let users = this.state.users;
    //console.log("current user : ", this.state);
    return (
      <>
        <ModalUpdateUserRedux
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleCreateUserModal}
          currentUser={this.state.currentUser}
          updateUserRedux={this.updateUserRedux}
        />
        <table id="tableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {users &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleOnClickEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleOnClickDeleteUser(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersRedux: state.admin.users,
    isOpenModal: state.admin.isOpenModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserRedux: (id) => dispatch(actions.deleteUserRedux(id)),
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (userEdit) => dispatch(actions.EditUserRedux(userEdit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
