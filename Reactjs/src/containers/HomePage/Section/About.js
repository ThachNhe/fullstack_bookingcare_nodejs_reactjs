import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';

// Import css files

class About extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <>
                    <div className="section-share section-about">
                         <div className="section-about-header">Truyền thông nói gì về Thạch Nhé</div>
                         <div className="section-about-content">
                              <div className="content-left">
                                   <iframe
                                        width="100%"
                                        height="99%"
                                        src="https://www.youtube.com/embed/LfyKg7XjlJA?list=RDLfyKg7XjlJA"
                                        title="Hạnh Phúc Mới (Cover) - Sơn Tùng M-TP x TUYENVU「Lo - Fi Version by 1 9 6 7」/ Audio Lyrics"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen
                                   ></iframe>
                              </div>
                              <div className="content-right"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
