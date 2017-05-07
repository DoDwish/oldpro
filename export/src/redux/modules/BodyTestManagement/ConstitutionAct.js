import { CONSTITUTION_LIST, REGION, SCHOOL, GRADE_DICT, CLASS_LIST, STUDENT_LIST, CONSTITUTION_COUNT }
 from 'constants/urls';
import {
  CHANGE_REGION,
  // CONSTITUTION_LIST_BEGIN,
  // CONSTITUTION_LIST_SUCC,
  // CONSTITUTION_LIST_FAIL,
  SCHOOL_LIST_BEGIN,
  SCHOOL_LIST_SUCC,
  SCHOOL_LIST_FAIL,
  SCHOOL_FILTERS_UPDATE,
  CHANGE_PAGE
} from 'constants/actionTypes';
import { get, edit, post, fetchList } from '../../publicAct';
import {obj2query} from 'utils/tool';
import config from 'constants/config';

export function fetchConstitutionList({filters = {}, page, perPage = config.pageSize}, isClear = false) {
  const data = { filters, page, perPage };
  if (isClear) {
    return (dispath) => {
      dispath({
        type: `${CONSTITUTION_COUNT}_GET_SUCC`,
        data: []
      });
      dispath({
        type: `${CONSTITUTION_LIST}_GET_SUCC`,
        data: []
      });
    };
  }
  const {'class': classId = '', type} = filters;
  return (dispatch)=>{
    dispatch(fetchConstitutionCount(filters));
    dispatch(fetchList({
      path: CONSTITUTION_LIST,
      queryObj: data,
      page: page || 1,
      perPage: perPage || config.pageSize,
    }));
  };
}
export function changePage(obj) {
  const {filters} = obj;
  const {type, 'class': classId} = filters;
  return {
    type: CHANGE_PAGE,
    midecalType: type,
    classId
  };
}
export function fetchConstitutionCount(filters) {
  const data = {
    filters
  };
  return fetchList({
    path: CONSTITUTION_COUNT,
    queryObj: data,
  });
}

export function getRegion() {
  return get({
    path: REGION
  });
}

export function changeRegion(province, city, area) {
  return {
    type: CHANGE_REGION,
    province,
    city,
    area,
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
  // return (dispatch, request, getState) => {
  //   const state = getState().school;
  //   let filter;
  //   let url;
  //   accountObj = obj2filter(accountObj);
  //   url = `${SCHOOL}?${obj2query(accountObj)}`;
  //   Promise
  //     .all([
  //       request.get(url),
  //       request.get(`${SCHOOL}/count?${obj2query({filters: accountObj.filters})}`),
  //     ])
  //     .then(([data, {total}]) => {
  //       dispatch({type: SCHOOL_LIST_SUCC, msg: {total, data, page: accountObj.page, perPage: accountObj.perPage}});
  //     })
  //     .catch(err => dispatch({type: SCHOOL_LIST_FAIL, msg: {err}}));
  // };
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

export function changeSchool(obj) {
  return fetchList({
    path: GRADE_DICT,
    queryObj: obj,
  });
}

export function selectSchool(schoolId) {
  return {
    type: 'SELECT_SHCOOL',
    schoolId: schoolId,
  };
}

export function fetchClassListBySchoolYear(obj) {
  return fetchList({
    path: CLASS_LIST,
    queryObj: obj,
  });
}

export function changeGrade(gradeId) {
  return {
    type: 'CHANGE_GRADE',
    gradeId: gradeId,
  };
}

export function changeClass(classId) {
  return {
    type: 'CHANGE_CLASS',
    classId: classId,
  };
}

function obj2filter(obj) {
  let filters = {};
  if (obj.class) {
    filters.class = {$regex: obj.class};
    delete obj.class;
  }
  if (obj.type) {
    filters.type = obj.type;
    delete obj.type;
  }
  if (Object.keys(filters).length) {
    obj.filters = filters;
  }
  return obj;
}
