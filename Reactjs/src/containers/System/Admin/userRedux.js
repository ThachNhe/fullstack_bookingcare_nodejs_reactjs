import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./userRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class userRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleIdArr: [],
      previewImgUrl: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(preProps, preState, snapshot) {
    let arrGender = this.props.genderRedux;
    let arrPosition = this.props.positionRedux;
    let arrRole = this.props.roleRedux;
    if (preProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (preProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (preProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleIdArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("Check base64 : ", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImg = () => {
    if (!this.state.previewImgUrl) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    console.log(isValid);
    if (isValid === false) {
      return;
    }
    console.log("data before create : ", this.state);
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      role: this.state.role,
      position: this.state.position,
      avatar: this.state.avatar,
    });
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    console.log("check input : ", event.target.value);
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "position",
      "role",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required : " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleIdArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    // console.log("check props roles : ", roles);
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    return (
      <>
        <div className="user-redux-container">
          <div className="title">User redux với Thạch nhé</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="col-12 my-3">
                  {isLoadingGender === true ? "loading gender" : " "}
                </div>

                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "email")
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "password")
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "firstName")
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "lastName")
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "address")
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    value={gender}
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "gender")
                    }
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
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
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option value={item.keyMap}>
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
                    <FormattedMessage id="manage-user.roleId" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "role")
                    }
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option value={item.keyMap}>
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
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="preViewImg"
                      type="file"
                      hidden
                      onChange={(event) => {
                        this.handleOnchangeImage(event);
                      }}
                    />
                    <label htmlFor="preViewImg" className="label-upload">
                      Tải ảnh
                      <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                      onClick={() => this.openPreviewImg()}
                    ></div>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </div>
              <TableManageUser />
            </div>
          </div>
          {this.state.isOpen && (
            <Lightbox
              mainSrc={this.state.previewImgUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    positionRedux: state.admin.position,
    roleRedux: state.admin.roles,
    language: state.app.language,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(userRedux);
