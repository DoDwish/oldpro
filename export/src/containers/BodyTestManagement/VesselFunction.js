import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import MyForm from '../../components/Edit/Form';
import ReportAnalyze from './ReportAnalyze';
import ContitutionRecordForm from './ContitutionRecordForm';
const FormItem = Form.Item;
const Option = Select.Option;
const styles = require('./Constitution.scss');

const VesselFunction = Form.create()(React.createClass({

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
          title: '广东省血管机能评定报告',
          count: values.count,
          time: reportTime,
          type: '血管机能',
          school: currentSchool,
          schoolYear: schoolYear,
          class: currentClass,
          student: currentStudent,
          age: values.age,
          data: {
            'height': values.height,
            'weight': values.weight,
            'heartRate': values.heartRate,
            'part': values.part,
            'BMI': values['BMI'],
            'rightArmBloodPressureDBP': values.rightArmBloodPressureDBP,
            'rightArmBloodPressureSBP': values.rightArmBloodPressureSBP,
            'rightArmBloodPressurePP': values.rightArmBloodPressurePP,
            'leftArmBloodPressureDBP': values.leftArmBloodPressureDBP,
            'leftArmBloodPressureSBP': values.leftArmBloodPressureSBP,
            'leftArmBloodPressurePP': values.leftArmBloodPressurePP,
            'rightArmBloodPressure': values.rightArmBloodPressure,
            'leftArmBloodPressure': values.leftArmBloodPressure,
            'rightAnkleBloodPressureDBP': values.rightAnkleBloodPressureDBP,
            'rightAnkleBloodPressureSBP': values.rightAnkleBloodPressureSBP,
            'rightAnkleBloodPressurePP': values.rightAnkleBloodPressurePP,
            'leftAnkleBloodPressureDBP': values.leftAnkleBloodPressureDBP,
            'leftAnkleBloodPressureSBP': values.leftAnkleBloodPressureSBP,
            'leftAnkleBloodPressurePP': values.leftAnkleBloodPressurePP,
            'leftAnklePWV': values.leftAnklePWV,
            'rightAnklePWV': values.rightAnklePWV,
            'leftAnkleLevelPWV': values.leftAnkleLevelPWV,
            'rightAnkleLevelPWV': values.rightAnkleLevelPWV,
            'leftAnklePercentagePeerPWV': values.leftAnklePercentagePeerPWV,
            'rightAnklePercentagePeerPWV': values.rightAnklePercentagePeerPWV,
            'leftAnkleZValuePWV': values.leftAnkleZValuePWV,
            'rightAnkleZValuePWV': values.rightAnkleZValuePWV,
            'leftAnkleABI': values.leftAnkleABI,
            'leftAnkleABILevel': values.leftAnkleABILevel,
            'rightAnkleABI': values.rightAnkleABI,
            'rightAnkleABILevel': values.rightAnkleABILevel,
            'veinSuggestion': {
              'PWV': values['PWV'],
              'ABI': values['ABI'],
            }
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
    const initialValueObj = {};
    const data = this.props.reportItem ? this.props.reportItem.data : {};
    const count = this.props.reportItem ? this.props.reportItem.count : '';
    const age = this.props.reportItem ? this.props.reportItem.age : '';
    if (this.props.reportItem) {
      initialValueObj.age = age || 0;
      initialValueObj.height = data.height || 0;
      initialValueObj.count = count || '';
      initialValueObj.weight = data.weight || 0;
      initialValueObj.heartRate = data.heartRate || 0;
      initialValueObj['BMI'] = data['BMI'] || 0;
      initialValueObj.rightArmBloodPressureDBP = data.rightArmBloodPressureDBP || 0;
      initialValueObj.rightArmBloodPressureSBP = data.rightArmBloodPressureSBP || 0;
      initialValueObj.rightArmBloodPressurePP = data.rightArmBloodPressurePP || 0;
      initialValueObj.leftArmBloodPressureDBP = data.leftArmBloodPressureDBP || 0;
      initialValueObj.leftArmBloodPressureSBP = data.leftArmBloodPressureSBP || 0;
      initialValueObj.leftArmBloodPressurePP = data.leftArmBloodPressurePP || 0;
      initialValueObj.rightArmBloodPressure = data.rightArmBloodPressure || '';
      initialValueObj.leftArmBloodPressure = data.leftArmBloodPressure || '';
      initialValueObj.rightAnkleBloodPressureDBP = data.rightAnkleBloodPressureDBP || 0;
      initialValueObj.rightAnkleBloodPressureSBP = data.rightAnkleBloodPressureSBP || 0;
      initialValueObj.rightAnkleBloodPressurePP = data.rightAnkleBloodPressurePP || 0;
      initialValueObj.leftAnkleBloodPressureDBP = data.leftAnkleBloodPressureDBP || 0;
      initialValueObj.leftAnkleBloodPressureSBP = data.leftAnkleBloodPressureSBP || 0;
      initialValueObj.leftAnkleBloodPressurePP = data.leftAnkleBloodPressurePP || 0;
      initialValueObj.leftAnklePWV = data.leftAnklePWV || 0;
      initialValueObj.rightAnklePWV = data.rightAnklePWV || 0;
      initialValueObj.leftAnkleLevelPWV = data.leftAnkleLevelPWV || '';
      initialValueObj.rightAnkleLevelPWV = data.rightAnkleLevelPWV || '';
      initialValueObj.leftAnklePercentagePeerPWV = data.leftAnklePercentagePeerPWV || 0;
      initialValueObj.rightAnklePercentagePeerPWV = data.rightAnklePercentagePeerPWV || 0;
      initialValueObj.leftAnkleZValuePWV = data.leftAnkleZValuePWV || 0;
      initialValueObj.rightAnkleZValuePWV = data.rightAnkleZValuePWV || 0;
      initialValueObj.leftAnkleABI = data.leftAnkleABI || 0;
      initialValueObj.leftAnkleABILevel = data.leftAnkleABILevel || '';
      initialValueObj.rightAnkleABI = data.rightAnkleABI || 0;
      initialValueObj.rightAnkleABILevel = data.rightAnkleABILevel || '';
      initialValueObj['PWV'] = data.veinSuggestion['PWV'] || '';
      initialValueObj['ABI'] = data.veinSuggestion['ABI'] || '';
    }
    const tables = [
      {
        header: '基本指标',
        key: 'basicGoal',
        items: [{
          title: '身高(cm)',
          dataIndex: 'height',
          key: 'height',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('height', {
                 initialValue: initialValueObj.height || 0,
               })(<Input className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
          {
            title: '体重(kg)',
            dataIndex: 'weight',
            key: 'weight',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('weight', {
                   initialValue: initialValueObj.weight || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '心率(次/分)',
            dataIndex: 'heartRate',
            key: 'heartRate',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('heartRate', {
                   initialValue: initialValueObj.heartRate || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '身体质量指数',
            dataIndex: 'BMI',
            key: 'BMI',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('BMI', {
                   initialValue: initialValueObj['BMI'] || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          }]
      },
      {
        header: '血压情况',
        key: 'basicGoal',
        items: [
          {
            title: '右臂血压-舒张压',
            dataIndex: 'rightArmBloodPressureDBP',
            key: 'rightArmBloodPressureDBP',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightArmBloodPressureDBP', {
                   initialValue: initialValueObj.rightArmBloodPressureDBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右臂血压－收缩压',
            dataIndex: 'rightArmBloodPressureSBP',
            key: 'rightArmBloodPressureSBP',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightArmBloodPressureSBP', {
                   initialValue: initialValueObj.rightArmBloodPressureSBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右臂血压－脉压',
            dataIndex: 'rightArmBloodPressurePP',
            key: 'rightArmBloodPressurePP',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightArmBloodPressurePP', {
                   initialValue: initialValueObj.rightArmBloodPressurePP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右臂血压标准',
            dataIndex: 'rightArmBloodPressure',
            key: 'rightArmBloodPressure',
            width: '150px',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightArmBloodPressure', {
                   initialValue: initialValueObj.rightArmBloodPressure || '正常',
                   rules: [{
                     required: true,
                     message: '此项为必填',
                   }],
                 })(
                   <Select placeholder='请选择' className={styles.cellItem}>
                      <Option className={styles.cellItem} value='良好'>良好</Option>
                      <Option className={styles.cellItem} value='正常'>正常</Option>
                      <Option className={styles.cellItem} value='稍高'>稍高</Option>
                      <Option className={styles.cellItem} value='高血压1级'>高血压1级</Option>
                      <Option className={styles.cellItem} value='高血压2级'>高血压2级</Option>
                      <Option className={styles.cellItem} value='高血压3级'>高血压3级</Option>
                   </Select>)}
              </FormItem>
            ),
          },
          {
            title: '左臂血压－舒张压',
            dataIndex: 'leftArmBloodPressureDBP',
            key: 'leftArmBloodPressureDBP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftArmBloodPressureDBP', {
                   initialValue: initialValueObj.leftArmBloodPressureDBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左臂血压－收缩压',
            dataIndex: 'leftArmBloodPressureSBP',
            key: 'leftArmBloodPressureSBP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftArmBloodPressureSBP', {
                   initialValue: initialValueObj.leftArmBloodPressureSBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左臂血压－脉压',
            dataIndex: 'leftArmBloodPressurePP',
            key: 'leftArmBloodPressurePP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftArmBloodPressurePP', {
                   initialValue: initialValueObj.leftArmBloodPressurePP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左臂血压标准',
            dataIndex: 'leftArmBloodPressure',
            key: 'leftArmBloodPressure',
            width: '80px',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftArmBloodPressure', {
                   initialValue: initialValueObj.leftArmBloodPressure || '正常',
                   rules: [{
                     required: true,
                     message: '此项为必填',
                   }],
                 })(
                   <Select placeholder='请选择' className={styles.cellItem}>
                      <Option className={styles.cellItem} value='良好'>良好</Option>
                      <Option className={styles.cellItem} value='正常'>正常</Option>
                      <Option className={styles.cellItem} value='稍高'>稍高</Option>
                      <Option className={styles.cellItem} value='高血压1级'>高血压1级</Option>
                      <Option className={styles.cellItem} value='高血压2级'>高血压2级</Option>
                      <Option className={styles.cellItem} value='高血压3级'>高血压3级</Option>
                   </Select>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血压－舒张压',
            dataIndex: 'rightAnkleBloodPressureDBP',
            key: 'rightAnkleBloodPressureDBP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleBloodPressureDBP', {
                   initialValue: initialValueObj.rightAnkleBloodPressureDBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血压－收缩压',
            dataIndex: 'rightAnkleBloodPressureSBP',
            key: 'rightAnkleBloodPressureSBP',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleBloodPressureSBP', {
                   initialValue: initialValueObj.rightAnkleBloodPressureSBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血压－脉压',
            dataIndex: 'rightAnkleBloodPressurePP',
            key: 'rightAnkleBloodPressurePP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleBloodPressurePP', {
                   initialValue: initialValueObj.rightAnkleBloodPressurePP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左踝血压－舒张压',
            dataIndex: 'leftAnkleBloodPressureDBP',
            key: 'leftAnkleBloodPressureDBP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleBloodPressureDBP', {
                   initialValue: initialValueObj.leftAnkleBloodPressureDBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          }, {
            title: '左踝血压－收缩压',
            dataIndex: 'leftAnkleBloodPressureSBP',
            key: 'leftAnkleBloodPressureSBP',

            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleBloodPressureSBP', {
                   initialValue: initialValueObj.leftAnkleBloodPressureSBP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          }, {
            title: '左踝血压－脉压',
            dataIndex: 'leftAnkleBloodPressurePP',
            key: 'leftAnkleBloodPressurePP',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleBloodPressurePP', {
                   initialValue: initialValueObj.leftAnkleBloodPressurePP || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          }]
      },
      {
        header: '血管弹性',
        key: 'vesselFlex',
        items: [{
          title: '左踝(PWV)',
          dataIndex: 'leftAnklePWV',
          key: 'leftAnklePWV',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftAnklePWV', {
                 initialValue: initialValueObj.leftAnklePWV || 0,
               })(<Input className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
          {
            title: '右踝(PWV)',
            dataIndex: 'rightAnklePWV',
            key: 'rightAnklePWV',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnklePWV', {
                   initialValue: initialValueObj.rightAnklePWV || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左踝血管',
            dataIndex: 'leftAnkleLevelPWV',
            key: 'leftAnkleLevelPWV',
            width: '150px',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleLevelPWV', {
                   initialValue: initialValueObj.leftAnkleLevelPWV || '标准',
                   rules: [{
                     required: true,
                     message: '此项为必填',
                   }],
                 })(
                   <Select placeholder='请选择' className={styles.cellItem}>
                     <Option className={styles.cellItem} value='硬'>硬</Option>
                     <Option className={styles.cellItem} value='较硬'>较硬</Option>
                     <Option className={styles.cellItem} value='标准'>标准</Option>
                     <Option className={styles.cellItem} value='柔软'>柔软</Option>
                   </Select>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血管',
            dataIndex: 'rightAnkleLevelPWV',
            key: 'rightAnkleLevelPWV',
            width: '150px',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleLevelPWV', {
                   initialValue: initialValueObj.rightAnkleLevelPWV || '标准',
                   rules: [{
                     required: true,
                     message: '此项为必填',
                   }],
                 })(
                   <Select placeholder='请选择' className={styles.cellItem}>
                      <Option className={styles.cellItem} value='硬'>硬</Option>
                      <Option className={styles.cellItem} value='较硬'>较硬</Option>
                      <Option className={styles.cellItem} value='标准'>标准</Option>
                      <Option className={styles.cellItem} value='柔软'>柔软</Option>
                   </Select>)}
              </FormItem>
            ),
          }, {
            title: '左踝血管弹性同龄人相比%',
            dataIndex: 'leftAnklePercentagePeerPWV',
            key: 'leftAnklePercentagePeerPWV',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnklePercentagePeerPWV', {
                   initialValue: initialValueObj.leftAnklePercentagePeerPWV || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血管弹性同龄人相比%',
            dataIndex: 'rightAnklePercentagePeerPWV',
            key: 'rightAnklePercentagePeerPWV',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnklePercentagePeerPWV', {
                   initialValue: initialValueObj.rightAnklePercentagePeerPWV || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左踝血管弹性Z值',
            dataIndex: 'leftAnkleZValuePWV',
            key: 'leftAnkleZValuePWV',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleZValuePWV', {
                   initialValue: initialValueObj.leftAnkleZValuePWV || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血管弹性Z值',
            dataIndex: 'rightAnkleZValuePWV',
            key: 'rightAnkleZValuePWV',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleZValuePWV', {
                   initialValue: initialValueObj.rightAnkleZValuePWV || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          }, {
            title: '左踝血管阻塞值',
            dataIndex: 'leftAnkleABI',
            key: 'leftAnkleABI',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleABI', {
                   initialValue: initialValueObj.leftAnkleABI || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '左踝血管阻塞程度',
            dataIndex: 'leftAnkleABILevel',
            key: 'leftAnkleABILevel',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('leftAnkleABILevel', {
                   initialValue: initialValueObj.leftAnkleABILevel || '正常',
                   rules: [{
                     required: true,
                     message: '此项为必填',
                   }],
                 })(
                   <Select placeholder='请选择' className={styles.cellItem}>
                     <Option className={styles.cellItem} value='闭塞'>闭塞</Option>
                     <Option className={styles.cellItem} value='正常'>正常</Option>
                     <Option className={styles.cellItem} value='钙化'>钙化</Option>
                   </Select>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血管阻塞值',
            dataIndex: 'rightAnkleABI',
            key: 'rightAnkleABI',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleABI', {
                   initialValue: initialValueObj.rightAnkleABI || 0,
                 })(<Input className={styles.constitutionInput}/>)}
              </FormItem>
            ),
          },
          {
            title: '右踝血管阻塞程度',
            dataIndex: 'rightAnkleABILevel',
            key: 'rightAnkleABILevel',
            render: (text, record, index) => (
              <FormItem>
                 {getFieldDecorator('rightAnkleABILevel', {
                   initialValue: initialValueObj.rightAnkleABILevel || '正常',
                   rules: [{
                     required: true,
                     message: '此项为必填',
                   }],
                 })(
                   <Select placeholder='请选择' className={styles.cellItem}>
                     <Option className={styles.cellItem} value='闭塞'>闭塞</Option>
                     <Option className={styles.cellItem} value='正常'>正常</Option>
                     <Option className={styles.cellItem} value='钙化'>钙化</Option>
                   </Select>)}
              </FormItem>
            ),
          }]
      }
    ];
    const items = [];
    tables.map((table) => {
      const dataItem = {label: '', key: '',
      jsx: <ReportAnalyze columns={table.items} data={datas}/>};
      const { header, key } = table;
      dataItem.label = header;
      dataItem.key = key;
      items.push(dataItem);
    });

    const suggestionPWV = getFieldDecorator('PWV', {
      initialValue: initialValueObj['PWV'] || '',
    })(<div style={{marginTop: '50px'}}>
      <span style={{fontSize: '16px', fontWeight: 'bold'}}>血管弹性程度(PWV)评价</span>
      <FormItem style={{marginTop: '10px'}}>
        {getFieldDecorator('PWV', {
          initialValue: initialValueObj['PWV'] || '',
        })(<Input type='textarea' rows={4} placeholder='文字内容'/>)}
      </FormItem>
    </div>);
    const suggestionABI = getFieldDecorator('ABI', {
      initialValue: initialValueObj['ABI'] || '',
    })(<div style={{marginTop: '50px'}}>
      <span style={{fontSize: '16px', fontWeight: 'bold'}}>血管阻塞程度(ABI)评价</span>
      <FormItem style={{marginTop: '10px'}}>
        {getFieldDecorator('ABI', {
          initialValue: initialValueObj['ABI'] || '',
        })(<Input type='textarea' rows={4} placeholder='文字内容'/>)}
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
        title={'血管机能'}
        suggestion1={suggestionPWV}
        suggestion2={suggestionABI}
      />
    );
  }
}));
export default VesselFunction;
