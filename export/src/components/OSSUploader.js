import React, {Component, PropTypes} from 'react';
import {Button, Icon, Upload, message, Progress} from 'antd';
import uuidV4 from 'uuid/v4';

/*
  参考： components/choolaccount/schoolaccount.js
  value： 默认的文件url
  policyUrl： 获取policy的url
  onChange： 上传文件改变时候调用，传回目前文件的url
  例如
    jsx：
      <FormItem
        {... this.state.licenseValidate === 'error' ? {licenseValidate: 'error', help: '请上传收费许可证'} : {} }
        label={'收费许可证'}
      >
        <OSSUploader
          value={chargingLicense}
          policyUrl={SCHOOL_LICENCE_POLICY}
          onChange={this.onUpload.bind(this)}
        />
      </FormItem>
    onchange和保存验证：
      onUpload(url) {
        this.chargingLicense = url;
        const licenseValidate = url ? '' : 'error';
        this.setState({
          licenseValidate
        });
      }
    数据保存：
      state = {
        licenseValidate: '',
      }
      chargingLicense = ''
    提交时候获得url和进行检验
      const { licenseValidate } = this.state;
      if (regionValidate === 'error') {
      let chargingLicense = this.chargingLicense;
      if (licenseValidate === 'error') {
        return;
      }
 */
export default class Avatar extends Component {
  static PropTypes = {
    accept: PropTypes.string,
    value: PropTypes.string,
    policyUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    showImg: PropTypes.bool,
    progress: PropTypes.bool,
    jsx: PropTypes.element,
  }
  static defaultProps = {
    accept: 'image/gif,image/jpeg,image/jpg,image/png',
    policyUrl: '',
    onChange: ()=>{},
    showImg: true,
    progress: false,
    jsx: <div><Icon type="upload" /> Click to upload</div>
  }
  state = {
    host: '',
    fileList: [],
    percent: 0
  }
  policy = {
    key: '',
    policy: '',
    signature: '',
    success_action_status: 200,
    OSSAccessKeyId: '',
  }
  componentWillMount() {
    const {value} = this.props;
    if (!value) {
      return;
    }
    const defaultFileList = [{
      uid: uuidV4(),
      name: value.substr(value.lastIndexOf('/') + 1),
      url: value,
    }];
    this.state.fileList = defaultFileList;
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  fetchPolicy(url) {
    let xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // code for IE5 and IE6
      xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp !== null) {
      xmlhttp.onreadystatechange = ()=>{
        // 4 = "loaded"
        if (xmlhttp.readyState === 4) {
          // 200 = OK
          if (xmlhttp.status === 200) {
            const response = xmlhttp.response;
            const data = JSON.parse(response).data;
            this.policy.key = data.dir;
            this.policy.policy = data.policy;
            this.policy.signature = data.signature;
            this.policy.success_action_status = 200;
            this.policy.OSSAccessKeyId = data.accessid;
            this.setState({
              host: data.host
            });
          } else {
            message.error('获取验证失败');
          }
        }
      };
      const token = localStorage.getItem('SMARTSPORT/EXPERT-USER/TOKEN');
      xmlhttp.open("GET", url, false);
      xmlhttp.setRequestHeader("authorization", token);
      xmlhttp.send(null);
    }
  }
  beforeUpload(file) {
    this.policy.key += `${uuidV4()}/${file.name}`;
    file.url = `${this.state.host}/${this.policy.key}`;
  }
  onChange({file, fileList, event}) {
    if (file.status === 'error') {
      message.error('上传失败，请重新上传！');
      return;
    }
    const {onChange, accept} = this.props;
    fileList = fileList.slice(-1);
    this.setState({ fileList, percent: event && event.percent });
    let nowFile = fileList[0] || {};
    if (nowFile.originFileObj) {
      nowFile = nowFile.originFileObj;
    }
    if (fileList.length === 0) {
      onChange();
    }
    if (!event || event.percent !== 100) {
      return;
    }
    this.timer = setTimeout(onChange(nowFile.url, accept), 1000);
  }
  render() {
    const {policyUrl, onChange, showImg, jsx, accept, progress} = this.props;
    const {fileList} = this.state;

    return (
      <Upload
        accept={accept}
        fileList={fileList}
        data={this.policy}
        action={this.state.host}
        listType="picture"
        showUploadList={showImg}
        onChange={this.onChange.bind(this)}
        beforeUpload={this.beforeUpload.bind(this)}
      >
        {progress && (this.state.percent ? <Progress percent={Math.ceil(this.state.percent)} /> : '')}
        <Button style={{'zIndex': 1000}} onClick={()=>{ this.fetchPolicy(policyUrl);}}>
          {jsx}
        </Button>
      </Upload>
    );
  }
}

