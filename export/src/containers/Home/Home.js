import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet'; // 设置head

// 绑定redux，包括方法和数据
export default class Home extends Component {
  render() {
    const styles = require('./Home.scss'); // styles.counterContainer，scss的用法； css则引用进来就行了，className直接写样式名对应的字符串就行
    return (
      <div className={styles.homeContainer}>
        <Helmet title="首页"/>
        <div className={styles.wellcome}>欢迎登录</div>
        <div className={styles.content}>青少年体能体质与智慧体育管理系统</div>
        <div className={styles.content}>专家管理中心</div>
      </div>
    );
  }
}
