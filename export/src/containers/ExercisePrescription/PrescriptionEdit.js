import React,{Component,PropTypes} from 'react';
import {asyncConnect} from 'redux-connect';
import {connect} from 'react-redux';
import {message} from 'antd';
import PerscriptionEditForm from './PerscriptionEditForm';
import {fetchCompetitiveAbility,saveExercisePres} from 'redux/modules/exercisePrescription/prescriptionAct';

@connect(({prescriptionRed}) => ({
	dataSource: prescriptionRed.dataSource,
	datasTemp: prescriptionRed.datasTemp
}),{saveExercisePres})
//异步请求竞技能力
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(fetchCompetitiveAbility()));
      return Promise.all(promises);
    }
  }
])
export default class PrescriptionEdit extends Component{

	static contextTypes = {
	  router: PropTypes.object.isRequired
	}

	succ() {
	  message.success('保存成功！');
	  this.context.router.goBack();
	}

	cancelAdd() {
	  this.context.router.goBack();
	}

	render() {
	  return (
	    <div>
	      <PerscriptionEditForm
	        {...this.props}
	        succ={this.succ.bind(this)}
	        cancelAdd={this.cancelAdd.bind(this)}/>
	    </div>
	  );
	}

}
