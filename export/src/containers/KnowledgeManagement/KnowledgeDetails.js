import React, {Component, PropTypes} from 'react';
import { saveAuditInfo, getDetail } from 'redux/modules/KnowledgeManagement/KnowledgeDetailsAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import { Row, Col, Modal, Form, Input, Button, message, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {getStatus} from 'utils/tool';
import { KnowledgeDetails } from 'components';

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
      promises.push(dispatch(getDetail(location.state._id)));
      return Promise.all(promises);
    }
  }
])
@connect(
  ({ knowledgeManagementRed, KnowledgeDetailsRed }) => ({ ...knowledgeManagementRed, ...KnowledgeDetailsRed }),
{ saveAuditInfo })
export default class KnowledgeDetail extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  onCancel() {
    this.context.router.goBack();
  }
  succ() {
    const {perPage, page} = this.props;
    const status = this.props.location.state.status;
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
      state: {
        isSearchStatus: true,
      },
    });
  }
  render() {
    return (
      <div>
        <KnowledgeDetails
          {...this.props}
          saveAuditInfo={this.props.saveAuditInfo}
          succ={this.succ.bind(this)}
          onCancel={this.onCancel.bind(this)}/>
      </div>
    );
  }
}