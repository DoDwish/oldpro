import {
  EXPERT_ROLE, EXPERT_ROLE_EDIT, EXPERT_PERMISSION, EXPERT_PERMISSION_ALL, DEPEND
} from 'constants/urls';
import {CHANGE_ROLE_CHECK} from 'constants/actionTypes';
import {fetchList, post, put, edit, get, getById} from '../../publicAct';
import {checkDepened} from 'utils/tool';
import {message} from 'antd';

export function fetchExpertRole() {
  return get({
    path: EXPERT_ROLE,
  });
}

export function fetchExpertRolePermission(id = '') {
  if (id) {
    return getById({
      path: EXPERT_PERMISSION,
      id,
    });
  }
  let url = EXPERT_PERMISSION_ALL;
  return get({
    path: url
  });
}

export function changeExpertRoleCheck(checkList = []) {
  return {
    type: CHANGE_ROLE_CHECK,
    data: checkList
  };
}

export function saveExpertRole(obj) {
  return (dispatch, req, getState) => {
    const permissions = [];
    const {checkList, permissionList, dependsList} = getState().roleRed;
    permissionList.forEach(permission => {
      permission.permissions.forEach(item => {
        if (checkList.includes(item._id)) {
          permissions.push({_id: item._id, name: item.name, code: item.code});
        }
      });
    });
    const body = {
      name: obj.params.name,
      permissions
    };
    const tips = checkDepened(permissions, dependsList);
    if (tips) {
      message.error(tips, 5);
      return;
    }
    if (obj.params.id) {
      const id = obj.params.id;
      delete obj.params.id;
      dispatch(edit({
        path: EXPERT_ROLE_EDIT,
        id,
        body,
        succ: obj.succ,
        fail: obj.fail
      }));
      return;
    }
    dispatch(post({
      path: EXPERT_ROLE,
      body,
      succ: obj.succ,
      fail: obj.fail
    }));
  };
}

export function fetchDependency() {
  return get({
    path: DEPEND,
  });
}