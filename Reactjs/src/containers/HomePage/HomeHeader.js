import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import * as actions from '../../store/actions';
import { changeLanguageApp } from '../../store/actions/appActions';
class HomeHeader extends Component {
     state = {};
     changeLanguage = (language) => {
          this.props.changeLanguageAppRedux(language);
     };

     render() {
          //console.log("check user info ", this.props.userInfo);
          let language = this.props.language;
          return (
               <>
                    <div className="home-header-container">
                         <div className="home-header-content">
                              <div className="left-content">
                                   <i className="fas fa-bars"></i>
                                   <img className="header-logo" src={logo} alt=""></img>
                              </div>
                              <div className="center-content">
                                   <div className="child-content">
                                        <div>
                                             <b>
                                                  <FormattedMessage id="home-header.specialty" />
                                             </b>
                                        </div>
                                        <div className="subs-title">
                                             <FormattedMessage id="home-header.searchDoctor" />
                                        </div>
                                   </div>
                                   <div className="child-content">
                                        <div>
                                             <b>
                                                  <FormattedMessage id="home-header.heath-facility" />
                                             </b>
                                        </div>
                                        <div className="subs-title">
                                             <FormattedMessage id="home-header.select-room" />
                                        </div>
                                   </div>
                                   <div className="child-content">
                                        <div>
                                             <b>
                                                  <FormattedMessage id="home-header.doctor" />
                                             </b>
                                        </div>
                                        <div className="subs-title">
                                             {' '}
                                             <FormattedMessage id="home-header.select-doctor" />
                                        </div>
                                   </div>
                                   <div className="child-content">
                                        <div>
                                             <b>
                                                  {' '}
                                                  <FormattedMessage id="home-header.fee" />
                                             </b>
                                        </div>
                                        <div className="subs-title">
                                             <FormattedMessage id="home-header.heath-check" />
                                        </div>
                                   </div>
                              </div>
                              <div className="right-content">
                                   <div className="support">
                                        <i className="fas fa-question-circle"></i>
                                        <FormattedMessage id="home-header.support" />
                                   </div>
                                   <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                                   </div>
                                   <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {this.props.BannerIsShowed && (
                         <div className="home-header-banner" key={this.props.BannerIsShowed}>
                              <div className="content-up">
                                   <div className="title">
                                        <div className="title1">
                                             <FormattedMessage id="banner.title1" />
                                        </div>
                                        <div className="title1">
                                             <FormattedMessage id="banner.title2" />
                                        </div>
                                   </div>
                                   <div className="search">
                                        <i className="fas fa-search"></i>
                                        <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                                   </div>
                              </div>
                              <div className="content-down">
                                   <div className="options">
                                        <div className="option-child">
                                             <div className="icon-child">
                                                  <i className="far fa-hospital"></i>
                                             </div>
                                             <div className=" text-child">
                                                  <FormattedMessage id="banner.specialistConsultation" />
                                             </div>
                                        </div>
                                        <div className="option-child">
                                             <div className="icon-child">
                                                  <i className="fas fas fa-mobile-alt"></i>
                                             </div>
                                             <div className=" text-child">
                                                  <FormattedMessage id="banner.telemedicineConsultation" />
                                             </div>
                                        </div>
                                        <div className="option-child">
                                             <div className="icon-child">
                                                  <i className="fas fa-procedures"></i>
                                             </div>
                                             <div className=" text-child">
                                                  <FormattedMessage id="banner.comprehensiveCheckup" />
                                             </div>
                                        </div>
                                        <div className="option-child">
                                             <div className="icon-child">
                                                  <i className="fas fa-flask"></i>
                                             </div>
                                             <div className=" text-child">
                                                  <FormattedMessage id="banner.medicalTesting" />
                                             </div>
                                        </div>
                                        <div className="option-child">
                                             <div className="icon-child">
                                                  <i className="fas fa-user-md"></i>
                                             </div>
                                             <div className=" text-child">
                                                  <FormattedMessage id="banner.mentalHealth" />
                                             </div>
                                        </div>
                                        <div className="option-child">
                                             <div className="icon-child">
                                                  <i className="fas fa-briefcase-medical"></i>
                                             </div>
                                             <div className=" text-child">
                                                  <FormattedMessage id="banner.dentalCheckup" />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )}
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
          language: state.app.language,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          changeLanguageAppRedux: (language) => {
               dispatch(changeLanguageApp(language));
          },
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
