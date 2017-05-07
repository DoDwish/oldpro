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

export default class ConstitutionEdit extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  gotoEdit(record) {
    this.props.changeStudent(record);
    this.context.router.push({
      pathname: '/constitution/singleAdd/' + this.props.type + '',
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
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '体测类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record, index) => {
          return (<span>{this.props.type}</span>);
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
    const { classList, region, schoolList, gradeList, studentList } = this.props;
    return (
      <div>
        {this.props.children || (
          <div>
            <div style={{marginTop: '10px'}}>
              <Table
                title='体测成绩录入'
                columns={columns}
                data={studentList}
              />
            </div>
            <Button style={{
              textAlign: 'center'
            }} onClick={this.cancel.bind(this)}>
              返回
            </Button>
          </div>
        )}
      </div>
    );
  }
}
