import React, { Component, Fragment } from "react";
import { Route, BrowserRouter, withRouter } from "react-router-dom";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Main} />
        <Route exact path="/:page" component={Main} />
      </Fragment>
    );
  }
}

export default withRouter(App);
