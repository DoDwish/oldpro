import {
  CONSTITUTION_LIST,
  REGION,
  SCHOOL,
  GRADE_DICT,
  CLASS_LIST,
  STUDENT_LIST,
  CONSTITUTION_COUNT
} from 'constants/urls';
import {
  SCHOOL_LIST_BEGIN,
  SCHOOL_LIST_SUCC,
  SCHOOL_LIST_FAIL,
  SCHOOL_FILTERS_UPDATE,
  CHANGE_REGION,
  CHANGE_PAGE
} from 'constants/actionTypes';
import config from 'constants/config';
import { SCHOOL_TYPES, DEFAULT_STATUS_TYPES } from 'constants/lostData';

const initialState = {
  data: [],
  dataType: [],
  region: {},
  provinceArr: [],
  province: '请选择',
  cityArr: [],
  city: '请选择',
  areaArr: [],
  area: '请选择',
  reportCount: 0,
  perPage: config.pageSize,
  page: 1,
  fetchState: '',
  schoolList: [],
  gradeList: [],
  classList: [],
  classListTemp: [],
  editFlag: 0, // 0 - 新增， 1 - 编辑
  schoolYear: '',
  schoolCount: 0,
  classId: '',
  gradeId: '',
  schoolId: '',
  type: '',
  midecalType: '',
};
export default function reducer(state = initialState, {type, data, msg, err = '', ...rest}) {
  switch (type) {
    case `${REGION}_GET_SUCC`:
      {
        let {province, city, area, region, provinceArr, cityArr, areaArr} = state;
        region = data;
        provinceArr = Object.keys(region);
        region[province] && (cityArr = Object.keys(region[province]));
        region[province] && region[province][city] && (areaArr = region[province][city]);
        return {
          ...state,
          region,
          provinceArr,
          cityArr,
          areaArr,
        };
      }
    case SCHOOL_LIST_BEGIN:
      return {
        ...state,
        fetchState: '加载中',
      };
    case `${SCHOOL}_GET_SUCC`:
      return {
        ...state,
        // schoolCount: msg.total,
        schoolList: data,
        // schoolList: schoolDataFilter(msg.data),
        // page: msg.page,
        // perPage: msg.perPage,
        // fetchState: '',
      };
    case SCHOOL_LIST_FAIL:
      return {
        ...state,
        fetchState: msg.err
      };
    case SCHOOL_FILTERS_UPDATE:
      return {
        ...state,
        filters: {...state.filters, ...msg.filters}
      };
    case `${GRADE_DICT}_GET_SUCC`:
      return {
        ...state,
        gradeList: data
      };
    case `${CLASS_LIST}_GET_SUCC`:
      return {
        ...state,
        classListTemp: data
      };
    case 'CHANGE_GRADE':
      return {
        ...state,
        classList: state.classListTemp.filter((item) => rest.gradeId === item.grade._id),
        gradeId: rest.gradeId
      };
    case 'SELECT_SHCOOL': {
      return {
        ...state,
        schoolId: rest.schoolId,
      };
    }
    case `${CONSTITUTION_COUNT}_GET_SUCC`:
      return {
        ...state,
        reportCount: data,
      };
    case `${CONSTITUTION_LIST}_GET_SUCC`:
      return {
        ...state,
        data: data,
        perPage: rest.perPage,
        page: rest.page,
        type: rest.type,
      };
    case 'CHANGE_CLASS':
      return {
        ...state,
        classId: rest.classId
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        midecalType: rest.midecalType,
        classesId: rest.classId
      };
    default:
      return state;
  }
}

function schoolDataFilter(data) {
  return data.map(row => {
    const types = [null, '小学', '初中', '高中', '专科', '本科'];
    row.schoolTypeString = row.schoolType ?
      row.schoolType.map(value => SCHOOL_TYPES[value]).join(', ') :
      null;
    row.statusString = DEFAULT_STATUS_TYPES[row.status];
    return row;
  });
}
