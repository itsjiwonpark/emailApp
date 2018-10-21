import React, { Component, Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={Main} />
          <Route exact path="/:page" component={Main} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
