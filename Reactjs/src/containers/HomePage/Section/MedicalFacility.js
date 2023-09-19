import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class ProductManage extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <>
                    <div className="section-share section-medical-facility">
                         <div className="section-container">
                              <div className="section-header">
                                   <span className="title-section">Cơ sở y tế nổi bật</span>
                                   <button className="btn-section">Xem thêm</button>
                              </div>
                              <div className="section-body">
                                   <Slider {...this.props.settings}>
                                        <div className="section-customize">
                                             <div className="bg-image section-medical-facility" alt="" />
                                             <span>Hệ thống y tế Việt Đức 1</span>
                                        </div>
                                        <div className="section-customize">
                                             <div className="bg-image section-medical-facility" />
                                             <span>Hệ thống y tế Việt Đức 2</span>
                                        </div>
                                        <div className="section-customize">
                                             <div className="bg-image section-medical-facility" />
                                             <span>Hệ thống y tế Việt Đức 3</span>
                                        </div>
                                        <div className="section-customize">
                                             <div className="bg-image section-medical-facility" />
                                             <span>Hệ thống y tế Việt Đức 4</span>
                                        </div>

                                        <div className="section-customize">
                                             <div className="bg-image section-medical-facility" />
                                             <span>Hệ thống y tế Việt Đức 5</span>
                                        </div>
                                        <div className="section-customize">
                                             <div className="bg-image section-medical-facility" />
                                             <span>Hệ thống y tế Việt Đức 6</span>
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
