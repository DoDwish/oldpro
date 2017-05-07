import {
  CONSTITUTION_LIST,
  REGION,
  SCHOOL,
  GRADE_DICT,
  CLASS_LIST,
  STUDENT_LIST,
  STUDENT_COUNT,
  CONSTITUTION_IMPORT,
  CONSTITUTION_EDIT,
} from 'constants/urls';
import {
  CHANGE_REGION,
  SCHOOL_LIST_BEGIN,
  SCHOOL_LIST_SUCC,
  SCHOOL_LIST_FAIL,
  SCHOOL_FILTERS_UPDATE,
  CHANGE_PAGE
} from 'constants/actionTypes';
import { get, edit, post, fetchList } from '../../publicAct';
import {obj2query} from 'utils/tool';
import config from 'constants/config';

export function fetchStudentList({filters = {}, page, perPage = config.pageSize}, isClear = false) {
  const data = { filters, page, perPage };
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${STUDENT_LIST}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${STUDENT_COUNT}_GET_SUCC`,
        data: []
      });
    };
  }
  const {'class': classId = '', type} = filters;
  return (dispatch)=>{
    dispatch(fetchStudentCount(filters));
    dispatch(fetchList({
      path: STUDENT_LIST,
      queryObj: data,
      page: page || 1,
      perPage: perPage || config.pageSize,
    }));
  };
}
export function changePage(obj) {
  const {filters} = obj;
  const {'class': classId = ''} = filters;
  return {
    type: CHANGE_PAGE,
    midecalClass: classId
  };
}
export function changeFlag(editFlag, item) {
  return ({
    type: 'CHANGE_FLAG',
    editFlag: editFlag,
    item: item,
  });
}

export function fetchStudentCount(filters) {
  const data = {
    filters
  };
  return fetchList({
    path: STUDENT_COUNT,
    queryObj: data,
  });
}

export function changeStudent(studentItem) {
  return {
    type: 'CHANGE_STUDENT',
    studentItem: studentItem,
  };
}

export function bacthImport(obj) {
  const body = obj.params;
  const succ = obj.succ;
  const fail = obj.fail;
  return post({
    path: CONSTITUTION_IMPORT,
    body,
    succ,
    fail
  });
}

export function fetchCreateSaveCategory(obj) {
  const body = obj.params;
  const succ = obj.succ;
  const fail = obj.fail;
  if (obj.params._id) {
    const id = obj.params._id;
    delete obj.params._id;
    return edit({
      path: CONSTITUTION_EDIT,
      // path: CONSTITUTION_LIST,
      id,
      body,
      succ,
      fail,
    });
  }
  return post({
    path: CONSTITUTION_LIST,
    body,
    succ,
    fail
  });
}

export function changeTime(time) {
  return {
    type: 'CHANGE_TIME',
    time: time
  };
}
export function fetchSchoolList({province = '', city = '', area = ''} = {}, isClear = false) {
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${SCHOOL}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${GRADE_DICT}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${CLASS_LIST}_GET_SUCC`,
        data: []
      });
    };
  }
  const obj = {
    filters: {
      'region.province': province,
      'region.city': city,
      'region.area': area
    }
  };
  return fetchList({
    path: SCHOOL,
    queryObj: obj
  });
}

export function fetchClassListBySchoolYear(obj, isClear) {
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${SCHOOL}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${GRADE_DICT}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${CLASS_LIST}_GET_SUCC`,
        data: []
      });
    };
  }
  return fetchList({
    path: CLASS_LIST,
    queryObj: obj,
  });
}

function obj2filter(obj) {
  let filters = {};
  if (obj.class) {
    filters['activeClass._id'] = obj.class;
    delete obj.class;
  }
  if (Object.keys(filters).length) {
    obj.filters = filters;
  }
  return obj;
}