import {EXPERT_USER, EXPERT_USER_EDIT, EXPERT_USER_COUNT} from 'constants/urls';
import {CHANGE_SHCOOL_ACOUNT_NAME, CHANGE_SHCOOL_ACOUNT_TEL} from 'constants/actionTypes';
import {fetchList, post, put, edit} from '../../publicAct';
import config from 'constants/config';

export function fetchExpertAccount(obj = {
  name: '', tel: '', perPage: config.pageSize, page: 1
}) {
  obj = Object.assign({}, obj);
  obj = obj2filter(obj);
  return (dispatch)=>{
    dispatch(fetchExpertAccountTotal(obj));
    dispatch(fetchList({
      path: EXPERT_USER,
      queryObj: obj,
      perPage: obj.perPage || config.pageSize,
      page: obj.page || 1,
    }));
  };
}

export function fetchExpertAccountTotal(obj) {
  const data = {
    filters: obj.filters
  };
  return fetchList({
    path: EXPERT_USER_COUNT,
    queryObj: data,
  });
}

export function saveExpertAccount(obj) {
  if (obj.params.id) {
    const id = obj.params.id;
    delete obj.params.id;
    return edit({
      path: EXPERT_USER_EDIT,
      id,
      body: obj.params,
      succ: obj.succ,
      fail: obj.fail
    });
  }
  return post({
    path: EXPERT_USER,
    body: obj.params,
    succ: obj.succ,
    fail: obj.fail
  });
}
export function onInputName(event) {
  const name = event.target.value;
  return (dispatch) => {
    dispatch({
      type: CHANGE_SHCOOL_ACOUNT_NAME,
      data: name,
    });
  };
}
export function onInputTel(event) {
  const tel = event.target.value;
  return (dispatch) => {
    dispatch({
      type: CHANGE_SHCOOL_ACOUNT_TEL,
      data: tel,
    });
  };
}

// obj对应的条目转为filter过滤条件，并移除
function obj2filter(obj) {
  obj.filters = {};
  if (obj.name) {
    obj.filters.name = {
      "$regex": obj.name
    };
    delete obj.name;
  }
  if (obj.tel) {
    obj.filters.tel = {
      "$regex": obj.tel
    };
    delete obj.tel;
  }
  if (!Object.keys(obj.filters).length) {
    delete obj.filters;
  }
  return obj;
}