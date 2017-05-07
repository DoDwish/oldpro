import React, {Component, PropTypes} from 'react';
import {Form, Select, message} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Btn from './BtnArr';
import FormItems from './FormItemsArr';
import StatusSelect from '../StatusSelect';
/*
  例子：smartsport-school-frontend/src/containers/SchoolAccount/AcountEditForm.js
 */
export default ({
  submit: {onClick: submitFunc, text: submitText} = {},
  cancel, items = [], defaultValue = {}, form = {},
  status = false, ...props
}) => {
  const {getFieldValue, getFieldDecorator} = form;
  return (
    <Form {...props} onSubmit={submitFunc}>
      {
        FormItems({
          items,
          defaultValue,
          getFieldDecorator
        })
      }
      {status && (
        <StatusSelect
          getFieldValue={getFieldValue}
          getFieldDecorator={getFieldDecorator}
          initialValue={defaultValue.status}
        />
      )}
      <Btn
        btnArr={[cancel, {type: 'submit', text: submitText}]}
      />
    </Form>
  );
};
