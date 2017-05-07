import React,{Component, PropTypes} from 'react';
import {fetchExercisePrescription,delExercisePrescription,fetchTotalCF,fetchCompetitiveAbility} from 'redux/modules/exercisePrescription/prescriptionAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {Button,Modal} from 'antd';
import {Table} from 'components';

@connect(({prescriptionRed}) => prescriptionRed,{fetchExercisePrescription})
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(fetchTotalCF()));
      promises.push(dispatch(fetchExercisePrescription()));     
      promises.push(dispatch(fetchCompetitiveAbility()));     
      return Promise.all(promises);
    }
  }
])
export default class Prescription extends Component{
	static contextTypes = {
	  router: PropTypes.object.isRequired
	};
	gotoEdit(record) {
		const id = record._id;
	    this.context.router.push({
	      pathname: `/exercisePrescription/edit/${id}`,
	    });
	}
	gotoAdd(record) {
	    this.context.router.push({
	      pathname: '/exercisePrescription/add',
	    });
	}

	gotoDel(record){
		const id = record._id;
		const props = this.props;
		Modal.confirm({
	      title: '删除处方',
	      content: '删除此处方，是否删除？',
	      okText: '删除',
	      onOk() {
	        props.dispatch(delExercisePrescription(id));
	      },
	      cancelText: '取消',
	    });
	}

	render() {
	    const {dataSource, perPage, count, page,datasTemp} = this.props;

	    dataSource.map( t => {
			return datasTemp.find( m => {
				if(t.competitiveAbility === m._id){
					datasTemp.find( n => {
						if(m.parent === n._id){
							t.competitiveAbility = n.name + ',' + m.name ;
						}
					})					
				}

			});
		});

	    const columns = [
	      {
	        title: '编号',
	        dataIndex: 'num',
	        key: 'num',
	      }, {
	        title: '运动处方名',
	        dataIndex: 'name',
	        key: 'name',
	      }, {
	        title: '竞技能力',
	        dataIndex: 'competitiveAbility',
	        key: 'competitiveAbility',
	      }, {
	        title: '操作',
	        render: (text, record, index) => (
	            <div>
	            	<Button type="primary" 
	            		onClick={this.gotoEdit.bind(this,text)} 
	            		style={{marginRight: '5px'}}>
	            		编辑
	            	</Button>
	            	<Button type="primary" 
	            		onClick={this.gotoDel.bind(this, text)} 
	            		style={{marginRight: '5px'}}>
	            		删除
	            	</Button>
	            </div>
	        ),
	        key: '_id',
	      },
	    ];
	    return (
	      <div>
	      	{this.props.children || (
	      	  <Table
	            title='账号管理'
	            onAdd={this.gotoAdd.bind(this)}
	            columns={columns}
	            page={page}
	            total={count}
	            perPage={perPage}
	            data={dataSource}
	            fetchList={this.props.fetchExercisePrescription}
	          />
	      	)}        
	      </div>
	    );
	}

}