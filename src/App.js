import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import './App.scss';
import Routes from './Routes';
class App extends Component {
  render() {
    return (
      <div id="app">
        <Routes/>
      </div>
    );
  }
}

export default App;
