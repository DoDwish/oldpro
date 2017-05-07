import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Table, Input, Button, Select} from 'antd';
const Option = Select.Option;
// title, searchList=[{key,value,onchange}] onAdd
// columns, page, total, perPage, data, fetchList,
export default class Account extends Component {
  fetchList(obj) {
    const {searchList, perPage} = this.props;
    let data = {};
    if (obj) {
      data = obj;
    } else {
      data = {perPage: perPage};
      searchList.forEach(item => {
        item.key && (data[item.key] = item.value);
      });
    }
    this.props.fetchList(data);
  }

  selectSearch(selectOption) {
    const optionArr = [];
    const option = selectOption.option;
    for (let key in option) {
      if ({}.hasOwnProperty.call(option, key)) {
        optionArr.push(<Option key={key} value={key}>{option[key]}</Option>);
      }
    }
    return optionArr;
  }
  selectSearchChange(value) {
    const { page, perPage, selectOption } = this.props;
    selectOption.onChange(value);
    const obj = {perPage: perPage, page: page};
    this.props.forIsSearchStatus(true);
    obj.status = value;
    this.fetchList.call(this, obj);
  }
  renderSearch(searchList) {
    const search = [];
    searchList.forEach((item, index) => {
      search.push(
        <div key={String(index)} className="search-account col-md-4 col-xs-6">
          <label>{item.label}</label>
          <Input
            className="search-input"
            value={item.value}
            onChange={item.onChange}
            onPressEnter={this.fetchList.bind(this, null)}/>
        </div>
      );
    });
    search.push(
      <Button
        key={String(searchList.length)}
        type="primary"
        className="search-submit btn-margin-top"
        onClick={this.fetchList.bind(this, null)}
      >
        查询
      </Button>
    );

    return search;
  }
  render() {
    const {
      title, searchList, columns, page, total, perPage, onAdd,
      data, selectOption, isSearchStatus, isStatusEqual0, classId,
      type, MidecalClassId,
    } = this.props;
    // const {"class": classes} = data[0] || {};
    // const class1 = data[0].class || {};
    let filters = {};
    classId ? filters = {"class": classId} : "";
    MidecalClassId ? filters = {"classId": MidecalClassId} : "";
    type ? filters = {"class": classId, "type": type} : "";
    // class1 ? filters = {"class": class1} : '';
    const pagination = {
      current: page,
      total: total,
      // 是否可以快速跳转至某页
      showQuickJumper: true,
      // 是否可以改变 pageSize
      showSizeChanger: true,
      // 页码改变的回调
      onChange: (current) => {
        const obj = {perPage: perPage, page: current};
        searchList && searchList.forEach(item => {
          item.key && (obj[item.key] = item.value);
        });
        filters ? obj.filters = filters : '';
        // console.log('obj=', obj);
        // type ? obj.filters.type = type : '';
        // classId ? obj.filters.classId = classId : '';
        isStatusEqual0 ? obj.status = '0' : '';
        selectOption && isSearchStatus && (obj.status = selectOption.searchStatus);
        this.fetchList.call(this, obj);
      },
      // pageSize 变化的回调
      onShowSizeChange: (current, pageSize) => {
        const obj = {perPage: pageSize, page: current};
        searchList && searchList.forEach(item => {
          item.key && (obj[item.key] = item.value);
        });
        filters ? obj.filters = filters : '';
        // type ? obj.filters.type = type : '';
        // classId ? obj.filters.classId = classId : '';
        isStatusEqual0 ? obj.status = '0' : '';
        selectOption && isSearchStatus && (obj.status = selectOption.searchStatus);
        this.fetchList.call(this, obj);
      }
    };
    return (
      <div>
        <Helmet title={title}/>
        { (selectOption || searchList || onAdd) ? <div className="search-box clearfix">
            {selectOption && <span className="search-account col-md-4 col-xs-6">
              <span style={{ marginRight: 20 }}>
              {selectOption.label}
              </span>
              <Select
                value={selectOption.searchStatus}
                style={{ width: 150 }}
                onChange={this.selectSearchChange.bind(this)}
                >
                {this.selectSearch(selectOption)}
              </Select>
            </span>
          }
            {searchList && this.renderSearch.call(this, searchList)}
            {onAdd && <Button type="primary" className="fr btn-margin-top" onClick={onAdd}>新增</Button>}
          </div> : ''
        }

        <Table columns={columns} dataSource={data} pagination={pagination} rowKey={(item)=>item['_id']}/>
      </div>
    );
  }
}
