import {
  GRADE_DICT,
  CLASS_LIST,
  SCHOOL_LIST,
  REGION,
  PHYSICAL_SEARCH,
  MEDICAL_EDIT,
  MEDICAL_ADD,
  MEDICAL_COUNT,
  STUDENT,
  STUDENT_COUNT,
} from 'constants/urls';
import {CHANGE_REGION, CLASS_YEAR} from 'constants/actionTypes';
import config from 'constants/config';

const initialState = {
  dataSource: [],
  gradeList: [],
  schoolList: [],
  classList: [],
  region: {},
  provinceArr: [],
  province: '请选择',
  cityArr: [],
  city: '请选择',
  countyArr: [],
  county: '请选择',
  physicalSearch: [],
  student: [],
  count: '',
  perPage: config.pageSize,
  page: 1,
  studentCount: '',
  classId: '',
};
export default function PhysicalManagementRed(state = initialState, action = {}) {
  const { page, perPage, classId } = action;
  switch (action.type) {
  case `${GRADE_DICT}_GET_SUCC`:
    return {
      ...state,
      gradeList: action.data,
    };
  case `${CLASS_LIST}_GET_SUCC`:
    return {
      ...state,
      classList: action.data,
    };
  case `${SCHOOL_LIST}_GET_SUCC`:
    return {
      ...state,
      schoolList: action.data,
    };
  case `${STUDENT}_GET_SUCC`:
    return {
      ...state,
      student: action.data,
      page,
      perPage,
      classId,
    };
  case `${PHYSICAL_SEARCH}_GET_SUCC`:
    return {
      ...state,
      physicalSearch: action.data,
      page,
      perPage,
      classId
    };
  case `${MEDICAL_EDIT}_PUT_SUCC`:
    return {
      ...state
    };
  case `${MEDICAL_ADD}_POST_SUCC`:
    return {
      ...state,
    };
  case `${MEDICAL_COUNT}_GET_SUCC`:
    return {
      ...state,
      count: action.data,
    };
  case `${STUDENT_COUNT}_GET_SUCC`:
    return {
      ...state,
      studentCount: action.data,
    };
  case `${REGION}_GET_SUCC`:
    {
      let {province, city, county, region, provinceArr, cityArr, countyArr} = state;
      region = action.data;
      provinceArr = Object.keys(region);
      region[province] && (cityArr = Object.keys(region[province]));
      region[province] && region[province][city] && (countyArr = region[province][city]);
      return {
        ...state,
        region,
        provinceArr,
        cityArr,
        countyArr,
      };
    }
  case CHANGE_REGION:
    {
      let {province, city, county, region, provinceArr, cityArr, countyArr} = state;
      province = action.province || '请选择';
      city = action.city || '请选择';
      county = action.county || '请选择';
      region[province] && (cityArr = Object.keys(region[province]));
      region[province] && region[province][city] && (countyArr = region[province][city]);
      return {
        ...state,
        province,
        city,
        county,
        cityArr,
        countyArr
      };
    }
  case CLASS_YEAR:
    {
      return {
        ...state,
        schoolYear: action.schoolYear,
        id: action.id,
        time: action.time,
      };
    }
  default:
    return state;
  }
}
