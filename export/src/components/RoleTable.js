import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Button, Input, Table} from 'antd';
export default ({onEditor, roleColumns, onAddRole}) => {
  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '操作',
      key: '_id',
      render: (text, record, index) => (
        <Button type='primary' onClick={() => {
          onEditor(text);
        }}>编辑</Button>
      )
    }
  ];
  return (
    <div>
      <Helmet title='角色管理'/>
      <div className="add-role">
        <h2 className="displayil">角色管理</h2>
        <Button type="primary" className="fr" onClick={onAddRole}>新增角色</Button>
      </div>
      <Table columns={columns} dataSource={roleColumns} pagination={false} rowKey={(item) => item['_id']}/>
    </div>
  );
};