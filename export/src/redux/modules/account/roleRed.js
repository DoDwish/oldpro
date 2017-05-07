import config from 'constants/config';
import {EXPERT_ROLE, EXPERT_ROLE_EDIT, EXPERT_PERMISSION, EXPERT_PERMISSION_ALL, DEPEND} from 'constants/urls';
import {CHANGE_ROLE_CHECK} from 'constants/actionTypes';

const initialState = {
  dataSource: [],
  checkList: [],
  permissionList: [],
  dependsList: [], // 权限依赖表
};

export default function roleReducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case `${EXPERT_ROLE}_GET_SUCC`:
      return {
        ...state,
        dataSource: data,
        perPage: rest.perPage,
        page: rest.page,
      };
    case `${EXPERT_PERMISSION}_GET_SUCC`:
      const checkList = [];
      data.forEach(obj => {
        const arr = obj.permissions.forEach(item => {
          if (item.own) {
            return checkList.push(item._id);
          }
        });
      });
      return {
        ...state,
        checkList,
        permissionList: data,
      };
    case `${EXPERT_PERMISSION_ALL}_GET_SUCC`:
      return {
        ...state,
        checkList: [],
        permissionList: data
      };
    case CHANGE_ROLE_CHECK:
      return {
        ...state,
        checkList: data
      };
    case `${DEPEND}_GET_SUCC`:
      return {
        ...state,
        dependsList: data,
      };
    default:
      return state;
  }
}