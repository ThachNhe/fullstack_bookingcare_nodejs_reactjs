import React, { Component } from "react";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import { connect } from "react-redux";
class Homepage extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="text-center">
        <HomeHeader></HomeHeader>
        <Specialty></Specialty>
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
