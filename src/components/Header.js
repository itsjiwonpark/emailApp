import React, { Component } from "react";
import axios from "axios";
// import "../style.scss";

class Header extends Component {
  state = {
    email: ""
  };
  componentDidMount() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/1boLea3iXMGz4E_8Anh6_00J8OllMRMIFZHhpUr5d8qY/values/시트1!A1:A5?key=AIzaSyCzr9-9G-HzdTZWIjirNuROIY9OcNSQ0zA&majorDimension=COLUMNS`;
    axios
      .get(url)
      .then(res => {
        // console.log(res.data.values[0], "짱짱짱 엄청나");
      })
      .catch(err => {
        console.log(err);
      });
  }

  _putEmailAddress = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  _appendToSheet = () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/1boLea3iXMGz4E_8Anh6_00J8OllMRMIFZHhpUr5d8qY/values/시트1!A1:append?key=AIzaSyCzr9-9G-HzdTZWIjirNuROIY9OcNSQ0zA&valueInputOption=USER_ENTERED`;
    const email = this.state.email;
    axios
      .post(url, {
        range: "시트1!A1",
        majorDimension: "ROWS",
        values: [[email]],
        apiKey: "AIzaSyCzr9-9G-HzdTZWIjirNuROIY9OcNSQ0zA"
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>I'm header</h1>
        <input type="email" onChange={this._putEmailAddress} />
        <input type="button" onClick={this._appendToSheet} />
      </div>
    );
  }
}

export default Header;
