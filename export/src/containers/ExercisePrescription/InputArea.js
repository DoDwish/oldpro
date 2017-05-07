import React, {Component, PropTypes} from 'react';
import {Button} from 'antd';
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
  onChange(days, content) {
    const dataTemp = {days, content};
    const data = {};
    Object.keys(dataTemp).forEach(key => {
      const value = dataTemp[key]
      if(value || value === 0) {
        data[key] = value;
      }
    })
    this.props.onChange(data);
  }

  onChangePerWeek(content, event) {
    this.onChange(event.target.value, content);
  }
  onChangeContent(days, event) {
    this.onChange(days, event.target.value);
  }
  render() {
    const {
      value: {days = '', content = ''} = {}
    } = this.props;
    // console.log(this.props);
    // console.log(days);
    // console.log(content);
    return (
      <div>        
        <label>天数：</label>
        <input onChange={this.onChangePerWeek.bind(this, content)} 
          className={'ant-input ant-input-lg'} 
          style={{ width: '10%'}} 
          value={days}
        />
        <label style={{marginLeft: '5%'}}>内容：</label>
        <input 
          className={'ant-input ant-input-lg'} 
          style={{width: '10%'}}
          onChange={this.onChangeContent.bind(this, days)}
          value={content}
        />
        <label> &nbsp;米</label>
      </div>
    );
  }
}
/*<label>周数：</label>
        <input 
          className={'ant-input ant-input-lg'} 
          style={{width: '10%'}}
          onChange={this.onChangeWeek.bind(this, days, content)}
          value={weeks}
        />*/