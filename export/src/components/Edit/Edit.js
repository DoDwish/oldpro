import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation';
const FormItem = Form.Item;
const Option = Select.Option;
import MyForm from './Form';
// 封装的添加账号组件 // 这是一个DEMO文件
// submit, cancel, items, initialValueObj, isAdd, getFieldDecorator, getFieldValue, tips,
// status = true（默认是有状态下拉框，传false则不显示）, title(没传用默认), btnContent（没传用默认）
const AccountAdd = Form.create()(React.createClass({
  succ() {
    this.props.succ();
  },
  cancelAdd() {
    this.props.cancelAdd();
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let receivedValues = {
          accountId: values.accountId,
          name: values.name,
          password: values.password,
          role: values.role,
          status: parseInt(values.status)
        };
        const state = this.props.location.state;
        if (state && state['_id']) {
          receivedValues.id = state['_id'];
        }
        let obj = {
          params: receivedValues,
          succ: this.succ
        };
        this.props.fetchCreateSaveAccount(obj);
      } else {
        message.error('请检查输入项！');
      }
    });
  },
  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;
    const {roleList, saveAccountState, editAccountState} = this.props;
    const locationState = this.props.location.state;
    const isAdd = !locationState;
    const tips = isAdd ? saveAccountState : editAccountState;
    const initialValueObj = {};
    if (locationState) {
      initialValueObj.accountId = locationState.accountId;
      initialValueObj.name = locationState.name;
      initialValueObj.role = locationState.role._id;
      initialValueObj.status = String(locationState.status);
    }
    const items = [
      {
        label: '管理员账号',
        key: 'accountId',
        rules: [{
          required: true,
          message: ACCOUNT_TIP,
          pattern: ACCOUNT
        }],
        jsx: <Input placeholder={'请填写账号名称...'} disabled={isAdd ? false : true}/>
      },
      {
        add: {
          label: '登录密码',
          key: 'password',
          rules: [
            {
              required: true,
              message: PASSWORD_TIP,
              pattern: PASSWORD
            }
          ],
          jsx: <Input placeholder={'请填写登录密码...'} type="password"/>
        }
      },
      {
        label: '姓名',
        key: 'name',
        rules: [
          {
            required: true,
            message: '此选项为必填项，请填写！'
          }
        ],
        jsx: <Input placeholder="请填写姓名..."/>
      },
      {
        label: '角色',
        key: 'role',
        rules: [
          {
            required: true,
            message: '角色为必选项，请选择角色！'
          }
        ],
        jsx: (
          <Select placeholder="请选择角色...">
            {roleList.map((item) =>< Option key={item._id} value = {
              item._id
            } > {
              item.name
            } </Option>)}
          </Select>
        )
      }
    ];
    return (
      <MyForm
        submit={this.handleSubmit}
        cancel={this.cancelAdd}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={isAdd}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        tips={tips}
      />
    );
  }
}));
export default AccountAdd;