import React, {Component, PropTypes} from 'react';
import { CONSTITUTION_TEMPLATE, CONSTITUTION_IMPORT } from 'constants/urls';
import {Table, Input, Button, Form, message, Modal, Alert, Icon, Upload} from 'antd';
const FormItem = Form.Item;

export default class ConstitutionBatchImport extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  succ() {
  }

  fail(err) {
  }

  goBack() {
    this.context.router.goBack();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = {
          type: 1,
          succ: this.succ,
          fail: this.fail
        };
        this.props.bacthImport(obj);
      }
    });
  }

  render() {
    const token = localStorage.getItem('SMARTSPORT/EXPERT-USER/TOKEN');
    const prop = {
      name: 'files',
      showUploadList: false,
      accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      headers: {
        authorization: token,
      },
      onChange: (info) => {
        const {event: {percent = 0} = {}} = info;
        if (percent === 100) {
          message.success(`${info.file.name} 上传成功`);
          // this.context.router.goBack();
        }
      },
    };

    const prop1 = {
      ...prop,
      action: `${CONSTITUTION_IMPORT}?type=1`,
    };
    const prop2 = {
      ...prop,
      action: `${CONSTITUTION_IMPORT}?type=2`,
    };
    const prop3 = {
      ...prop,
      action: `${CONSTITUTION_IMPORT}?type=3`,
    };
    const prop4 = {
      ...prop,
      action: `${CONSTITUTION_IMPORT}?type=4`,
    };
    const prop5 = {
      ...prop,
      action: `${CONSTITUTION_IMPORT}?type=5`,
    };

    return (
      <div>
        <div>
          <span style={{
            fontSize: 18,
            borderWidth: 2,
            fontWeight: 'bold'
          }}>学生体测信息导入</span>
        </div>
        <Form style={{marginTop: '20px'}}>
          <div style={{
            margin: "40px 0 10px",
            fontSize: 13,
          }}><span>提示：</span>第一步，下载体测基本信息模板，用下载的模板填写学生体测信息；
          </div>
          <div style={{
            margin: "10px 0 20px 39px",
            fontSize: 13,
          }}>第二步，点击浏览找到填写完毕的信息模板，点击导入按钮上传完毕即可;</div>
          <div>
            <div>
              <label style={{
                fontSize: '14px',
                width: '80px',
                marginRight: '10px'
              }}>骨密度：</label>
              <input className="ant-input" style={{width: '18%', marginBottom: '10px'}} type="text"/>
              <Upload {...prop1} >
                <button style={{marginLeft: '10px'}} className="ant-btn ant-btn-primary">导入</button>
              </Upload>
              <a href={`${CONSTITUTION_TEMPLATE}?type=1`}
              style={{
                color: 'rgb(32, 220, 106)',
                textDecoration: 'underline',
                marginLeft: '15px',
              }}>下载骨密度报告模板</a>
            </div>
            <div>
              <label style={{
                fontSize: '14px',
                width: '80px',
                marginRight: '10px'
              }}>心肺功能：</label>
              <input className="ant-input" style={{width: '18%', marginBottom: '10px'}} type="text"/>
              <Upload {...prop2}>
                <button style={{marginLeft: '10px'}} className="ant-btn ant-btn-primary">导入</button>
              </Upload>
              <a href={`${CONSTITUTION_TEMPLATE}?type=2`}
              style={{
                color: 'rgb(32, 220, 106)',
                textDecoration: 'underline',
                marginLeft: '15px',
              }}>下载心肺功能报告模板</a>
            </div>
            <div>
              <label style={{
                fontSize: '14px',
                width: '80px',
                marginRight: '10px'
              }}>脊柱机能：</label>
              <input className="ant-input" style={{width: '18%', marginBottom: '10px'}} type="text"/>
              <Upload {...prop3}>
                <button style={{marginLeft: '10px'}} className="ant-btn ant-btn-primary">导入</button>
              </Upload>
              <a href={`${CONSTITUTION_TEMPLATE}?type=3`}
              style={{
                color: 'rgb(32, 220, 106)',
                textDecoration: 'underline',
                marginLeft: '15px',
              }}>下载脊柱机能报告模板</a>
            </div>
            <div>
              <label style={{
                fontSize: '14px',
                width: '80px',
                marginRight: '10px'
              }}>体成份：</label>
              <input className="ant-input" style={{width: '18%', marginBottom: '10px'}} type="text"/>
              <Upload {...prop4} style={{display: 'inline-block'}}>
                <button style={{marginLeft: '10px'}} className="ant-btn ant-btn-primary">导入</button>
              </Upload>
              <a href={`${CONSTITUTION_TEMPLATE}?type=4`}
              style={{
                color: 'rgb(32, 220, 106)',
                textDecoration: 'underline',
                marginLeft: '15px',
              }}>下载体成份报告模板</a>
            </div>
            <div>
              <label style={{
                fontSize: '14px',
                width: '80px',
                marginRight: '10px'
              }}>血管机能：</label>
              <input className="ant-input" style={{width: '18%', marginBottom: '10px'}} type="text"/>
              <Upload {...prop5}>
                <button style={{marginLeft: '10px'}} className="ant-btn ant-btn-primary">导入</button>
              </Upload>
              <a href={`${CONSTITUTION_TEMPLATE}?type=5`}
              style={{
                color: 'rgb(32, 220, 106)',
                textDecoration: 'underline',
                marginLeft: '15px',
              }}>下载血管机能报告模板</a>
            </div>
          </div>
          <FormItem wrapperCol={{ span: 22, offset: 2 }} style={{marginBottom: '200px'}}>
            <Button type="default" style={{marginRight: '40px'}} onClick={this.goBack.bind(this)}>返回</Button>
          </FormItem>
          <FormItem>
          </FormItem>
        </Form>
      </div>
    );
  }
}
