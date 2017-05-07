import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Pagination, Form, Table, Modal, message} from 'antd';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import config from 'constants/config';
import * as warningDatabaseAct from 'redux/modules/WarningDatabase/WarningDatabaseAct';

@connect(
  ({ WarningDatabaseRed }) => WarningDatabaseRed, warningDatabaseAct
)

@asyncConnect([
  {
    promise: ({ store: { dispatch }}) =>{
      const promises = [];
      promises.push(dispatch(warningDatabaseAct.fetchWarningList()));
      promises.push(dispatch(warningDatabaseAct.fetchCompetitiveAbilityList()));
      promises.push(dispatch(warningDatabaseAct.fetchPhysiqueSubjectList()));
      return Promise.all(promises);
    }
  }
])

export default class Warning extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  gotoAdd() {
    this.context.router.push('/WarningDatabase/add');
  }

  gotoEdit(record) {
    const warningId = record._id;
    let obj = {
      _id: warningId,
      availableCompetitiveId: record.availableCompetitiveId,
      level: record.level,
      physique: record.physique,
      tabooCompetitiveId: record.tabooCompetitiveId
    };
    this.context.router.push({pathname: '/WarningDatabase/edit/' + warningId, state: obj});
  }

  delSucc() {
    message.success('删除成功！');
    this.context.router.push({
      pathname: '/WarningDatabase',
    });
  }

  gotoDelete(record) {
    const id = record._id;
    let props = this.props;
    let success = this.delSucc.bind(this);
    Modal.confirm({
      title: '删除预警',
      content: '您是否要删除该预警？',
      okText: '确定',
      style: {top: '40%'},
      onOk() {
        let obj = {
          body: {id: id},
          succ: success
        };
        props.deleteWarning(obj);
        props.fetchWarningList();
      },
      cancelText: '取消',
    });
  }

  fetchList(obj) {
    const {perPage} = this.props;
    let data = {};
    if (obj) {
      data = obj;
    } else {
      data = {perPage: perPage};
    }
    this.props.fetchWarningList(data);
  }
  renderParent() {
    const { perPage, page, competitiveAbilityList, physiqueSubjectList, total, data } = this.props;
    // 拼装数据
    let date = this.props.data || [];
    const warningData = []; // 存储需要显示的data数据
    data.map(function(item, index) {
      let warningDataItem = {_id: '', physique: '', level: '', availableCompetitive: [], tabooCompetitive: [], availableCompetitiveId: [], tabooCompetitiveId: []};
      warningDataItem._id = item._id;
      warningDataItem.physique = item.physiqueSubject.name;
      warningDataItem.level = item.physiqueSubject.level;
      item.availableCompetitiveAbilities.map(function(item1) {
        competitiveAbilityList.find(function(item2) {
          if (item1._id === item2._id) {
            competitiveAbilityList.find(function(item3) {
              if (item2.parent === item3._id) {
                let availableCompetitiveName = item3.name + '/' + item2.name;
                warningDataItem.availableCompetitive.push(availableCompetitiveName);
                warningDataItem.availableCompetitive.push(<br key={item2._id} />);
                warningDataItem.availableCompetitiveId.push(item2._id);
              }
            });
          }
        });
      });
      item.tabooCompetitiveAbilities.map(function(item1) {
        competitiveAbilityList.find(function(item2) {
          if (item1._id === item2._id) {
            competitiveAbilityList.find(function(item3) {
              if (item2.parent === item3._id) {
                let tabooCompetitiveName = item3.name + '/' + item2.name;
                warningDataItem.tabooCompetitive.push(tabooCompetitiveName);
                warningDataItem.tabooCompetitive.push(<br key={item3._id} />);
                warningDataItem.tabooCompetitiveId.push(item2._id);
              }
            });
          }
        });
      });
      warningData.push(warningDataItem);
    });

    const columns = [
      {
        title: '预警项目',
        dataIndex: 'physique',
        key: 'physique',
      }, {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
      }, {
        title: '适用竞技能力',
        dataIndex: 'availableCompetitive',
        key: 'availableCompetitive',
      }, {
        title: '禁忌',
        width: 130,
        dataIndex: 'tabooCompetitive',
        key: 'tabooCompetitive',
      }, {
        title: '操作',
        render: (text, record, index) =>
        {
          return (<div>
              <Button type="primary" onClick={this.gotoEdit.bind(this, text)} style={{marginRight: '10px'}}>编辑</Button>
              <Button type="primary" onClick={this.gotoDelete.bind(this, text)}>删除</Button>
            </div>
          );
        },
        key: '_id',
      },
    ];

    const pagination = {
      current: page,
      total: total,
      // 是否可以快速跳转至某页
      showQuickJumper: true,
      // 是否可以改变 pageSize
      showSizeChanger: true,
      // 页码改变的回调
      onChange: (current, pageSize) => {
        this.fetchList({perPage: perPage, page: current});
      },
      // pageSize 变化的回调
      onShowSizeChange: (current, size) => {
        this.fetchList({perPage: size, page: current});
      }
    };
    return (
      <div>
        <Helmet title='预警库管理'/>
        <div className="search-box clearfix">
          <div style={{fontSize: 20, display: 'inline-block', fontWeight: 'bold'}}>
            <span>预警库管理</span>
          </div>
          <Button type="primary" className="fr btn-margin-top"
                  onClick={this.gotoAdd.bind(this)}
                  style={{marginRight: 15}}
          >新增预警</Button>
        </div>
        <Table columns={columns} dataSource={warningData} pagination={pagination} rowKey={(item)=>item['_id']}/>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.children ? this.props.children : this.renderParent.call(this)}
      </div>
    );
  }
}
