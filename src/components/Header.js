import React, { Component } from "react";
import { load } from "../helpers/spreadsheet";
import "../style.css";

class Header extends Component {
  state = {
    email: ""
  };

  GoogleAuth;
  isAuthorized;
  currentApiRequest;

  componentDidMount() {
    window.gapi.load("client:auth2", this.initClient);
    // axios.get;
  }

  initClient = () => {
    window.gapi.client
      .init({
        apiKey: "AIzaSyAM27CQMWKb0UatEDt1-kzcJGH0Px9hm8M",
        clientId:
          "49894146732-46flodiqogaqnlivf27cspljv9j1jod3.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/spreadsheets",
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4"
        ]
      })
      .then(() => {
        this.GoogleAuth = gapi.auth2.getAuthInstance();
        if (!this.GoogleAuth.isSignedIn.get()) {
          this.GoogleAuth.signIn();
        }
        return this.GoogleAuth.isSignedIn.get();
        // console.log(this.GoogleAuth, "middleeee");
      })
      .then(res => {
        if (!res) {
        }
        this.nowDoIt();
        load(this.onLoad, "hi");
      });
  };
  sendAuthorizedApiRequest = requestDetails => {
    this.currentApiRequest = requestDetails;
    if (this.isAuthorized) {
      load(this.onLoad, "hi");
      // Make API request
      // gapi.client.request(requestDetails)
      // Reset currentApiRequest variable.
      this.currentApiRequest = {};
    } else {
      this.GoogleAuth.signIn();
    }
  };

  nowDoIt = () => {
    console.log("isSignedIn");
    var user = this.GoogleAuth.currentUser.get();
    console.log(user);
    // if (isSignedIn) {
    //   this.isAuthorized = true;

    //   // if (this.currentApiRequest) {
    //   //   this.sendAuthorizedApiRequest(this.currentApiRequest);
    //   // }
    // } else {
    //   this.isAuthorized = false;
    // }
  };

  onLoad = (data, error) => {
    if (data) {
      console.log(data);
      // const emailLists = data;
      // this.setState(emailLists);
    } else {
      console.log(error);
    }
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
