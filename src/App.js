import React, { Component } from "react";
import { Route } from "react-router-dom";
import Users from "./components/Users";
import Layout from "./layout/Layout";
import User from "./components/User";
import Articles from "./components/Articles";
import Article from "./components/Article";

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path={"/users"} component={Users} />
        <Route exact path={"/articles"} component={Articles} />
        <Route exact path={"/users/:userid"} component={User} />
        <Route exact path={"/articles/:articleid"} component={Article} />
      </Layout>
    );
  }
}

export default App;
