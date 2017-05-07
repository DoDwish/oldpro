import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, Button} from 'antd';
import MySelectItem from './SeletItem';
const Option = Select.Option;
const FormItem = Form.Item;

class SelectAbility extends Component {
  state = {
    list: [new Date().getTime()]
  }
  componentWillMount() {
    let {value: valueArr = [], results = []} = this.props;
    if (valueArr.length !== 0) {
      this.state.list = JSON.parse(JSON.stringify(valueArr));
    }
  }
  componentDidMount() {
    this.props.getChildForm(this.props.form);
  }
  componentWillReceiveProps(nextProps) {
    const {value: valuePre} = this.props;
    const {value: valueNext} = nextProps;
    if (valuePre !== valueNext) {
      this.state.list = JSON.parse(JSON.stringify(valueNext));
    }
  }
  remove(index) {
    let { value = [], onChange } = this.props;
    const {list} = this.state;
    if (list.length === 1) {
      return;
    }
    list.splice(index, 1);
    this.setState({list});
    value.splice(index, 1);
    onChange(value);
  }

  add() {
    const {list} = this.state;
    list.push(new Date().getTime());
    this.setState({list});
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {onChange} = this.props;
    let {value: valueArr = [], results = []} = this.props;
    const {list} = this.state;
    const formItems = list.map((id, index) => {
      return (
        <FormItem key={id} className="warning-item">
          {getFieldDecorator(`item-${id}`, {
            initialValue: valueArr[index]
          })(
            <MySelectItem
              index={index}
              results={results}
              onRemove={this.remove.bind(this)}
              onAdd={this.add.bind(this)}
            />
          )}
        </FormItem>
      );
    });
    return (
      <div style={{clear: 'both'}}>
        {formItems}
      </div>
    );
  }
}
export default Form.create()(SelectAbility);
