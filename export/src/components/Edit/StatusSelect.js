import React, {Component, PropTypes} from 'react';
import {Form, Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
export default ({getFieldValue, getFieldDecorator, initialValue}) => {
  return (
    <FormItem colon={false} label={Number(getFieldValue('status')) === 0 ? (
      <span>状态:
        <span className="stopUse" style={{
          color: 'red'
        }}>{Number(getFieldValue('status')) === 0 && '（停用状态下，部分功能将无法正常使用）'}</span>
      </span>
    ) : '状态:'}>
      {getFieldDecorator('status', {
        rules: [
          {
            required: true,
            message: '状态为必选项，请选择状态！'
          }
        ],
        initialValue
      })(
        <Select notFoundContent='没数据' placeholder="请选择">
          <Option value='1'>启用</Option>
          <Option value='0'>停用</Option>
        </Select>
      )}
    </FormItem>
  );
};