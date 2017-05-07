import React, {Component, PropTypes} from 'react';
import {Form, Select, Input} from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP, MOBILE, MOBILE_TIP, EMAIL, EMAIL_TIP} from 'utils/validation';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';
const FormItem = Form.Item;
const Option = Select.Option;
import {MyForm} from 'components';
// 封装的录入数据组件
const PhysicalAdd = Form.create()(React.createClass({
  getInitialState() {
    return {saveState: ''};
  },
  succ() {
    changeState2Succ.call(this);
    this.props.succ();
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      const stateRecord = this.props.location.state;
      if (!err) {
        let receivedValues = {
          age: values.age,
          totalChol: values.totalChol,
          totalCholLevel: values.totalCholLevel,
          triglyceride: values.triglyceride,
          triglycerideLevel: values.triglycerideLevel,
          "HDL-C": values["HDL-C"],
          "HDL-CLevel": values["HDL-CLevel"],
          "LDL-C": values["LDL-C"],
          "LDL-CLevel": values["LDL-CLevel"],
          schoolYear: this.props.schoolYear,
          class: stateRecord.classObj,
          student: stateRecord._id,
          school: stateRecord.schoolId,
        };
        const paramsId = this.props.params.id;
        if (paramsId) {
          changeState2Begin.call(this, '修改中');
          receivedValues.id= paramsId;
          delete receivedValues.schoolYear;
          delete receivedValues.class;
          delete receivedValues.student;
          delete receivedValues.school;
        } else {
          changeState2Begin.call(this, '保存中');
          receivedValues.time = stateRecord.time._d;
        }
        let obj = {
          params: receivedValues,
          succ: this.succ,
          fail: changeState2Fail.bind(this),
        };
        this.props.savePhysical(obj);
      }
    });
  },
  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;
    const locationState = this.props.location.state;
    const params=this.props.params.id;
    const title = params? "编辑体检数据":'血脂体检数据';
    const isAdd = !locationState;
    let initialValueObj = {
      totalCholLevel: "正常",
      triglycerideLevel: "正常",
      "HDL-CLevel": "正常",
      "LDL-CLevel":"正常",
    };
    if (locationState) {
      initialValueObj = {
        age: locationState.age,
        totalChol: locationState.totalChol,
        totalCholLevel: locationState.totalCholLevel,
        triglyceride: locationState.triglyceride,
        triglycerideLevel: locationState.triglycerideLevel,
        "HDL-C": locationState["HDL-C"],
        "HDL-CLevel": locationState["HDL-CLevel"],
        "LDL-C": locationState["LDL-C"],
        "LDL-CLevel": locationState["LDL-CLevel"],
      };
    }
    const items = [
      {
        label: '年龄',
        key: 'age',
        rules: [{
          required: true,
          message: '此项为数字',
        }],
        jsx: <Input placeholder={'录入数据'} type="number"/>
      },
      {
        label: '总胆固醇',
        key: 'totalChol',
        rules: [{
          required: true,
          message: '此项为数字',
        }],
        jsx: <Input placeholder={'录入数据'} type="number"/>
      },
      {
        label: '总胆固醇级别',
        key: 'totalCholLevel',
        rules: [{
          required: true,
          message: '此项为必填项',
        }],
        jsx: <Select>
                <Option value='1'>低</Option>
                <Option value='2'>正常</Option>
                <Option value='3'>高</Option>
             </Select>
      },
      {
        label: '甘油三酯',
        key: 'triglyceride',
        rules: [{
          required: true,
          message: '此项为数字',
        }],
        jsx: <Input placeholder={'录入数据'} type="number"/>
      },
      {
        label: '甘油三酯级别',
        key: 'triglycerideLevel',
        rules: [{
          required: true,
          message: '此项为必填项',
        }],
        jsx: <Select>
                <Option value='1'>低</Option>
                <Option value='2'>正常</Option>
                <Option value='3'>高</Option>
             </Select>
      },
      {
        label: '高密度脂蛋白胆固醇',
        key: 'HDL-C',
        rules: [{
          required: true,
          message: '此项为数字',
        }],
        jsx: <Input placeholder={'录入数据'} type="number"/>
      },
      {
        label: '高密度脂蛋白胆固醇级别',
        key: 'HDL-CLevel',
        rules: [{
          required: true,
          message: '此项为必填项',
        }],
        jsx: <Select>
                <Option value='1'>低</Option>
                <Option value='2'>正常</Option>
                <Option value='3'>高</Option>
             </Select>
      },
      {
        label: '低密度脂蛋白胆固醇',
        key: 'LDL-C',
        rules: [{
          required: true,
          message: '此项为数字',
        }],
        jsx: <Input placeholder={'录入数据'} type="number"/>
      },
      {
        label: '低密度脂蛋白胆固醇级别',
        key: 'LDL-CLevel',
        rules: [{
          required: true,
          message: '此项为必填项',
        }],
        jsx: <Select>
                <Option value='1'>低</Option>
                <Option value='2'>正常</Option>
                <Option value='3'>高</Option>
             </Select>
      },
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
        status={false}
        title={title}
      />
    );
  }
}));
export default PhysicalAdd;
