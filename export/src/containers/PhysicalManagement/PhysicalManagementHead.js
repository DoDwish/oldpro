import React, {Component, PropTypes} from 'react';
import {Input, Table, Progress, Button, Select,
        Form, DatePicker, Pagination,
        Cascader, Row, Col, rowKey, message} from 'antd';
import {RegionSelector} from 'components';
import moment from 'moment';
import {getYearList} from 'utils/tool';
const FormItem = Form.Item;
const Option = Select.Option;

class Head extends Component {
  regionChange(region) {
    const {fetchSchoolList, fetchPhysicalSearch} = this.props;
    const {resetFields} = this.props.form;
    if (region.province && region.city && region.area) {
      fetchSchoolList(region);
    } else {
      fetchSchoolList(region, true);
      fetchPhysicalSearch(region, true);
    }
    resetFields(['schoolList', 'gradeList', 'classList']);
  }
  schoolChange(key) {
    const {fetchGradeList, fetchPhysicalSearch} = this.props;
    const {resetFields} = this.props.form;
    if (key) {
      fetchGradeList(key);
    } else {
      fetchGradeList(key, true);
    }
    resetFields(['gradeList', 'classList']);
  }
  schoolYearsChange(year) {
    const {fetchClassList} = this.props;
    const {getFieldsValue, resetFields} = this.props.form;
    const obj = getFieldsValue(['schoolList', 'classList']);
    obj.schoolYearsList = year;
    resetFields(['gradeList', 'classList']);
  }
  gradeChange(grade) {
    const {getFieldsValue, resetFields} = this.props.form;
    const {fetchClassList} = this.props;
    const obj = getFieldsValue(['schoolList', 'schoolYearsList']);
    obj.gradeList = grade;
    this.fetchClassList(obj);
    resetFields(['classList']);
  }
  fetchClassList(obj) {
    const {fetchClassList, fetchPhysicalSearch} = this.props;
    const {resetFields} = this.props.form;
    const {schoolList: school, schoolYearsList: year, gradeList: grade} = obj;
    resetFields(['classList']);
    if (school && year && grade) {
      const yearArr = year.match(/^(\d{4})\-(\d{4})$/) || [];
      const startYear = yearArr[1];
      const endYear = yearArr[2];
      fetchClassList({
        filters: {
          school,
          startYear,
          endYear,
          "grade._id": grade
        }
      });
    } else {
      fetchClassList({}, true);
    }
  }
  state = {
    confirmDirty: false,
  };
  handleSubmit = (event) => {
    const {classList, perPage} = this.props;
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {classObj, schoolYearsList: schoolYear} = values;
        const obj = {
          filters: {
            'class': classList[0]._id,
          },
          perPage
        };
        values.classObj = classObj;
        this.props.fetchPhysicalSearch(obj);
      }
    });
  }
  render() {
    const {
      region, schoolList, fetchSchoolList,
      gradeList, classList, fetchGradeList, fetchStudentList,
      physicalList, gotoAdd, gotoImport,
    } = this.props;
    const {getFieldDecorator} = this.props.form;
    const yearObj = getYearList(6);
    const schoolYearsList = yearObj.yearList;
    const nowYear = yearObj.defaultYear;
    return (
     <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col style={{minWidth: "500px", display: "inline-block", marginLeft: "10px"}}>
          <FormItem>
            {getFieldDecorator('region')(
              <RegionSelector region={region} onChange={this.regionChange.bind(this)} />
            )}
          </FormItem>
        </Col>
        <Col style={{display: "inline-block", height: "56px"}}>
          <FormItem>
            <span style={{marginLeft: "10px"}}>学校：</span>
            {getFieldDecorator('schoolList', {
              rules: [{ required: true, message: '必选！'}]
            })(
              <Select placeholder='请选择学校' style={{width: "120px"}} onChange={this.schoolChange.bind(this)}>
              {
                schoolList.map((item) => <Option key={item._id} value={item._id}>{item.name}</Option>)
              }
            </Select>
            )}
          </FormItem>
        </Col>
        <Col style={{display: "inline-block", height: "56px"}}>
          <FormItem>
            <span style={{marginLeft: "10px"}}>年度：</span>
            {getFieldDecorator('schoolYearsList', {
              rules: [{ required: true, message: '必选！'}]
            })(
              <Select placeholder='请选择年度' style={{width: "120px"}} onChange={this.schoolYearsChange.bind(this)}>
              {
                schoolYearsList.map((item) => <Option key={item} value={item}>{item}</Option>)
              }
            </Select>
            )}
          </FormItem>
        </Col>
        <Col style={{display: "inline-block", height: "56px"}}>
          <FormItem>
            <span style={{marginLeft: "10px"}}>班级：</span>
            {getFieldDecorator('gradeList', {
              rules: [{ required: true, message: '必选！'}]
            })(
              <Select placeholder='请选择年级' style={{width: "120px"}} onChange={this.gradeChange.bind(this)}>
                {
                  gradeList.map((item) => <Option key={item._id} value={item._id}>{item.name}</Option>)
                }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col style={{display: "inline-block", height: "56px"}}>
          <FormItem>
            {getFieldDecorator('classList', {
              rules: [{ required: true, message: '必选！'}]
            })(
              <Select
                placeholder='请选择班级'
                style={{width: '120px', marginLeft: '10px'}}
              >
                {
                  classList.map((item, index) => {
                    return (
                      <Option key={String(index)} value={item.class._id}>{item.class.name}</Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
        </Col>
        <Col style={{display: "inline-block", height: "56px"}}>
          <FormItem>
            <Button type="primary" style={{marginLeft: "10px"}} htmlType="submit">查询</Button>
            <Button type="primary"
              style={{marginLeft: "10px", backgroundColor: "rgb(73, 176, 234)", borderColor: "rgb(73, 176, 234)"}}
              onClick={this.props.gotoImport}>批量导入</Button>
            <Button type="primary" style={{marginLeft: "10px"}} onClick={this.props.gotoAdd}>新增数据</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    );
  }
}
export default Form.create()(Head);
