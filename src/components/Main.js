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

  componentDidMount() {
    console.log(this.props.match.path.page);
    if (this.props.match.path === "/") {
      window.location.pathname = "/1";
    }
    window.gapi.load("client", this.initClient);
    // axios.get;
  }

  initClient = () => {
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // clientId: config.clientId,
        // scope: config.scope,
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        load(this.onLoad, "hi");
      });
  };

  onLoad = (data, error) => {
    if (data) {
      const emailLists = data;
      this.setState(emailLists);
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
