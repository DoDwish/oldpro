import {
  WARNING_LIST,
  WARNING_COUNT,
  WARNING_EDIT,
  WARNING_DELETE,
  COMPETITIVE_ABILITY_LIST,
  PHYSIQUE_SUBJECT_LIST,
} from 'constants/urls';
import config from 'constants/config';

const initialState = {
  path: '',
  total: 0,
  perPage: config.pageSize,
  competitiveAbilityList: [],
  physiqueSubjectList: [],
  page: 1,
  data: [],
};

export default function(state = initialState, {type, data, ...msg}) {
  switch (type) {
    case `${WARNING_LIST}_GET_SUCC`:
      return {
        ...state,
        data,
        page: msg.page,
        perPage: msg.perPage,
      };

    case `${WARNING_COUNT}_GET_SUCC`:
      return { ...state, total: data, };

    case `${WARNING_LIST}_POST_SUCC`:
      return { ...state };

    case `${WARNING_EDIT}_PUT_SUCC`:
      return { ...state };
    case `${WARNING_DELETE}_DELETE_SUCC`:
      return {
        ...state,
        data,
      };
    case `${COMPETITIVE_ABILITY_LIST}_GET_SUCC`:
      return {
        ...state,
        competitiveAbilityList: data,
      };

    case `${PHYSIQUE_SUBJECT_LIST}_GET_SUCC`:
      return {
        ...state,
        physiqueSubjectList: data,
      };

    default:
      return state;
  }
}
