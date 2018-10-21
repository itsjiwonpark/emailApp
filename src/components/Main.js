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
        console.log(res.data);
        const emailLists = res.data.values[0];
        const next = emailLists.length === 5 && emailLists ? cur + 1 : cur;
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
          <section className="second section">
            <div className="second logo o-line ib">EMAIL LIST</div>
            <div className="second btn_container ib">
              <Link to={"/" + prev} onClick={this._changePage}>
                <div name="prev" className="second btn o-line ib ">
                  {"<"}
                </div>
              </Link>
              <Link to={"/" + next} onClick={this._changePage}>
                <div name="next" className="second btn o-line ib">
                  {">"}
                </div>
              </Link>
            </div>
          </section>
          <section className="third section o-line">
            <ul className="third ib email-lists o-line">
              {emailLists.map((e, i) => {
                return (
                  <li className="third address" key={i}>
                    {e}
                  </li>
                );
              })}
            </ul>
            <div className="third ib blocks-container o-line">
              <div className="block container border">
                <div className="col border h-center">
                  <div className="v-center">
                    <span className="item">item</span>
                    <span className="item h100">item</span>
                    <span className="item">item</span>
                  </div>
                </div>
                <div className="col">
                  <div className="row h33 border h-center">
                    <div className="v-center">
                      <span className="item">item</span>
                    </div>
                  </div>
                  <div className="row h66 border">
                    <div className="v-bottom item">item</div>
                  </div>
                </div>
                <div className="col">
                  <div className="row h33 ">
                    <div className="row h33 border" />
                    <div className="row h66">
                      <div className="col w33 border" />
                      <div className="col w66 border" />
                    </div>
                  </div>
                  <div className="row h66 border">
                    <div className="v-top item">item</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Main;
