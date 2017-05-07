import React, {Component, PropTypes} from 'react';

/*
  测试自己写formitem组件
  {
    label: '专家账号',
    key: 'accountId',
    rules: [{
      required: true,
      message: '两个输入框都得输入',
    }],
    jsx: <InputTemp placeholder={'请填写账号名称'}/>
 */
export default class Account extends Component {
  state = {
    value1: '',
    value2: '',
  }
  componentWillMount() {
    const {value} = this.props;
    if (value) {
      this.state.value1 = value[0];
      this.state.value2 = value[1];
    }
  }
  onChange(event, key) {
    const {value1, value2} = this.state;
    const value = event.target.value;
    switch (key) {
    case 1:
      this.setState({
        value1: value
      });
      this.propChange(value, value2);
      break;
    case 2:
      this.setState({
        value2: value
      });
      this.propChange(value1, value);
      break;
    default:
    }
  }
  propChange(value1, value2) {
    if (value1 && value2) {
      const value = value1 + value2;
      this.props.onChange(value);
    } else {
      this.props.onChange();
    }
  }
  render() {
    return (
      <div>
        <input className={'ant-input ant-input-lg'} style={{width: '49%'}} value={this.state.value1} onChange={(event) => {this.onChange(event, 1);}}/>
        <input className={'ant-input ant-input-lg'} style={{marginLeft: '2%', width: '49%'}} value={this.state.value2} onChange={(event) => {this.onChange(event, 2);}} />
      </div>
    );
  }
}