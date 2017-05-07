import {LOGIN} from 'constants/urls';
const initialState = {};
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
  case `${LOGIN}_POST_SUCC`:
    localStorage.setItem('SMARTSPORT/EXPERT-USER/TOKEN', `Bearer ${data.token}`);
    localStorage.setItem('SMARTSPORT/EXPERT-USER/USER', JSON.stringify(data.user));
    return state;
  default:
    return state;
  }
}
