import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, Button, Icon} from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP, MOBILE, MOBILE_TIP, EMAIL, EMAIL_TIP} from 'utils/validation';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';
const FormItem = Form.Item;
const Option = Select.Option;
import {MyForm} from 'components';
import InputArea from './InputArea';
import RenderCompetitiveAbility from 'components/KnowledgeBase/SelectAbility';
require('./perscription.css');

let cfId = ''; // 存放方案url上的id
let addDec = '';
class PerscriptionEditForm extends Component {
  state = {
    saveState: '',
    formItems: []
  }

  componentWillMount() {
    cfId = '';
    if (this.props.params.id) {
      cfId = this.props.params.id;
    }

    const dataArr = this.props.dataSource.find(item => item._id === this.props.params.id );
    if (dataArr && dataArr.phases.length > 0) {
      this.state.formItems = dataArr.phases;
    }else {
      this.state.formItems = [{}];
    }
  }
  editSucc() {
    changeState2Succ.call(this);
    this.props.succ();
  }
  // 点击添加阶段
  onAdd() {
    const {formItems} = this.state;
    formItems.push({});
    this.setState({ formItems });
    addDec = '1';
  }
  // 点击删除阶段
  onDec() {
    const {formItems} = this.state;
    if (formItems.length > 1) {
      formItems.pop();
      this.setState({ formItems });
    }
    addDec = '0';
  }
  // 验证阶段
  checkInputArea(rule, value = {}, callback) {
    const {content, days} = value;
    const isEmpty = this.isEmpty;
    const contentEp = isEmpty(content);
    const daysPerWeekEp = isEmpty(days);
    if (contentEp || daysPerWeekEp) { // 都为true
      callback('此选项为必填项，请填写！');
    } else if (!contentEp && !daysPerWeekEp && !isNaN(days) && (days > 0)) {
      callback();
    }else if (isNaN(days) || Number(days) === 0) {
      callback('此选项天数必须为正数字！');
    }
  }
  isEmpty(value) {
    if (value || value === 0) {
      return false;
    } else {
      return true;
    }
  }
  // 验证竞技能力
  checkAbility(rule, value = [], callback) {
    if (value.length === 2) {
      callback();
    } else if (value.length) {
      callback('两个都必须选择');
    } else {
      callback('请选择竞技能力');
    }
  }
  // 提交表单
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {name} = values;
        let isGeneral = values.isGeneral;
        const competitiveAbility = values.competitiveAbility[1];
        const phases = [];
        Object.keys(values).forEach(key => {
          if (key.startsWith('phases')) {
            const value = values[key];
            value.days = Number(value.days);
            const seq = key.substr(-1);
            value.seq = Number(seq);
            phases.push(value);
          }
        });
        if (isGeneral === undefined) {
          isGeneral = false;
        }
        const prescription = { name, competitiveAbility, phases, isGeneral};
        if (cfId !== '') {
          changeState2Begin.call(this, '修改中');
          prescription.id = cfId;
        } else {
          changeState2Begin.call(this, '保存中');
        }
        let obj = {
          params: prescription,
          succ: this.editSucc.bind(this),
          fail: changeState2Fail.bind(this),
        };
        this.props.saveExercisePres(obj);
      }
    });
  }

  // 判断是否是空对象
  isEmptyObject(event) {
    let key;
    for (key in event) {
      return !1;
    }
    return !0;
  }

  changeSelect(value) {

  }

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    let {formItems} = this.state;
    let isAdd = true; // 标记编辑或新增状态
    let initialValueObj = {};
    let _title = ''; // 表单标题

    const datasTemp = this.props.datasTemp; // 竞技能力列表原始数据
    const data = this.props.dataSource; // 处方列表
    const dataItem = data.find(item => item._id === cfId);

    let comId = []; // 竞技能力id数组

    if (dataItem) {
      let dataItemId;
      if (typeof(dataItem.competitiveAbility) === 'string' && dataItem.competitiveAbility.indexOf(",")) {
        dataItemId = dataItem.competitiveAbility.split(',');
        dataItemId = dataItemId[1];
      } else {
        dataItemId = dataItem.competitiveAbility[1];
      }
      const comItemId1 = datasTemp.find(item => item.name === dataItemId);
      let comItemId2;
      if (comItemId1) {
        comItemId2 = datasTemp.find(item => item._id === comItemId1.parent);
      }
      if (comItemId2) {
        comId.push(comItemId2._id);
        comId.push(comItemId1._id);
      }

      const {name, competitiveAbility, phases = [], isGeneral} = dataItem;
      const phasesTemp = {};
      phases.forEach((item, index) => {
        const key = `phases${index + 1}`;
        phasesTemp[key] = item;
      });

      initialValueObj = {name, isGeneral, ...phasesTemp};
      initialValueObj.competitiveAbility = comId;
      if (dataItem.isGeneral === false) {
        initialValueObj.isGeneral = '不通用';
      }else {
        initialValueObj.isGeneral = '通用';
      }

      _title = '编辑方案';
      isAdd = false;

      if (addDec !== '1' && addDec !== '0') {
        formItems = phases;
      }
    } else {
      _title = '新增方案';
      isAdd = true;
    }


    const items = [
      {
        label: '方案名称',
        key: 'name',
        rules: [{
          required: true,
          message: '方案名不能为空'
        }],
        jsx: <Input placeholder={'请填写方案名称'} style={{width: '50%'}}/>
      },
      {
        label: '竞技能力',
        key: 'competitiveAbility',
        rules: [{
          required: true,
          message: '竞技能力不能为空',
        }, {
          validator: this.checkAbility
        }],
        jsx: (
          <RenderCompetitiveAbility results={datasTemp}/>
        )
      },
      {
        label: '是否通用',
        key: 'isGeneral',
        jsx:
          <Select style={{width: '50%'}} >
            <Option key='true'>通用</Option>
            <Option key='false'>不通用</Option>
          </Select>
      }
    ];

    const rules = [
      {
        required: true
      }, {
        validator: this.checkInputArea.bind(this)
      }
    ];
    const jsx = <InputArea/>;
    formItems.forEach((item, index) => {
      const label = `第${index + 1}阶段`;
      const key = `phases${index + 1}`;
      items.push({ label, key, rules, jsx });
    });

    items.push({jsx: <div>
      <Icon onClick={this.onAdd.bind(this)} type="plus-circle-o" className="cf-plus"/>
      <Icon onClick={this.onDec.bind(this)} type="minus-circle-o" className="cf-minus"/>
    </div>});

    return (
      <MyForm
        title={_title}
        submit={this.handleSubmit.bind(this)}
        cancel={this.props.cancelAdd}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={isAdd}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        tips={this.state.saveState}
        status={false}
      />
    );
  }
}
export default Form.create()(PerscriptionEditForm);
