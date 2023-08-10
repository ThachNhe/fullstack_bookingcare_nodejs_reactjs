import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
// Import css files

class Specialty extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Chuyên khoa phổ biển</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <span>Cơ sương khớp 1</span>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <span>Cơ sương khớp 2</span>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <span>Cơ sương khớp 3</span>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <span>Cơ sương khớp 4</span>
                </div>

                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <span>Cơ sương khớp 5</span>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <span>Cơ sương khớp 6</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
