import {
  CONSTITUTION_LIST,
  REGION, GRADE_DICT,
  CLASS_LIST,
  STUDENT_LIST,
  CONSTITUTION_IMPORT,
  STUDENT_COUNT,
  CONSTITUTION_EDIT,
  SCHOOL
 } from 'constants/urls';
import {
  SCHOOL_LIST_BEGIN,
  SCHOOL_LIST_SUCC,
  SCHOOL_LIST_FAIL,
  SCHOOL_FILTERS_UPDATE,
  CHANGE_PAGE
} from 'constants/actionTypes';
import config from 'constants/config';
import { SCHOOL_TYPES, DEFAULT_STATUS_TYPES } from 'constants/lostData';

const initialState = {
  studentList: [],
  studentItem: {},
  perPage: config.pageSize,
  page: 1,
  count: '',
  studentCount: 0,
  reportItem: {},
  reportTime: '',
  dataSource: [],
  classId: '',
  type: '',
  midecalType: '',
  constitutionList: '',
};
export default function reducer(state = initialState, {type, data, msg, err = '', ...rest}) {
  switch (type) {
    case `${STUDENT_LIST}_GET_SUCC`:
      return {
        ...state,
        studentList: data,
        perPage: rest.perPage,
        page: rest.page,
        type: rest.type,
      };
    case 'CHANGE_STUDENT':
      return {
        ...state,
        studentItem: rest.studentItem
      };
    case `${STUDENT_COUNT}_GET_SUCC`:
      return {
        ...state,
        studentCount: data,
      };
    case 'CHANGE_FLAG':
      return {
        editFlag: rest.editFlag,
        reportItem: rest.item,
      };
    case 'CHANGE_TIME':
      return {
        reportTime: rest.time
      };
    case 'CHANGE_CLASS':
      return {
        ...state,
        classId: rest.classId
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        midecalType: rest.midecalType
      };
    case `${CONSTITUTION_LIST}_GET_SUCC`:
      return {
        ...state,
        constitutionList: rest.data,
        perPage: rest.perPage,
        page: rest.page,
        classId: rest.classId
      };
    case `${CONSTITUTION_EDIT}_PUT_SUCC`:
      return {
        ...state
      };
    // case `${MEDICAL_ADD}_POST_SUCC`:
    //   return {
    //     ...state,
    //   };
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
