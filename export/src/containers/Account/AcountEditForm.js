import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP, MOBILE, MOBILE_TIP, EMAIL, EMAIL_TIP} from 'utils/validation';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';
const FormItem = Form.Item;
const Option = Select.Option;
import {MyForm} from 'components';
// 封装的添加账号组件
const AccountAdd = Form.create()(React.createClass({
  getInitialState() {
    return {saveState: ''};
  },
  editSucc() {
    changeState2Succ.call(this);
    this.props.succ();
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let receivedValues = {
          accountId: values.accountId,
          name: values.name,
          tel: values.tel,
          email: values.email,
          password: values.password,
          role: values.role,
          status: parseInt(values.status)
        };
        const state = this.props.location.state;
        if (state && state['_id']) {
          changeState2Begin.call(this, '修改中');
          receivedValues.id = state['_id'];
        } else {
          changeState2Begin.call(this, '保存中');
        }
        let obj = {
          params: receivedValues,
          succ: this.editSucc,
          fail: changeState2Fail.bind(this),
        };
        this.props.saveExpertAccount(obj);
      } else {
        message.error('请检查输入项！');
      }
    });
  },
  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;
    const {roleList} = this.props;
    const locationState = this.props.location.state;
    const isAdd = !locationState;
    let initialValueObj = {};
    if (locationState) {
      initialValueObj = {
        accountId: locationState.accountId,
        role: locationState.role._id,
        name: locationState.name,
        tel: locationState.tel,
        email: locationState.email,
        status: String(locationState.status)
      };
    }
    const items = [
      {
        label: '专家账号',
        key: 'accountId',
        rules: [{
          required: true,
          message: ACCOUNT_TIP,
          pattern: ACCOUNT
        }],
        jsx: <Input placeholder={'请填写账号名称'}/>
      }, {
        label: '角色',
        key: 'role',
        rules: [
          {
            required: true,
            message: '角色为必选项，请选择角色！'
          }
        ],
        jsx: (
          <Select placeholder="请选择角色">
            {roleList.map((item) =>< Option key={item._id} value = {
              item._id
            } > {
              item.name
            } </Option>)}
          </Select>
        )
      }, {
        label: '联系人姓名',
        key: 'name',
        rules: [
          {
            required: true,
            message: '此选项为必填项，请填写！'
          }
        ],
        jsx: <Input placeholder="请填写姓名"/>
      }, {
        label: '联系人手机号',
        key: 'tel',
        rules: [
          {
            required: true,
            message: MOBILE_TIP,
            pattern: MOBILE
          }
        ],
        jsx: <Input placeholder="请填写手机号"/>
      }, {
        label: '联系人电子邮件(可选)',
        key: 'email',
        rules: [
          {
            required: true,
            message: EMAIL_TIP,
            pattern: EMAIL
          }
        ],
        jsx: <Input placeholder="请填写电子邮件"/>
      }, {
        add: {
          label: '密码',
          key: 'password',
          rules: [
            {
              required: true,
              message: PASSWORD_TIP,
              pattern: PASSWORD
            }
          ],
          jsx: <Input placeholder={'请填写密码'} type="password"/>
        }
      }
    ];
    return (
      <MyForm
        submit={this.handleSubmit}
        cancel={this.props.cancelAdd}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={isAdd}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        tips={this.state.saveState}
      />
    );
  }
}));
export default AccountAdd;