import React, {Component, PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';
import Helmet from 'react-helmet'; // 设置head
import {asyncConnect} from 'redux-connect';
import {Layout, Menu, Breadcrumb, Icon, Dropdown, Row, Col} from 'antd';
import {logout} from 'redux/modules/Login/LoginAct';
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;
import config from 'constants/config';
require('./main.css');
// 请求结束后再进页面, 加了才能热部署
@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      return Promise.all(promises);
    }
  }
])

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // 面包屑配合react router
  itemRender(route, params, routes, paths) {
    return <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  logoutHandler() {
    logout({succ: this.logoutSucc.bind(this)});
  }
  logoutSucc() {
    this.context.router.push('/login');
  }
  // 下拉菜单
  getMenu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={'/change-pwd'}>修改密码</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <div onClick={this.logoutHandler.bind(this)}>退出</div>
        </Menu.Item>
      </Menu>
    );
  }
  clickHandler() {
    this.context.router.push('/role');
  }
  render() {
    const styles = require('./Main.scss'); // styles.counterContainer，scss的用法； css则引用进来就行了，className直接写样式名对应
    const img1 = require('img/logo.png'); // 下面两个img展现两个img的使用方式
    const userName = JSON.parse(localStorage.getItem('SMARTSPORT/EXPERT-USER/USER')).name;
    return (
      <Layout className={styles.layout}>
        <Helmet {...config.app.head}/>
        <Row style={{height: '100%'}}>
          <Col span={4} style={{width: '190px', height: '100%'}}>
            <Sider width={190} className={styles.sider}>
          <div className={styles.siderTop}>
            <img src={img1} className={`${styles.logo} img-circle`}/>
            <div className={styles.dropdown}>
              <Dropdown overlay={this.getMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="user" className={styles.userIcon}/>
                  {userName}
                  <Icon type="down" className={styles.dropdownIcon}/>
                </a>
              </Dropdown>
            </div>
          </div>
          <div className={styles.siderMid}/>
          <Menu mode="inline" className={styles.siderMenu}
            defaultOpenKeys={[this.props.routes[this.props.routes.length - 1].group]} // 默认展开的菜单组
            selectedKeys={[this.props.routes[this.props.routes.length - 1].name]}>
            <SubMenu key="account" title={< span > 专家账号管理 </span>}>
              <Menu.Item key="account" className={styles.siderMenuItem}>
                <Link to={'/account'}>
                  <span>账号管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="role" className={styles.siderMenuItem}>
                <Link to={'/role'}>
                  <span>角色管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="knowledgeManagement" title={< span > 知识库管理 </span>}>
              <Menu.Item key="knowledgeManagement" className={styles.siderMenuItem}>
                <Link to={'/knowledgeManagement'}>
                  <span>知识管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="pendingList" className={styles.siderMenuItem}>
                <Link to={{pathname: '/pendingList', query: {status: 0}}}>
                  <span>待审核列表</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="exercisePres" title={< span > 指导方案管理 </span>}>
              <Menu.Item key="exercisePres" className={styles.siderMenuItem}>
                <Link to={'/exercisePrescription'}>
                  <span>指导方案</span>
                 </Link>
              </Menu.Item>
             </SubMenu>
            <SubMenu key="medicalManagement" title={< span > 体检管理 </span>}>
              <Menu.Item key="physicalManagement" className={styles.siderMenuItem}>
                <Link to={'/physicalManagement'}>
                  <span>血脂体检数据</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="WarningDatabase" title={< span > 预警库管理 </span>}>
              <Menu.Item key="WarningDatabase" className={styles.siderMenuItem}>
                <Link to={'/WarningDatabase'}>
                  <span>预警库管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="bodyTestManagement" title={< span > 体测管理 </span>}>
              <Menu.Item key="constitution" className={styles.siderMenuItem}>
                <Link to={'/constitution'}>
                  <span>体质管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
          </Col>
          <Col span={20} style={{width: 'calc(100% - 190px)'}}>
            <Content>
          <div className={styles.breadcrumbContainer}>
            <div className={styles.breadcrumbItem}>
              <span>目前所在位置：</span>
              <Breadcrumb
                className={styles.breadcrumb}
                routes={this.props.routes}
                params={this.props.params}
                itemRender={this.itemRender}/>
            </div>
          </div>
          <div style={{
            margin: '20px'
          }}>
            {this.props.children}
          </div>
        </Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}
