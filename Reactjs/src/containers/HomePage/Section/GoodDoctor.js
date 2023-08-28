import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class GoodDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  state = {};

  componentDidMount() {
    this.props.loadTopDoctors();
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }

  render() {
    console.log("OK ", this.props.topDoctorRedux);
    let { language } = this.props;
    let arrDoctors = this.state.arrDoctors;

    return (
      <>
        <div className="section-share section-good-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                      //console.log("image base64 : ", imageBase64);
                    }

                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                    return (
                      <div className="section-customize">
                        <div className="customize-border">
                          <div className="outer-background">
                            <div
                              className="bg-image section-good-doctor"
                              alt=""
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                            <div />
                          </div>
                          <div className="position text-center">
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div>Răng hàm mặt</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    topDoctorRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodDoctor);
