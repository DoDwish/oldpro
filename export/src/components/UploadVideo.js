import React, {Component, PropTypes} from 'react';
import {Icon} from 'antd';
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
  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
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
        {this.state.value && <video controls src={this.state.value} style={{display: 'block', marginBottom: 20}}/>}
        <OSSUploader
            accept={'video/rm,video/mp4,video/avi,video/wmv,video/rmvb,video/3gp'}
            policyUrl={EXPERT_LICENCE_POLICY}
            onChange={this.onUpload.bind(this)}
            showImg={false}
            progress={true}
            jsx={<span style={{color: '#4169E1'}}><Icon type="picture" />  插入视频</span>}
          />
      </div>
    );
  }
}