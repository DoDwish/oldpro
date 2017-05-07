import {KNOWLEDGE_TYPE, FETCH_CATEGORY} from 'constants/urls';
import {
  CHANGE_CATEGORY,
} from 'constants/actionTypes';
const initialState = {
  data: [],
  dataType: []
};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
  case `${KNOWLEDGE_TYPE}_GET_SUCC`:
    return {
      ...state,
      dataType: data,
    };
  case `${FETCH_CATEGORY}_GET_SUCC`:
    return {
      ...state,
      data,
    };
  case CHANGE_CATEGORY:
    return {
      ...state,
    };
  default:
    return state;
  }
}
