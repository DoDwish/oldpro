import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, Button, Alert, message} from 'antd';
import {IDENTITY, IDENTITY_TIP} from 'utils/validation';
import RenderCompetitiveAbility from './SelectAbility';
const FormItem = Form.Item;
const Option = Select.Option;
let results = [];
let leves = [];
// 封装的添加账号组件
class WarningEditComp extends Component {
  state = {
    physique: undefined,
    lev: undefined,
    availableCompetitiveId: [],
    tabooCompetitiveId: [],
  }

  componentDidMount() {
    leves = [];
    const state = (this.props.location && this.props.location.state) ? this.props.location.state : null;
    if (state && (typeof state === 'object') && Object.keys(state).length && state._id) {
      this.setState({
        physique: state.physique,
        lev: state.level,
        availableCompetitiveId: state['availableCompetitiveId'],
        tabooCompetitiveId: state['tabooCompetitiveId'],
      });
      const {physiqueSubjectList} = this.props;
      physiqueSubjectList.map(function(item) {
        if (item.name === state.physique) {
          leves = item.levels;
        }
        return leves;
      });
    }
  }

  succ() {
    this.props.succ();
  }

  cancelAdd() {
    this.props.cancelAdd();
  }

  onchan(val) {
    this.setState({
      lev: val,
    });
  }

  onPhysique(value) {
    const {physiqueSubjectList} = this.props;
    this.setState({physique: value, lev: undefined});
    physiqueSubjectList.map(function(item) {
      if (item.name === value) {
        leves = item.levels;
      }
      return leves;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let receivedValues = {};
    const {physique, lev} = this.state;
    let physiqueId = leves.find(item => item.level === lev ) || {};
    let derail = false; // 定制开关
    if (!physique) {
      physiqueId = {id: ''};
      message.error('预警项目不能为空！', 3);
    }
    if (lev) {
      derail = true;
    } else {
      message.error('等级不能为空！', 3);
    }
    this.childForm.validateFields((err, values) => {
      if (!err) {
        const CompetitiveArr = Object.values(values).filter(item => item);
        let availableCompetitiveArr = [];
        // 数组去重
        CompetitiveArr.map(function(item, index) {
          let bool = CompetitiveArr.indexOf(item, index + 1);
          if (bool === -1) {
            availableCompetitiveArr.push(item);
          }
        });
        receivedValues.availableCompetitiveAbilities = availableCompetitiveArr;
      }
    });
    this.childForm1.validateFields((err, values) => {
      if (!err) {
        const CompetitiveArr = Object.values(values).filter(item => item);
        let tabooCompetitiveArr = [];
        CompetitiveArr.map(function(item, index) {
          let bool = CompetitiveArr.indexOf(item, index + 1);
          if (bool === -1) {
            tabooCompetitiveArr.push(item);
          }
        });
        receivedValues.tabooCompetitiveAbilities = tabooCompetitiveArr;
      }
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        receivedValues.level = lev;
        receivedValues.physiqueSubject = physiqueId.id;
        const warningId = this.props.params.warningId;
        if (warningId) {
          receivedValues.id = warningId;
        }
        let obj = {
          body: receivedValues,
          succ: this.succ.bind(this)
        };
        if (derail) {
          this.props.upsertWarning(obj);
        }
      }
    });
  }

  getChildForm(childForm) {
    this.childForm = childForm;
  }
  getChildForm1(childForm) {
    this.childForm1 = childForm;
  }
  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {competitiveAbilityList, physiqueSubjectList} = this.props;
    const isEdit = this.props.params.warningId;
    const title = isEdit ? '编辑预警' : '新增预警';
    const btnContent = isEdit ? '保存' : '确认';
    let levels = leves || [];
    const {physique, lev, availableCompetitiveId = [], tabooCompetitiveId = []} = this.state;
    return (
      <div>
        <div>
          <span style = {{
            fontSize: 18,
            borderWidth: 2,
            fontWeight: 'bold'
          }}>{title}</span>
        </div>
        <Form onSubmit = {this.handleSubmit.bind(this)} style={{
          marginTop: 15
        }}>
          <FormItem>
            <div>
              <label className='ant-form-item-required'>预警项目:</label>
            </div>
            <Select key={physique} value={physique} placeholder="请选择预警项目" onChange={this.onPhysique.bind(this)}>
              {physiqueSubjectList.map((item) =><Option key={item.name} value = {
                  item.name
                } > {
                item.name
              } </Option>)}
            </Select>
          </FormItem>
          <FormItem>
            <div>
              <label className='ant-form-item-required'>等级:</label>
            </div>
            <Select key={lev} value={lev} placeholder="请选择" notFoundContent='没数据' onChange={this.onchan.bind(this)}>
              {levels.map((item) =><Option key = {item.level} value = {
                  item.level
                } > {
                item.level
              } </Option>)}
            </Select>
          </FormItem>
          <FormItem>
            <div >
              <label>适用竞技能力:</label>
            </div>
            {getFieldDecorator('availableCompetitiveAbilities',
              availableCompetitiveId.length > 0 ?
              { initialValue: availableCompetitiveId } : {}
            )(
              <RenderCompetitiveAbility
                getChildForm = {this.getChildForm.bind(this)}
                results = {competitiveAbilityList}/>
            )}
          </FormItem>
          <FormItem>
            <div >
              <label>禁忌:</label>
            </div>
            {getFieldDecorator('tabooCompetitiveAbilities',
              tabooCompetitiveId.length > 0 ?
              { initialValue: tabooCompetitiveId } : {}
            )(
              <RenderCompetitiveAbility
                getChildForm = {this.getChildForm1.bind(this)}
                results = {competitiveAbilityList}/>
            )}
          </FormItem>
          {
            this.props.saveState && (
              <Alert message = {this.props.saveState} type="info" showIcon />
            )
          }
          <div style={{'textAlign': 'center', marginTop: 40}}>
            <Button type="default" style={{
              marginRight: 40
            }} onClick={this.cancelAdd.bind(this)}>
              取消
            </Button>
            <Button type="primary" htmlType='submit'>
              {btnContent}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(WarningEditComp);
