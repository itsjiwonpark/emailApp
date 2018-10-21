import React, { Component } from "react";
import axios from "axios";
// import "../style.scss";

class Header extends Component {
  // componentDidMount() {
  //   const url = `https://sheets.googleapis.com/v4/spreadsheets/1boLea3iXMGz4E_8Anh6_00J8OllMRMIFZHhpUr5d8qY/values/'시트1'!A1:A5?majorDimension=COLUMNS`;
  //   axios
  //     .get(url)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  render() {
    return (
      <div>
        <h1>I'm header</h1>
      </div>
    );
  }
}

export default Header;
