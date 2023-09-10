import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES, LanguageUtils } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }
  componentDidMount() {
    this.setArray();
  }
  setArray = async () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (this.props.language === LANGUAGES.VI) {
        obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
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
    }
  };
  render() {
    let { allDays } = this.state;
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
          <div className="all-available"></div>
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
