import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTimes: [],
        };
    }
    async componentDidMount() {
        this.getArrayDates();
        let { language } = this.props;
        let allDays = await this.getArrayDates(language);
        let doctorId = await this.props.doctorIdFromParent;
        console.log('check doctorId : ', doctorId);
        if (allDays && allDays.length > 0) {
            let res = await getScheduleDoctorByDate(doctorId, allDays[0].value);
            this.setState({
                allAvailableTimes: res.data ? res.data : [],
            });
        }
        this.setState({
            allDays: allDays,
        });
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    getArrayDates = async (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`;
                    obj.label = today;
                } else {
                    let labelEn = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelEn);
                }
            } else if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `To day - ${labelVi2}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }
        // console.log(`check day : `, arrDate);
        return arrDate;
    };
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
            let allDays = await this.getArrayDates(this.props.language);
            // console.log('check alldays : ', allDays);
            this.setState({
                allDays: allDays,
            });
        }
    }
    handleOnchangeSelect = async (event) => {
        let { doctorIdFromParent } = this.props;
        if (doctorIdFromParent) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            // console.log("check res 2 :", res);
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
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </span>
                            </i>
                        </div>
                        <div className="time-content">
                            {allAvailableTimes && allAvailableTimes.length > 0 ? (
                                <>
                                    <div className="time-content-btn">
                                        {allAvailableTimes.map((item, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    value={item.timeTypeData}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? item.timeTypeData.valueVi
                                                        : item.timeTypeData.valueEn}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="book-free">
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </div>
                                </>
                            ) : (
                                <span className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
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
