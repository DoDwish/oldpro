import config from 'constants/config';
import {GET_ALL_PRESCRIPTION, DEL_PRESCRIPTION, EXERCISE_PRESCRIPTION, FETCH_COMPETITIVE_ABILITY, POST_EXERCISE_PRESCRIPTION} from 'constants/urls';

const initialState = {
	count: 0,
	dataSource: [],
	perPage: config.pageSize,
	page: 1,
	dataTemp: [], // 暂时存放列表原始数据
	datasTemp: [], // 暂时存放竞技能力列表原始数据
};

export default function prescriptionReducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
		case `${GET_ALL_PRESCRIPTION}_GET_SUCC`:
		  return {
		    ...state,
		    dataSource: data,
		    perPage: rest.perPage,
		    page: rest.page
		  };
		case `${DEL_PRESCRIPTION}_GET_SUCC`:
			return {
				...state
			}
		case 'delPerscription':
			return {
				...state,
				dataSource: data
			}
		case `${EXERCISE_PRESCRIPTION}_GET_SUCC`:
			return {
				...state,
				count: data
			}
		case `${FETCH_COMPETITIVE_ABILITY}_GET_SUCC`: // 获取处方竞技能力列表	    
			return {
				...state,
		    	datasTemp: data
			}
		case `${POST_EXERCISE_PRESCRIPTION}_GET_SUCC`:
			return state;
		default:
		  return state;
	 }
 }