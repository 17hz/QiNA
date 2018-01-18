import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Spin } from "antd";
import "./SettingView.scss";
const { ipcRenderer } = window.require("electron");

const FormItem = Form.Item;
class SettingView extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      www: "https://portal.qiniu.com/user/key"
    };
  }
  open() {
    console.log(ipcRenderer);
    ipcRenderer.send("openLink", this.state.www);
  }

  render() {
    const { history } = this.props;
    const { loading, www } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <div className="setting">
          <div className="settingTitle">
            <p>设定</p>
            <p className="desc">应用的七牛秘钥</p>
          </div>
          <div className="settingForm">
            <Form>
              <FormItem label="Access Key">
                <Input />
              </FormItem>
              <FormItem label="Secret Key">
                <Input />
              </FormItem>
              <FormItem label="存储空间">
                <Input />
              </FormItem>
              <FormItem label="融合CDN加速域名">
                <Input />
              </FormItem>
            </Form>
          </div>
          <div className="More">
            <p>应用程序必须要一个七牛秘钥才能正常工作。</p>
            <p>
              查看七牛秘钥：
              <span onClick={() => this.open()} className="HighLight">
                {www}
              </span>
            </p>
          </div>
          <div className="settingFooter">
            <Button
              type="primary"
              size="large"
              className="p-btn"
              onClick={() => this.setState({ loading: true })}
            >
              保存设定
            </Button>
            <Button size="large" className="d-btn" style={{ left: "60px" }}>
              关于
            </Button>
            <Button
              size="large"
              className="d-btn"
              onClick={() => history.push("/main")}
            >
              返回
            </Button>
          </div>
        </div>
      </Spin>
    );
  }
}

export default SettingView;
