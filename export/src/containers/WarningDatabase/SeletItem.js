import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, Button, message} from 'antd';
const Option = Select.Option;

export default class SelectAbility extends Component {
  state = {value1: undefined}
  componentWillMount() {
    const id = this.setValue1(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const {value, results} = this.props;
    const id = this.setValue1(nextProps);
  }
  setValue1(props) {
    const {value: value2, results = []} = props;
    var secondItem = results.find(item=> item._id === value2) || {};
    var firstItem = results.find(item => item._id === secondItem.parent) || {};
    this.state.value1 = firstItem._id;
  }
  value1Change(value1) {
    const {onChange} = this.props;
    this.setState({value1});
    onChange();
    if (value1) {
      message.error('两个都必须选择！', 2);
    }
  }
  value2Change(value2) {
    const {onChange} = this.props;
    onChange(value2);
  }
  render() {
    const {value: value2, results = [], onChange, onRemove, onAdd, index} = this.props;
    const {value1} = this.state;
    const leftArray = results.filter(item => item.level === 1);
    const rightArray = results.filter(item=> item.level === 2 && item.parent === value1);
    const leftOptionsData = leftArray.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>);
    const rigthtOptionsData = rightArray.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>);
    return (
      <div style={{clear: 'both'}}>
        <div style={{width: '90%', display: 'inline-block'}}>
          <Select value={value1} placeholder="选择竞技类型..."
                  onChange={this.value1Change.bind(this)}
                  style={{width: '49%'}}>
            {leftOptionsData}
          </Select>
          <Select
            value={value2}
            placeholder='请选择'
            onChange={this.value2Change.bind(this)}
            style={{width: '49%', marginLeft: '2%'}}
          >
            {rigthtOptionsData}
          </Select>
        </div>
        {index === 0 ?
          <Button type="button" onClick={onAdd} className="warning-btn">+</Button> :
          <Button
            type="minus-circle-o"
            onClick={() => {onRemove(index)}}
            className="warning-btn"
            style={{borderColor: '#ec5858', color: '#ec5858'}}>－
          </Button>
        }
      </div>
    );
  }
}
