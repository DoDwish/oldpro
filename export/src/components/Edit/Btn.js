import React, {Component, PropTypes} from 'react';
import {Button, Alert} from 'antd';
export default ({btnContent, cancelAdd, tips}) => {
  const arr = [];
  if (tips) {
    arr.push(
      <Alert key={'0'} message={tips} type="info" showIcon />
    );
  }
  arr.push(
    <div key={'1'} style={{'textAlign': 'center'}}>
      <Button type="default" style={{
        marginRight: 40
      }} onClick={cancelAdd}>
        取消
      </Button>
      <Button type="primary" htmlType='submit'>
        {btnContent}
      </Button>
    </div>
  );
  return arr;
};