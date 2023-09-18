import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iShowDetailInfo: false,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    onClickShowHideInfoDoctor = () => {
        this.setState({
            iShowDetailInfo: !this.state.iShowDetailInfo,
        });
    };
    render() {
        let { iShowDetailInfo } = this.state;
        return (
            <>
                <div className="doctor-extra-info-container">
                    <div className="content-up">
                        <div className="text-address">ĐỊA CHỈ KHÁM</div>
                        <div className="name-clinic">Phòng khám chuyên khoa gia liễu</div>
                        <div className="detail-address">114 Xuân Thuỷ cầu Giấy</div>
                    </div>
                    <div className="content-down">
                        {iShowDetailInfo === false ? (
                            <div className="short-info">
                                GIÁ KHÁM: 300.000Đ.{' '}
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
                                        <span className="left">giá khám</span>
                                        <span className="right"> 250.000đ</span>
                                    </div>
                                    <div className="note">Được ưu tiên khám trước khi đặt khám qua bookingCare.</div>
                                </div>
                                <div className="payment">
                                    Người bệnh có thể thanh toán bằng tiền mặt hoặc bằng quẹt thẻ
                                </div>
                                <div className="hide-table-price" onClick={() => this.onClickShowHideInfoDoctor()}>
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
