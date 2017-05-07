import React, {Component, PropTypes} from 'react';
import {Form, Select, Input} from 'antd';
const Option = Select.Option;

export default class SelectAbility extends Component {
  render() {
    let {value: [value1 = undefined, value2 = undefined] = [], results = [], onChange} = this.props;
    const leftArray = results.filter(item => item.level === 1);
    const rightArray = results.filter(item=> item.parent === value1);
    const leftOptionsData = leftArray.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>);
    const rigthtOptionsData = rightArray.map(item =>
      <Option key={item._id} value={item._id}>{item.name}</Option>
    );
    return (
      <div style={{clear: 'both'}}>
        <div>
          <Select value={value1} placeholder="选择竞技类型..." onChange={(value) => {
            onChange([value]);
          }} style={{width: '49%'}}>
            {leftOptionsData}
          </Select>
          <Select value={value2}
            placeholder='请选择' style={{marginLeft: '10px'}} onChange={(value) => {
              onChange([value1, value]);
            }} style={{width: '49%', marginLeft: '2%'}}>
            {rigthtOptionsData}
          </Select>
        </div>

      </div>
    );
  }
}
