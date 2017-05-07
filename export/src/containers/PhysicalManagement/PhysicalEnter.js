import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as PhysicalManagementAct from 'redux/modules/PhysicalManagement/PhysicalManagementAct';
import {message} from 'antd';
import PhysicalEditForm from './PhysicalEditForm';

@connect( ({ PhysicalManagementRed }) => PhysicalManagementRed, PhysicalManagementAct)

export default class PhysicalEnter extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  succ() {
    message.success('保存成功！');
    console.log(this.props);
    const obj = {
      filters: {
        class: this.props.classId,
      }
    };
    const addObj = {
      filters: {
        classId: this.props.classId,
      }
    };
    this.context.router.goBack();
    if (this.props.params.id) {
      this.props.fetchPhysicalSearch(obj);
    } else {
      this.props.fetchStudentList(addObj);
    }
  }
  cancelAdd() {
    this.context.router.goBack();
  }
  render() {
    return (
      <div>
        <PhysicalEditForm
          {...this.props}
          succ={this.succ.bind(this)}
          cancelAdd={this.cancelAdd.bind(this)}/>
      </div>
    );
  }
}
