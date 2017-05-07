import React, {Component, PropTypes} from 'react';
import * as KnowledgeManagementAct from 'redux/modules/KnowledgeManagement/KnowledgeManagementAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import {Input, Button} from 'antd';
import {Table} from 'components';
import {getStatus, formatDate} from 'utils/tool';

@connect( ({knowledgeManagementRed}) => knowledgeManagementRed, KnowledgeManagementAct )
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }, location
    }) => {
      const promises = [];
      const {page, perPage, searchStatus} = getState().knowledgeManagementRed;
      function fetchKnowledgeList(obj = {}, bool = false) {
        promises.push(dispatch(KnowledgeManagementAct.fetchKnowledgeList(obj)));
        promises.push(dispatch(KnowledgeManagementAct.forIsStatusEqual0(bool)));
      }
      if (location.state && location.state.isSearchStatus) {
        fetchKnowledgeList({page: page, perPage: perPage, status: searchStatus}, false);
      } else if (location.search === '?status=0') {
        fetchKnowledgeList({status: '0'}, true);
      } else {
        fetchKnowledgeList();
        promises.push(dispatch(KnowledgeManagementAct.forIsSearchStatus(false)));
      }
      promises.push(dispatch(KnowledgeManagementAct.choosePath(location.search)));
      return Promise.all(promises);
    }
  }
])
export default class KnowledgeManagement extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onDetails(record) {
    const {perPage, page, status} = this.props;
    this.context.router.push({
      pathname: this.props.path.pathname.Details,
      query: this.props.path.query.Details,
      state: {
        ...record,
      }
    });
  }
  onAddKnowledge() {
    this.context.router.push({
      pathname: this.props.path.pathname.Add,
    });
  }
  onEdit(text) {
    this.context.router.push({
      pathname: this.props.path.pathname.Edit,
      query: this.props.path.query.Edit,
      state: {
        ...text,
      }
    });
  }
  renderTitle(selectOption) {
    if (!selectOption) {
      return <div key='1' className="details">待审核列表</div>;
    }
  }
  render() {
    const {data, total, page, perPage, searchStatus} = this.props;
    let selectOption = {
      'option': {
        '0': '待审核',
        '1': '审核通过',
        '-1': '审核不通过',
        '-2': '驳回',
      },
      'onChange': this.props.onSearchKnowledgeByStatus,
      'searchStatus': searchStatus,
      'label': '状态',
    };
    if (this.props.location.query.status === '0') {
      selectOption = null;
    }
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
        title: '上传时间',
        render: (text, record, index) =><span>{formatDate(new Date(text.createAt), "yyyy-mm-dd hh:mi:ss")}</span>,
        key: 'createAt',
      }, {
        title: '审核人',
        dataIndex: 'auditName',
        key: 'auditName',
      }, {
        title: '状态',
        render: (text, record, index) =><span>{getStatus(text.status)}</span>,
      }, {
        title: '操作',
        render: (text, record, index) =>
        {
          return (<div>
            <Button type="primary" onClick={this.onEdit.bind(this, text)} style={{marginRight: '5px'}}>编辑</Button>
            <Button type="primary" onClick={this.onDetails.bind(this, text)} style={{marginRight: '5px'}}>详情</Button>
          </div>
          );
        },
        key: '_id',
      },
    ];
    return (
      <div>
        {this.props.children ? this.props.children : ([
          selectOption ? '' : <div key='0' className="details">待审核列表</div>,
          <Table
            {...this.props}
            key='2'
            title='知识管理'
            columns={columns}
            page={page}
            perPage={perPage}
            total={total}
            data={data}
            onAdd={selectOption ? this.onAddKnowledge.bind(this) : null}
            selectOption={selectOption}
            fetchList={this.props.fetchKnowledgeList}
          />
        ])}
      </div>
    );
  }
}
