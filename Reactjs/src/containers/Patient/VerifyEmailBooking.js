import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmailBooking.scss';
import { FormattedMessage } from 'react-intl';
import { verifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmailBooking extends Component {
     constructor(props) {
          super(props);
          this.state = {
               statusVerify: false,
               errCode: 0,
          };
     }
     async componentDidMount() {
          if (this.props.location && this.props.location.search) {
               const urlParams = new URLSearchParams(this.props.location.search);

               let token = urlParams.get('token');
               let doctorId = urlParams.get('doctorId');

               let res = await verifyBookingAppointment({
                    token: token,
                    doctorId: doctorId,
               });

               if (res && res.errCode === 0) {
                    this.setState({
                         statusVerify: true,
                         errCode: res.errCode,
                    });
               } else {
                    this.setState({
                         statusVerify: true,
                         errCode: res && res.errCode ? res.errCode : -1,
                    });
               }
          }
     }

     async componentDidUpdate(prevProps, prevState, snapshot) {}

     render() {
          let { statusVerify, errCode } = this.state;

          return (
               <>
                    <HomeHeader BannerIsShowed={false} />
                    <div className="verify-email-container">
                         {statusVerify === false ? (
                              <div>Loading data ...</div>
                         ) : (
                              <div>
                                   {errCode === 0 ? (
                                        <span className="info-booking">Xác nhận lịch hẹn thành công</span>
                                   ) : (
                                        <span className="info-booking">Lịch hẹn đã tồn tại hoặc đã được xác nhận</span>
                                   )}
                              </div>
                         )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
