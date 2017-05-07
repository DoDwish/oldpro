import config from 'constants/config';
import {EXPERT_USER, EXPERT_USER_EDIT, EXPERT_USER_COUNT} from 'constants/urls';
import {CHANGE_SHCOOL_ACOUNT_NAME, CHANGE_SHCOOL_ACOUNT_TEL} from 'constants/actionTypes';

const initialState = {
  count: 0,
  dataSource: [],
  perPage: config.pageSize,
  page: 0,
  name: '',
  tel: '',
};

export default function roleReducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
  case `${EXPERT_USER}_GET_SUCC`:
    return {
      ...state,
      dataSource: data,
      perPage: rest.perPage,
      page: rest.page,
    };
  case `${EXPERT_USER_COUNT}_GET_SUCC`:
    return {
      ...state,
      count: data,
    };
  case CHANGE_SHCOOL_ACOUNT_NAME:
    return {
      ...state,
      name: data
    };
  case CHANGE_SHCOOL_ACOUNT_TEL:
    return {
      ...state,
      tel: data
    };
  default:
    return state;
  }
}