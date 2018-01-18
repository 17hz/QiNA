import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch,Redirect} from "react-router-dom";
import MainView from './components/MainView';
import About from './components/About';
import SettingView from './components/SettingView';
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/main" component={MainView} />
        <Route path="/about" component={About} />
        <Route path="/setting" component={SettingView} />
        <Redirect path="/" to="/main" />
      </Switch>
    );
  }
}

export default Routes;