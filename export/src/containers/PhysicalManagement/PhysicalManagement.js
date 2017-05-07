import React, {Component, PropTypes} from 'react';
import {
  fetchGradeList,
  fetchClassList,
  fetchSchoolList,
  changeRegion,
  getRegion,
  fetchPhysicalSearch,
  fetchStudentList,
  fetchPhysicalSearchTotal,
  changeYearOrClassId,
} from 'redux/modules/PhysicalManagement/PhysicalManagementAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {Button, Table} from 'antd';
import MyHead from './PhysicalManagementHead';
import {formatDate} from 'utils/tool';

@connect(({PhysicalManagementRed})=>PhysicalManagementRed, {
  fetchGradeList,
  fetchClassList,
  fetchSchoolList,
  changeRegion,
  fetchPhysicalSearch,
  fetchStudentList,
  fetchPhysicalSearchTotal,
  changeYearOrClassId
})
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(getRegion()));
      promises.push(dispatch(changeRegion()));
      return Promise.all(promises);
    }
  }
])
export default class PhysicalManagement extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  componentWillMount() {
    this.props.fetchSchoolList({}, true);
    this.props.fetchPhysicalSearch({}, true);
  }
    // 新增数据页面
  gotoAdd(record) {
    this.context.router.push({
      pathname: '/physicalManagement/add',
    });
  }
  // 编辑数据页面
  gotoEdit(record) {
    this.context.router.push({
      pathname: `/physicalManagement/edit/${record._id}`,
      state: record
    });
  }
  // 导入页面
  gotoImport(record) {
    this.context.router.push({
      pathname: '/physicalManagement/import',
    });
  }
  fetchList(obj) {
    const {perPage, page, classId} = this.props;
    let data = {};
    if (obj) {
      data = obj;
    } else {
      data = {perPage, page, filters: {classId}};
    }
    this.props.fetchPhysicalSearch(data);
  }

  render() {
    const {
      gradeList,
      schoolList,
      classList,
      region,
      physicalSearch,
      count,
      perPage,
      page,
      classId
    } = this.props;
    const columns = [
      {
        title: '编号',
        render: (text, record, index) => (
          <span style={{marginRight: '5px'}}>{1 + index + (page - 1) * perPage}</span>
        )
      },
      {
        title: '学号',
        dataIndex: 'student.num',
        key: 'student.num',
      },
      {
        title: '姓名',
        dataIndex: 'student.name',
        key: 'student.name',
      },
      {
        title: '性别',
        render: (text, record, index) => {
          const {student: {sex: sexIndex} = {}} = text;
          const arr = ['男', '女'];
          return (
           <span style={{marginRight: '5px'}}>{arr[sexIndex - 1] || ''}</span>
          );
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '体检类型',
        render: (text, record, index) => (
            <span style={{marginRight: '5px'}}>血脂体检数据</span>
        ),
      },
      {
        title: '时间',
        render: (text, record, index) => (
          <span>{text.time?formatDate(new Date(text.time), 'yyyy-mm-dd'): ''}</span>
        )
      },
      {
        title: '操作',
        render: (text, record, index) => (
            <Button type="primary" onClick={this.gotoEdit.bind(this, text)} style={{marginRight: '5px'}}>编辑</Button>
        ),
      },
    ];
    const filters = {'class': classId};
    const pagination = {
      current: page,
      total: count,
      pageSize: perPage,
      // 是否可以快速跳转至某页
      showQuickJumper: true,
      // 是否可以改变 pageSize
      showSizeChanger: true,
      // 页码改变的回调
      onChange: (current, pageSize) => {
        this.fetchList({filters, perPage: perPage, page: current});
      },
      // pageSize 变化的回调
      onShowSizeChange: (current, size) => {
        this.fetchList({filters, perPage: size, page: current});
      }
    };
    return (
      <div>
        {this.props.children || (
          <div>
            <MyHead
              {...this.props}
              region={region}
              gradeList={gradeList}
              schoolList={schoolList}
              classList={classList}
              gotoAdd={this.gotoAdd.bind(this)}
              gotoImport={this.gotoImport.bind(this)}
            />
            <Table
               total={count}
               columns={columns}
               dataSource={physicalSearch}
               pagination={pagination}
               rowKey={(item)=>item['_id']}
            />
          </div>
        )}
      </div>
    );
  }
}
