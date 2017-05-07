import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as roleAct from 'redux/modules/account/roleAct';
import {message } from 'antd';
import {asyncConnect} from 'redux-connect';
import {RoleEdit} from 'components';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';

// 绑定redux，包括方法和数据
@connect(({roleRed}) => roleRed, roleAct)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      },
      location
    }) => {
      const promises = [];
      // 进入页面请求角色信息
      const state = location.state || {};
      const selectRoleId = state._id;
      promises.push(dispatch(roleAct.fetchDependency()));
      promises.push(dispatch(roleAct.fetchExpertRolePermission(selectRoleId)));
      return Promise.all(promises);
    }
  }
])
export default class AddRole extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  state = {
    saveState: ''
  }
  cancelBtn() {
    this.context.router.goBack();
  }
  saveSucc() {
    // 保存成功回掉，提示成功和页面跳转
    message.success('保存成功！');
    changeState2Succ.call(this);
    this.context.router.goBack();
  }
  saveExpertRole(obj) {
    changeState2Begin.call(this, '保存中');
    obj.fail = changeState2Fail.bind(this);
    this.props.saveExpertRole(obj);
  }

  render() {
    const {permissionList, checkList} = this.props;
    // 默认角色名
    let name = '';
    const state = this.props.location.state;
    state && (name = state.name);
    let id = '';
    this.props.location.state && (id = this.props.location.state['_id']);
    const isEdit = !!id;
    return (
      <RoleEdit
        permissionList={permissionList}
        name={name}
        id={id}
        isEdit={isEdit}
        saveState={this.state.saveState}
        checkList={checkList}
        saveRole={this.saveExpertRole.bind(this)}
        changeCheck={this.props.changeExpertRoleCheck}
        saveSucc={this.saveSucc.bind(this)}
        cancelBtn={this.cancelBtn.bind(this)}
      />
    );
  }
}