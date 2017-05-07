import React, {Component, PropTypes} from 'react';
import ConstitutionAddHeader from './ConstitutionAddHeader';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import ReportFooter from './ReportFooter';
import * as constitutionAct
from '../../redux/modules/BodyTestManagement/ConstitutionAct';
import * as constitutionAddAct
from '../../redux/modules/BodyTestManagement/ConstitutionAddAct';
import { Button } from 'antd';
import { Table } from 'components';
import moment from 'moment';

@connect(
  ({ constitutionRed, constitutionAddRed }) => ({ ...constitutionRed, ...constitutionAddRed }),
  { ...constitutionAddAct, ...constitutionAct }
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
      return Promise.all(promises);
    }
  }
])

export default class ConstitutionAdd extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  componentWillMount() {
    this.props.fetchSchoolList({}, true);
    this.props.fetchStudentList({}, true);
  }
  constructor(props) {
    super(props);
    this.state = {
      reportTime: '',
      type: '骨密度'
    };
  }

  gotoEdit(record) {
    this.props.changeStudent(record);
    this.context.router.push({
      pathname: '/constitution/singleAdd/' + record.type || '骨密度' + '',
    });
  }

  changeTime(value) {
    this.props.changeTime(value.format('l'));
  }
  changeSchool(value) {
    const obj = {
      filters: {
        school: value
      }
    };
    this.props.changeSchool(obj);
    this.props.selectSchool(value);
  }

  changeSchoolYear(value) {
    const obj = {
      filters: {
        startYear: value.split('-')[0],
        endYear: value.split('-')[1],
        school: this.props.schoolId
      }
    };
    this.props.fetchClassListBySchoolYear(obj);
  }

  changeGrade(value) {
    this.props.changeGrade(value);
  }

  changeClass(value) {
    let classId = '';
    this.props.classList.map((item) => {
      if (item.class.name === value) {
        classId = item._id;
      }
    });
    this.props.changeClass(classId);
  }

  changeType(value) {
    this.setState({
      type: value
    });
  }

  cancel() {
    this.context.router.goBack();
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => {
          return (
            <span>{(this.props.page - 1) * this.props.perPage + (index + 1)}</span>
          );
        },
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
        dataIndex: 'sex',
        key: 'sex',
        render: (text, record, index) => {
          if (record.sex === 1) {
            return (<span>男</span>);
          } else {
            return (<span>女</span>);
          }
        },
      },
      {
        title: '体测类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record, index) => {
          return (<span>{record.type}</span>);
        },
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <div>
            <Button type="primary" style={{marginRight: '5px'}} onClick={this.gotoEdit.bind(this, record)}>
              {
                this.props.editFlag === 1 ? '编辑' : '录入'
              }
            </Button>
          </div>
        ),
        key: 'operation',
      },
    ];
    const { classList, region, schoolList, gradeList, studentList, classId, midecalType } = this.props;
    let reportList = [];
    reportList = studentList || [];
    reportList.map((report) => {
      report.type = this.state.type;
    });
    const display = this.props.children ? 'none' : 'block';
    return (
      <div>
        {this.props.children}
        <div style={{display}}>
          {
            this.props.editFlag === 1 || (
              <ConstitutionAddHeader
                {...this.props}
                region={region || {}}
                // regionChanged={this.changeRegion.bind(this)}
                // schoolChanged={this.changeSchool.bind(this)}
                schoolYearChanged={this.changeSchoolYear.bind(this)}
                gradeChanged={this.changeGrade.bind(this)}
                // fetchStudentList={this.props.fetchStudentList}
                changeType={this.changeType.bind(this)}
                schoolList={schoolList}
                gradeList={gradeList}
                classList={classList}
                timeChanged={this.changeTime.bind(this)}
                classChanged={this.changeClass.bind(this)}
              />
            )
          }
          <div style={{marginTop: '10px'}}>
            <Table
              MidecalClassId={classId}
              title='体测成绩录入'
              columns={columns}
              data={reportList}
              page={this.props.page}
              perPage={this.props.perPage}
              total={this.props.studentCount}
              fetchList={this.props.fetchStudentList}
            />
          </div>
        </div>
      </div>
    );
  }
}
