import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class userRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleIdArr: [],
    };
  }

  async componentDidMount() {
    try {
      let resGender = await getAllCodeService("gender");
      let resPosition = await getAllCodeService("position");
      let resRoleId = await getAllCodeService("role");
      if (resGender && resGender.errCode === 0) {
        this.setState({
          genderArr: resGender.data,
        });
        if (resPosition && resPosition.errCode === 0) {
          this.setState({
            positionArr: resPosition.data,
          });
        }
        if (resRoleId && resRoleId.errCode === 0) {
          this.setState({
            roleIdArr: resRoleId.data,
          });
        }
      }
    } catch (e) {}
  }

  render() {
    let { genderArr, positionArr, roleIdArr } = this.state;
    let language = this.props.language;
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
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input className="form-control" type="email" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input className="form-control" type="password" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-control">
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select className="form-control">
                    {positionArr &&
                      positionArr.length > 0 &&
                      positionArr.map((item, index) => {
                        return (
                          <option>
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
                  <select className="form-control">
                    {roleIdArr &&
                      roleIdArr.length > 0 &&
                      roleIdArr.map((item, index) => {
                        return (
                          <option>
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
                  <input typeof="text" className="form-control" />
                </div>
                <div className="col-12 mt-3">
                  <button className="btn btn-primary">
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(userRedux);
