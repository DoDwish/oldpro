import React, {Component, PropTypes} from 'react';
import {
  fetchKnowledgeList, fetchKnowledgeTotal
} from 'redux/modules/KnowledgeManagement/KnowledgeManagementAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import {Input, Button} from 'antd';
import {Table} from 'components';

@connect(
  state => (
    {
      data: state.knowledgeManagementRed.data,
      page: state.knowledgeManagementRed.page,
      perPage: state.knowledgeManagementRed.perPage,
      total: state.knowledgeManagementRed.total,
    }
  ), {fetchKnowledgeList, fetchKnowledgeTotal}
)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(fetchKnowledgeList()));
      promises.push(dispatch(fetchKnowledgeTotal()));
      return Promise.all(promises);
    }
  }
])
export default class KnowledgeManagement extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onDetails(record) {
    this.context.router.push({
      pathname: '/knowledgeManagement/details',
      state: {
        ...record,
      }
    });
  }

  onAbleEditor(text) {
    return (<div>
      <Button type="primary" onClick={this.onEditor.bind(this, text)} style={{marginRight: '5px'}}>编辑</Button>
      <Button type="primary" onClick={this.onResetPwd.bind(this, text)}>重置密码</Button>
    </div>);
  }

  render() {
    const {data, total, page, perPage} = this.props;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: '分类',
        render: (text, record, index) =><span>{text.category ? text.category.name : ""}</span>,
        key: 'category',
      }, {
        title: '类型',
        render: (text, record, index) =><span>{text.type ? text.type.name : ""}</span>,
        key: 'type',
      }, {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
      }, {
        title: '状态',
        render: (text, record, index) =><span>{text.status ? '启用' : '停用'}</span>,
      }, {
        title: '操作',
        render: (text, record, index) =>
        {
          return (
            <Button type="primary" onClick={this.onDetails.bind(this, text)} style={{marginRight: '5px'}}>详情</Button>
          );
        },
        key: '_id',
      },
    ];
    return (
      <div>
        {this.props.children ? this.props.children : (
          <Table
            title='账号管理'
            columns={columns}
            page={page}
            perPage={perPage}
            total={total}
            data={data}
            fetchList={this.props.fetchKnowledgeList}
          />
        )}
      </div>
    );
  }
}
