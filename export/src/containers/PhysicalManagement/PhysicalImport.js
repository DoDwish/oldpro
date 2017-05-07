import React, {Component, PropTypes} from 'react';
import {Table, Input, Button, Form, message, Modal, Alert, Icon, Upload} from 'antd';
import {PHYSICAL_IMPORT, PHYSICAL_TEMPLET} from 'constants/urls';

const FormItem = Form.Item;

export default class UploadStudent extends Component {
  state = {
    fileList: [],
    result: {},
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  onCancelReset() {
    this.context.router.goBack();
  }
  handleChange = (info) => {
    let result = this.state.result;
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);
    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        if (file.response.status.msg === 'request success') {
          message.success(`${info.file.name} 上传成功`);
          Object.assign(result, file.response.data);
        } else {
          message.success(`${info.file.name} 上传文件错误`);
          result = {};
          return false;
        }
        return file.response.status.msg === 'request success';
      }
      return true;
    });
    this.setState({ fileList, result });
  }
  render() {
    const token = localStorage.getItem('SMARTSPORT/EXPERT-USER/TOKEN');
    const claId = this.props.params.id;
    const result = this.state.result;
    const prop = {
      name: 'files',
      action: PHYSICAL_IMPORT,
      showUploadList: true,
      accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      headers: {
        authorization: token,
      },
      // event:上传时触发的事件
      onChange: this.handleChange,
      onRemove: false,
    };
    return (
      <div>
        <div>
          <span style={{
            fontSize: 18,
            borderWidth: 2,
            fontWeight: 'bold'
          }}>血脂体检数据导入</span>
        </div>
        <Form style={{marginTop: 20}}>
          <div style={{
            margin: "40px 0 10px",
            fontSize: 13,
          }}><span>提示：</span>第一步，下载血脂体检数据基本信息模板，用下载的模板填写信息；
            <a href={PHYSICAL_TEMPLET}
              style={{
                color: 'rgb(32, 220, 106)',
                textDecoration: 'underline',
                marginLeft: 15,
              }}>下载模板</a></div>
          <div style={{
            margin: "10px 0 20px 39px",
            fontSize: 13,
          }}>第二步，点击浏览找到填写完毕的信息模板，点击导入按钮上传完毕即可;</div>
          <div>
            <label style={{
              fontSize: 18,
              marginRight: 10
            }}>血脂体检数据：</label>
            <input className="ant-input" style={{width: '18%', marginBottom: 40}} type="text"/>
            <Upload {...prop} fileList={this.state.fileList}>
              <button style={{marginLeft: 10}} className="ant-btn ant-btn-primary">导入</button>
            </Upload>
            {
              result.total && (
                <span>总数: {result.total + ' ' }
                      成功总数：{result.successConut + ' ' }
                      失败：{result.failConut + ' ' }
                      未匹配：{result.notHasStudent + ' ' }
                </span>
              )
            }
          </div>
          <FormItem wrapperCol={{ span: 22, offset: 2 }} style={{marginBottom: 200}}>
            <Button type="default" style={{marginRight: 40}} onClick={this.onCancelReset.bind(this)}>返回</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
