import React, {Component, PropTypes} from 'react';
import { Checkbox, Input, Table } from 'antd';
const styles = require('./Constitution.scss');

export default ({ columns = [], data = []}) => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};
