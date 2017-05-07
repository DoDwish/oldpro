import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Input, Checkbox, Collapse, Button, Form, Alert, message } from 'antd';
import {asyncConnect} from 'redux-connect';
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

export default class AddRole extends Component {
  constructor(props) {
    super(props);
    // 用于做非空校验提示
    this.state = {
      inputState: '',
      inputTips: '',
      checkboxState: '',
      checkboxTips: '',
    };
  }
  saveBtn(checkList, id, saveSucc, saveExpertRole) {
    const name = this.inputBox.refs.input.value;
    // 非空判断
    if (!name) {
      this.setState({
        inputState: 'error',
        inputTips: '必输项'
      });
    } else {
      this.setState({
        inputState: '',
        inputTips: ''
      });
    }
    if (!checkList || !checkList.length) {
      this.setState({
        checkboxState: 'error',
        checkboxTips: '必须勾选权限'
      });
    } else {
      this.setState({
        checkboxState: '',
        checkboxTips: ''
      });
    }
    // 发起保存请求
    if (name && checkList && checkList.length) {
      saveExpertRole({
        params: {
          name,
          id,
        },
        succ: saveSucc
      });
    }
  }
  onInputChange(event) {
    const { value: name } = event.target;
    // 校验必输
    if (!name) {
      this.setState({
        inputState: 'error',
        inputTips: '必输项'
      });
    } else {
      this.setState({
        inputState: '',
        inputTips: ''
      });
    }
  }
  onCheckChange(selectValues) {
    // 校验必须勾选
    if (!selectValues || !selectValues.length) {
      this.setState({
        checkboxState: 'error',
        checkboxTips: '必须勾选权限'
      });
    } else {
      this.setState({
        checkboxState: '',
        checkboxTips: ''
      });
    }
    this.props.changeCheck(selectValues);
  }
  onChangeCheckAll(event, checkAllValue, checkList) {
    const checked = event.target.checked;
    let arrAll;
    if (checked) {
      // 全选情况
      arrAll = checkList.concat(checkAllValue);
      arrAll = Array.from(new Set(arrAll));
    } else {
      // 取消全选情况
      arrAll = checkList.filter(item => !checkAllValue.includes(item));
    }
    this.onCheckChange(arrAll);
  }
  checkContain(options, checkList) {
    // console.log(allValue, defaultValue); // allvalue全部在defaultvalue里面，则表示全选，一部分在里面表现半选中，没有则表示没有选中
    // console.log(allValue, defaultValue); // allvalue全部在defaultvalue里面，则表示全选，一部分在里面表现半选中，没有则表示没有选中
    const checked = options.every(item=>{
      return checkList.includes(item._id);
    });
    const indeterminate = options.some(item=>{
      return checkList.includes(item._id);
    });
    return {checked, indeterminate};
  }
  // 每一个勾选组
  getRoleBlock(item, index, checkList) {
    // 标题
    const title = item.name;
    let options = item.permissions;
    options = options.map(option => {
      // 先清楚之前存在的再添加，用于作为勾选项的value和label
      delete option.value;
      delete option.label;
      option.value = option._id;
      option.label = option.name;
      return option;
    });
    // 当前折叠块的所有条目
    // 检查全选勾选框的情况
    const checkAllState = this.checkContain(options, checkList);
    const checkAllValue = options.map(option => option._id);
    return (
      <Panel header={title} key={String(index)}>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            checked={checkAllState['checked']}
            indeterminate={checkAllState['indeterminate']}
            onChange={(event)=>{
              this.onChangeCheckAll.call(this, event, checkAllValue, checkList);
            }}
            >
              全选
            </Checkbox>
          </div>
          <br />
          <CheckboxGroup options={options} value={checkList} onChange={(selectValues) => {
            this.onCheckChange(selectValues);
          }} />
      </Panel>
    );
  }
  render() {
    const styles = require('./RoleEdit.scss');
    const {permissionList, name, isEdit, saveState, cancelBtn, checkList, id, saveSucc, saveRole} = this.props;
    // changeCheck
    // 默认角色名
    const title = isEdit ? '编辑角色' : '新增角色';
    const btnContent = isEdit ? '保存' : '确认';
    return (
        <div className={styles.counterContainer}>
          <div>
            <span style={{fontSize: 18, borderWidth: 2}}>{title}</span>
          </div>
          <div style={{marginTop: 30}}>
            <span style={{ float: 'left', color: 'black', fontSize: 16 }}>角色:</span>
          </div>
          <FormItem
            wrapperCol={{ span: 24 }}
            hasFeedback
            validateStatus={this.state.inputState}
            help={this.state.inputTips}
          >
            <Input defaultValue={name} ref={ref=>this.inputBox = ref} type="text" placeholder="请输入角色名称..."
              maxLength="16"
              onChange={this.onInputChange.bind(this)}
            />
          </FormItem>
          <div style={{marginTop: 20}}>
            <span style={{color: 'black', fontSize: 16}}>权限:</span><br />
          <Collapse bordered={false} defaultActiveKey={['0']}>
            {
              permissionList.map((item, index) => this.getRoleBlock(item, index, checkList))
            }
          </Collapse>
          <Alert message={this.state.checkboxTips} type={this.state.checkboxState} showIcon />
          </div>
          {
            // 保存操作的提示
            saveState && (
              <Alert message={saveState} type="info" showIcon />
            )
          }
          <div className={styles.buttonArea}>
            <Button type="default" style={{
              marginRight: 40
            }}
              onClick={cancelBtn}
            >
              取消
            </Button>
            <Button type="primary"
              onClick={this.saveBtn.bind(this, checkList, id, saveSucc, saveRole)}
            >
              {btnContent}
            </Button>
          </div>
        </div>
    );
  }
}