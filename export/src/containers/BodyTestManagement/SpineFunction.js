import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import MyForm from '../../components/Edit/Form';
import ReportAnalyze from './ReportAnalyze';
import ContitutionRecordForm from './ContitutionRecordForm';
const FormItem = Form.Item;
const Option = Select.Option;
const styles = require('./Constitution.scss');

const SpineFunction = Form.create()(React.createClass({

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
          title: '广东省脊柱功能评定报告',
          count: values.count,
          time: reportTime,
          type: '脊柱功能',
          school: currentSchool,
          schoolYear: schoolYear,
          class: currentClass,
          student: currentStudent,
          age: parseInt(values.age),
          data: {
            "part": values.part,
            "spineErect": {
              "Th1/2": values['spineErect_Th1/2'],
              "Th2/3": values['spineErect_Th2/3'],
              "Th3/4": values['spineErect_Th3/4'],
              "Th4/5": values['spineErect_Th4/5'],
              "Th5/6": values['spineErect_Th5/6'],
              "Th6/7": values['spineErect_Th6/7'],
              "Th7/8": values['spineErect_Th7/8'],
              "Th8/9": values['spineErect_Th8/9'],
              "Th9/10": values['spineErect_Th9/10'],
              "Th10/11": values['spineErect_Th10/11'],
              "Th11/12": values['spineErect_Th11/12'],
              "Th12/L1": values['spineErect_Th12/L1'],
              "L1/L2": values['spineErect_L1/L2'],
              "L2/L3": values['spineErect_L2/L3'],
              "L3/L4": values['spineErect_L3/L4'],
              "L4/L5": values['spineErect_L4/L5'],
              "L5/S1": values['spineErect_L5/S1'],
              "Sac/Hip": values['spineErect_Sac/Hip'],
            },
            "spineErectEvaluate": values.spineErectEvaluate,
            "spineProneness": {
              "Th1/2": values['spineProneness_Th1/2'],
              "Th2/3": values['spineProneness_Th2/3'],
              "Th3/4": values['spineProneness_Th3/4'],
              "Th4/5": values['spineProneness_Th4/5'],
              "Th5/6": values['spineProneness_Th5/6'],
              "Th6/7": values['spineProneness_Th6/7'],
              "Th7/8": values['spineProneness_Th7/8'],
              "Th8/9": values['spineProneness_Th8/9'],
              "Th9/10": values['spineProneness_Th9/10'],
              "Th10/11": values['spineProneness_Th10/11'],
              "Th11/12": values['spineProneness_Th11/12'],
              "Th12/L1": values['spineProneness_Th12/L1'],
              "L1/L2": values['spineProneness_L1/L2'],
              "L2/L3": values['spineProneness_L2/L3'],
              "L3/L4": values['spineProneness_L3/L4'],
              "L4/L5": values['spineProneness_L4/L5'],
              "L5/S1": values['spineProneness_L5/S1'],
            },
            "spinePronenessEvaluate": values.spinePronenessEvaluate,
            "spineLoad": {
              "Th1/2": values['spineLoad_Th1/2'],
              "Th2/3": values['spineLoad_Th2/3'],
              "Th3/4": values['spineLoad_Th3/4'],
              "Th4/5": values['spineLoad_Th4/5'],
              "Th5/6": values['spineLoad_Th5/6'],
              "Th6/7": values['spineLoad_Th6/7'],
              "Th7/8": values['spineLoad_Th7/8'],
              "Th8/9": values['spineLoad_Th8/9'],
              "Th9/10": values['spineLoad_Th9/10'],
              "Th10/11": values['spineLoad_Th10/11'],
              "Th11/12": values['spineLoad_Th11/12'],
              "Th12/L1": values['spineLoad_Th12/L1'],
              "L1/L2": values['spineLoad_L1/L2'],
              "L2/L3": values['spineLoad_L2/L3'],
              "L3/L4": values['spineLoad_L3/L4'],
              "L4/L5": values['spineLoad_L4/L5'],
              "L5/S1": values['spineLoad_L5/S1'],
            },
            "spineLoadEvaluate": values.spineLoadEvaluate,
            "thoracicCurvature": values.thoracicCurvature,
            "thoracicCurvatureLevel": values.thoracicCurvatureLevel,
            "lumbarCurvature": values.lumbarCurvature,
            "lumbarCurvatureLevel": values.lumbarCurvatureLevel,
            "spinalShape": values.spinalShape,
            "lumbarPainSyndromesRisk": values.lumbarPainSyndromesRisk,
            "lumbarDiseaseRisk": values.lumbarDiseaseRisk,
            "score": values.score,
            "spineSuggestion": values.spineSuggestion,
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

  inputOnchange(event) {
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
      initialValueObj.age = age;
      initialValueObj.part = data.part;
      initialValueObj.count = count;
      initialValueObj['spineErect_Th1/2'] = data.spineErect['Th1/2'] || 0;
      initialValueObj['spineErect_Th2/3'] = data.spineErect['Th2/3'] || 0;
      initialValueObj['spineErect_Th3/4'] = data.spineErect['Th3/4'] || 0;
      initialValueObj['spineErect_Th4/5'] = data.spineErect['Th4/5'] || 0;
      initialValueObj['spineErect_Th5/6'] = data.spineErect['Th5/6'] || 0;
      initialValueObj['spineErect_Th6/7'] = data.spineErect['Th6/7'] || 0;
      initialValueObj['spineErect_Th7/8'] = data.spineErect['Th7/8'] || 0;
      initialValueObj['spineErect_Th8/9'] = data.spineErect['Th8/9'] || 0;
      initialValueObj['spineErect_Th9/10'] = data.spineErect['Th9/10'] || 0;
      initialValueObj['spineErect_Th10/11'] = data.spineErect['Th10/11'] || 0;
      initialValueObj['spineErect_Th11/12'] = data.spineErect['Th11/12'] || 0;
      initialValueObj['spineErect_Th12/L1'] = data.spineErect['Th12/L1'] || 0;
      initialValueObj['spineErect_L1/L2'] = data.spineErect['L1/L2'] || 0;
      initialValueObj['spineErect_L2/L3'] = data.spineErect['L2/L3'] || 0;
      initialValueObj['spineErect_L3/L4'] = data.spineErect['L3/L4'] || 0;
      initialValueObj['spineErect_L4/L5'] = data.spineErect['L4/L5'] || 0;
      initialValueObj['spineErect_L5/S1'] = data.spineErect['L5/S1'] || 0;
      initialValueObj['spineErect_Sac/Hip'] = data.spineErect['Sac/Hip'] || 0;
      initialValueObj.spineErectEvaluate = data.spineErectEvaluate || 0;
      initialValueObj['spineProneness_Th1/2'] = data.spineErect['Th1/2'] || 0;
      initialValueObj['spineProneness_Th2/3'] = data.spineErect['Th2/3'] || 0;
      initialValueObj['spineProneness_Th3/4'] = data.spineErect['Th3/4'] || 0;
      initialValueObj['spineProneness_Th4/5'] = data.spineErect['Th4/5'] || 0;
      initialValueObj['spineProneness_Th5/6'] = data.spineErect['Th5/6'] || 0;
      initialValueObj['spineProneness_Th6/7'] = data.spineErect['Th6/7'] || 0;
      initialValueObj['spineProneness_Th7/8'] = data.spineErect['Th7/8'] || 0;
      initialValueObj['spineProneness_Th8/9'] = data.spineErect['Th8/9'] || 0;
      initialValueObj['spineProneness_Th9/10'] = data.spineErect['Th9/10'] || 0;
      initialValueObj['spineProneness_Th10/11'] = data.spineErect['Th10/11'] || 0;
      initialValueObj['spineProneness_Th11/12'] = data.spineErect['Th11/12'] || 0;
      initialValueObj['spineProneness_Th12/L1'] = data.spineErect['Th12/L1'] || 0;
      initialValueObj['spineProneness_L1/L2'] = data.spineErect['L1/L2'] || 0;
      initialValueObj['spineProneness_L2/L3'] = data.spineErect['L2/L3'] || 0;
      initialValueObj['spineProneness_L3/L4'] = data.spineErect['L3/L4'] || 0;
      initialValueObj['spineProneness_L4/L5'] = data.spineErect['L4/L5'] || 0;
      initialValueObj['spineProneness_L5/S1'] = data.spineErect['L5/S1'] || 0;
      initialValueObj.spinePronenessEvaluate = data.spinePronenessEvaluate || '';
      initialValueObj['spinePronenessTh1/2'] = data.spineErect['Th1/2'] || 0;
      initialValueObj['spineLoad_Th2/3'] = data.spineErect['Th2/3'] || 0;
      initialValueObj['spineLoad_Th3/4'] = data.spineErect['Th3/4'] || 0;
      initialValueObj['spineLoad_Th4/5'] = data.spineErect['Th4/5'] || 0;
      initialValueObj['spineLoad_Th5/6'] = data.spineErect['Th5/6'] || 0;
      initialValueObj['spineLoad_Th6/7'] = data.spineErect['Th6/7'] || 0;
      initialValueObj['spineLoad_Th7/8'] = data.spineErect['Th7/8'] || 0;
      initialValueObj['spineLoad_Th8/9'] = data.spineErect['Th8/9'] || 0;
      initialValueObj['spineLoad_Th9/10'] = data.spineErect['Th9/10'] || 0;
      initialValueObj['spineLoad_Th10/11'] = data.spineErect['Th10/11'] || 0;
      initialValueObj['spineLoad_Th11/12'] = data.spineErect['Th11/12'] || 0;
      initialValueObj['spineLoad_Th12/L1'] = data.spineErect['Th12/L1'] || 0;
      initialValueObj['spineLoad_L1/L2'] = data.spineErect['L1/L2'] || 0;
      initialValueObj['spineLoad_L2/L3'] = data.spineErect['L2/L3'] || 0;
      initialValueObj['spineLoad_L3/L4'] = data.spineErect['L3/L4'] || 0;
      initialValueObj['spineLoad_L4/L5'] = data.spineErect['L4/L5'] || 0;
      initialValueObj['spineLoad_L5/S1'] = data.spineErect['L5/S1'] || 0;
      initialValueObj.spineLoadEvaluate = data.spineLoadEvaluate || '';
      initialValueObj.thoracicCurvatureLevel = data.thoracicCurvatureLevel || '';
      initialValueObj.spinalShape = data.spinalShape || '';
      initialValueObj.lumbarCurvature = data.lumbarCurvature || 0;
      initialValueObj.lumbarCurvatureLevel = data.lumbarCurvatureLevel || '';
      initialValueObj.lumbarDiseaseRisk = data.lumbarDiseaseRisk || '';
      initialValueObj.lumbarPainSyndromesRisk = data.lumbarPainSyndromesRisk || '';
      initialValueObj.thoracicCurvature = data.thoracicCurvature || '';
      initialValueObj.spineSuggestion = data.spineSuggestion || '';
      initialValueObj.score = data.score || 0;
    }
    const item1 = [{
      title: 'Th1/2',
      dataIndex: 'Th1/2',
      key: 'Th1/2',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('spineErect_Th1/2', {
             initialValue: initialValueObj['spineErect_Th1/2'] || 0,
           })(<Input className={styles.constitutionInputForSpine}/>)}
        </FormItem>
      ),
    },
      {
        title: 'Th2/3',
        dataIndex: 'Th2/3',
        key: 'Th2/3',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th2/3', {
               initialValue: initialValueObj['spineErect_Th2/3'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th3/4',
        dataIndex: 'Th3/4',
        key: 'Th3/4',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th3/4', {
               initialValue: initialValueObj['spineErect_Th3/4'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th4/5',
        dataIndex: 'Th4/5',
        key: 'Th4/5',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th4/5', {
               initialValue: initialValueObj['spineErect_Th4/5'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th5/6',
        dataIndex: 'Th5/6',
        key: 'Th5/6',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th5/6', {
               initialValue: initialValueObj['spineErect_Th5/6'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th6/7',
        dataIndex: 'Th6/7',
        key: 'Th6/7',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th6/7', {
               initialValue: initialValueObj['spineErect_Th4/5'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th7/8',
        dataIndex: 'Th7/8',
        key: 'Th7/8',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th7/8', {
               initialValue: initialValueObj['spineErect_Th7/8'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th8/9',
        dataIndex: 'Th8/9',
        key: 'Th8/9',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th8/9', {
               initialValue: initialValueObj['spineErect_Th8/9'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th9/10',
        dataIndex: 'Th9/10',
        key: 'Th9/10',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th9/10', {
               initialValue: initialValueObj['spineErect_Th9/10'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th10/11',
        dataIndex: 'Th10/11',
        key: 'Th10/11',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th10/11', {
               initialValue: initialValueObj['spineErect_Th10/11'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th11/12',
        dataIndex: 'Th11/12',
        key: 'Th11/12',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th11/12', {
               initialValue: initialValueObj['spineErect_Th11/12'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
          ),
      },
      {
        title: 'Th12/L1',
        dataIndex: 'Th12/L1',
        key: 'Th12/L1',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_Th12/L1', {
               initialValue: initialValueObj['spineErect_Th12/L1'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L1/L2',
        dataIndex: 'L1/L2',
        key: 'L1/L2',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_L1/L2', {
               initialValue: initialValueObj['spineErect_L1/L2'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L2/L3',
        dataIndex: 'L2/L3',
        key: 'L2/L3',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_L2/L3', {
               initialValue: initialValueObj['spineErect_L2/L3'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L3/L4',
        dataIndex: 'L3/L4',
        key: 'L3/L4',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_L3/L4', {
               initialValue: initialValueObj['spineErect_L3/L4'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L4/L5',
        dataIndex: 'L4/L5',
        key: 'L4/L5',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineErect_L4/L5', {
               initialValue: initialValueObj['spineErect_L4/L5'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L5/S1',
        dataIndex: 'L5/S1',
        key: 'L5/S1',
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator('spineErect_L5/S1', {
              initialValue: initialValueObj['spineErect_L5/S1'] || 0,
            })(
              <Input className={styles.constitutionInputForSpine}/>)
            }
          </FormItem>
        ),
      }, {
        title: 'Sac/Hip',
        dataIndex: 'Sac/Hip',
        key: 'Sac/Hip',
        render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('spineErect_Sac/Hip', {
             initialValue: initialValueObj['spineErect_Sac/Hip'] || 0,
           })(<Input className={styles.constitutionInputForSpine}/>)}
        </FormItem>
      )}, {
        title: '脊柱-姿势(直立)',
        dataIndex: 'spineErectEvaluate',
        key: 'spineErectEvaluate',
        width: '150px',
        render: (text, record, index) => (
        <FormItem>
          {getFieldDecorator('spineErectEvaluate', {
            initialValue: initialValueObj.spineErectEvaluate || '良好',
          })(
            <Select placeholder='请选择' className={styles.constitutionInputForSpine}>
               <Option className={styles.cellItem} value='优秀'>优秀</Option>
               <Option className={styles.cellItem} value='良好'>良好</Option>
               <Option className={styles.cellItem} value='中等'>中等</Option>
               <Option className={styles.cellItem} value='稍差'>稍差</Option>
               <Option className={styles.cellItem} value='差'>差</Option>
            </Select>
          )}
        </FormItem>
      )}];

    const item2 = [{
      title: 'Th1/2',
      dataIndex: 'Th1/2',
      key: 'Th1/2',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('spineProneness_Th1/2', {
             initialValue: initialValueObj['spineProneness_Th1/2'] || 0,
           })(<Input className={styles.constitutionInputForSpine}/>)}
        </FormItem>
      ),
    },
      {
        title: 'Th2/3',
        dataIndex: 'Th2/3',
        key: 'Th2/3',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th2/3', {
               initialValue: initialValueObj['spineProneness_Th2/3'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th3/4',
        dataIndex: 'Th3/4',
        key: 'Th3/4',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th3/4', {
               initialValue: initialValueObj['spineProneness_Th3/4'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th4/5',
        dataIndex: 'Th4/5',
        key: 'Th4/5',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th4/5', {
               initialValue: initialValueObj['spineProneness_Th4/5'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th5/6',
        dataIndex: 'Th5/6',
        key: 'Th5/6',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th5/6', {
               initialValue: initialValueObj['spineProneness_Th5/6'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th6/7',
        dataIndex: 'Th6/7',
        key: 'Th6/7',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th6/7', {
               initialValue: initialValueObj['spineProneness_Th6/7'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th7/8',
        dataIndex: 'Th7/8',
        key: 'Th7/8',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th7/8', {
               initialValue: initialValueObj['spineProneness_Th7/8'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th8/9',
        dataIndex: 'Th8/9',
        key: 'Th8/9',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th8/9', {
               initialValue: initialValueObj['spineProneness_Th8/9'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th9/10',
        dataIndex: 'Th9/10',
        key: 'Th9/10',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th9/10', {
               initialValue: initialValueObj['spineProneness_Th9/10'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th10/11',
        dataIndex: 'Th10/11',
        key: 'Th10/11',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th10/11', {
               initialValue: initialValueObj['spineProneness_Th10/11'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th11/12',
        dataIndex: 'Th11/12',
        key: 'Th11/12',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th11/12', {
               initialValue: initialValueObj['spineProneness_Th11/12'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
          ),
      },
      {
        title: 'Th12/L1',
        dataIndex: 'Th12/L1',
        key: 'Th12/L1',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_Th12/L1', {
               initialValue: initialValueObj['spineProneness_Th12/L1'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L1/L2',
        dataIndex: 'L1/L2',
        key: 'L1/L2',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_L1/L2', {
               initialValue: initialValueObj['spineProneness_L1/L2'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L2/L3',
        dataIndex: 'L2/L3',
        key: 'L2/L3',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_L2/L3', {
               initialValue: initialValueObj['spineProneness_L2/L3'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L3/L4',
        dataIndex: 'L3/L4',
        key: 'L3/L4',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_L3/L4', {
               initialValue: initialValueObj['spineProneness_L3/L4'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L4/L5',
        dataIndex: 'L4/L5',
        key: 'L4/L5',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineProneness_L4/L5', {
               initialValue: initialValueObj['spineProneness_L4/L5'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L5/S1',
        dataIndex: 'L5/S1',
        key: 'L5/S1',
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator('spineProneness_L5/S1', {
              initialValue: initialValueObj['spineProneness_L5/S1'] || 0,
            })(
              <Input className={styles.constitutionInputForSpine}/>)
            }
          </FormItem>
        ),
      }, {
        title: '脊柱-柔韧性(直立-前屈)',
        dataIndex: 'spinePronenessEvaluate',
        key: 'spinePronenessEvaluate',
        width: '150px',
        render: (text, record, index) => (
        <FormItem>
          {getFieldDecorator('spinePronenessEvaluate', {
            initialValue: initialValueObj.spinePronenessEvaluate || '正常',
          })(
            <Select placeholder='请选择' className={styles.constitutionInputForSpine}>
               <Option className={styles.cellItem} value='优秀'>优秀</Option>
               <Option className={styles.cellItem} value='良好'>良好</Option>
               <Option className={styles.cellItem} value='正常'>正常</Option>
               <Option className={styles.cellItem} value='稍差'>稍差</Option>
               <Option className={styles.cellItem} value='差'>差</Option>
            </Select>
          )}
        </FormItem>
      )}];

    const item3 = [{
      title: 'Th1/2',
      dataIndex: 'Th1/2',
      key: 'Th1/2',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('spineLoad_Th1/2', {
             initialValue: initialValueObj['spineLoad_Th1/2'] || 0,
           })(<Input className={styles.constitutionInputForSpine}/>)}
        </FormItem>
      ),
    },
      {
        title: 'Th2/3',
        dataIndex: 'Th2/3',
        key: 'Th2/3',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th2/3', {
               initialValue: initialValueObj['spineLoad_Th2/3'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th3/4',
        dataIndex: 'Th3/4',
        key: 'Th3/4',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th3/4', {
               initialValue: initialValueObj['spineLoad_Th3/4'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th4/5',
        dataIndex: 'Th4/5',
        key: 'Th4/5',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th4/5', {
               initialValue: initialValueObj['spineLoad_Th4/5'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th5/6',
        dataIndex: 'Th5/6',
        key: 'Th5/6',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th5/6', {
               initialValue: initialValueObj['spineLoad_Th5/6'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th6/7',
        dataIndex: 'Th6/7',
        key: 'Th6/7',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th6/7', {
               initialValue: initialValueObj['spineLoad_Th6/7'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th7/8',
        dataIndex: 'Th7/8',
        key: 'Th7/8',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th7/8', {
               initialValue: initialValueObj['spineLoad_Th7/8'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th8/9',
        dataIndex: 'Th8/9',
        key: 'Th8/9',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th8/9', {
               initialValue: initialValueObj['spineLoad_Th8/9'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th9/10',
        dataIndex: 'Th9/10',
        key: 'Th9/10',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th9/10', {
               initialValue: initialValueObj['spineLoad_Th9/10'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th10/11',
        dataIndex: 'Th10/11',
        key: 'Th10/11',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th10/11', {
               initialValue: initialValueObj['spineLoad_Th10/11'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'Th11/12',
        dataIndex: 'Th11/12',
        key: 'Th11/12',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th11/12', {
               initialValue: initialValueObj['spineLoad_Th11/12'] || 0,
             })(<Input className={styles.constitutionInputForSpineForSpine}/>)}
          </FormItem>
          ),
      },
      {
        title: 'Th12/L1',
        dataIndex: 'Th12/L1',
        key: 'Th12/L1',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_Th12/L1', {
               initialValue: initialValueObj['spineLoad_Th12/L1'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L1/L2',
        dataIndex: 'L1/L2',
        key: 'L1/L2',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_L1/L2', {
               initialValue: initialValueObj['spineLoad_L1/L2'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L2/L3',
        dataIndex: 'L2/L3',
        key: 'L2/L3',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_L2/L3', {
               initialValue: initialValueObj['spineLoad_L2/L3'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L3/L4',
        dataIndex: 'L3/L4',
        key: 'L3/L4',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_L3/L4', {
               initialValue: initialValueObj['spineLoad_L3/L4'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L4/L5',
        dataIndex: 'L4/L5',
        key: 'L4/L5',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('spineLoad_L4/L5', {
               initialValue: initialValueObj['spineLoad_L4/L5'] || 0,
             })(<Input className={styles.constitutionInputForSpine}/>)}
          </FormItem>
        ),
      },
      {
        title: 'L5/S1',
        dataIndex: 'L5/S1',
        key: 'L5/S1',
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator('spineLoad_L5/S1', {
              initialValue: initialValueObj['spineLoad_L5/S1'] || 0,
            })(
              <Input className={styles.constitutionInputForSpine}/>)
            }
          </FormItem>
        ),
      }, {
        title: '脊柱－稳定性(直立－负重)',
        dataIndex: 'spineLoadEvaluate',
        key: 'spineLoadEvaluate',
        width: '150px',
        render: (text, record, index) => (
        <FormItem>
          {getFieldDecorator('spineLoadEvaluate', {
            initialValue: initialValueObj.spineLoadEvaluate || '良好',
          })(
            <Select placeholder='请选择' className={styles.constitutionInputForSpine}>
               <Option className={styles.cellItem} value='优秀'>优秀</Option>
               <Option className={styles.cellItem} value='良好'>良好</Option>
               <Option className={styles.cellItem} value='中等'>中等</Option>
               <Option className={styles.cellItem} value='稍差'>稍差</Option>
               <Option className={styles.cellItem} value='差'>差</Option>
            </Select>
          )}
        </FormItem>
      )}];

    const item4 = [{
      title: '胸椎曲度值',
      dataIndex: 'thoracicCurvature',
      key: 'thoracicCurvature',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('thoracicCurvature', {
             initialValue: initialValueObj.thoracicCurvature || 0
           })(<Input className={styles.constitutionInput}/>)}
        </FormItem>
      ),
    }, {
      title: '胸椎曲度类型',
      dataIndex: 'thoracicCurvatureLevel',
      key: 'thoracicCurvatureLevel',
      render: (text, record, index) => (
        <FormItem>
          {getFieldDecorator('thoracicCurvatureLevel', {
            initialValue: initialValueObj.thoracicCurvatureLevel || '正常',
          })(
            <Select placeholder='请选择' className={styles.cellItem}>
             <Option className={styles.cellItem} value='曲度变小'>曲度变小</Option>
             <Option className={styles.cellItem} value='正常'>正常</Option>
             <Option className={styles.cellItem} value='曲度变大'>曲度变大</Option>
          </Select>)}
        </FormItem>
      ),
    }, {
      title: '腰椎曲度值',
      dataIndex: 'lumbarCurvature',
      key: 'lumbarCurvature',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('lumbarCurvature', {
             initialValue: initialValueObj.lumbarCurvature || 0
           })(
             <Input className={styles.constitutionInput}/>)}
        </FormItem>
      ),
    }, {
      title: '腰椎曲度类型',
      dataIndex: 'lumbarCurvatureLevel',
      key: 'lumbarCurvatureLevel',
      render: (text, record, index) => (
        <FormItem>
          {getFieldDecorator('lumbarCurvatureLevel', {
            initialValue: initialValueObj.lumbarCurvatureLevel || '正常',
          })(
            <Select placeholder='请选择' className={styles.cellItem}>
               <Option className={styles.cellItem} value='曲度变小'>曲度变小</Option>
               <Option className={styles.cellItem} value='正常'>正常</Option>
               <Option className={styles.cellItem} value='曲度变大'>曲度变大</Option>
            </Select>
          )}
        </FormItem>
      ),
    }, {
      title: '脊柱形态',
      dataIndex: 'spinalShape',
      key: 'spinalShape',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('spinalShape', {
             initialValue: initialValueObj.spinalShape || '正常背',
           })(
             <Select placeholder='请选择' className={styles.cellItem}>
              <Option className={styles.cellItem} value='正常背'>正常背</Option>
              <Option className={styles.cellItem} value='腰椎前凸'>腰椎前凸</Option>
              <Option className={styles.cellItem} value='驼背趋势'>驼背趋势</Option>
              <Option className={styles.cellItem} value='直背趋势'>直背趋势</Option>
              <Option className={styles.cellItem} value='鞍背趋势'>鞍背趋势</Option>
           </Select>)}
        </FormItem>
      ),
    }, {
      title: '腰部疼痛综合症风险',
      dataIndex: 'lumbarPainSyndromesRisk',
      key: 'lumbarPainSyndromesRisk',
      render: (text, record, index) => (
        <FormItem>
          {getFieldDecorator('lumbarPainSyndromesRisk', {
            initialValue: initialValueObj.lumbarPainSyndromesRisk || '一般',
          })(
            <Select placeholder='请选择' className={styles.cellItem}>
             <Option className={styles.cellItem} value='一般'>一般</Option>
             <Option className={styles.cellItem} value='偏高'>偏高</Option>
             <Option className={styles.cellItem} value='高'>高</Option>
          </Select>)}
        </FormItem>
      ),
    }, {
      title: '腰椎（椎间盘）疾病风险',
      dataIndex: 'lumbarDiseaseRisk',
      key: 'lumbarDiseaseRisk',
      render: (text, record, index) => (
        <FormItem>
           {getFieldDecorator('lumbarDiseaseRisk', {
             initialValue: initialValueObj.lumbarDiseaseRisk || '一般',
           }
         )(<Select placeholder='请选择' className={styles.cellItem}>
              <Option className={styles.cellItem} value='一般'>一般</Option>
              <Option className={styles.cellItem} value='偏高'>偏高</Option>
              <Option className={styles.cellItem} value='高'>高</Option>
           </Select>)}
        </FormItem>
      ),
    }
  ];
    const tables = [{
      header: '脊柱-姿势(直立)',
      key: 'spineErect',
      items: item1,
    }, {
      header: '脊柱－柔韧性(直立-前驱)',
      key: 'spineProneness',
      items: item2,
    }, {
      header: '脊柱－稳定性(直立－负重)',
      key: 'spineLoad',
      items: item3,
    }, {
      header: '脊柱形态与健康风险分析',
      key: 'healthAnalyze',
      items: item4,
    }];

    const items = [];
    tables.map((table) => {
      const dataItem = {label: '', key: '',
      jsx: <ReportAnalyze columns={table.items} className='spineTable' data={datas}/>};
      const { header, key } = table;
      dataItem.label = header;
      dataItem.key = key;
      items.push(dataItem);
    });

    const suggestion = getFieldDecorator('spineSuggestion', {
      initialValue: initialValueObj.spineSuggestion || '',
    })(<div style={{marginTop: '50px'}}>
      <span style={{fontSize: '16px', fontWeight: 'bold'}}>结果建议</span>
      <FormItem style={{marginTop: '10px'}}>
        {getFieldDecorator('spineSuggestion', {
          initialValue: initialValueObj.spineSuggestion || '',
        })(<Input type="textarea" rows={4} placeholder='文字内容'/>)}
      </FormItem>
    </div>);

    const score = getFieldDecorator('score', {
      initialValue: initialValueObj.score || '',
    })(<div style={{marginTop: '50px'}}>
      <span style={{fontSize: '16px', fontWeight: 'bold'}}>综合评分</span>
      <FormItem style={{marginTop: '10px'}}>
        {getFieldDecorator('score', {
          initialValue: initialValueObj.score || '',
        })(<Input type="number" placeholder='77'/>)}
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
        title={'脊柱功能'}
        suggestion1={suggestion}
        score={score}
      />
    );
  }
}));
export default SpineFunction;
