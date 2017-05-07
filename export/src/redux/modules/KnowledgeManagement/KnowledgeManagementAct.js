import {KNOWLEDGE_LIST, KNOWLEDGE_COUNT} from 'constants/urls';
import {
  SEARCH_KNOWLEDGE_STATUS, KONWLEDGE_CHOOSE_PATH, IS_SEARCH_STATUS, IS_STATUS_EQUAL0
} from 'constants/actionTypes';
import {fetchList, edit} from 'redux/publicAct';
import {obj2query} from 'utils/tool';
import config from 'constants/config';
// 获取知识列表
export function fetchKnowledgeList({status = '', perPage = config.pageSize, page = 1} = {}) {
  const queryObj = {};
  queryObj.sortField = 'createAt';
  queryObj.sortDir = 'DESC';
  queryObj.perPage = perPage;
  queryObj.page = page;
  queryObj.filters = keys2filter({status});
  return (dispatch) => {
    dispatch(fetchKnowledgeTotal(queryObj));
    dispatch(fetchList({
      path: KNOWLEDGE_LIST,
      queryObj,
      page: page,
      perPage: perPage,
      status: status,
    }));
  };
}
// 获取知识列表总数
export function fetchKnowledgeTotal(queryObj = {}) {
  return fetchList({
    path: KNOWLEDGE_COUNT,
    queryObj
  });
}
export function onSearchKnowledgeByStatus(value) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_KNOWLEDGE_STATUS,
      searchStatus: value,
    });
  };
}
export function forIsSearchStatus(value) {
  if (value) {
    return (dispatch) => {
      dispatch({
        type: IS_SEARCH_STATUS,
        isSearchStatus: value,
      });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: IS_SEARCH_STATUS,
        isSearchStatus: value,
      });
    };
  }
}
export function forIsStatusEqual0(value) {
  if (value) {
    return (dispatch) => {
      dispatch({
        type: IS_STATUS_EQUAL0,
        isStatusEqual0: value,
      });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: IS_STATUS_EQUAL0,
        isStatusEqual0: value,
      });
    };
  }
}
// 知识库和待审核列表路径切换
export function choosePath(locationSearch) {
  let path = {};
  if (locationSearch === '?status=0') {
    path = {
      pathname: {
        Details: '/pendingList/details',
        Edit: '/pendingList/edit'
      },
      query: {
        Details: {status: 0},
        Edit: {status: 0}
      },
    };
  } else {
    path = {
      pathname: {
        Details: '/knowledgeManagement/details',
        Add: '/knowledgeManagement/add',
        Edit: '/knowledgeManagement/edit'
      },
      query: {
        Details: '',
        Edit: ''
      }
    };
  }
  return (dispatch) => {
    dispatch({
      type: KONWLEDGE_CHOOSE_PATH,
      path,
    });
  };
}
function keys2filter({...keys}) {
  const filters = {};
  if (keys.status) {
    filters.status = Number(keys.status);
  }
  if (!Object.keys(filters).length) {
    return null;
  }
  return filters;
}