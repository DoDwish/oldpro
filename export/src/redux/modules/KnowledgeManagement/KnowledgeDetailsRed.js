import {GET_DETAIL} from 'constants/urls';
const initialState = {
  detailData: {},
};
export default function reducer(state = initialState, {type, data, ...rest}) {
  switch (type) {
  case `${GET_DETAIL}_GET_SUCC`:
    return {
      ...state,
      detailData: data,
    };
  default:
    return state;
  }
}