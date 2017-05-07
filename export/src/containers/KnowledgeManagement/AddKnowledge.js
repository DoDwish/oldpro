import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import { message, Modal } from 'antd';
import {
  getKnowledgeType, saveKnowledge, fetchCategory, categorySelector
}
from 'redux/modules/KnowledgeManagement/AddKnowledgeAct';
import {asyncConnect} from 'redux-connect';
import { KnwledgeEdit } from 'components';

@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(getKnowledgeType()));
      promises.push(dispatch(fetchCategory()));
      return Promise.all(promises);
    }
  }
])
@connect(
  ({AddKnowledgeRed}) => ({ ...AddKnowledgeRed }), { saveKnowledge, categorySelector }
)
export default class AddKnwledge extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  succ() {
    message.success('保存成功！');
    if (this.props.location.query.status) {
      this.context.router.push({
        pathname: '/pendingList',
        query: {status: 0},
      });
      return;
    }
    this.context.router.push({
      pathname: '/knowledgeManagement',
    });
  }

  cancelAdd() {
    this.context.router.goBack();
  }

  fail(err) {
    Modal.error({
      title: '保存失败',
      content: err,
    });
  }

  render() {
    return (
      <div style={{padding: 30}}>
        <KnwledgeEdit
          {...this.props}
          succ={this.succ.bind(this)}
          fail={this.fail.bind(this)}
          cancelAdd={this.cancelAdd.bind(this)}/>
      </div>
    );
  }
}
