import React, {Component, PropTypes} from 'react';
import { Table } from 'components';
import { Button, Form, Select } from 'antd';
import ConstitutionHeader from './ConstitutionHeader';
import ReportFooter from './ReportFooter';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import * as constitutionAct
from '../../redux/modules/BodyTestManagement/ConstitutionAct';
import * as constitutionAddAct
from '../../redux/modules/BodyTestManagement/ConstitutionAddAct';
const FormItem = Form.Item;
const Option = Select.Option;
import {formatDate} from 'utils/tool';

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
      promises.push(dispatch(constitutionAct.getRegion()));
      promises.push(dispatch(constitutionAct.changeRegion()));
      return Promise.all(promises);
    }
  }
])
export default class Constitution extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page || 1,
      perPage: this.props.perPage || 10
    };
  }

  componentWillMount() {
    this.props.fetchSchoolList({}, true);
    this.props.fetchConstitutionList({}, true);
  }

  gotoAdd(flag) {
    this.props.changeFlag(flag, null);
    this.context.router.push({
      pathname: '/constitution/constitutionAdd',
    });
  }

  gotoBatchImport() {
    this.context.router.push({
      pathname: '/constitution/bactchImport',
    });
  }

  gotoEdit(flag, record) {
    this.props.changeFlag(flag, record);
    this.context.router.push({
      pathname: '/constitution/singleEdit/' + (record.type || '骨密度') + '',
    });
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

  succ() {

  }

  fail(err) {
  }

  cancel() {
    this.context.router.goBack();
  }

  render() {
    const {
      page, perPage
    } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: '_id',
        key: '_id',
        width: '11%',
        render: (text, record, index) => {
          return (
            <span style={{marginRight: '5px'}}>{1 + index + (this.state.page - 1) * this.state.perPage}</span>
          );
        },
      },
      {
        title: '学号',
        dataIndex: 'num',
        key: 'num',
        width: '11%',
        render: (text, record, index) => {
          return (
            <span>{record.student.num}</span>
          );
        },
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '11%',
        render: (text, record, index) => {
          return (
            <span>{record.student.name}</span>
          );
        },
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: '11%',
        render: (text, record, index) => {
          if (record.student.sex === 1) {
            return <span>男</span>;
          } else {
            return <span>女</span>;
          }
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '11%',
        render: (text, record, index) => {
          return (
            <span>{record.age}</span>
          );
        },
      },
      {
        title: '报告标题',
        dataIndex: 'title',
        key: 'title',
        width: '11%',
        render: (text, record, index) => {
          if (record.type === '骨密度') {
            return (<span>广东省骨密度评定报告</span>);
          } else if (record.type === '心肺功能') {
            return (<span>广东省心肺功能评定报告</span>);
          } else if (record.type === '脊柱功能') {
            return (<span>广东省脊柱功能评定报告</span>);
          } else if (record.type === '体成份') {
            return (<span>广东省体成份评定报告</span>);
          } else {
            return (<span>广东省血管机能评定报告</span>);
          }
        },
      },
      {
        title: '体测类型',
        dataIndex: 'type',
        key: 'type',
        width: '11%',
        render: (text, record, index) => {
          if (record.type === '骨密度') {
            return (<span>骨密度</span>);
          } else if (record.type === '心肺功能') {
            return (<span>心肺功能</span>);
          } else if (record.type === '脊柱功能') {
            return (<span>脊柱功能</span>);
          } else if (record.type === '体成份') {
            return (<span>体成份</span>);
          } else {
            return (<span>血管机能</span>);
          }
        },
      },
      {
        title: '时间',
        // dataIndex: 'time',
        key: 'time',
        width: '11%',
        render: (text, record, index) => (
          <div>
            <span>{text.time ? formatDate(new Date(text.time), 'yyyy-mm-dd') : ''}</span>
          </div>
        ),
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <div>
            <Button type="primary" style={{marginRight: '5px'}}
              onClick={this.gotoEdit.bind(this, 1, record)}>编辑</Button>
          </div>
        ),
        key: 'operation',
        width: '11%',
      },
    ];
    const { data, schoolList, gradeList, classesId, midecalType, classList } = this.props;
    let display = 'block';
    this.props.children && (display = 'none');
    return (
      <div>
        { this.props.children }
          <div style={{display}}>
            <ConstitutionHeader
              {...this.props}
               region={this.props.region || {}}
              //  regionChanged={this.changeRegion.bind(this)}
               recordInfo={this.gotoAdd.bind(this, 0)}
               schoolList={schoolList}
              //  schoolChanged={this.changeSchool.bind(this)}
               schoolYearChanged={this.changeSchoolYear.bind(this)}
               gradeChanged={this.changeGrade.bind(this)}
               gradeList={gradeList}
               classList={this.props.classList}
               succ={this.succ.bind(this)}
               fail={this.fail.bind(this)}
               classChanged={this.changeClass.bind(this)}
               bactchImport={this.gotoBatchImport.bind(this)}/>
            <div style={{marginTop: '10px'}}>
              <Table
                type={midecalType}
                classId={classesId}
                title='体质管理'
                columns={columns}
                data={data}
                page={this.props.page}
                perPage={this.props.perPage}
                total={this.props.reportCount}
                fetchList={this.props.fetchConstitutionList}
              />
            </div>
          </div>
      </div>
    );
  }
}
