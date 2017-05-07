import React, {Component, PropTypes} from 'react';
import {Form, Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Btn from './Btn';
import StatusSelect from './StatusSelect';
import Title from './Title';
import FormItems from './FormItems';
export default ({
  submit, cancel, items, initialValueObj, isAdd, getFieldDecorator, getFieldValue, tips,
  status = true, title, btnContent, addTips = undefined
}) => {
  const titleArr = addTips ? [`编辑${addTips}`, `新增${addTips}`] : ['编辑账号', '新增账号'];
  title = title ? title : (!isAdd ? titleArr[0] : titleArr[1]);
  btnContent = btnContent ? btnContent : (!isAdd ? '保存' : '确认');
  return (
    <div>
      <Title title={title} />
      <Form onSubmit={submit} style={{
        marginTop: 30
      }}>
        {
          FormItems({
            items,
            isAdd: isAdd,
            getFieldDecorator: getFieldDecorator,
            initialValueObj
          })
        }
        {status && (
          <StatusSelect
            getFieldValue={getFieldValue}
            getFieldDecorator={getFieldDecorator}
            initialValue={initialValueObj.status}
          />
        )}
        {Btn({
          tips,
          btnContent,
          cancelAdd: cancel
        })}
      </Form>
    </div>
  );
};
