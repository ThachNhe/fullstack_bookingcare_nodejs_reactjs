import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";
class Specialty extends Component {
  state = {};

  componentDidMount() {}

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section">Chuyên khoa phổ biển</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="specialty-body">
              <Slider {...settings}>
                <div className="specialty-customize">
                  <div className="bg-image" alt="" />
                  <span>Cơ sương khớp 1</span>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image" />
                  <span>Cơ sương khớp 2</span>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image" />
                  <span>Cơ sương khớp 3</span>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image" />
                  <span>Cơ sương khớp 4</span>
                </div>

                <div className="specialty-customize">
                  <div className="bg-image" />
                  <span>Cơ sương khớp 5</span>
                </div>
                <div className="specialty-customize">
                  <div className="bg-image" />
                  <span>Cơ sương khớp 6</span>
                </div>
              </Slider>
            </div>
          </div>
        </div>
        <div style={{ height: "500px", width: "500px" }}></div>
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
