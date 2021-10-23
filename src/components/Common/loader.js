import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { DEVELOPMENT_TYPE } from "./constant";

export default class Loading extends Component {
  render() {
    return (
      <Loader
        type="Bars"
        color={DEVELOPMENT_TYPE === "mohajon" ? "#2dce89" : "#0fa2c9"}
        height={100}
        width={100}
        // timeout={3000} //3 secs
      />
    );
  }
}
