import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as roleAct from 'redux/modules/account/roleAct';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import {Button, Input, Table} from 'antd';
import {RoleTable} from 'components';

@connect(({roleRed}) => roleRed, roleAct)
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(roleAct.fetchExpertRole()));
      return Promise.all(promises);
    }
  }
])
export default class Role extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  gotoEdit(text) {
    this.context.router.push({
      pathname: '/role/edit',
      state: {
        ...text,
      }
    });
  }

  gotoAdd() {
    this.context.router.push({
      pathname: '/role/add',
    });
  }

  renderParent() {
    const {dataSource} = this.props;
    return (<RoleTable
      onEditor={this.gotoEdit.bind(this)}
      onAddRole={this.gotoAdd.bind(this)}
      roleColumns={dataSource}
    />);
  }
  render() {
    return (
      <div>
        {this.props.children || this.renderParent.call(this)}
      </div>
    );
  }
}

