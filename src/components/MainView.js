import React, { Component } from "react";
import "./MainView.scss";
import { Link } from "react-router-dom";
class MainView extends Component {
  render() {
    return (
      <div>
        <div id="Uploader"/>
        <div className="control">
        <p>
          <Link to="/setting" className="button wide is-info is-outlined" >设定配置档</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default MainView;
