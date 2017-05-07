import {LOGIN, VERIFY_CODE, VERIFY, SET_PWD, CHANGE_PWD} from 'constants/urls';
import {post} from '../../publicAct';
// 登陆
/*
accountId {String} 帐号id
* password {String} 帐号密码
* realm {String} 帐号系统类型 例如：gov-agency-user
 */
export function login({body = {}, succ, fail} = {}) {
  body.realm = 'expert-user';
  return post({
    path: LOGIN,
    body,
    succ,
    fail,
  });
}
// 发送短信验证码
/*
tel:String 电话号码
usage:String('reset_pwd') 验证码用途,关联不同的短信模板,此处应传reset_pwd
 */
export function sendCode({body = {}, succ, fail} = {}) {
  body.usage = 'reset_pwd';
  return post({
    path: VERIFY_CODE,
    body,
    succ,
    fail,
  });
}
// 验证短信验证码
/*
tel:String 电话号码

code: String 收到的短信验证码

usage:String('reset_pwd') 验证码用途,关联不同的短信模板,此处应传reset_pwd
 */
export function valiateCode({body = {}, succ, fail} = {}) {
  body.usage = 'reset_pwd';
  return post({
    path: VERIFY,
    body,
    succ,
    fail
  });
}
// 重置密码
/*
password:String 新密码
token:String 校验手机验证码接口返回的token
 */
export function resetPwd({body = {}, succ, fail} = {}) {
  return post({
    path: SET_PWD,
    body,
    succ,
    fail,
  });
}

// 登出
export function logout({succ = (()=>{})} = {}) {
  localStorage.removeItem('SMARTSPORT/EXPERT-USER/TOKEN');
  localStorage.removeItem('SMARTSPORT/EXPERT-USER/USER');
  succ();
}

// 修改密码
/*
oldPassword:String 旧密码
password:String 新密码
 */
export function changePwd({body = {}, succ, fail} = {}) {
  return post({
    path: CHANGE_PWD,
    body,
    succ,
    fail,
  });
}