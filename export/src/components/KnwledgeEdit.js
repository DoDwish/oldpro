import React, {Component, PropTypes} from 'react';
import {Form, Select, Input, message} from 'antd';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP} from 'utils/validation';
import {EXPERT_LICENCE_POLICY} from 'constants/urls';
const FormItem = Form.Item;
const Option = Select.Option;
import MyForm from './Edit/Form';
import OSSUploader from './OSSUploader';
import Ueditor from './Ueditor';
import CategorySelector from './CategorySelector';
import CoverIcon from './CoverIcon';
import UploadVideo from './UploadVideo';
import {isObjEqual} from 'utils/tool';
// 封装的添加账号组件 // 这是一个DEMO文件
// submit, cancel, items, initialValueObj, isAdd, getFieldDecorator, getFieldValue, tips,
// status = true（默认是有状态下拉框，传false则不显示）, title(没传用默认), btnContent（没传用默认）
const KnowledgeAdd = Form.create()(React.createClass({
  getInitialState: function() {
    return {
      id: '',
      level: 1,
      coverIcon: '',
      categoryArrByType: [],
      type: '',
      content: ''
    };
  },
  succ() {
    this.props.suCc();
  },
  cancelAdd() {
    this.props.cancelAdd();
  },
  onChange(id, level) {
    this.setState({
      id: id,
      level: level,
    });
  },
  onChangeType(value) {
    this.props.form.setFieldsValue({category: undefined});
    const {dataType, data} = this.props;
    const dataTypeItem = dataType.find(item => item._id === value);
    const categoryArrByType = data.filter(item => item.knowledgeType === dataTypeItem.name);
    this.setState({categoryArrByType: categoryArrByType, type: value, content: ''});
  },
  renderContent(dataType, type) {
    if (dataType.length > 0 && type) {
      const dataTypeItem = dataType.find(item => item._id === type);
      if (dataTypeItem) {
        if (dataTypeItem.name === '文章') {
          return <Ueditor height='500' ref={(ref)=>{this.ue = ref;}} hasVideo={false}/>;
        } else if (dataTypeItem.name === '视频') {
          return <UploadVideo onChange={this.onContentChange} value={this.state.content}/>;
        }
      }
    } else {
      return <div></div>;
    }
  },
  onContentChange(value) {
    this.setState({content: value});
  },
  onUpload(value) {
    this.setState({
      coverIcon: value,
    });
  },
  componentWillMount() {
    const state = this.props.location.state;
    if (state && state['_id']) {
      const {category, type, content} = state;
      this.setState({type: type && type._id, content});
      category && this.onChange(category._id, category.level);
    }
  },

  componentWillReceiveProps(nextProps) {
    const state = this.props.location.state;
    if (state && state['_id']) {
      const {data, dataType} = this.props;
      const {data: nextData, dataType: nextDataType} = nextProps;
      if (!isObjEqual(data, nextData)) {
        const dataTypeItem = nextDataType.find(item => item._id === state.type._id);
        const categoryArrByType = nextData.filter(item => item.knowledgeType === dataTypeItem.name);
        this.setState({categoryArrByType});
      }
      if (!isObjEqual(dataType, nextDataType)) {
        const locationState = this.props.location.state;
        const dataTypeItem = dataType.find(item => item._id === locationState.type._id);
        if (dataTypeItem && (dataTypeItem.name === '文章')) {
          this.ue.ready(function() {
            this.setContent(locationState.content);
          });
        }
      }
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        const {dataType} = this.props;
        const dataTypeItem = dataType.find(item => item._id === values.type);
        let content = this.state.content;
        if (dataTypeItem.name === '文章') {
          content = this.ue.getContent();
        } else if (dataTypeItem.name === '视频') {
          content = this.state.content;
        }
        let receivedValues = {
          title: values.title,
          type: values.type,
          category: { // 分类
            level: this.state.level, // 级别
            id: this.state.id // 分类id
          },
          coverIcon: values.coverIcon,
          author: values.author,
          tags: values.tags,
          content: content,
          // status: parseInt(values.status)
        };
        if (!content) {
          message.error("请填写内容");
          return;
        }
        const state = this.props.location.state;
        if (state && state['_id']) {
          receivedValues.id = state['_id'];
        }
        let obj = {
          params: receivedValues,
          succ: this.succ
        };
        this.props.saveKnowledge(obj);
      } else {
        message.error('请检查输入项！');
      }
    });
  },
  render() {
    const {getFieldDecorator, setFieldsValue, getFieldValue} = this.props.form;
    const {dataType, saveAccountState, editAccountState} = this.props;
    const locationState = this.props.location.state;
    const isAdd = !locationState;
    const tips = isAdd ? saveAccountState : editAccountState;
    const initialValueObj = {};
    let categoryArr = [];
    if (locationState) {
      const tags = locationState.tags;
      const tagsArr = [];
      for (let key in tags) {
        if ({}.hasOwnProperty.call(tags, key)) {
          tags[key] && tagsArr.push(tags[key].name);
        }
      }
      const type = locationState.type;
      initialValueObj.title = locationState.title;
      initialValueObj.tags = tagsArr;
      type && (initialValueObj.type = type._id);
      locationState.category && (initialValueObj.category = locationState.category._id);
      initialValueObj.coverIcon = locationState.coverIcon;
      initialValueObj.author = locationState.author;
      // this.onUpload(locationState.coverIcon);
      // this.ue.setContent(locationState.content);
      if (locationState.category) {
        categoryArr = locationState.category.path.slice(1, -1).split(',');
        if (!categoryArr[0]) {
          categoryArr = [];
        }
        const id = this.state.id;
        categoryArr.push(id);
        initialValueObj.category = categoryArr;
      }
    }
    const items = [
      {
        label: '标题',
        key: 'title',
        rules: [{
          required: true,
          message: '此选项为必填项，请填写',
        }],
        jsx: <Input placeholder={'请填写标题...'}/>
      },
      {
        label: '类型',
        key: 'type',
        rules: [
          {
            required: true,
            message: '此选项为必选项，请选择',
          }
        ],
        jsx: <Select onChange={this.onChangeType}>
          {dataType.map((item) =>< Option key={item._id} value = {
              item._id
            } > {
              item.name
            } </Option>)}
            </Select>
      },
      {
        label: '选择分类',
        key: 'category',
        rules: [
          {
            required: true,
            message: '此选项为必选项，请选择'
          }
        ],
        jsx: <CategorySelector data={this.state.categoryArrByType}
          onChange={this.onChange}/>
      },
      {
        label: <span>封面图<span style={{color: 'red'}}>        (上传870*390的图片，大小不超过5M)</span></span>,
        key: 'coverIcon',
        rules: [
          {
            required: true,
            message: '请上传封面'
          }
        ],
        jsx: (<CoverIcon onChange={this.onUpload}/>),
        /* <OSSUploader
        policyUrl={EXPERT_LICENCE_POLICY}
        onChange={this.onUpload}
        jsx={<div style={{float: 'right'}}>上传</div>}
        /> */
      }, {
        label: '作者',
        key: 'author',
        rules: [
          {
            required: true,
            message: '此选项为必填项，请填写'
          }
        ],
        jsx: <Input placeholder="请填写作者..."/>
      }, {
        label: <span>标签<span style={{color: 'red'}}>        (输入标签后，请按enter键确认)</span></span>,
        key: 'tags',
        rules: [
          {
            required: true,
            message: '此选项为必填项，请填写'
          }
        ],
        jsx: <Select tags
              style={{ width: '100%' }}
              searchPlaceholder="标签模式"
              placeholder='请填写标签'
              tokenSeparators={[',']}
              dropdownStyle={{height: 0}}
            ></Select>
      }, {
        label: <span>内容<span style={{color: 'red'}}>        (请先选择类型)</span></span>,
        key: 'content',
        jsx: (<div>{this.renderContent(dataType, this.state.type)}</div>)
      }
    ];
    return (
      <MyForm
        submit={this.handleSubmit}
        cancel={this.cancelAdd}
        items={items}
        initialValueObj={initialValueObj}
        isAdd={isAdd}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        tips={tips}
        status={false}
        addTips='知识'
      />
    );
  }
}));
export default KnowledgeAdd;
