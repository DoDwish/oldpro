import React, {Component, PropTypes} from 'react';
import { Button } from 'antd';
const styles = require('./Constitution.scss');

export default ({ cancel }) => {
  return (
    <div key={'1'} style={{'textAlign': 'center', marginTop: '40px'}}>
      <Button type="default" style={{
        marginRight: 40
      }} onClick={cancel}>
        取消
      </Button>
      <Button type="primary" htmlType='submit'>
        确定
      </Button>
    </div>
  );
};
