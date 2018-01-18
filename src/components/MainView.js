import React, { Component } from "react";
import "./MainView.scss";
import SvgGraphics from "./SvgGraphics";
import { Button } from "antd";
const { ipcRenderer } = window.require("electron");
const { dialog } = window.require("electron").remote;
const options = {
  filters: [
    {
      name: "All Files",
      extensions: ["*"]
    }
  ]
};
class MainView extends Component {
  constructor() {
    super();
    this.state = {
      title: "QiNiu",
      Access: null,
      Sercet: null,
      isAnimete: "",
      isUploading: "",
      Path: "",
      HasPath: false,
      buttonName: "选择文件",
      UploadingText: "正在上传",
      fileName: "",
      SetReadly: false,
      isDraging: false
    };
  }

  openFile(file = "") {
    let that = this;
    let way = "";

    console.log("openFile", file);

    if (file.path) {
      way = "onDrag";
    } else {
      way = "select";
    }
    if (that.state.HasPath) {
      way = "upFiles";
    }
    if (file == "inBoxClick") {
      way = "select";
    }

    console.log(way);
    switch (way) {
      case "select":
        dialog.showOpenDialog(options, function(fileNames) {
          if (fileNames == undefined) {
            that.setState({
              buttonName: "选择文件",
              HasPath: false,
              fileName: ""
            });
            return false;
          } else {
            let f = fileNames[0].split("/");
            that.setState({
              buttonName: "上传",
              Path: fileNames[0],
              HasPath: true,
              fileName: f[f.length - 1]
            });
          }
        });
        break;
      case "onDrag":
        that.setState({
          Path: file.path,
          HasPath: true,
          fileName: file.name,
          buttonName: "上传"
        });
        break;
      case "upFiles":
        ipcRenderer.send("upFile", {
          Path: that.state.Path,
          Name: that.state.fileName
        });

        that.setState({
          isUploading: "Uploading"
        });

        ipcRenderer.on("qina", (event, arg) => {
          console.log(arg);
          if (arg.state) {
            console.log(arg.key);
            that.UploadingText = "上傳完成";
            setTimeout(function() {
              that.HasPath = false;
              that.isUploading = false;
              that.props.history.push("/Done");
            }, 1200);
          }
        });
        break;
      default:
    }
  }

  componentDidMount() {
    this.drop();
  }
  drop() {
    let that = this;
    let timeoutID;
    document.addEventListener("dragover", function(event) {
      event.stopPropagation();
      event.preventDefault();
      that.isDraging = true;
      window.clearTimeout(timeoutID);

      timeoutID = setTimeout(function() {
        that.isDraging = false;
      }, 800);
    });
    document.addEventListener("drop", function(event) {
      event.stopPropagation();
      event.preventDefault();

      let files = event.dataTransfer.files;
      console.log(event);
      that.openFile(files[0]);
    });
  }
  render() {
    const { history } = this.props;
    const {
      buttonName,
      isAnimete,
      isUploading,
      HasPath,
      fileName
    } = this.state;
    return (
      <div>
        <div className="Draging" />
        <div id="Uploader">
          <div className={`ContentArea animated ${isAnimete} ${isUploading}`}>
            <div className="inBox ">
              <div className="wait">
                <SvgGraphics />
                <div className="inBox-icon" />
              </div>
            </div>
          </div>
        </div>

        {!HasPath ? (
          <div className="TextArea">
            <p className="t">QiNiu</p>
            <p>请选择需要分享的文件</p>
          </div>
        ) : (
          <div className="TextArea">
            <p className="t">檔案</p>

            <span className="tag is-success">
              {fileName}
              {isUploading?(<button className="delete is-small" />):("")}
            </span>
          </div>
        )}

        <div className="control">
          <p>
            <Button onClick={() => this.openFile()} type="primary">
              {buttonName}
            </Button>
          </p>
          <p>
            <Button onClick={() => history.push("/setting")}>设定配置档</Button>
          </p>
        </div>
      </div>
    );
  }
}

export default MainView;
