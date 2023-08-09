import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
class ProductManage extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <>
        <div className="section-share section-good-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Bác sĩ nổi bật</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-background">
                      <div className="bg-image section-good-doctor" alt="" />
                    </div>
                    <div className="position text-center">
                      <div>Giáo sư, tiến sĩ Đinh Văn Thạch</div>
                      <div>Răng hàm mặt</div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-background">
                      <div className="bg-image section-good-doctor" alt="" />
                    </div>
                    <div className="position text-center">
                      <div>Giáo sư, tiến sĩ Đinh Văn Thạch</div>
                      <div>Răng hàm mặt</div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-background">
                      <div className="bg-image section-good-doctor" alt="" />
                    </div>
                    <div className="position text-center">
                      <div>Giáo sư, tiến sĩ Đinh Văn Thạch</div>
                      <div>Răng hàm mặt</div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-background">
                      <div className="bg-image section-good-doctor" alt="" />
                    </div>
                    <div className="position text-center">
                      <div>Giáo sư, tiến sĩ Đinh Văn Thạch</div>
                      <div>Răng hàm mặt</div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-background">
                      <div className="bg-image section-good-doctor" alt="" />
                    </div>
                    <div className="position text-center">
                      <div>Giáo sư, tiến sĩ Đinh Văn Thạch</div>
                      <div>Răng hàm mặt</div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-background">
                      <div className="bg-image section-good-doctor" alt="" />
                    </div>
                    <div className="position text-center">
                      <div>Giáo sư, tiến sĩ Đinh Văn Thạch</div>
                      <div>Răng hàm mặt</div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
