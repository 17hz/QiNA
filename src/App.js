import React, { Component } from 'react';
import './App.scss';
import 'animate.css/animate.min.css'
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
