
import React, {Component, PropTypes} from 'react';
import {Form, Select, Input} from 'antd';
const FormItem = Form.Item;
/*
  items=[[label, jsx, key, rules, obj]]
 */
export default ({items = [], getFieldDecorator, defaultValue = {}}) => {
  const arr = [];
  items.map((item, index) => {
    //  为空值，0，不为Array，为空Array，返回空
    if (!item || item.constructor.name !== 'Array' || item.length === 0) {
      return null;
    }
    arr.push(getFormItem({item, index, getFieldDecorator, defaultValue}));
  });
  return arr;
};

function getFormItem({item, index, getFieldDecorator, defaultValue}) {
  const defaultJsx = <Input placeholder={`请填写${item[0] || ''}`}/>;
  const [label,, key, rules, obj] = item;
  const jsx = item[1] || defaultJsx;
  if (!key) {
    return (
      <FormItem key={index} label={label} {...obj}>
        {jsx}
      </FormItem>
    );
  } else {
    let rulesValue;
    if (typeof rules === 'function') {
      rulesValue = [{
        validator: rules
      }];
    } else {
      rulesValue = [rules];
    }

    return (
      <FormItem key={index} label={label} {...obj}>
        {getFieldDecorator(key, {
          rules: rulesValue,
          initialValue: defaultValue[key]
        })(jsx)}
      </FormItem>
    );
  }
}
