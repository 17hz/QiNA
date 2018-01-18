import React, { Component } from "react";
import {Button }from "antd";
import "./Done.scss";
const { ipcRenderer } = window.require("electron");
class DoneView extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      domain: "",
      link: ""
    };
  }

  componentDidMount() {
    ipcRenderer.send("getLink");
    ipcRenderer.on("Files", (event, arg) => {
        this.setState({
      domain : arg.domain,
      name : arg.name,
      link : arg.domain + "/" + arg.name,
        })
    });
  }
  open() {
    ipcRenderer.send("openLink", this.www);
  }
  render() {
      const {history} = this.props
      const {name,domain ,link} = this.state
    return (
      <div>
        <div className="posB">
          <div className="Done content">
            <div className="FileBox">
              <svg
                width="20px"
                height="24px"
                viewBox="62 44 20 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M82,51 L82,65 C82,66.65675 80.65675,68 79,68 L65,68 C63.34325,68 62,66.65675 62,65 L62,47 C62,45.34325 63.34325,44 65,44 L75,44 L82,51 Z M75,51 L79.17175,51 L75,46.82825 L75,51 Z M80,65 L80,53 L73,53 L73,46 L65,46 C64.63975,46 64.40225,46.1835 64.29275,46.29275 C64.1835,46.40225 64,46.63975 64,47 L64,65 C64,65.36025 64.1835,65.59775 64.29275,65.707 C64.40225,65.8165 64.63975,66 65,66 L79,66 C79.36025,66 79.59775,65.8165 79.707,65.707 C79.81625,65.5975 80,65.36025 80,65 Z"
                  id="Shape"
                  stroke="none"
                  fill="#1D78E9"
                  fillRule="evenodd"
                />
              </svg>
              <span className="leftText">{name}</span>
              <div className="is-pulled-right">
                {/* <span>完成</span> */}
              </div>
              <div className="is-clearfix" />
            </div>

            <hr />
            <label className="label">分享鏈接</label>
            <p className="control" style={{width:'380px',bottom:"inherit"}}>
              <input
              style={{width:"100%",height:"50px"}}
                type="text"
                value={link}
              />
            </p>
            <span>复制</span>
          </div>
        </div>
        <div className="Control">
          <Button onClick={()=>history.push("/main")} className="button is-info is-outlined">返回</Button>
        </div>
      </div>
    );
  }
}

export default DoneView;
