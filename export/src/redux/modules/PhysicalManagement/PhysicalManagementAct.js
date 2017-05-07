import {
  GRADE_DICT,
  CLASS_LIST,
  SCHOOL_LIST,
  REGION,
  MEDICAL_EDIT,
  MEDICAL_ADD,
  PHYSICAL_SEARCH,
  STUDENT,
  MEDICAL_COUNT,
  STUDENT_COUNT,
} from 'constants/urls';
import {get, fetchList, post, edit} from '../../publicAct';
import {
  CHANGE_REGION, CLASS_YEAR, YEAR_OR_CLASS_ID
} from 'constants/actionTypes';
import config from 'constants/config';
// 获取年级列表
export function fetchGradeList(_id, isClear = false) {
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${GRADE_DICT}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${CLASS_LIST}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${PHYSICAL_SEARCH}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${STUDENT}_GET_SUCC`,
        data: []
      });
    };
  }
  const obj = {
    filters: {
      school: _id,
    }
  };
  return fetchList({
    path: GRADE_DICT,
    queryObj: obj
  });
}
// 获取班级列表
export function fetchClassList(obj, isClear = false) {
  // 置空
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${CLASS_LIST}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${PHYSICAL_SEARCH}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${STUDENT}_GET_SUCC`,
        data: []
      });
    };
  }
  return fetchList({
    path: CLASS_LIST,
    queryObj: obj
  });
}
// 获取新增编辑体检数据页面的学生列表
export function fetchStudentList({filters = {}, page = 1, perPage = config.pageSize}, isClear = false) {
  if (isClear) {
    return (dispatch) => {
      // todo
      dispatch({
        type: `${STUDENT_COUNT}_GET_SUCC`,
        data: 0
      });
      dispatch({
        type: `${STUDENT}_GET_SUCC`,
        data: []
      });
    };
  }
  const {classId} = filters;
  return (dispath) => {
    dispath(fetchStudentTotal(filters));
    dispath(fetchList({
      path: STUDENT,
      queryObj: {
        filters, page, perPage
      },
      page: page || 1,
      perPage: perPage || config.pageSize,
      classId
    }));
  };
}
// 获取学校列表
export function fetchSchoolList({province = '', city = '', area = ''} = {}, isClear = false) {
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${SCHOOL_LIST}_GET_SUCC`,
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
    path: SCHOOL_LIST,
    queryObj: obj
  });
}
export function changeRegion(province, city, county) {
  return {
    type: CHANGE_REGION,
    province,
    city,
    county,
  };
}
export function getRegion() {
  return get({
    path: REGION
  });
}
// 新增和编辑体检数据
export function savePhysical(obj) {
  if (obj.params.id) {
    const id = obj.params.id;
    delete obj.params.id;
    return edit({
      path: MEDICAL_EDIT,
      id,
      body: obj.params,
      succ: obj.succ,
      fail: obj.fail,
    });
  }
  return post({
    path: MEDICAL_ADD,
    body: obj.params,
    succ: obj.succ,
    fail: obj.fail
  });
}
// 查询体检数据列表
export function fetchPhysicalSearch({filters = {}, sortDir, sortField, page = 1, perPage = config.pageSize}, isClear = false) {
  const data = { filters, sortDir, sortField, page, perPage };
  if (isClear) {
    return (dispatch) => {
      dispatch({
        type: `${MEDICAL_COUNT}_GET_SUCC`,
        data: 0
      });
      dispatch({
        type: `${PHYSICAL_SEARCH}_GET_SUCC`,
        data: []
      });
    };
  }
  const {'class': classId = ''} = filters;
  return (dispatch) => {
    dispatch(fetchPhysicalSearchTotal(filters));
    dispatch(fetchList({
      path: PHYSICAL_SEARCH,
      queryObj: data,
      page: page || 1,
      perPage: perPage || config.pageSize,
      classId
    }));
  };
}
// 获取体检报告总条数
export function fetchPhysicalSearchTotal(filters) {
  const data = {
    filters
  };
  return fetchList({
    path: MEDICAL_COUNT,
    queryObj: data,
  });
}
// 获取学生总条数
export function fetchStudentTotal(filters) {
  const data = {
    filters
  };
  return fetchList({
    path: STUDENT_COUNT,
    queryObj: data,
  });
}
// 获取班级学年状态
export function fetchClassYear(schoolYear, id, time) {
  return {
    type: CLASS_YEAR,
    schoolYear,
    id,
    time,
  };
}
