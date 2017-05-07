import React, {Component, PropTypes} from 'react';
import ReactHtmlParser from 'react-html-parser';
import Helmet from 'react-helmet';
import { Row, Col, Modal, Form, Input, Button, message, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {getStatus} from 'utils/tool';

class KnowledgeDetails extends Component {
  saveAuditInfo(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const id = this.props.location.state._id;
        this.props.saveAuditInfo({
          params: {
            status: values.status, // -1：审核不通过；1：审核通过
            comments: {
              content: values.content,
            }
          },
          id,
          succ: this.props.succ,
        });
      } else {
        message.error('请检查输入项！');
      }
    });
  }

  tagsRender() {
    const {tags} = this.props.location.state;
    return tags.map(item => item.name);
  }
  statusRender() {
    const statusOption = {
      '1': '审核通过',
      '-1': '审核不通过',
    };
    if (statusOption) {
      const optionArr = [];
      for (let key in statusOption) {
        if ({}.hasOwnProperty.call(statusOption, key)) {
          optionArr.push(<Option key={key} value = {key} > {statusOption[key]} </Option>);
        }
      }
      return optionArr;
    }
  }
  render() {
    const { detailData } = this.props;
    const {
      title, type, coverIcon, author, content, status, createBy, comments, createAt, auditName, auditAt, category, tags
    } = this.props.location.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="details">查看详情</div>
        <div className="school-account-details">
          <Row>
            <Col span={6}>标题：</Col>
            <Col span={18}>{title}</Col>
          </Row>
          <Row>
            <Col span={6}>类型：</Col>
            <Col span={18}>{type && type.name}</Col>
          </Row>
          <Row>
            <Col span={6}>分类：</Col>
            <Col span={18}>{category && category.name}</Col>
          </Row>
          <Row>
            <Col span={6}>封面：</Col>
            <Col span={18} style={{width: '50%'}}><img src={coverIcon} style={{width: 'inherit'}}/></Col>
          </Row>
          <Row>
            <Col span={6}>作者：</Col>
            <Col span={18}>{author}</Col>
          </Row>
          <Row>
            <Col span={6}>内容：</Col>
            <Col span={18} style={{lineHeight: '30px'}}>{ReactHtmlParser(content)}</Col>
          </Row>
          <Row>
            <Col span={6}>标签：</Col>
            <Col span={18}>{this.tagsRender.call(this)}</Col>
          </Row>
          <Row>
            <Col span={6}>创建时间：</Col>
            <Col span={18}>{createAt}</Col>
          </Row>
          <Row>
            <Col span={6}>创建人：</Col>
            <Col span={18}>{detailData.createName}</Col>
          </Row>
          <Row>
            <Col span={6}>当前状态：</Col>
            <Col span={18}>{getStatus(status)}</Col>
          </Row>
          <Row>
            <Col span={6}>审核时间：</Col>
            <Col span={18}>{auditAt}</Col>
          </Row>
          <Row>
            <Col span={6}>审核人：</Col>
            <Col span={18}>{auditName}</Col>
          </Row>
          <Row>
            <Col span={6}>历史备注：</Col>
            <Col span={18} style={{marginTop: 10}}>
              {
                detailData.comments && detailData.comments.map((item, index) => <div key={index}>
                  <div style={{paddingRight: 20}} className='clearfix lh30'>
                    <span className='fl'>{item.commentName}</span>
                    <span className='fr'>{item.commentAt}</span>
                  </div>
                  <div style={{marginRight: 20, backgroundColor: '#999'}} className='lh30'>{item.content}</div>
                </div>
                )
              }
            </Col>
          </Row>
          <Row style={ detailData.audit ? {display: 'none'} : {}}>
            <Col span={10}></Col>
            <Col span={14} style={{marginTop: 10}}>
              <Button type="default" style={{marginRight: 40}} onClick={this.props.onCancel.bind(this)}>返回</Button>
            </Col>
          </Row>
          <Form onSubmit={this.saveAuditInfo.bind(this)}
                style={ detailData.audit ? {border: 'none', padding: 0} : {display: 'none'}}>
            <Row>
              <Col span={6}><span className='ant-form-item-required'>状态：</span></Col>
              <Col span={18} style={{marginTop: 15}}>
                <FormItem>
                  {getFieldDecorator('status', {
                    rules: [
                      {
                        required: true,
                        message: '此选项为必选项，请选择'
                      }
                    ]})(
                    <Select>{this.statusRender.call(this)}</Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>备注：</Col>
              <Col span={18}>
                <FormItem>
                  {getFieldDecorator('content')(
                    <Input type="textarea" rows={4} placeholder="备注文字信息" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem wrapperCol={{ span: 12 }}>
                <Button type="default" style={{marginRight: 40}} onClick={this.props.onCancel.bind(this)}>取消</Button>
                <Button type="primary" htmlType="submit">保存</Button>
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>

    );
  }
}
export default Form.create()(KnowledgeDetails);