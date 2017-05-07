import {KNOWLEDGE_LIST, KNOWLEDGE_COUNT} from 'constants/urls';
import {
  SEARCH_KNOWLEDGE_STATUS, KONWLEDGE_CHOOSE_PATH, IS_SEARCH_STATUS, IS_STATUS_EQUAL0
} from 'constants/actionTypes';
import config from 'constants/config';
const initialState = {
  count: 0,
  data: [],
  fetchState: '',
  searchNameText: '',
  searchAccountText: '',
  perPage: config.pageSize,
  page: 1,
};


export default function knowledgeReducer(state = initialState, action = {}) {
  switch (action.type) {
  case `${KNOWLEDGE_LIST}_GET_BEGIN`:
    return {
      ...state,
      fetchState: '请求中',
    };
  case `${KNOWLEDGE_LIST}_GET_SUCC`:
    return {
      ...state,
      fetchState: '请求成功',
      data: action.data,
      perPage: action.perPage,
      page: action.page,
      status: action.status
    };
  case `${KNOWLEDGE_LIST}_GET_FAIL`:
    return {
      ...state,
      fetchState: '请求失败',
    };
  case `${KNOWLEDGE_COUNT}_GET_SUCC`:
    return {
      ...state,
      total: action.data,
    };
  case SEARCH_KNOWLEDGE_STATUS:
    return {
      ...state,
      searchStatus: action.searchStatus,
    };
  case KONWLEDGE_CHOOSE_PATH:
    return {
      ...state,
      path: action.path,
    };
  case IS_SEARCH_STATUS:
    return {
      ...state,
      isSearchStatus: action.isSearchStatus,
    };
  case IS_STATUS_EQUAL0:
    return {
      ...state,
      isStatusEqual0: action.isStatusEqual0,
    };
  default:
    return state;
  }
}