import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import config from "../../config.js";
import "../style.css";

import { Link } from "react-router-dom";

class Main extends Component {
  state = {
    emailLists: [],
    prev: null,
    cur: this.props.match.params.page,
    next: null
  };

  componentDidMount() {
    if (this.props.match.path === "/") {
      window.location.pathname = "/1";
    }
    const cur = this.props.match.params.page * 1;
    const prev = cur === 1 ? cur : cur - 1;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${
      config.spreadsheetId
    }/values/시트1!A${cur * 5 - 4}:A${cur * 5}?key=${
      config.apiKey
    }&majorDimension=COLUMNS`;
    axios
      .get(url)
      .then(res => {
        const emailLists = res.data.values[0];
        const next = emailLists.length === 5 ? cur + 1 : cur;
        this.setState({
          emailLists,
          cur,
          prev,
          next
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _changePage = e => {
    const name = e.target.getAttribute("name");
    console.log(this.state[name], this.state.cur);
    if (this.state[name] !== this.state.cur) {
      window.location.reload();
    }
  };

  render() {
    const { emailLists, prev, cur, next } = this.state;
    console.log(prev, cur, next);
    return (
      <div className="main">
        <Header />
        <div>
          <section className="second" />
          <div className="second-logo">Email List</div>
          <div className="second-btn_container">
            <Link to={"/" + prev} onClick={this._changePage}>
              <div name="prev" className="btn_left">
                👈🏿
              </div>
            </Link>
            <Link to={"/" + next} onClick={this._changePage}>
              <div name="next" className="btn_right">
                👉🏿
              </div>
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
