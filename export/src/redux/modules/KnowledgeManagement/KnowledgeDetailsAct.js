import {KNOWLEDGE_AUDIT, GET_DETAIL} from 'constants/urls';
import {SEARCH_KNOWLEDGE_STATUS} from 'constants/actionTypes';
import {edit} from 'redux/publicAct';
import config from 'constants/config';

export function saveAuditInfo(obj) {
  console.log(obj);
  const body = obj.params;
  const succ = obj.succ;
  if (obj.id) {
    return edit({
      method: 'post',
      path: KNOWLEDGE_AUDIT,
      id: obj.id,
      body,
      succ
    });
  }
}
// 查看单个知识详情
export function getDetail(id, path = GET_DETAIL) {
  const beginType = `${path}_GET_BEGIN`;
  const succType = `${path}_GET_SUCC`;
  const failType = `${path}_GET_FAIL`;
  path = path.replace(':id', id);
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.request({
      url: path,
      method: 'get',
    }).then(data=>{
      dispatch({
        type: succType,
        data: data,
      });
    }).catch(err=>{
      dispatch({
        type: failType,
        err,
      });
    });
  };
}