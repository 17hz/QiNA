import React, { Component } from 'react';
import {Route,Switch,Redirect} from "react-router-dom";
import MainView from './components/MainView';
import About from './components/About';
import DoneView from './components/Done';
import SettingView from './components/SettingView';
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/main" component={MainView} />
        <Route path="/about" component={About} />
        <Route path="/setting" component={SettingView} />
        <Route path="/done" component={DoneView} />
        <Redirect path="/" to="/main" />
      </Switch>
    );
  }
}

export default Routes;