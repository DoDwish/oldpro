import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import MyForm from '../../components/Edit/Form';
import moment from 'moment';
import ReportAnalyze from './ReportAnalyze';
import ContitutionRecordForm from './ContitutionRecordForm';
const FormItem = Form.Item;
const Option = Select.Option;
const styles = require('./Constitution.scss');

const BoneDensity = Form.create()(React.createClass({

  succ() {
    this.props.succ();
  },
  fail(err) {
    this.props.fail(err);
  },
  cancel() {
    this.props.cancel();
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let currentClass = '';
        let currentSchool = '';
        let currentStudent = '';
        let schoolYear = '';
        const { reportItem } = this.props;

        if (reportItem) {
          currentClass = reportItem.class;
          currentSchool = reportItem.school;
          currentStudent = reportItem.student._id;
          schoolYear = reportItem.schoolYear;
        } else {
          currentClass = this.props.classId;
          currentSchool = this.props.schoolId;
          currentStudent = this.props.studentItem._id;
          let classItem = {};
          this.props.classList.map((item) => {
            if (item._id === currentClass) {
              classItem = item;
            }
          });
          schoolYear = classItem.startYear + '-' + classItem.endYear;
        }
        const { reportTime } = this.props;
        let receivedValues = {
          title: '广东省骨密度评定报告',
          count: values.count,
          time: reportTime,
          type: '骨密度',
          school: currentSchool,
          schoolYear: schoolYear,
          class: currentClass,
          student: currentStudent,
          age: parseInt(values.age),
          data: {
            "part": values.part,
            "TValue": values.TValue,
            "ZValue": values.ZValue,
            "intensityExponent": values.intensityExponent,
            "situation": values.situation,
            "percentageYoungAdult": values.percentageYoungAdult,
            "percentagePeer": values.percentagePeer,
            "fractureRiskMultiple": values.fractureRiskMultiple,
          }
        };

        if (reportItem) {
          receivedValues._id = reportItem._id;
        }

        let obj = {
          params: receivedValues,
          succ: this.succ,
          fail: this.fail,
        };
        this.props.fetchCreateSaveCategory(obj);
      }
    });
  },
  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;

    const datas = [{
      TValue: '',
      ZValue: '',
      intensityExponent: '',
      situation: '',
      percentageYoungAdult: '',
      percentagePeer: '',
      fractureRiskMultiple: '',
    }];

    const width = (100 / Object.keys(datas[0]).length).toPrecision(4).toString() + '%';
    const initialValueObj = {};
    const data = this.props.reportItem ? this.props.reportItem.data : {};
    const count = this.props.reportItem ? this.props.reportItem.count : '1/1';
    const age = this.props.reportItem ? this.props.reportItem.age : 0;
    if (data) {
      initialValueObj.TValue = data.TValue || 0;
      initialValueObj.ZValue = data.ZValue || 0;
      initialValueObj.part = data.part || '';
      initialValueObj.count = count || '';
      initialValueObj.age = age || 0;
      initialValueObj.intensityExponent = data.intensityExponent || 0;
      initialValueObj.situation = data.situation || '';
      initialValueObj.percentageYoungAdult = data.percentageYoungAdult || 0;
      initialValueObj.percentagePeer = data.percentagePeer || 0;
      initialValueObj.fractureRiskMultiple = data.fractureRiskMultiple || 0;
    }
    const tables = [{
      header: '测试结果分析',
      key: 'testResult',
      items: [
        {
          title: 'T值',
          dataIndex: 'TValue',
          key: 'TValue',
          width: { width },
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('TValue', {
                 initialValue: initialValueObj.TValue || 0.0
               })(<Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: 'Z值',
          dataIndex: 'ZValue',
          key: 'ZValue',
          width: {width},
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('ZValue', {
                 initialValue: initialValueObj.ZValue || 0.0
               })(<Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '骨强度指数',
          dataIndex: 'intensityExponent',
          key: 'intensityExponent',
          width: {width},
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('intensityExponent', {
                 initialValue: initialValueObj.intensityExponent || 0.0
               })(<Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '骨质情况',
          dataIndex: 'situation',
          key: 'situation',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
              {getFieldDecorator('situation', {
                initialValue: initialValueObj.situation || '骨质正常',
                rules: [{
                  required: true,
                  message: '此项为必填',
                }],
              })(
                <Select placeholder='请选择' className={styles.cellItem}>
                   <Option className={styles.cellItem} key='骨质正常' >骨质正常</Option>
                   <Option className={styles.cellItem} key='骨质少孔' >骨质少孔</Option>
                   <Option className={styles.cellItem} key='骨质疏松' >骨质疏松</Option>
                   <Option className={styles.cellItem} key='差' >差</Option>
                </Select>
              )}
            </FormItem>
          ),
        },
        {
          title: '%年轻人',
          dataIndex: 'percentageYoungAdult',
          key: 'percentageYoungAdult',
          width: {width},
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('percentageYoungAdult', {
                 initialValue: initialValueObj.percentageYoungAdult || 0.0
               })(<Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '%同龄人',
          dataIndex: 'percentagePeer',
          key: 'percentagePeer',
          width: {width},
          render: (text, record, index) => (
            <FormItem>
              {getFieldDecorator('percentagePeer', {
                initialValue: initialValueObj.percentagePeer || 0.0
              })(<Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '骨折风险倍数',
          dataIndex: 'fractureRiskMultiple',
          key: 'fractureRiskMultiple',
          width: {width},
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('fractureRiskMultiple', {
                 initialValue: initialValueObj.fractureRiskMultiple || 0.0
               })(<Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        }],
    }];

    const items = [];
    tables.map((table) => {
      const dataItem = {label: '', key: '',
      jsx: <ReportAnalyze columns={table.items} data={datas} />};
      const { header, key } = table;
      dataItem.label = header;
      dataItem.key = key;
      items.push(dataItem);
    });

    return (
      <ContitutionRecordForm
        submit={this.handleSubmit}
        items={items}
        isAdd={true}
        cancel={this.cancel}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        title={'骨密度'}
        initialValueObj={initialValueObj}
        showCheckbox={false}
      />
    );
  }
}));
export default BoneDensity;
