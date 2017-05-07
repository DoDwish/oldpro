import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Form, Input, Button, Alert, message} from 'antd';
import * as actions from 'redux/modules/Login/LoginAct';
import {ACCOUNT, ACCOUNT_TIP, PASSWORD, PASSWORD_TIP, MOBILE, MOBILE_TIP} from 'utils/validation';
import {MyFormItem} from 'components';
import {changeState2Begin, changeState2Fail, changeState2Succ} from 'utils/tool';
require('./Login.css');

const FormItem = Form.Item;
@connect(()=>({}), actions)
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  state = {
    saveState: '',
    codeTips: '获取验证码'
  }
  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }
  // 登录
  loginSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        changeState2Begin.call(this, '登陆中');
        this.props.login({
          body: {
            accountId: values.accountId,
            password: values.password
          },
          succ: this.loginSucc.bind(this),
          fail: changeState2Fail.bind(this),
        });
      } else {
        message.error('请检查输入项！');
      }
    });
  }
  loginSucc() {
    changeState2Succ.call(this);
    this.context.router.push('/');
  }
  gotoForgetValiate() {
    this.context.router.push('/forget-pwd-valiate');
  }
  showLogin(getFieldDecorator) {
    const items = [
      {
        jsx: <div style={{textAlign: 'center', fontSize: 16}}>
               <div>青少年体能体质与智慧体育管理系统</div>
               <div>专家管理中心</div>
             </div>
      }, {
        key: 'accountId',
        rules: [{
          required: true,
          message: '必输项',
        }],
        jsx: <Input placeholder="账号/手机号码/电子邮件"/>
      },
      {
        key: 'password',
        rules: [{
          required: true,
          message: '必输项',
        }],
        jsx: <Input type="password" placeholder="密码"/>
      }, {
        jsx: (
              <div className={'forget-tips-container'}>
                <span className={'forget-tips'} onClick={this.gotoForgetValiate.bind(this)}>忘记密码？</span>
              </div>
            )
      }, {
        jsx: this.state.saveState && (
            <Alert message={this.state.saveState} type="info" showIcon />
          )
      }, {
        jsx: (<Button
          type="primary"
          className="login-form-button"
          htmlType="submit"
          >
          登录
        </Button>)
      }
    ];
    return (
      <Form className="login-form" onSubmit={this.loginSubmit.bind(this)}>
        <Helmet title='登陆'/>
        {
          MyFormItem({
            items,
            getFieldDecorator: getFieldDecorator,
          })
        }
      </Form>
    );
  }
  // 忘记密码-验证
  sendCode() {
    const {codeTips} = this.state;
    if (codeTips !== '获取验证码') {
      return;
    }
    this.props.form.validateFields(['tel'], (err, values) => {
      if (!err) {
        this.props.sendCode({
          body: {
            tel: values.tel,
          },
          succ: this.sendSucc.bind(this),
          fail: changeState2Fail.bind(this),
        });
      } else {
        message.error('请检查输入项！');
      }
    });
  }
  sendSucc() {
    // changeState2Succ.call(this);
    let secend = 60;
    this.setState({codeTips: `${secend} 秒`});
    this.interval = setInterval(()=>{
      this.setState({codeTips: `${--secend} 秒`});
      if (secend === 0) {
        this.setState({codeTips: '获取验证码'});
        clearInterval(this.interval);
      }
    }, 1000);
  }
  valiateCode(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        changeState2Begin.call(this, '验证中');
        this.props.valiateCode({
          body: {
            tel: values.tel,
            code: values.code
          },
          succ: this.valiateSucc.bind(this),
          fail: changeState2Fail.bind(this),
        });
      } else {
        message.error('请检查输入项！');
      }
    });
  }
  valiateSucc(data) {
    changeState2Succ.call(this);
    this.context.router.push({
      pathname: '/forget-pwd-set',
      state: data.token
    });
  }
  showVailiate(getFieldDecorator) {
    const items = [
      {
        jsx: <div style={{textAlign: 'center'}}>找回密码</div>
      }, {
        key: 'tel',
        rules: [{
          required: true,
          message: MOBILE_TIP,
          pattern: MOBILE
        }],
        jsx: <Input placeholder="请输入手机号码"/>
      },
      {
        key: 'code',
        rules: [{
          required: true,
          message: '必输项',
        }],
        jsx: (<div>
              <Input style={{width: '60%'}} placeholder="请输入验证码"/>
              <div className={'sendCodeBtn'}><span onClick={this.sendCode.bind(this)}>{this.state.codeTips}</span></div>
            </div>)
      }, {
        jsx: this.state.saveState && (
            <Alert message={this.state.saveState} type="info" showIcon />
          )
      }, {
        jsx: (<Button
          type="primary"
          className="login-form-button"
          htmlType="submit"
          >
          验证
        </Button>)
      }
    ];
    return (
      <Form className="login-form" onSubmit={this.valiateCode.bind(this)}>
        <Helmet title='忘记密码'/>
        {
          MyFormItem({
            items,
            getFieldDecorator: getFieldDecorator,
          })
        }
      </Form>
    );
  }
  // 忘记密码-重置
  resetPwdSucc() {
    changeState2Succ.call(this);
    message.success('密码保存成功！');
    this.context.router.push('/login');
  }
  resetPwd(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        changeState2Begin.call(this, '保存中');
        this.props.resetPwd({
          body: {
            password: values.newPwd,
            token: this.props.location.state
          },
          succ: this.resetPwdSucc.bind(this),
          fail: changeState2Fail.bind(this),
        });
      } else {
        message.error('请检查输入项！');
      }
    });
  }
  showReset(getFieldDecorator) {
    const items = [
      {
        jsx: <div style={{textAlign: 'center'}}>验证成功</div>
      }, {
        key: 'newPwd',
        rules: [{
          required: true,
          message: PASSWORD_TIP,
          pattern: PASSWORD
        }, {
          validator: this.checkConfirm.bind(this)
        }],
        jsx: <Input style={{background: '#fff'}} type="password" placeholder="请输入新密码"/>
      }, {
        key: 'confirmPwd',
        rules: [{
          required: true,
          message: PASSWORD_TIP,
          pattern: PASSWORD
        }, {
          validator: this.checkPassword.bind(this)
        }],
        jsx: <Input type="password" placeholder="请再次输入新密码"/>
      }, {
        jsx: this.state.saveState && (
            <Alert message={this.state.saveState} type="info" showIcon />
          )
      }, {
        jsx: (<Button
          type="primary"
          className="login-form-button"
          htmlType="submit"
          >
          保存
        </Button>)
      }
    ];
    return (
      <Form className="login-form" onSubmit={this.resetPwd.bind(this)}>
        <Helmet title='忘记密码'/>
        {
          MyFormItem({
            items,
            getFieldDecorator: getFieldDecorator,
          })
        }
      </Form>
    );
  }
  // 修改密码
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && form.getFieldValue('newPwd') && value !== form.getFieldValue('newPwd')) {
      callback('密码不一致！');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && form.getFieldValue('confirmPwd')) {
      form.validateFields(['confirmPwd'], {force: true});
    }
    callback();
  }
  cancelHandler() {
    this.context.router.goBack();
  }
  handleChangePwd(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        changeState2Begin.call(this, '修改中');
        this.props.changePwd({
          body: {
            oldPassword: values.oldPwd,
            password: values.newPwd
          },
          succ: this.changePwdSucc.bind(this),
          fail: changeState2Fail.bind(this),
        });
      } else {
        message.error('请检查输入项！');
      }
    });
  }
  changePwdSucc() {
    changeState2Succ.call(this);
    localStorage.removeItem('SMARTSPORT/EXPERT-USER/TOKEN');
    localStorage.removeItem('SMARTSPORT/EXPERT-USER/USER');
    message.success('密码修改成功');
    this.context.router.push('/login');
  }
  showChangePwd(getFieldDecorator) {
    const items = [
      {
        key: 'oldPwd',
        rules: [{
          required: true,
          message: '必输项',
        }],
        jsx: <Input type="password" placeholder="原密码"/>
      }, {
        key: 'newPwd',
        rules: [{
          required: true,
          message: PASSWORD_TIP,
          pattern: PASSWORD
        }, {
          validator: this.checkConfirm.bind(this)
        }],
        jsx: <Input type="password" placeholder="新密码"/>
      }, {
        key: 'confirmPwd',
        rules: [{
          required: true,
          message: '确认新密码',
          pattern: PASSWORD
        }, {
          validator: this.checkPassword.bind(this)
        }],
        jsx: <Input type="password" placeholder="确认新密码"/>
      }, {
        jsx: this.state.saveState && (
          <Alert message={this.state.saveState} type="info" showIcon />
        )
      }, {
        jsx: [
          <Button
            key='0'
            onClick={this.cancelHandler.bind(this)}
            className={'login-btn-cancel-left'}
          >
            取消
          </Button>,
          <Button
            key='1'
            className={'login-btn-confirm-right'}
            type="primary"
            htmlType="submit"
          >
            保存
          </Button>
        ]
      }
    ];
    return (
      <Form className="login-form" onSubmit={this.handleChangePwd.bind(this)}>
        <Helmet title='修改密码'/>
        {
          MyFormItem({
            items,
            getFieldDecorator: getFieldDecorator,
          })
        }
      </Form>
    );
  }

  renderPage() {
    const pathname = this.props.location.pathname;
    const {getFieldDecorator} = this.props.form;
    switch (pathname) {
    case '/login':
      return this.showLogin.call(this, getFieldDecorator);
    case '/forget-pwd-valiate':
      return this.showVailiate.call(this, getFieldDecorator);
    case '/forget-pwd-set':
      return this.showReset.call(this, getFieldDecorator);
    case '/change-pwd':
      return this.showChangePwd.call(this, getFieldDecorator);
    default:
      return null;
    }
  }
  render() {
    return (
      <div className={'login-bg'}>
        {this.renderPage.call(this)}
        <div className={'login-bottom-imge'}/>
        <div className={'login-info'}>版权：广东原动力信息科技有限责任公司</div>
      </div>
    );
  }
}
export default Form.create()(Login);
