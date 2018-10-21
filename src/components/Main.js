import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import config from "../../config.js";
import { load } from "../helpers/spreadsheet";
import { Link } from "react-router-dom";

class Main extends Component {
  state = {
    // currentPage: this.props.match.params.page,
    emailLists: []
  };

  GoogleAuth;
  isAuthorized;
  currentApiRequest;
  // componentDidMount() {
  //   const url = `https://sheets.googleapis.com/v4/spreadsheets/1boLea3iXMGz4E_8Anh6_00J8OllMRMIFZHhpUr5d8qY/values/시트1!A1:A5?key=AIzaSyCzr9-9G-HzdTZWIjirNuROIY9OcNSQ0zA&majorDimension=COLUMNS`;
  //   axios
  //     .get(url)
  //     .then(res => {
  //       this.setState({ emailLists: res.data.values[0] });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  componentDidMount() {
    console.log(this.props.match.path.page);
    if (this.props.match.path === "/") {
      window.location.pathname = "/1";
    }
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
        // Listen for sign-in state changes.
        this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
        console.log(this.GoogleAuth, "middleeee");
        load(this.onLoad, "hi");
      });
  };
  sendAuthorizedApiRequest = requestDetails => {
    this.currentApiRequest = requestDetails;
    if (this.isAuthorized) {
      console.log("im the new one");
      load(this.onLoad, "hi");
      // Make API request
      // gapi.client.request(requestDetails)
      // Reset currentApiRequest variable.
      this.currentApiRequest = {};
    } else {
      this.GoogleAuth.signIn();
      console.log("am I used or what");
    }
  };

  updateSigninStatus = isSignedIn => {
    if (isSignedIn) {
      this.isAuthorized = true;
      if (this.currentApiRequest) {
        this.sendAuthorizedApiRequest(this.currentApiRequest);
      }
    } else {
      this.isAuthorized = false;
    }
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

  render() {
    const { emailLists } = this.state;
    return (
      <div className="main">
        <Header />
        <div>
          <section className="second" />
          <div className="second-logo">Email List</div>
          <div className="second-btn_container">
            <Link to="/">
              <div className="btn_left" />
            </Link>
            <Link to="/">
              <div className="btn_right" />
            </Link>
          </div>
          <section className="third">
            <ul className="email_lists">
              {emailLists.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default Main;
