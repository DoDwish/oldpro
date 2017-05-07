import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import MyForm from '../../components/Edit/Form';
import ReportAnalyze from './ReportAnalyze';
import ContitutionRecordForm from './ContitutionRecordForm';
const FormItem = Form.Item;
const Option = Select.Option;
const styles = require('./Constitution.scss');

const BodyComposition = Form.create()(React.createClass({

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
          title: '广东省体成分评定报告',
          count: values.count,
          time: reportTime,
          type: '体成分',
          school: currentSchool,
          schoolYear: schoolYear,
          class: currentClass,
          student: currentStudent,
          age: values.age,
          data: {
            'part': values.part,
            'height': values.height,
            'heightLevel': values.heightLevel,
            'weight': values.weight,
            'weightLevel': values.weightLevel,
            'degreaseWeight': values.degreaseWeight,
            'muscle': values.muscle,
            'muscleLevel': values.muscleLevel,
            'bodyMoisture': values.bodyMoisture,
            'intracellularFluid': values.intracellularFluid,
            'extracellularFluid': values.extracellularFluid,
            'protein': values.protein,
            'bone': values.bone,
            'fat': values.fat,
            'bodyFat': values.bodyFat,
            'bodyFatLevel': values.bodyFatLevel,
            'BMI': values['BMI'],
            'BMILevel': values.BMILevel,
            'basalMetabolic': values.basalMetabolic,
            'energyMetabolism': values.energyMetabolism,
            'swellingIndex': values.swellingIndex,
            'swellingIndexLevel': values.swellingIndexLevel,
            'viscelralFatRating': values.viscelralFatRating,
            'viscelralFatRatingLevel': values.viscelralFatRatingLevel,
            'VFAMRI': values.VFAMRI,
            'visceralAdiposity': values.visceralAdiposity,
            'subcutaneousFatContent': values.subcutaneousFatContent,
            'WHR': values.WHR,
            'WHRLevel': values.WHRLevel,
            'abdominalObesity': values.abdominalObesity,
            'fatDistribution': values.fatDistribution,
            'leftUpperLimbMuscle': values.leftUpperLimbMuscle,
            'leftUpperLimbFat': values.leftUpperLimbFat,
            'leftUpperLimbBodyFat': values.leftUpperLimbBodyFat,
            'rightUpperLimbMuscle': values.rightUpperLimbMuscle,
            'rightUpperLimbFat': values.rightUpperLimbFat,
            'rightUpperLimbBodyFat': values.rightUpperLimbBodyFat,
            'torsoUpperLimbMuscle': values.torsoUpperLimbMuscle,
            'torsoUpperLimbFat': values.torsoUpperLimbFat,
            'torsoUpperLimbBodyFat': values.torsoUpperLimbBodyFat,
            'leftLowerLimbMuscle': values.leftLowerLimbMuscle,
            'leftLowerLimbFat': values.leftLowerLimbFat,
            'leftLowerLimbBodyFat': values.leftLowerLimbBodyFat,
            'rightLowerLimbMuscle': values.rightLowerLimbMuscle,
            'rightLowerLimbFat': values.rightLowerLimbFat,
            'rightLowerLimbBodyFat': values.rightLowerLimbBodyFat,
            'goalWeight': values.goalWeight,
            'weightControl': values.weightControl,
            'fatControl': values.fatControl,
            'muscleControl': values.muscleControl,
            'score': values.score,
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
      height: '',
      weight: 73.3,
      firstPowerRate: 93,
      secondPowerRate: 104,
      functionalCapacity: 12.7,
      cardioStandard: '过高',
      maxOxygenUptakeValues: 44,
      maxAbsoluteOxygenUptake: 3.23,
    }];
    let initialValueObj = {};
    const data = this.props.reportItem ? this.props.reportItem.data : {};
    const count = this.props.reportItem ? this.props.reportItem.count : '';
    const age = this.props.reportItem ? this.props.reportItem.age : '';

    if (data) {
      initialValueObj.count = count || '';
      initialValueObj.age = age || 0;
      initialValueObj.height = data.height || 0;
      initialValueObj.heightLevel = data.heightLevel || '';
      initialValueObj.weight = data.weight || 0;
      initialValueObj.weightLevel = data.weightLevel || '';
      initialValueObj.degreaseWeight = data.degreaseWeight || 0;
      initialValueObj.muscle = data.muscle || 0;
      initialValueObj.protein = data.protein || 0;
      initialValueObj.bone = data.bone || 0;
      initialValueObj.fat = data.fat || 0;
      initialValueObj.bodyFat = data.bodyFat || 0;
      initialValueObj.bodyFatLevel = data.bodyFatLevel || '';
      initialValueObj['BMI'] = data['BMI'] || 0;
      initialValueObj.BMILevel = data.BMILevel || '';
      initialValueObj.bodyMoisture = data.bodyMoisture || 0;
      initialValueObj.intracellularFluid = data.intracellularFluid || 0;
      initialValueObj.extracellularFluid = data.extracellularFluid || 0;
      initialValueObj.basalMetabolic = data.basalMetabolic || 0;
      initialValueObj.energyMetabolism = data.energyMetabolism || 0;
      initialValueObj.swellingIndex = data.swellingIndex || 0;
      initialValueObj.swellingIndexLevel = data.swellingIndexLevel || '';
      initialValueObj.viscelralFatRating = data.viscelralFatRating || 0;
      initialValueObj.viscelralFatRatingLevel = data.viscelralFatRatingLevel || '';
      initialValueObj['VFAMRI'] = data['VFAMRI'] || 0;
      initialValueObj.visceralAdiposity = data.visceralAdiposity || 0;
      initialValueObj.subcutaneousFatContent = data.subcutaneousFatContent || 0;
      initialValueObj['WHR'] = data['WHR'] || 0;
      initialValueObj.WHRLevel = data.WHRLevel || '';
      initialValueObj.abdominalObesity = data.abdominalObesity || '';
      initialValueObj.fatDistribution = data.fatDistribution || 0;
      initialValueObj.leftUpperLimbMuscle = data.leftUpperLimbMuscle || 0;
      initialValueObj.leftUpperLimbFat = data.leftUpperLimbFat || 0;
      initialValueObj.leftUpperLimbBodyFat = data.leftUpperLimbBodyFat || 0;
      initialValueObj.maxAbsoluteOxygenUptake = data.maxAbsoluteOxygenUptake || 0;
      initialValueObj.rightUpperLimbMuscle = data.rightUpperLimbMuscle || 0;
      initialValueObj.rightUpperLimbFat = data.rightUpperLimbFat || 0;
      initialValueObj.rightUpperLimbBodyFat = data.rightUpperLimbBodyFat || 0;
      initialValueObj.torsoUpperLimbMuscle = data.torsoUpperLimbMuscle || 0;
      initialValueObj.torsoUpperLimbFat = data.torsoUpperLimbFat || 0;
      initialValueObj.torsoUpperLimbBodyFat = data.torsoUpperLimbBodyFat || 0;
      initialValueObj.leftLowerLimbMuscle = data.leftLowerLimbMuscle || 0;
      initialValueObj.leftLowerLimbFat = data.leftLowerLimbFat || 0;
      initialValueObj.leftLowerLimbBodyFat = data.leftLowerLimbBodyFat || 0;
      initialValueObj.rightLowerLimbMuscle = data.rightLowerLimbMuscle || 0;
      initialValueObj.rightLowerLimbFat = data.rightLowerLimbFat || 0;
      initialValueObj.rightLowerLimbBodyFat = data.rightLowerLimbBodyFat || 0;
      initialValueObj.goalWeight = data.goalWeight || 0;
      initialValueObj.weightControl = data.weightControl || 0;
      initialValueObj.fatControl = data.fatControl || 0;
      initialValueObj.muscleControl = data.muscleControl || 0;
      initialValueObj.muscleLevel = data.muscleLevel || '';
      initialValueObj.score = data.score || 0;
    }
    const tables = [{
      header: '测定结果',
      key: 'compositionAnalyze',
      items: [{
        title: '身高(cm)',
        dataIndex: 'height',
        key: 'height',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('height', {
               initialValue: initialValueObj.height || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '身高标准',
        dataIndex: 'heightLevel',
        key: 'heightLevel',
        width: '150px',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('heightLevel', {
               initialValue: initialValueObj.heightLevel || '标准',
             })(
               <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                  <Option className={styles.cellItem} value='高'>高</Option>
                  <Option className={styles.cellItem} value='标准'>标准</Option>
                  <Option className={styles.cellItem} value='低'>低</Option>
               </Select>)}
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
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '体重标准',
        dataIndex: 'weightLevel',
        key: 'weightLevel',
        width: '150px',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('weightLevel', {
               initialValue: initialValueObj.weightLevel || '标准',
             })(
               <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='高'>高</Option>
                <Option className={styles.cellItem} value='标准'>标准</Option>
                <Option className={styles.cellItem} value='低'>低</Option>
             </Select>)}
          </FormItem>
        ),
      }, {
        title: '去脂体重(kg)',
        dataIndex: 'degreaseWeight',
        key: 'degreaseWeight',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('degreaseWeight', {
               initialValue: initialValueObj.degreaseWeight || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '肌肉量(kg)',
        dataIndex: 'muscle',
        key: 'muscle',
        render: (text, record, index) => (
          <FormItem>
            {getFieldDecorator('muscle', {
              initialValue: initialValueObj.muscle || 0,
            })(
              <Input type='number' type='number' className={styles.constitutionInput}/>
            )}
          </FormItem>
        ),
      }, {
        title: '身体水分(cm)',
        dataIndex: 'bodyMoisture',
        key: 'bodyMoisture',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('bodyMoisture', {
               initialValue: initialValueObj.bodyMoisture || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '细胞內液',
        dataIndex: 'intracellularFluid',
        key: 'intracellularFluid',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('intracellularFluid', {
               initialValue: initialValueObj.intracellularFluid || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '细胞外液',
        dataIndex: 'extracellularFluid',
        key: 'extracellularFluid',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('extracellularFluid', {
               initialValue: initialValueObj.extracellularFluid || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '蛋白质',
        dataIndex: 'protein',
        key: 'protein',

        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('protein', {
               initialValue: initialValueObj.protein || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '推定骨量',
        dataIndex: 'bone',
        key: 'bone',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('bone', {
               initialValue: initialValueObj.bone || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '脂肪量',
        dataIndex: 'fat',
        key: 'fat',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('fat', {
               initialValue: initialValueObj.fat || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '体脂肪率 Fat%',
        dataIndex: 'bodyFat',
        key: 'bodyFat',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('bodyFat', {
               initialValue: initialValueObj.bodyFat || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '体脂肪率类型',
        dataIndex: 'bodyFatLevel',
        key: 'bodyFatLevel',
        width: '150px',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('bodyFatLevel', {
               initialValue: initialValueObj.bodyFatLevel || '标准',
             })(
               <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='肥胖'>肥胖</Option>
                <Option className={styles.cellItem} value='脂肪过高'>脂肪过高</Option>
                <Option className={styles.cellItem} value='标准'>标准</Option>
                <Option className={styles.cellItem} value='过低'>过低</Option>
             </Select>
           )}
          </FormItem>
        ),
      }, {
        title: '身体质量指数',
        dataIndex: 'BMI',
        key: 'BMI',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('BMI', {
               initialValue: initialValueObj['BMI'] || 0,
             })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
          </FormItem>
        ),
      }, {
        title: '身体质量指数类型',
        dataIndex: 'BMILevel',
        key: 'BMILevel',
        width: '150px',
        render: (text, record, index) => (
          <FormItem>
             {getFieldDecorator('BMILevel', {
               initialValue: initialValueObj.BMILevel || '标准',
             })(
              <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
              <Option className={styles.cellItem} value='超重'>超重</Option>
              <Option className={styles.cellItem} value='标准'>标准</Option>
              <Option className={styles.cellItem} value='低体重'>低体重</Option>
           </Select>)}
          </FormItem>
        ),
      }],
    }, {
      header: '体型分析',
      key: 'bodyShapeAnalyze',
      items: [
        {
          title: '体脂肪率类型',
          dataIndex: 'bodyFatLevel',
          key: 'bodyFatLevel',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('bodyFatLevel', {
                 initialValue: initialValueObj.bodyFatLevel || '标准',
               })(
                <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                  <Option className={styles.cellItem} value='肥胖'>肥胖</Option>
                  <Option className={styles.cellItem} value='脂肪过高'>脂肪过高</Option>
                  <Option className={styles.cellItem} value='标准'>标准</Option>
                  <Option className={styles.cellItem} value='过低'>过低</Option>
                </Select>)}
            </FormItem>
          ),
        },
        {
          title: '肌肉量级别',
          dataIndex: 'muscleLevel',
          key: 'muscleLevel',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('muscleLevel', {
                 initialValue: initialValueObj.muscleLevel || '平均',
               })(
                <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='多'>多</Option>
                <Option className={styles.cellItem} value='平均'>平均</Option>
                <Option className={styles.cellItem} value='少'>少</Option>
             </Select>)}
            </FormItem>
          ),
        },
        {
          title: '基础代谢(kcal)',
          dataIndex: 'basalMetabolic',
          key: 'basalMetabolic',
          render: (text, record, index) => (
            <FormItem>
              {getFieldDecorator('basalMetabolic', {
                initialValue: initialValueObj.basalMetabolic || 0,
              })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '总能量代谢(kcal)',
          dataIndex: 'energyMetabolism',
          key: 'energyMetabolism',
          render: (text, record, index) => (
            <FormItem>
              {getFieldDecorator('energyMetabolism', {
                initialValue: initialValueObj.energyMetabolism || 0,
              })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '浮肿指数',
          dataIndex: 'swellingIndex',
          key: 'swellingIndex',
          render: (text, record, index) => (
            <FormItem>
              {getFieldDecorator('swellingIndex', {
                initialValue: initialValueObj.swellingIndex || 0,
              })(<Input type='number' type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '浮肿指数级别',
          dataIndex: 'swellingIndexLevel',
          key: 'swellingIndexLevel',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('swellingIndexLevel', {
                 initialValue: initialValueObj.swellingIndexLevel || '正常',
               })(
                 <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                 <Option className={styles.cellItem} value='高'>高</Option>
                 <Option className={styles.cellItem} value='正常'>正常</Option>
                 <Option className={styles.cellItem} value='低'>低</Option>
              </Select>)}
            </FormItem>
          ),
        }
      ]
    }, {
      header: '腹部肥胖分析',
      key: 'fatAnalyze',
      items: [
        {
          title: '内脏脂肪数值',
          dataIndex: 'viscelralFatRating',
          key: 'viscelralFatRating',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('viscelralFatRating', {
                 initialValue: initialValueObj.viscelralFatRating || 0,
               })(
                <Input type='number' type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '内脏脂肪等级',
          dataIndex: 'viscelralFatRatingLevel',
          key: 'viscelralFatRatingLevel',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('viscelralFatRatingLevel', {
                 initialValue: initialValueObj.viscelralFatRatingLevel || '正常',
               })(
                <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='偏高'>偏高</Option>
                <Option className={styles.cellItem} value='高'>高</Option>
                <Option className={styles.cellItem} value='正常'>正常</Option>
             </Select>)}
            </FormItem>
          ),
        },
        {
          title: '内脏脂肪面积',
          dataIndex: 'VFAMRI',
          key: 'VFAMRI',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('VFAMRI', {
                 initialValue: initialValueObj['VFAMRI'] || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '内脏脂肪含量(kg)',
          dataIndex: 'visceralAdiposity',
          key: 'visceralAdiposity',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('visceralAdiposity', {
                 initialValue: initialValueObj.visceralAdiposity || 0,
               })(
                <Input type='number' type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '皮下脂肪含量(kg)',
          dataIndex: 'subcutaneousFatContent',
          key: 'subcutaneousFatContent',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('subcutaneousFatContent', {
                 initialValue: initialValueObj.subcutaneousFatContent || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '腰臀比数值',
          dataIndex: 'WHR',
          key: 'WHR',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('WHR', {
                 initialValue: initialValueObj['WHR'] || 0,
               })(
                < Input className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '腰臀比',
          dataIndex: 'WHRLevel',
          key: 'WHRLevel',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('WHRLevel', {
                 initialValue: initialValueObj.WHRLevel || '正常',
               })(
                <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='高'>高</Option>
                <Option className={styles.cellItem} value='正常'>正常</Option>
                <Option className={styles.cellItem} value='低'>低</Option>
             </Select>)}
            </FormItem>
          ),
        },
        {
          title: '腹部肥胖',
          dataIndex: 'abdominalObesity',
          key: 'abdominalObesity',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('abdominalObesity', {
                 initialValue: initialValueObj.abdominalObesity || '正常',
               })(
                <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='内脏型'>内脏型</Option>
                <Option className={styles.cellItem} value='正常'>正常</Option>
                <Option className={styles.cellItem} value='皮下型'>皮下型</Option>
             </Select>)}
            </FormItem>
          ),
        },
        {
          title: '肥胖分布',
          dataIndex: 'fatDistribution',
          key: 'fatDistribution',
          width: '150px',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('fatDistribution', {
                 initialValue: initialValueObj.fatDistribution || '正常',
               })(
                <Select placeholder='请选择' className={styles.cellItem} placeholder='请选择'>
                <Option className={styles.cellItem} value='苹果型'>苹果型</Option>
                <Option className={styles.cellItem} value='正常'>正常</Option>
                <Option className={styles.cellItem} value='梨型'>梨型</Option>
             </Select>)}
            </FormItem>
          ),
        }
      ]
    }, {
      header: '阶段性分析',
      key: 'segmentalAnalyze',
      items: [
        {
          title: '左上肢-肌肉量(kg)',
          dataIndex: 'leftUpperLimbMuscle',
          key: 'leftUpperLimbMuscle',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftUpperLimbMuscle', {
                 initialValue: initialValueObj.leftUpperLimbMuscle || 0,
               })(
                <Input type='number' type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '左上肢-脂肪量(kg)',
          dataIndex: 'leftUpperLimbFat',
          key: 'leftUpperLimbFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftUpperLimbFat', {
                 initialValue: initialValueObj.leftUpperLimbFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '左上肢-脂肪率(%)',
          dataIndex: 'leftUpperLimbBodyFat',
          key: 'leftUpperLimbBodyFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftUpperLimbBodyFat', {
                 initialValue: initialValueObj.leftUpperLimbBodyFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '右上肢-肌肉量(kg)',
          dataIndex: 'rightUpperLimbMuscle',
          key: 'rightUpperLimbMuscle',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('rightUpperLimbMuscle', {
                 initialValue: initialValueObj.rightUpperLimbMuscle || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '右上肢-脂肪量(kg)',
          dataIndex: 'rightUpperLimbFat',
          key: 'rightUpperLimbFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('rightUpperLimbFat', {
                 initialValue: initialValueObj.rightUpperLimbFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '右上肢-脂肪率(%)',
          dataIndex: 'rightUpperLimbBodyFat',
          key: 'rightUpperLimbBodyFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('rightUpperLimbBodyFat', {
                 initialValue: initialValueObj.rightUpperLimbBodyFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '躯干-肌肉量(kg)',
          dataIndex: 'torsoUpperLimbMuscle',
          key: 'torsoUpperLimbMuscle',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('torsoUpperLimbMuscle', {
                 initialValue: initialValueObj.torsoUpperLimbMuscle || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '躯干-脂肪量(kg)',
          dataIndex: 'torsoUpperLimbFat',
          key: 'torsoUpperLimbFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('torsoUpperLimbFat', {
                 initialValue: initialValueObj.torsoUpperLimbFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '躯干-脂肪率(%)',
          dataIndex: 'torsoUpperLimbBodyFat',
          key: 'torsoUpperLimbBodyFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('torsoUpperLimbBodyFat', {
                 initialValue: initialValueObj.torsoUpperLimbBodyFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '左下肢-肌肉量(kg)',
          dataIndex: 'leftLowerLimbMuscle',
          key: 'leftLowerLimbMuscle',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftLowerLimbMuscle', {
                 initialValue: initialValueObj.leftLowerLimbMuscle || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '左下肢-脂肪量(kg)',
          dataIndex: 'leftLowerLimbFat',
          key: 'leftLowerLimbFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftLowerLimbFat', {
                 initialValue: initialValueObj.leftLowerLimbFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '左下肢-脂肪率(%)',
          dataIndex: 'leftLowerLimbBodyFat',
          key: 'leftLowerLimbBodyFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('leftLowerLimbBodyFat', {
                 initialValue: initialValueObj.leftLowerLimbBodyFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '右下肢-肌肉量(kg)',
          dataIndex: 'rightLowerLimbMuscle',
          key: 'rightLowerLimbMuscle',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('rightLowerLimbMuscle', {
                 initialValue: initialValueObj.rightLowerLimbMuscle || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '右下肢-脂肪量(kg)',
          dataIndex: 'rightLowerLimbFat',
          key: 'rightLowerLimbFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('rightLowerLimbFat', {
                 initialValue: initialValueObj.rightLowerLimbFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '右下肢-脂肪率(%)',
          dataIndex: 'rightLowerLimbBodyFat',
          key: 'rightLowerLimbBodyFat',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('rightLowerLimbBodyFat', {
                 initialValue: initialValueObj.rightLowerLimbBodyFat || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
      ]
    }, {
      header: '体重控制',
      key: 'weightControl',
      items: [
        {
          title: '目标体重(kg)',
          dataIndex: 'goalWeight',
          key: 'goalWeight',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('goalWeight', {
                 initialValue: initialValueObj.goalWeight || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '体重控制(kg)',
          dataIndex: 'weightControl',
          key: 'weightControl',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('weightControl', {
                 initialValue: initialValueObj.weightControl || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '脂肪控制(kg)',
          dataIndex: 'fatControl',
          key: 'fatControl',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('fatControl', {
                 initialValue: initialValueObj.fatControl || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        },
        {
          title: '肌肉控制(kg)',
          dataIndex: 'muscleControl',
          key: 'muscleControl',
          render: (text, record, index) => (
            <FormItem>
               {getFieldDecorator('muscleControl', {
                 initialValue: initialValueObj.muscleControl || 0,
               })(
                <Input type='number' className={styles.constitutionInput}/>)}
            </FormItem>
          ),
        }]}];

    const items = [];
    tables.map((table) => {
      const dataItem = {label: '', key: '',
      jsx: <ReportAnalyze columns={table.items} data={datas} />};
      const { header, key } = table;
      dataItem.label = header;
      dataItem.key = key;
      items.push(dataItem);
    });

    const score = getFieldDecorator('score', {
      initialValue: initialValueObj.score || 0,
    })(<div style={{marginTop: '50px'}}>
      <span style={{fontSize: '16px', fontWeight: 'bold'}}>综合评分</span>
      <FormItem style={{marginTop: '10px'}}>
        {getFieldDecorator('score', {
          initialValue: initialValueObj.score || 0,
        })(<Input type='number' placeholder='77'/>)}
      </FormItem>
    </div>);

    return (
      <div className='Contable'>
        <ContitutionRecordForm
          submit={this.handleSubmit}
          items={items}
          initialValueObj={initialValueObj}
          isAdd={true}
          cancel={this.cancel}
          getFieldDecorator={getFieldDecorator}
          getFieldValue={getFieldValue}
          title={'体成分'}
          score={score}
        />
      </div>
    );
  }
}));
export default BodyComposition;
