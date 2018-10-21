import React, { Component } from "react";
import { load } from "../helpers/spreadsheet";
import btnImage from "../img/sent-512.png";
import "../style.css";

class Header extends Component {
  state = {
    email: ""
  };


  GoogleAuth;

  componentDidMount() {
    window.gapi.load("client:auth2", this.initClient);
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
      });
  };

  onLoad = (data, error) => {
    if (data) {
      console.log(data);
      this.setState({ email: "" }, () => {
        window.location.reload();
      });
    } else {
      console.log(error);
    }
  };

  _putEmailAddress = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  _appendToSheet = e => {
    e.preventDefault();
    let { email } = this.state;
    let atI = email.indexOf("@");
    let dotI = email.indexOf(".");
    if (atI !== -1 && atI < dotI) {
      load(this.onLoad, email);
    } else {
      alert("Invalid Email Address Format");
      this.setState({ email: "" });
    }

  };

  render() {
    const { email } = this.state;
    return (
      <div className="first section o-line">
        <div className="first title ib">EMAIL</div>
        <form className="ib" onSubmit={this._appendToSheet}>
          <input
            type="email"
            className="first input-box ib"
            placeholder="example@email.com"
            value={email}
            onChange={this._putEmailAddress}
          />
          <button type="submit" className="first btn ib">
            <img src={btnImage} className="first btn-img" />
          </button>
        </form>
      </div>
    );
  }
}

export default Header;
