import React, {Component, PropTypes} from 'react';
import OSSUploader from './OSSUploader';
import {EXPERT_LICENCE_POLICY} from 'constants/urls';

export default class CoverIcon extends Component {
  state = {
    value: '',
  }
  componentWillMount() {
    const {value} = this.props;
    if (value) {
      this.setState({
        value
      });
    }
  }

  onUpload(value) {
    this.setState({
      value
    });
    this.props.onChange(value);
  }
  render() {
    return (
      <div>
        <input
          value={this.state.value}
          placeholder={'请上传封面图...'}
          className={'ant-input ant-input-lg'}
          style={{marginBottom: 10}}
          // onChange={(event) => {this.onChange(event);}}
        />
        <OSSUploader
          value={this.state.value}
          policyUrl={EXPERT_LICENCE_POLICY}
          onChange={this.onUpload.bind(this)}
          jsx={<div style={{float: 'right'}}>上传</div>}
        />
      </div>
    );
  }
}