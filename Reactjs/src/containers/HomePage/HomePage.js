import React, { Component } from "react";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import { connect } from "react-redux";
import "./HomePage.scss";
import MedicalFacility from "./Section/MedicalFacility";
import "slick-carousel/slick/slick.css";
import GoodDoctor from "./Section/GoodDoctor";
import "slick-carousel/slick/slick-theme.css";
import HandBook from "./Section/HandBook";
class Homepage extends Component {
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
      <div className="text-center">
        <HomeHeader></HomeHeader>
        <Specialty settings={settings}></Specialty>
        <MedicalFacility settings={settings} />
        <GoodDoctor settings={settings} />
        <HandBook settings={settings} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
