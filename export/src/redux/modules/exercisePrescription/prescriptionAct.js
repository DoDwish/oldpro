import {EDIT_EXERCISE_PRESCRIPTION, GET_ALL_PRESCRIPTION, DEL_PRESCRIPTION,
  EXERCISE_PRESCRIPTION, FETCH_COMPETITIVE_ABILITY, POST_EXERCISE_PRESCRIPTION} from 'constants/urls';
import {fetchList, post, put, edit, del, delById} from '../../publicAct';
import config from 'constants/config';

// 获取所有处方
export function fetchExercisePrescription(obj = {
  perPage: config.pageSize, page: 1,
}) {
  return fetchList({
    path: GET_ALL_PRESCRIPTION,
    queryObj: obj,
    perPage: obj.perPage || config.pageSize,
    page: obj.page || 1
  });
}

// 删除某个处方,传id
export function delExercisePrescription(id = '') {
  return (dispatch, req, getState) => {
    const {dataSource} = getState().prescriptionRed;
    let dataTemp = dataSource.map(item => {
      return Object.assign({}, item);
    });
    dataTemp = dataTemp.filter(function(obj) {
      return id !== obj._id;
    });
    dispatch({
      type: 'delPerscription',
      data: dataTemp
    });
    dispatch(delById({
      path: DEL_PRESCRIPTION,
      id,
    }));
  };
}

// 获取处方竞技能力
export function fetchCompetitiveAbility(obj = {
  perPage: config.pageSize, page: 1,
}) {
  return fetchList({
    path: FETCH_COMPETITIVE_ABILITY,
    perPage: obj.perPage || config.pageSize,
    page: obj.page || 1
  });
}

// 获取处方总条目数
export function fetchTotalCF(obj = {}) {
  return fetchList({
    path: EXERCISE_PRESCRIPTION
  });
}

// 保存新增处方
export function saveExercisePres(obj = {}) {
  
  if (obj.params && obj.params.id) {
    const id = obj.params.id;
    delete obj.params.id;
    return edit({
      path: EDIT_EXERCISE_PRESCRIPTION,
      id,
      body: obj.params,
      succ: obj.succ,
      fail: obj.fail
    });
  }
  return post({
    path: POST_EXERCISE_PRESCRIPTION,
    body: obj.params,
    succ: obj.succ,
    fail: obj.fail
  });
}
