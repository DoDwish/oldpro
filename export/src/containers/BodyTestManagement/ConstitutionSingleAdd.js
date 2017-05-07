import React, {Component, PropTypes} from 'react';
import BoneDensity from './BoneDensity';
import CardioPulmonaryFunction from './CardioPulmonaryFunction';
import BodyComposition from './BodyComposition';
import SpineFunction from './SpineFunction';
import VesselFunction from './VesselFunction';
import {connect} from 'react-redux';
import {message} from 'antd';
import {asyncConnect} from 'redux-connect';
import * as constitutionAct
from '../../redux/modules/BodyTestManagement/ConstitutionAct';
import * as constitutionAddAct
from '../../redux/modules/BodyTestManagement/ConstitutionAddAct';

@connect(
  ({ constitutionRed, constitutionAddRed }) => ({ ...constitutionRed, ...constitutionAddRed }),
  { ...constitutionAddAct, ...constitutionAct }
)

export default class ConstitutionSingleAdd extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  succ() {
    const locationState = this.props.location.state;
    const studentItem = this.props.studentItem;
    const obj = {
      filters: {
        class: this.props.classId,
        type: this.props.midecalType
      }
    };
    const addObj = {
      filters: {
        classId: this.props.classId,
      }
    };
    if (this.props.editFlag === 1) {
      message.success('保存成功！');
      this.context.router.goBack();
      this.props.fetchConstitutionList(obj);
    } else {
      message.success('添加成功！');
      this.context.router.goBack();
      this.props.fetchStudentList(addObj);
    }
  }

  fail() {
  }

  cancel() {
    this.context.router.goBack();
  }

  render() {
    const { type } = this.props.params;
    const component = {};
    switch (type) {
      case '骨密度': {
        return (
          <BoneDensity
            {...this.props}
            succ={this.succ.bind(this)}
            fail={this.fail.bind(this)}
            cancel={this.cancel.bind(this)} />
        );
      }
      case '心肺功能': {
        return (
          <CardioPulmonaryFunction
            {...this.props}
            succ={this.succ.bind(this)}
            fail={this.fail.bind(this)}
            cancel={this.cancel.bind(this)} />
        );
      }
      case '脊柱功能': {
        return (
          <SpineFunction
            {...this.props}
            succ={this.succ.bind(this)}
            fail={this.fail.bind(this)}
            cancel={this.cancel.bind(this)} />
        );
      }
      case '体成份': {
        return (
          <BodyComposition
            {...this.props}
            succ={this.succ.bind(this)}
            fail={this.fail.bind(this)}
            cancel={this.cancel.bind(this)} />
        );
      }
      case '血管机能': {
        return (
          <VesselFunction
            {...this.props}
            succ={this.succ.bind(this)}
            fail={this.fail.bind(this)}
            cancel={this.cancel.bind(this)} />
        );
      }
      default:
        break;
    }
  }
}
