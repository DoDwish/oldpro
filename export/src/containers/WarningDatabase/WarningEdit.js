import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import { message } from 'antd';
import WarningEditComp from './WarningEditComp';
import {fetchCompetitiveAbilityList, upsertWarning, fetchPhysiqueSubjectList}
  from '../../redux/modules/WarningDatabase/WarningDatabaseAct';

// 绑定redux，包括方法和数据
@connect(
  ({ WarningDatabaseRed }) => WarningDatabaseRed,
  { fetchCompetitiveAbilityList, fetchPhysiqueSubjectList, upsertWarning}
)

export default class WarningEdit extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  succ() {
    message.success('保存成功！');
    this.context.router.goBack();
  }

  cancelAdd() {
    this.context.router.goBack();
  }

  render() {
    return (
      <div>
        <WarningEditComp
          {...this.props}
          succ={this.succ.bind(this)}
          cancelAdd={this.cancelAdd.bind(this)}/>
      </div>
    );
  }
}
