import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraDoctorInfoById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
class DoctorExtraInfo extends Component {
     constructor(props) {
          super(props);
          this.state = {
               iShowDetailInfo: false,
               extraInfo: [],
          };
     }
     async componentDidMount() {
          let res = await getExtraDoctorInfoById(this.props.doctorIdFromParent);
          if (res && res.errCode === 0) {
               this.setState({
                    extraInfo: res.data,
               });
          }
     }

     async componentDidUpdate(prevProps, prevState, snapshot) {
          if (this.props.language !== prevProps.language) {
               // this.handleCurrentPrice(this.props.language, this.state.extraInfo);
          }
          if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
               let res = await getExtraDoctorInfoById(this.props.doctorIdFromParent);
               if (res && res.errCode === 0) {
                    this.setState({
                         extraInfo: res.data,
                    });
               }
          }
     }
     onClickShowHideInfoDoctor = () => {
          this.setState({
               iShowDetailInfo: !this.state.iShowDetailInfo,
          });
     };
     render() {
          let { iShowDetailInfo, extraInfo } = this.state;
          console.log('check current price : ', extraInfo);
          let { language } = this.props;

          return (
               <>
                    <div className="doctor-extra-info-container">
                         <div className="content-up">
                              <div className="text-address">ĐỊA CHỈ KHÁM</div>
                              <div className="name-clinic">
                                   {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                              </div>
                              <div className="detail-address">
                                   {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                              </div>
                         </div>
                         <div className="content-down">
                              {iShowDetailInfo === false ? (
                                   <div className="short-info">
                                        GIÁ KHÁM:
                                        {extraInfo &&
                                        extraInfo.priceTypeData &&
                                        extraInfo.priceTypeData.valueVi &&
                                        language === LANGUAGES.VI ? (
                                             <span>
                                                  {' '}
                                                  <NumberFormat
                                                       className="currency"
                                                       value={extraInfo.priceTypeData.valueVi}
                                                       displayType={'text'}
                                                       thousandSeparator={true}
                                                       suffix={'VNĐ'}
                                                  />
                                             </span>
                                        ) : (
                                             ''
                                        )}
                                        {extraInfo &&
                                        extraInfo.priceTypeData &&
                                        extraInfo.priceTypeData.valueVi &&
                                        language === LANGUAGES.EN ? (
                                             <span>
                                                  <NumberFormat
                                                       className="currency"
                                                       value={extraInfo.priceTypeData.valueEn}
                                                       displayType={'text'}
                                                       thousandSeparator={true}
                                                       prefix={'$'}
                                                  />
                                             </span>
                                        ) : (
                                             ''
                                        )}
                                        <span
                                             className="text-show-detail-info-doctor"
                                             onClick={() => this.onClickShowHideInfoDoctor()}
                                        >
                                             xem chi tiết
                                        </span>
                                   </div>
                              ) : (
                                   <>
                                        <div className="title-price">GIÁ KHÁM: </div>
                                        <div className="detail-info">
                                             <div className="price">
                                                  <span className="left">Giá khám</span>
                                                  <span className="right">
                                                       {extraInfo &&
                                                       extraInfo.priceTypeData &&
                                                       extraInfo.priceTypeData.valueVi &&
                                                       language === LANGUAGES.VI ? (
                                                            <span>
                                                                 {' '}
                                                                 <NumberFormat
                                                                      className="currency"
                                                                      value={extraInfo.priceTypeData.valueVi}
                                                                      displayType={'text'}
                                                                      thousandSeparator={true}
                                                                      suffix={'VNĐ'}
                                                                 />
                                                            </span>
                                                       ) : (
                                                            ''
                                                       )}
                                                       {extraInfo &&
                                                       extraInfo.priceTypeData &&
                                                       extraInfo.priceTypeData.valueVi &&
                                                       language === LANGUAGES.EN ? (
                                                            <span>
                                                                 <NumberFormat
                                                                      className="currency"
                                                                      value={extraInfo.priceTypeData.valueEn}
                                                                      displayType={'text'}
                                                                      thousandSeparator={true}
                                                                      prefix={'$'}
                                                                 />
                                                            </span>
                                                       ) : (
                                                            ''
                                                       )}
                                                  </span>
                                             </div>
                                             <div className="note">
                                                  {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                             </div>
                                        </div>
                                        <div className="payment">
                                             Người bệnh có thể thanh toán chi phí bằng hình thức :
                                             {extraInfo && extraInfo.paymentTypeData
                                                  ? extraInfo.paymentTypeData.valueVi
                                                  : ''}
                                        </div>
                                        <div
                                             className="hide-table-price"
                                             onClick={() => this.onClickShowHideInfoDoctor()}
                                        >
                                             Ẩn bảng giá
                                        </div>
                                   </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
