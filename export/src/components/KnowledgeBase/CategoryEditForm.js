import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import MyForm from '../Edit/Form';
const FormItem = Form.Item;
const Option = Select.Option;
import RenderCompetitiveAbility from './SelectAbility';
let results = [];

const CategoryAdd = Form.create()(React.createClass({
  succ() {
    this.props.succ();
  },
  fail(err) {
    this.props.fail(err);
  },
  cancelAdd() {
    this.props.cancelAdd();
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { editFlag, knowledgeCategoryItem } = this.props.categoryReducer;
      if (!err) {
        let receivedValues = {
          name: values.name,
          knowledgeType: knowledgeCategoryItem ? knowledgeCategoryItem.knowledgeType : values.knowledgeType,
          competitiveAbility: values.competitiveAbility[1],
          knowledgePoint: values.knowledgePoint,
        };
        if (knowledgeCategoryItem && editFlag === 2) {
          receivedValues.id = knowledgeCategoryItem._id;
          receivedValues.knowledgeType = knowledgeCategoryItem.knowledgeType;
        }
        if (knowledgeCategoryItem && editFlag === 1) {
          receivedValues.parent = knowledgeCategoryItem._id;
        }
        let obj = {
          params: receivedValues,
          succ: this.succ,
          fail: this.fail,
        };
        this.props.fetchCreateSaveCategory(obj);
      } else {
        message.error('请检查输入项！');
      }
    });
  },

  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;
    const { editFlag, knowledgeCategoryItem } = this.props.categoryReducer;
    const isAdd = editFlag !== 2;
    const status = false;
    const { title, isParentCategory, typeList, competitiveAbilityList, knowledgePointList } = this.props;
    const initialValueObj = {};
    if (editFlag === 2) {
      let child = {};
      let parent = {};
      competitiveAbilityList && competitiveAbilityList.map( item => {
        if (item._id === knowledgeCategoryItem.competitiveAbility) {
          child = item;
        }
      });
      competitiveAbilityList && competitiveAbilityList.map( item => {
        if (item._id === child.parent) {
          parent = item;
        }
      });
      initialValueObj.name = knowledgeCategoryItem.name;
      initialValueObj.competitiveAbility = [parent._id, child._id];
      initialValueObj.knowledgePoint = knowledgeCategoryItem.knowledgePoint;
    }

    const items1 = [
      {
        label: '类型',
        key: 'knowledgeType',
        rules: [{
          required: true,
          message: '请选择类型',
        }],
        jsx: (
          <Select placeholder='请选择类型'>
            {
              typeList && typeList.map((item) =>
              <Option key={item._id} value = {item.name}> {item.name} </Option>)
            }
          </Select>
        )
      },
      {
        label: '一级分类名称',
        key: 'name',
        rules: [{
          required: true,
          message: '请输入分类名称',
        }],
        jsx: <Input placeholder={'请填写一级分类名称...'}/>
      },
      {
        label: '竞技能力',
        key: 'competitiveAbility',
        rules: [{
          required: true,
          message: '请选择竞技能力',
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

    const items2 = [
      {
        label: '分类名称',
        key: 'name',
        rules: [{
          required: true,
          message: '请输入分类名称',
        }],
        jsx: <Input placeholder={'请填写分类名称...'} />
      },
      {
        label: '竞技能力',
        key: 'competitiveAbility',
        rules: [{
          required: true,
          message: '请选择竞技能力',
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

    let items = [];

    if (!isParentCategory) {
      items = items2;
    } else {
      items = items1;
    }
    return (
      <MyForm
        submit={this.handleSubmit}
        cancel={this.cancelAdd}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={isAdd}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        status={status}
        title={title}
      />
    );
  }
}));
export default CategoryAdd;
