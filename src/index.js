import React from "react";
import ReactDOM from "react-dom";
import { Router} from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
ReactDOM.render(
  <Router history={customHistory} >
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
