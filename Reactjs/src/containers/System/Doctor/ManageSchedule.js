import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {},
      listDoctor: [],
      currentDate: new Date(),
      allScheduleTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTimes();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInPutSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInPutSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({
        allScheduleTime: this.props.allScheduleTime,
      });
    }
  }
  buildDataInPutSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        console.log("current date : ", date);
      }
    );
  };
  render() {
    let { allScheduleTime } = this.state;
    let { language } = this.props;
    // console.log("check time : ", allScheduleTime);
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Chon bac si</label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctor}
                />
              </div>
              <div className="col-6 form-group">
                <label>Chon ngay</label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  value={this.state.currentDate}
                  minDate={new Date()}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {allScheduleTime &&
                  allScheduleTime.length > 0 &&
                  allScheduleTime.map((item, index) => {
                    return (
                      <button className="btn btn-schedule" key={index}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button className="btn btn-primary btn-save-schedule">
                  Luu thong tin
                </button>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
