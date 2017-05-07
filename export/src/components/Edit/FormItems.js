import React, {Component, PropTypes} from 'react';
import {Form, Select} from 'antd';
const FormItem = Form.Item;
export default ({items, isAdd = false, getFieldDecorator, initialValueObj = {}}) => {
  const arr = [];
  items.map((item, index) => {
    if (item.add) {
      item = item.add;
      if (isAdd) {
        arr.push(getFormItem({item, index, getFieldDecorator, initialValueObj}));
      }
    } else {
      arr.push(getFormItem({item, index, getFieldDecorator, initialValueObj}));
    }
  });
  return arr;
};

function getFormItem({item, index, getFieldDecorator, initialValueObj}) {
  if (!item.key && item.jsx) {
    return (
      <FormItem key={index} label={item.label}>
        {item.jsx}
      </FormItem>
    );
  } else if (item.key) {
    return (
      <FormItem key={index} label={item.label}>
        {getFieldDecorator(item.key, {
          rules: item.rules,
          initialValue: initialValueObj[item.key]
        })(item.jsx)}
      </FormItem>
    );
  } else {
    return null;
  }
}