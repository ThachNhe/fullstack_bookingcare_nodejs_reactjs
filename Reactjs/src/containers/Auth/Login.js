import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { divide } from "lodash";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      arrMessage: "",
    };
  }

  handleOnchangeInput = (event, id) => {
    let copyState = this.state;
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleLogin = async () => {
    this.setState({
      arrMessage: "",
    });
    // console.log("state : ", this.state);
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.userData.errCode !== 0) {
        this.setState({
          arrMessage: data.userData.arrMessage,
        });
      }

      if (data && data.userData.errCode === 0) {
        this.props.userLoginSuccess(data.userData.user);
      }
    } catch (error) {
      // console.log(error.response.data.message);
      if (error.response) {
        if (error.response.data) {
          this.setState({
            arrMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeydown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-login">LOGIN</div>
              <div className="col-12 form-group login-input">
                <label className="text-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "username");
                  }}
                  onKeyDown={(event) => this.handleKeydown(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label className="text-label">Password:</label>
                <div className="custom-input-password">
                  <input
                    className="form-control"
                    type={this.state.isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(event) => {
                      this.handleOnchangeInput(event, "password");
                    }}
                    onKeyDown={(event) => this.handleKeydown(event)}
                  />
                  <span
                    onClick={() => {
                      this.handleShowHidePassword();
                    }}
                  >
                    <i
                      className={
                        !this.state.isShowPassword
                          ? "far fa-eye-slash"
                          : "far fa-eye"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.arrMessage}
              </div>
              <div className="col-12 ">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </button>
              </div>
              <div className="col-12">
                <span className="forgot-password">Forgot your password</span>
              </div>

              <div className="col-12 text-center mt-3">
                <span className="text-other-login">Or login with:</span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-google-plus-g google"></i>
                <i className="fab fa-facebook-f facebook"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
