import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class BookingModal extends Component {
     constructor(props) {
          super(props);
          this.state = {};
     }
     async componentDidMount() {}

     async componentDidUpdate(prevProps, prevState, snapshot) {}
     toggle = () => {};

     render() {
          let { isOpen, closeBookingModal, dataScheduleTimeModal } = this.props;
          let doctorId =
               dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';

          return (
               <>
                    <Modal
                         className="booking-modal-container"
                         isOpen={isOpen}
                         toggle={() => this.toggle()}
                         size="lg"
                         centered
                    >
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
                                             <input type="text" className="form-control"></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Số điện thoại</label>
                                             <input type="text" className="form-control"></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Địa chỉ Email</label>
                                             <input type="text" className="form-control"></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Địa chỉ liên hệ</label>
                                             <input type="text" className="form-control"></input>
                                        </div>
                                        <div className="col-12 form-group">
                                             <label>Lí do khám</label>
                                             <input type="text" className="form-control"></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Đặt cho ai</label>
                                             <input type="text" className="form-control"></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Giới tính</label>
                                             <input type="text" className="form-control"></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="booking-modal-footer">
                                   <button className="btn-booking-confirm">Xác nhận</button>
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
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
