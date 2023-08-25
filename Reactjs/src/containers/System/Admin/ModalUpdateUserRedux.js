import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import "./ModalUpdateUserRedux.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
class ModalUpdateUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleIdArr: [],
      id: null,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
    };
    this.listenToEmitter();
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preState, snapshot) {
    let user = this.props.currentUser;
    console.log("check props user : ", user);
    let arrGender = this.props.genderRedux;
    let arrPosition = this.props.positionRedux;
    let arrRole = this.props.roleRedux;
    if (preProps.currentUser !== this.props.currentUser) {
      this.setState({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
    if (preProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (preProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (preProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleIdArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "firstName",
      "lastName",
      "address",
      "gender",
      "position",
      "role",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter : " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleUpdateUserRedux = () => {
    let check = this.checkValidateInput();
    if (check === true) {
      this.props.updateUserRedux({
        id: this.state.id,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        role: this.state.role,
        position: this.state.position,
      });
    }
  };
  render() {
    let language = this.props.language;
    let genders = this.props.genderRedux;
    let positions = this.props.positionRedux;
    let roles = this.props.roleRedux;
    console.log("STATE ", this.state);
    return (
      <>
        <Modal
          className="modal-user-redux-container"
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>
            Create a new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  onChange={(event) => this.handleOnchangeInput(event, "email")}
                  value={this.state.email}
                ></input>
              </div>
              <div className="input-container">
                <label>First name</label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "firstName")
                  }
                  value={this.state.firstName}
                ></input>
              </div>
              <div className="input-container">
                <label>Last name</label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "lastName")
                  }
                  value={this.state.lastName}
                ></input>
              </div>
              <div className="input-container">
                <label>Phone Number</label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "phoneNumber")
                  }
                  value={this.state.phoneNumber}
                ></input>
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                  value={this.state.address}
                ></input>
              </div>

              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.handleOnchangeInput(event, "role")}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option value={item.key} key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "gender")
                  }
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "position")
                  }
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option value={item.key} key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleUpdateUserRedux()}
            >
              Add new
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.position,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUpdateUserRedux);
