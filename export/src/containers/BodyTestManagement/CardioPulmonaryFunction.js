import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import MyForm from '../../components/Edit/Form';
import ReportAnalyze from './ReportAnalyze';
import ContitutionRecordForm from './ContitutionRecordForm';
const FormItem = Form.Item;
const Option = Select.Option;
const styles = require('./Constitution.scss');

const CardioPulmonaryFunction = Form.create()(React.createClass({

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
          title: '广东省心肺功能评定报告',
          count: values.count,
          time: reportTime,
          type: '心肺功能',
          school: currentSchool,
          schoolYear: schoolYear,
          class: currentClass,
          student: currentStudent,
          age: values.age,
          data: {
            part: values.part,
            "height": values.height,
            "weight": values.weight,
            "exercise": values.exercise,
            "firstPowerRate": values.firstPowerRate,
            "secondPowerRate": values.secondPowerRate,
            "functionalCapacity": values.functionalCapacity,
            "cardioStandard": values.cardioStandard,
            "cardioComment": values.cardioComment,
            "maxOxygenUptakeValues": values.maxOxygenUptakeValues,
            "maxAbsoluteOxygenUptake": values.maxAbsoluteOxygenUptake,
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
    const initialValueObj = {};
    const data = this.props.reportItem ? this.props.reportItem.data : {};
    const count = this.props.reportItem ? this.props.reportItem.count : '';
    const age = this.props.reportItem ? this.props.reportItem.age : '';
    if (data) {
      initialValueObj.height = data.height || 0;
      initialValueObj.weight = data.weight || 0;
      initialValueObj.count = count || '';
      initialValueObj.age = age || 0;
      initialValueObj.exercise = data.exercise || false;
      initialValueObj.firstPowerRate = data.firstPowerRate || 0;
      initialValueObj.secondPowerRate = data.secondPowerRate || 0;
      initialValueObj.functionalCapacity = data.functionalCapacity || 0;
      initialValueObj.cardioStandard = data.cardioStandard || '';
      initialValueObj.cardioComment = data.cardioComment || 0;
      initialValueObj.maxOxygenUptakeValues = data.maxOxygenUptakeValues || 0;
      initialValueObj.maxAbsoluteOxygenUptake = data.maxAbsoluteOxygenUptake || 0;
    }
    const datas = [
      {
        "height": 166, // 身高
        "weight": 74.6, // 体重
        "exercise": true, // 有锻炼习惯：true-有，false-没有
        "firstPowerRate": 94, // 一级功率心率
        "secondPowerRate": 120, // 二级功率心率
        "functionalCapacity": 10.5, // F.C.心脏功能能力(MET)
        "cardioStandard": "中等", // 心肺功能标准：1-差，2-稍差，3－中等，4-良好，5-优秀
        "cardioComment": "您需要进一步提高心肺功能能力", // 心肺功能评语
        "maxOxygenUptakeValues": 37, // 最大摄氧量相对值
        "maxAbsoluteOxygenUptake": 2.76, // 最大摄氧量绝对值
      }
    ];
    const tables = [{
      header: '测试结果分析',
      key: 'testResult',
      items: [{
        title: '身高(cm)',
        dataIndex: 'height',
        key: 'height',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('height', {
               initialValue: initialValueObj.height || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '体重(kg)',
        dataIndex: 'weight',
        key: 'weight',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('weight', {
               initialValue: initialValueObj.weight || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '一级功率心率(次/分)',
        dataIndex: 'firstPowerRate',
        key: 'firstPowerRate',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('firstPowerRate', {
               initialValue: initialValueObj.firstPowerRate || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '二级功率心率(次/分)',
        dataIndex: 'secondPowerRate',
        key: 'secondPowerRate',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('secondPowerRate', {
               initialValue: initialValueObj.secondPowerRate || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: 'F.C.心脏功能能力(MET)',
        dataIndex: 'functionalCapacity',
        key: 'functionalCapacity',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('functionalCapacity', {
               initialValue: initialValueObj.functionalCapacity || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '心肺功能标准',
        dataIndex: 'cardioStandard',
        key: 'cardioStandard',
        width: '150px',
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator('cardioStandard', {
              initialValue: initialValueObj.cardioStandard || '良好',
            })(
              <Select placeholder='请选择' className={styles.cellItem}>
                 <Option className={styles.cellItem} value='优秀'>优秀</Option>
                 <Option className={styles.cellItem} value='良好'>良好</Option>
                 <Option className={styles.cellItem} value='中等'>中等</Option>
                 <Option className={styles.cellItem} value='稍差'>稍差</Option>
                 <Option className={styles.cellItem} value='差'>差</Option>
              </Select>
            )}
          </FormItem>
        ),
      }, {
        title: '最大摄氧量相对值(ml/kg/min)',
        dataIndex: 'maxOxygenUptakeValues',
        key: 'maxOxygenUptakeValues',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('maxOxygenUptakeValues', {
               initialValue: initialValueObj.maxOxygenUptakeValues || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '最大摄氧量绝对值(ml/kg/min)',
        dataIndex: 'maxAbsoluteOxygenUptake',
        key: 'maxAbsoluteOxygenUptake',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('maxAbsoluteOxygenUptake', {
               initialValue: initialValueObj.maxAbsoluteOxygenUptake || 0,
             })(<Input type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }],
    }];

    const items = [];
    tables.map((table) => {
      const dataItem = {label: '', key: '',
      jsx: <ReportAnalyze columns={table.items} data={datas}/>};
      const { header, key } = table;
      dataItem.label = header;
      dataItem.key = key;
      items.push(dataItem);
    });

    const suggestion = getFieldDecorator('cardioComment', {
      initialValue: data.cardioComment || '',
    })(<div style={{marginTop: '50px'}}>
      <span style={{fontSize: '16px', fontWeight: 'bold'}}>心肺功能评语</span>
      <FormItem style={{marginTop: '10px'}}>
        {getFieldDecorator('cardioComment', {
          initialValue: data.cardioComment || '',
        })(<Input type="textarea" rows={4} placeholder='评语内容'/>)}
      </FormItem>
    </div>);

    return (
      <ContitutionRecordForm
        submit={this.handleSubmit}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={true}
        cancel={this.cancel}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        suggestion1={suggestion}
        title={'心肺功能'}
        showCheckbox={true}
      />
    );
  }
}));
export default CardioPulmonaryFunction;
