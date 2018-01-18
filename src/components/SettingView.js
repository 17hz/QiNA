import React, { Component } from "react";
import { Button, Form, Input, Spin,message} from "antd";
import "./SettingView.scss";
const { ipcRenderer } = window.require("electron");

const FormItem = Form.Item;
class SettingView extends Component {
  constructor() {
    super();
    this.state = {
      Access: null,
      Secret: null,
      Bucket: null,
      Domain: null,
      loading: false,
      www: "https://portal.qiniu.com/user/key"
    };
  }
  open() {
    console.log(ipcRenderer);
    ipcRenderer.send("openLink", this.state.www);
  }
  submit() {
    ipcRenderer.send("SaveKeys", {
      Access: this.state.Access,
      Secret: this.state.Secret,
      Bucket: this.state.Bucket,
      Domain: this.state.Domain
    });
    this.success()
    
  }

  loadData() {
    ipcRenderer.on("LoadKeys", (evnet, arg) => {
      this.setState({
        Access: arg.Access,
        Secret: arg.Secret,
        Bucket: arg.Bucket,
        Domain: arg.Domain
      });
    });
  }

  getData() {
    ipcRenderer.send("getKeys");
    this.loadData();
  }

  onChange(key, e) {
    this.state[key] = e.target.value;
    this.forceUpdate();
  }

  componentDidMount() {
    this.getData();
  }

  success(){
    message.success('保存成功');
  }
  render() {
    const { history } = this.props;
    const { loading, www, Access, Secret, Bucket, Domain } = this.state;
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
                <Input
                  value={Access}
                  onChange={this.onChange.bind(this, "Access")}
                />
              </FormItem>
              <FormItem label="Secret Key">
                <Input
                  value={Secret}
                  onChange={this.onChange.bind(this, "Secret")}
                />
              </FormItem>
              <FormItem label="存储空间">
                <Input
                  value={Bucket}
                  onChange={this.onChange.bind(this, "Bucket")}
                />
              </FormItem>
              <FormItem label="融合CDN加速域名">
                <Input
                  value={Domain}
                  onChange={this.onChange.bind(this, "Domain")}
                />
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
              onClick={() => this.submit()}
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
