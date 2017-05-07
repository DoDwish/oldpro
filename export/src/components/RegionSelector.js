import React, {Component, PropTypes} from 'react';
import {Select, Input} from 'antd';
const Option = Select.Option;

/*
  参考： components/choolaccount/schoolaccount.js
  onChange: 选择框改变时候调用，传回地址信息的对象
  region： 所有地址信息
  size: 多少级地址联动
  validate： 检验函数，当前地址联动全部选择时返回true，没全部选择的时候返回false
  initialObj： 初始化选中的地址信息{province, city, area}
    jsx：
      <FormItem
        {... this.state.regionValidate === 'error' ? {regionValidate: 'error', help: '地区必选'} : {} }
        label={'地区'}
      >
        <RegionSelector
          onChange={this.changeRegion.bind(this)}
          region={this.props.region}
          initialObj={initialRegion}
          validate={this.validateRegion.bind(this)}
        />
      </FormItem>
    保存数据返回：
      state = {
        regionValidate: '',
      }
      region = {}
    onchange和保存验证：
      changeRegion(region = {}) {
        this.region = region;
      }
      validateRegion(bool) {
        const regionValidate = bool ? '' : 'error';
        this.setState({
          regionValidate
        });
      }
    提交时候获取数值和进行校验
      const { regionValidate } = this.state;
      const {province, city, area} = this.region;
      if (regionValidate === 'error') {
        return;
      }

 */
export default class RegionSelector extends Component {
  static PropTypes = {
    onChange: PropTypes.func,
    region: PropTypes.object.isRequired,
    value: PropTypes.object,
    size: PropTypes.number,
    isRequired: PropTypes.bool
  };
  static defaultProps = {
    validate: ()=>{},
    size: 3,
    isRequired: false
  }
  constructor() {
    super();
    this.state = {
      province: undefined,
      city: undefined,
      area: undefined,
    };
  }
  // 设置默认值
  componentWillMount() {
    // 没有初始化的情况
    const {value} = this.props;
    if (!value) {
      return;
    }
    const province = value.province || undefined;
    const city = value.city || undefined;
    const area = value.area || undefined;
    this.state = {province, city, area};
  }
  // 选择条目变化触发
  onChange(province, city, area) {
    const state = { province, city, area };
    this.setState(state);
    const {size, isRequired} = this.props;
    let bool;
    switch (size) {
    case 3:
      if (!province || !city || !area) {
        bool = false;
      } else {
        bool = true;
      }
      break;
    case 2:
      if (!province || !city) {
        bool = false;
      } else {
        bool = true;
      }
      break;
    case 1:
      if (!province) {
        bool = false;
      } else {
        bool = true;
      }
      break;
    default:
      bool = true;
    }
    if (!bool && isRequired) {
      this.props.onChange();
    } else {
      this.props.onChange(state);
    }
  }
  changeProvince(value) {
    this.onChange(value, undefined, undefined);
  }
  changeCity(value) {
    const {province} = this.state;
    this.onChange(province, value, undefined);
  }
  changeArea(value) {
    const {province, city} = this.state;
    this.onChange(province, city, value);
  }
  renderProvince(province, provinceArr) {
    return [
      <Select key='0' value={province}
        notFoundContent='没数据' placeholder="请选择"
        style={{'width': '20%', display: 'inline-block'}}
        onChange={this.changeProvince.bind(this)}
      >
        {provinceArr.map((item) =>< Option key={item} value = {
          item
        } > {
          item
        } < /Option>)}
      </Select>,
      <span key='1' style={{'padding': '10px'}}>省</span>
    ];
  }
  renderCity(city, cityArr) {
    return [
      <Select key='2' value={city}
        notFoundContent='没数据' placeholder="请选择"
        style={{'width': '20%', display: 'inline-block'}}
        onChange={this.changeCity.bind(this)}
      >
        {cityArr.map((item) =>< Option key={item} value = {
          item
        } > {
          item
        } < /Option>)}
      </Select>,
      <span key='3' style={{'padding': '10px'}}>市</span>
    ];
  }
  renderArea(area, areaArr) {
    return [
      <Select key='4' value={area}
        notFoundContent='没数据' placeholder="请选择"
        style={{'width': '20%', display: 'inline-block'}}
        onChange={this.changeArea.bind(this)}
      >
        {areaArr.map((item) =>< Option key={item} value = {
          item
        } > {
          item
        } < /Option>)}
      </Select>,
      <span key='5'>区／县</span>
    ];
  }
  render() {
    const {region, size} = this.props;
    const {province, city, area} = this.state;
    const provinceArr = Object.keys(region);
    const cityArr = (Object.keys(region).length && province) ? Object.keys(region[province]) : [];
    const areaArr = (Object.keys(region).length && province && city) ? region[province][city] : [];
    return (
      <div>
        {
          (()=>{
            switch (size) {
            case 3:
              return [
                ...this.renderProvince.call(this, province, provinceArr),
                ...this.renderCity.call(this, city, cityArr),
                ...this.renderArea.call(this, area, areaArr),
              ];
            case 2:
              return [
                ...this.renderProvince.call(this, province, provinceArr),
                ...this.renderCity.call(this, city, cityArr)
              ];
            case 1:
              return this.renderProvince.call(this, province, provinceArr);
            default:
              return null;
            }
          })()
        }
      </div>
    );
  }
}
