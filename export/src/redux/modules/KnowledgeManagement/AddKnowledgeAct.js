import {KNOWLEDGE_TYPE, KNOWLEDGE_LIST, KNOWLEDGE_EDIT, FETCH_CATEGORY} from 'constants/urls';
import {
  CHANGE_CATEGORY,
} from 'constants/actionTypes';
import {get, edit, post} from '../../publicAct';

export function getKnowledgeType() {
  return get({path: KNOWLEDGE_TYPE});
}

export function saveKnowledge(obj) {
  const body = obj.params;
  const succ = obj.succ;
  if (obj.params.id) {
    return edit({
      path: KNOWLEDGE_EDIT,
      id: obj.params.id,
      body,
      succ
    });
  }
  return post({
    path: KNOWLEDGE_LIST,
    body,
    succ
  });
}

export function fetchCategory() {
  return get({
    path: FETCH_CATEGORY,
  });
}

export function categorySelector(index, cityArr, countyArr) {
  return {
    type: CHANGE_CATEGORY,
    index,
    cityArr,
    countyArr,
  };
}