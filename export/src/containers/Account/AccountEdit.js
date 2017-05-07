import React, {Component, PropTypes} from 'react';
import * as accountAct from 'redux/modules/account/accountAct';
import {fetchExpertRole} from 'redux/modules/account/roleAct';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {message} from 'antd';
import AcountEditForm from './AcountEditForm';

@connect(({roleRed}) => ({
  roleList: roleRed.dataSource
}), accountAct)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(fetchExpertRole()));
      return Promise.all(promises);
    }
  }
])
export default class AddAccount extends Component {

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
        <AcountEditForm
          {...this.props}
          succ={this.succ.bind(this)}
          cancelAdd={this.cancelAdd.bind(this)}/>
      </div>
    );
  }
}


