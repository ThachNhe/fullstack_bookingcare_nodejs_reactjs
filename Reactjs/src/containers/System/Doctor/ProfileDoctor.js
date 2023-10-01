import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { LANGUAGES, LanguageUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash';
import moment, { lang } from 'moment';
class ProfileDoctor extends Component {
     constructor(props) {
          super(props);
          this.state = {
               dataProfile: {},
          };
     }
     async componentDidMount() {
          let data = await this.getInfoDoctor(this.props.doctorId);
          this.setState({
               dataProfile: data,
          });
     }
     getInfoDoctor = async (doctorId) => {
          let result = {};
          if (doctorId) {
               let res = await getProfileDoctorById(doctorId);
               if (res && res.errCode === 0) {
                    result = res.data;
               }
          }
          return result;
     };
     async componentDidUpdate(prevProps, prevState, snapshot) {
          if (this.props.doctorId !== prevProps.doctorId) {
               // this.getInfoDoctor(this.props.doctorId);
          }
     }
     renderTimeBooking = (dataTime) => {
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
               return (
                    <>
                         <div>
                              {time} - {date}
                         </div>
                         <div>Miễn phí dặt lịch</div>
                    </>
               );
          }
     };
     render() {
          let { dataProfile } = this.state;
          let { isShowDescription, dataScheduleTimeModal } = this.props;
          console.log('check state : ', dataScheduleTimeModal);
          let { language } = this.props;
          let nameVi = '';
          let nameEn = '';
          if (dataProfile && dataProfile.positionData) {
               nameVi = `${dataProfile.positionData.valueVi},  ${dataProfile.lastName} ${dataProfile.firstName}`;
               nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
          }

          return (
               <>
                    <div className="profile-doctor-container">
                         <div className="intro-doctor">
                              <div
                                   className="content-left"
                                   style={{
                                        backgroundImage: `url(${dataProfile.image})`,
                                   }}
                              ></div>
                              <div className="content-right">
                                   <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                   <div className="down">
                                        <>
                                             {isShowDescription === true ? (
                                                  dataProfile.Markdown &&
                                                  dataProfile.Markdown.description && (
                                                       <span>{dataProfile.Markdown.description}</span>
                                                  )
                                             ) : (
                                                  <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
                                             )}
                                        </>
                                   </div>
                              </div>
                         </div>
                         <div className="price">
                              <span>Giá khám: </span>
                              {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ? (
                                   <NumberFormat
                                        className="currency"
                                        value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VNĐ'}
                                   />
                              ) : (
                                   ''
                              )}
                              {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ? (
                                   <span>
                                        <NumberFormat
                                             className="currency"
                                             value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                             displayType={'text'}
                                             thousandSeparator={true}
                                             prefix={'$'}
                                        />
                                   </span>
                              ) : (
                                   ''
                              )}
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
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
