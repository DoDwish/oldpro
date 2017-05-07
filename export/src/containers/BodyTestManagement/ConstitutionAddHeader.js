import React, {Component, PropTypes} from 'react';
import { Table } from 'components';
import { Button, Form, Select, DatePicker } from 'antd';
import moment from 'moment';
import RegionSelector from '../../components/RegionSelector';
import { getYearList } from 'utils/tool';
const FormItem = Form.Item;
const Option = Select.Option;
const styles = require('./ConstitutionHeader.scss');
const year = new Date().getFullYear();
const month = new Date().getMonth();
const time = new Date().getTime();
const dateFormat = 'YYYY/MM/DD';
let defaultStartYear = (parseInt(month) + 1 < 7) ? (parseInt(year) - 1) : parseInt(year);

const ConstitutionHeader = Form.create()(React.createClass({

  succ() {
    this.props.succ();
  },
  fail(err) {

  },
  schoolChanged(value) {
    let schoolId = '';
    this.props.schoolList.map((item) => {
      if (item.name === value) {
        schoolId = item._id;
        return;
      }
    });
    const {resetFields} = this.props.form;
    this.props.changeGrade(schoolId);
    resetFields(['grade', 'class']);
    const obj = {
      filters: {
        school: schoolId
      }
    };
    this.props.changeSchool(obj);
    this.props.selectSchool(schoolId);
  },
  gradeChanged(value) {
    let gradeId = '';
    this.props.gradeList.map((item) => {
      if (item.name === value) {
        gradeId = item._id;
        return;
      }
    });
    this.props.changeGrade(gradeId);
    const {resetFields} = this.props.form;
    resetFields(['class']);
  },
  changeRegion(value) {
    // this.props.changeRegion(value.province, value.city, value.area);
    const {fetchSchoolList, fetchStudentList, changeGrade} = this.props;
    this.props.changeGrade(value);
    const {resetFields} = this.props.form;
    resetFields(['school', 'grade', 'schoolYear', 'class']);
    if (value.province && value.city && value.area) {
      // const obj = { province: value.province, city: value.city, area: value.area};
      this.props.fetchSchoolList(value);
    }
    else {
      fetchSchoolList(value, true);
      // changeGrade(value, true);
      fetchStudentList(value, true);
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let classId = '';
        this.props.classList.map((item) => {
          if (item.class.name === values.class) {
            classId = item._id;
          }
        });
        let receivedValues = {
          classId: classId,
        };
        let obj = {
          filters: receivedValues,
        };
        this.props.fetchStudentList(obj);
        this.props.changePage(obj);
      }
    });
  },

  render() {
    const schoolYear = getYearList(3);
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form;
    const currentTime = moment().format('YYYY-MM-DD');
    return (
      <Form
        hideRequiredMark
        onSubmit={this.handleSubmit}
        style={{width: '100%'}} className='clearfix'>
            <span className='fl' style={{display: 'inline-block', marginTop: '5px'}}>学校：</span>
          <div>
            <div style={{minWidth: '500px', height: '26px', display: 'inline-block'}}>
              {getFieldDecorator('region')(
                <RegionSelector region={ this.props.region } onChange={this.changeRegion}/>
              )}
            </div>
            <FormItem style={{ display: 'inline-block' }}>
            {getFieldDecorator('school', {
              rules: [{
                required: true,
                message: '请选择学校'
              }
            ]})(
              <Select placeholder="请选择学校"
                  style={{ width: '120px', marginLeft: '-30px'}}
                  onChange={this.schoolChanged}>
                  {
                    this.props.schoolList && this.props.schoolList.map((item) =>
                    <Option key={item._id} value = {item.name}> {item.name} </Option>)
                  }
              </Select>
              )}
            </FormItem>
          </div>
          <div>
            <FormItem style={{ display: 'inline-block'}}
              label='学年'>
              {getFieldDecorator('schoolYear', { rules: [
                {
                  required: true,
                  message: '请选择学年'
                }
              ]})(
                <Select placeholder="请选择"
                      style={{width: '120px', height: '26px', display: 'inline-block'}}
                      onChange={this.props.schoolYearChanged}>
                      {
                        schoolYear.yearList && schoolYear.yearList.map((item) =>
                        <Option key={item} value={item}> {item} </Option>)
                      }
                 </Select>
              )}
            </FormItem>
            <FormItem style={{ display: 'inline-block'}}
              label='年级'>
              {getFieldDecorator('grade', { rules: [
                {
                  required: true,
                  message: '请选择年级'
                }
              ]})(
                <Select placeholder="请选择"
                    style={{width: '120px', height: '26px', display: 'inline-block', marginLeft: '10px'}}
                    onChange={this.gradeChanged}>
                    {
                      this.props.gradeList && this.props.gradeList.map((item) =>
                      <Option key={item._id} value = {item.name}> {item.name} </Option>)
                    }
                </Select>
              )}
            </FormItem>
            <FormItem style={{ height: '26px', display: 'inline-block', marginLeft: '10px'}}
              label='班级'>
              {getFieldDecorator('class', {rules: [
                {
                  required: true,
                  message: '请选择班级'
                }
              ]})(
                <Select placeholder="请选择"
                    style={{width: '120px', height: '26px', display: 'inline-block'}}
                    onChange={this.props.classChanged}>
                    {
                      this.props.classList && this.props.classList.map((item) =>
                      <Option key={item.class._id} value = {item.class.name}> {item.class.name} </Option>)
                    }
                </Select>
              )}
            </FormItem>
            <FormItem style={{ height: '26px', display: 'inline-block', marginLeft: '3.5%'}}
              label='体测类型'>
              {getFieldDecorator('type', { initialValue: '骨密度' })(
                <Select placeholder="请选择"
                    style={{width: '150px', height: '26px', display: 'inline-block', marginLeft: '2%'}}
                    onChange={this.props.changeType}>
                    <Option value="骨密度">骨密度</Option>
                    <Option value="心肺功能">心肺功能</Option>
                    <Option value="脊柱功能">脊柱功能</Option>
                    <Option value="体成分">体成分</Option>
                    <Option value="血管机能">血管机能</Option>
                </Select>
              )}
             </FormItem>
           </div>
           <div>
              <FormItem style={{width: '33%', height: '26px', display: 'inline-block'}}
                label='时间'>
                {getFieldDecorator('time', {rules: [
                  {
                    required: true,
                    message: '请选择时间'
                  }
                ]})(
                  <DatePicker format={dateFormat}
                    style={{width: '120px'}} onChange={this.props.timeChanged}/>
                )}
              </FormItem>
              <Button type="primary" className="fr" style={{marginRight: '20px'}} htmlType='submit'>确定</Button>
           </div>
    </Form>
    );
  }
}));

export default ConstitutionHeader;
