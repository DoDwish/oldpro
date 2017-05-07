import React, {Component, PropTypes} from 'react';
import {
        fetchGradeList,
        fetchClassList,
        fetchSchoolList,
        changeRegion,
        getRegion,
        fetchStudentList,
        fetchClassYear,
        fetchStudentTotal
} from 'redux/modules/PhysicalManagement/PhysicalManagementAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {Input, Table, Progress,
        Button, Select, Form,
        DatePicker, Pagination,
        Cascader, Row, Col, rowKey, message} from 'antd';
import moment from 'moment';
import {RegionSelector} from 'components';
import MyHead from './AddPhysicalHead';

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const yearFormat = 'YYYY';
const year = new Date().getFullYear();
const month = new Date().getMonth();
let defaultStartYear = (parseInt(month) + 1 < 7) ? (parseInt(year) - 1) : parseInt(year);
let defaultEndYear = (parseInt(month) + 1 < 7) ? parseInt(year) : (parseInt(year) + 1);
@connect(({PhysicalManagementRed})=>PhysicalManagementRed,
  { fetchGradeList, fetchClassList, fetchSchoolList, changeRegion, fetchStudentList, fetchClassYear, fetchStudentTotal}
)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }, params
    }) => {
      const promises = [];
    }
  }
])
export default class AddPhysical extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    schoolYearsList: PropTypes.string,
    classObj: PropTypes.string,
  }
  componentWillMount() {
    this.props.fetchSchoolList({}, true);
    this.props.fetchStudentList({}, true);
  }
  gotoEnter(record) {
    const stateRecord = this.props.location.state;
    record.schoolYearsList = this.props.schoolYear;
    record.classObj = this.props.id;
    record.time = this.props.time;
    this.context.router.push({
      pathname: '/physicalManagement/add/enter',
      state: record
    });
  }
  fetchList(obj) {
    const {perPage, page, classId} = this.props;
    let data = {};
    if (obj) {
      data = obj;
    } else {
      data = {perPage: perPage, page, filters: {classId}};
    }
    this.props.fetchStudentList(data);
  }
  render() {
    const {gradeList,
           schoolList,
           classList,
           region,
           student,
           studentCount,
           perPage,
           page,
           classId,
         } = this.props;
    const columns = [
      {
        title: '编号',
        render: (text,record,index) => (
          <span style={{marginRight: '5px'}}>{1 + index + (page - 1) * perPage}</span>
        )
      },
      {
        title: '学号',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        render: (text, record, index) => (
          <span style={{marginRight: '5px'}}>{text.sex===1?'男':'女'}</span>
        ),
      },
      {
        title: '体检类型',
        render: (text, record, index) => (
            <span style={{marginRight: '5px'}}>血脂体检数据</span>
        ),
      },
      {
        title: '操作',
        render: (text, record, index) => (
            <Button type="primary" style={{marginRight: '5px'}} onClick={this.gotoEnter.bind(this, text)}>录入</Button>
        ),
      },
    ]
    const filters = {classId: classId};
    const pagination = {
      current: page,
      total: studentCount,
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
              params={this.props.params}
            />
            <Table total={studentCount} columns={columns} dataSource={student} pagination={pagination} rowKey={(item)=>item['_id']}/>
          </div>
        )}
      </div>
    )
  }
}
