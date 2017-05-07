import React, {Component, PropTypes} from 'react';
import {Form, Select, Input} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import MyForm from '../Edit/Form';
import RenderCompetitiveAbility from './SelectAbility';
let results = [];


const SportsCategoryForm = Form.create()(React.createClass({
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
          name: values.name,
          competitiveAbility: values.competitiveAbility[1],
          knowledgePoint: values.knowledgePoint,
        };
        const { editFlag, sportsCategoryItem } = this.props.sportsCategoryReducer;
        const initialValueObj = {};
        if (editFlag === 2) {
          receivedValues.id = sportsCategoryItem._id;
        } else if (editFlag === 1) {
          receivedValues.parent = sportsCategoryItem._id;
        }
        let obj = {
          params: receivedValues,
          succ: this.succ
        };
        this.props.fetchCreateSaveCategory(obj);
      }
    });
  },

  checkAbility(rule, value = [], callback) {
    if (value.length === 2) {
      callback();
    } else if (value.length) {
      callback('两个都必须选择');
    } else {
      callback('请选择竞技能力');
    }
  },
  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;
    const status = false;
    const { title, typeList, competitiveAbilityList, knowledgePointList } = this.props;
    const initialValueObj = {};
    const { editFlag, sportsCategoryItem } = this.props.sportsCategoryReducer;

    if (editFlag === 2) {
      let child = {};
      let parent = {};
      competitiveAbilityList && competitiveAbilityList.map( item => {
        if (item._id === sportsCategoryItem.competitiveAbility) {
          child = item;
        }
      });
      competitiveAbilityList && competitiveAbilityList.map( item => {
        if (item._id === child.parent) {
          parent = item;
        }
      });
      initialValueObj.name = sportsCategoryItem.name;
      initialValueObj.competitiveAbility = [parent._id, child._id];
      initialValueObj.knowledgePoint = sportsCategoryItem.knowledgePoint;
    }
    const items = [
      {
        label: '运动分类名称',
        key: 'name',
        rules: [{
          required: true,
          message: '运动分类名称',
        }],
        jsx: (
          <Input placeholder={'请填写运动分类名称...'}/>
        )
      },
      {
        label: '竞技能力',
        key: 'competitiveAbility',
        rules: [{
          required: true
        }, {
          validator: this.checkAbility
        }],
        jsx: (
          <RenderCompetitiveAbility results={competitiveAbilityList}/>
        )
      },
      {
        label: '知识点',
        key: 'knowledgePoint',
        rules: [{
          required: true,
          message: '请选择知识点',
        }],
        jsx: (
          <Select placeholder='请选择'>
            {
              knowledgePointList && knowledgePointList.map((item) =>
              <Option key={item._id} value = {item.name}> {item.name} </Option>)
            }
          </Select>
        )
      },
    ];

    return (
      <MyForm
        submit={this.handleSubmit}
        cancel={this.cancelAdd}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={true}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        status={status}
        title={title}
      />
    );
  }
}));
export default SportsCategoryForm;
