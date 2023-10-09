import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import { postPatientBookingAppointment } from '../../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {
     constructor(props) {
          super(props);
          this.state = {
               fullName: '',
               phoneNumber: '',
               email: '',
               address: '',
               reason: '',
               date: '',
               gender: '',
               doctorId: '',
               genders: '',
               timeType: '',
               selectedGender: '',
          };
     }
     async componentDidMount() {
          this.props.getGenders();
     }
     CheckValidInput = () => {
          let isValid = true;
          let input = [
               'fullName',
               'phoneNumber',
               'email',
               'address',
               'reason',
               'date',
               'selectedGender',
               'doctorId',
               'timeType',
          ];
          for (let i = 0; i < input.length; i++) {
               if (!this.state[input[i]]) {
                    alert('Vui long nhập thông tin cho ' + input[i]);
                    isValid = false;
                    break;
               }
          }
          return isValid;
     };
     buildDataGender = (data) => {
          let result = [];
          let { language } = this.props;
          if (data && data.length > 0) {
               data.map((item) => {
                    let obj = {};
                    obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                    // obj.labelEn = language === LANGUAGES.EN ? item.valueEn : '';
                    obj.value = item.keyMap;
                    result.push(obj);
               });
          }
          return result;
     };
     async componentDidUpdate(prevProps, prevState, snapshot) {
          if (this.props.genders !== prevProps.genders) {
               this.setState({
                    genders: this.buildDataGender(this.props.genders),
               });
          }
          if (this.props.language !== prevProps.language) {
               this.setState({
                    genders: this.buildDataGender(this.props.genders),
               });
          }
          if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
               let dataTime = this.props.dataScheduleTimeModal;
               if (dataTime && !_.isEmpty(dataTime)) {
                    this.setState({
                         doctorId: dataTime.doctorId,
                         timeType: dataTime.timeType,
                    });
               }
          }
     }
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     handleOnchangeDatePicker = (date) => {
          this.setState({
               date: date[0],
          });
     };
     handleOnchangeSelect = (selectedGender) => {
          this.setState({
               selectedGender: selectedGender,
          });
     };
     buildTimeBooking = (dataTime) => {
          let { language } = this.props;
          if (dataTime && !_.isEmpty(dataTime)) {
               let date =
                    language === LANGUAGES.VI
                         ? moment.unix(dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                         : moment
                                .unix(dataTime.date / 1000)
                                .locale('en')
                                .format('dddd - DD/MM/YYYY');
               let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
               return `${time} - ${date}`;
          }
          return '';
     };
     buildDoctorName = (dataTime) => {
          let { language } = this.props;
          if (dataTime && !_.isEmpty(dataTime)) {
               let name =
                    language === LANGUAGES.VI
                         ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                         : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
               return name;
          }
          return '';
     };
     handleConfirmBooking = async () => {
          let date = new Date(this.state.date).getTime();
          let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
          let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal);
          let isValid = this.CheckValidInput();
          //console.log('check valid : ', isValid);
          if (isValid) {
               let res = await postPatientBookingAppointment({
                    fullName: this.state.fullName,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    address: this.state.address,
                    reason: this.state.reason,
                    date: date,
                    gender: this.state.selectedGender.value,
                    doctorId: this.state.doctorId,
                    timeType: this.state.timeType,
                    language: this.props.language,
                    timeString: timeString,
                    doctorName: doctorName,
               });
               if (res && res.errCode === 0) {
                    toast.success('booking schedule success!');
               } else {
                    toast.error('booking schedule failed!');
               }
          }
     };
     render() {
          console.log('check dataScheduleTimeModal: ', this.props.dataScheduleTimeModal);
          let { isOpen, closeBookingModal, dataScheduleTimeModal } = this.props;
          let doctorId =
               dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';
          let { fullName, phoneNumber, email, address, reason, date, gender } = this.state;
          return (
               <>
                    <Modal className="booking-modal-container" isOpen={isOpen} size="lg" centered>
                         <div className="booking-modal-content">
                              <div className="booking-modal-header">
                                   <span className="left">Thông tin đặt lịch khám bệnh</span>
                                   <span className="right" onClick={closeBookingModal}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="booking-modal-body">
                                   <div className="doctor-info">
                                        <ProfileDoctor
                                             doctorId={doctorId}
                                             isShowDescription={false}
                                             dataScheduleTimeModal={dataScheduleTimeModal}
                                        />
                                   </div>

                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Họ tên</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={fullName}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Số điện thoại</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={phoneNumber}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Địa chỉ Email</label>
                                             <input
                                                  type="email"
                                                  className="form-control"
                                                  value={email}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Địa chỉ liên hệ</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                             ></input>
                                        </div>
                                        <div className="col-12 form-group">
                                             <label>Lí do khám</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={reason}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Ngày sinh</label>
                                             <DatePicker
                                                  className="form-control"
                                                  onChange={this.handleOnchangeDatePicker}
                                                  value={this.state.currentDate}
                                                  placeholder={'Ngày sinh'}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Giới tính</label>
                                             <Select
                                                  value={this.state.selectedGender}
                                                  options={this.state.genders}
                                                  onChange={this.handleOnchangeSelect}
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div className="booking-modal-footer">
                                   <button className="btn-booking-confirm" onClick={() => this.handleConfirmBooking()}>
                                        Xác nhận
                                   </button>
                                   <button className="btn-booking-cancel" onClick={closeBookingModal}>
                                        Hủy
                                   </button>
                              </div>
                         </div>
                    </Modal>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
          language: state.app.language,
          genders: state.admin.genders,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getGenders: () => dispatch(actions.fetchGenderStart()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
