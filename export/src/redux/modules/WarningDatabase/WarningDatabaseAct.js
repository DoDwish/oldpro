import {
  WARNING_LIST,
  WARNING_COUNT,
  WARNING_EDIT,
  WARNING_DELETE,
  COMPETITIVE_ABILITY_LIST,
  PHYSIQUE_SUBJECT_LIST,
}from 'constants/urls';
import {edit, fetchList, get, post, del} from 'redux/publicAct';
import {obj2query} from 'utils/tool';
import config from 'constants/config';

// 获取预警库列表
export function fetchWarningList(obj = {perPage: config.pageSize, page: 1}) {
  const queryObj = {};
  queryObj.sortField = 'createAt';
  queryObj.sortDir = 'DESC';
  queryObj.perPage = obj.perPage;
  queryObj.page = obj.page;
  return (dispatch) => {
    dispatch(fetchWarningTotal(queryObj));
    dispatch(fetchList({
      path: WARNING_LIST,
      queryObj,
      page: obj.page,
      perPage: obj.perPage,
    }));
  };
}
// 获取预警库列表总数
export function fetchWarningTotal(obj = {}) {
  return fetchList({ path: WARNING_COUNT, queryObj: obj });
}

// 修改预警库
export function upsertWarning({ id, succ, body }) {
  if (body.id) {
    return edit({ path: WARNING_EDIT, id: body.id, body, succ });
  } else {
    return post({path: WARNING_LIST, body, succ});
  }
}
// 删除预警库
export function deleteWarning({body, succ}) {
  const id = body.id;
  return del({
    path: WARNING_DELETE,
    body,
    id,
    succ,
  });
}

// 获取预警项目列表
export function fetchPhysiqueSubjectList() {
  return get({
    path: PHYSIQUE_SUBJECT_LIST
  });
}

// 获取竞技能力列表
export function fetchCompetitiveAbilityList() {
  return get({
    path: COMPETITIVE_ABILITY_LIST
  });
}
