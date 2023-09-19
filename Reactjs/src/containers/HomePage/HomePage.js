import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import { connect } from 'react-redux';
import './HomePage.scss';
import MedicalFacility from './Section/MedicalFacility';
import 'slick-carousel/slick/slick.css';
import GoodDoctor from './Section/GoodDoctor';
import 'slick-carousel/slick/slick-theme.css';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
class Homepage extends Component {
     state = {};

     componentDidMount() {}

     render() {
          let settings = {
               dots: false,
               infinite: false,
               speed: 500,
               slidesToShow: 4,
               slidesToScroll: 1,
          };
          return (
               <div className="text-center">
                    <HomeHeader BannerIsShowed={true} />
                    <Specialty settings={settings} />
                    <MedicalFacility settings={settings} />
                    <GoodDoctor settings={settings} />
                    <HandBook settings={settings} />
                    <About />
                    <HomeFooter />
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
