import React, {Component, PropTypes} from 'react';
import * as accountAct from 'redux/modules/account/accountAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {Input, Button} from 'antd';
import {Table} from 'components';

@connect(({accountRed}) => accountRed, accountAct)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(accountAct.fetchExpertAccount()));
      return Promise.all(promises);
    }
  }
])
export default class Account extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  gotoEdit(record) {
    this.context.router.push({
      pathname: '/account/edit',
      state: {
        ...record,
      }
    });
  }

  gotoAdd() {
    this.context.router.push({
      pathname: '/account/add',
    });
  }
  render() {
    // title, searchList=[{key,value,onchange}] onAdd
    // columns, page, total, perPage, data, fetchList,
    const {name, tel, dataSource, perPage, count, page} = this.props;
    const columns = [
      {
        title: '专家团队',
        dataIndex: 'expertTeam.name',
        key: 'expertTeam.name',
      }, {
        title: '专家账号',
        dataIndex: 'accountId',
        key: 'accountId',
      }, {
        title: '角色',
        dataIndex: 'role.name',
        key: 'role.name',
      }, {
        title: '联系人姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '联系人手机号',
        dataIndex: 'tel',
        key: 'tel',
      }, {
        title: '状态',
        render: (text, record, index) =><span>{text.status ? '启用' : '停用'}</span>,
        key: 'status'
      }, {
        title: '操作',
        render: (text, record, index) => (
            <Button type="primary" onClick={this.gotoEdit.bind(this, text)} style={{marginRight: '5px'}}>编辑</Button>
        ),
        key: '_id',
      },
    ];
    return (
      <div>
        {this.props.children || (
          <Table
            title='账号管理'
            searchList={[
              {
                key: 'name', // 查询时候发送到action的字段名
                value: name,
                label: '联系人:',
                onChange: this.props.onInputName
              }, {
                key: 'tel', // 查询时候发送到action的字段名
                value: tel,
                label: '联系人电话:',
                onChange: this.props.onInputTel
              }
            ]}
            onAdd={this.gotoAdd.bind(this)}
            columns={columns}
            page={page}
            total={count}
            perPage={perPage}
            data={dataSource}
            fetchList={this.props.fetchExpertAccount}
          />
        )}
      </div>
    );
  }
}
