import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTimes: [],
    };
  }
  componentDidMount() {
    this.setArray();
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  setArray = async () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (this.props.language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        obj.label = this.capitalizeFirstLetter(labelVi);
      } else if (this.props.language === LANGUAGES.EN) {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    // console.log("check arrDate : ", arrDate);
    this.setState({
      allDays: arrDate,
    });
  };
  componentDidUpdate(preProps, preState, snapshot) {
    if (this.props.language !== preProps.language) {
      this.setArray();
    }
  }
  handleOnchangeSelect = async (event) => {
    let { doctorIdFromParent } = this.props;
    if (doctorIdFromParent) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log("check res 2 :", res);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTimes: res.data,
        });
      }
    }
  };
  render() {
    let { allDays, allAvailableTimes } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch khám</span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTimes && allAvailableTimes.length > 0 ? (
                allAvailableTimes.map((item, index) => {
                  return (
                    <button key={index} value={item.timeTypeData}>
                      {language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>
                  );
                })
              ) : (
                <span>
                  Bác sĩ không có lịch khám trong ngày này, vui lòng chọn ngày
                  hôm khác
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
