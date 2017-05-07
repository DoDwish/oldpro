import {obj2query} from 'utils/tool';

export function fetchList({path, queryObj, ...rest}) {
  const beginType = `${path}_GET_BEGIN`;
  const succType = `${path}_GET_SUCC`;
  const failType = `${path}_GET_FAIL`;
  const query = obj2query(queryObj);
  path = `${path}${query ? '?' : ''}${query}`;
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.get(path).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
    }).catch(err=>
      dispatch({
      type: failType,
    }))
  };
}
export function edit({
  method = 'put', path, id, body, succ = (()=>{}), fail = (()=>{}), ...rest
}) {
  const beginType = `${path}_PUT_BEGIN`;
  const succType = `${path}_PUT_SUCC`;
  const failType = `${path}_PUT_FAIL`;
  path = path.replace(':id', id);
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.request({
      url: path,
      method: method,
      body,
    }).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
      succ(data);
    }).catch(err=>{
      dispatch({
        type: failType,
        err,
      });
      fail(err);
    });
  };
}

export function get({path, ...rest}) {
  const beginType = `${path}_GET_BEGIN`;
  const succType = `${path}_GET_SUCC`;
  const failType = `${path}_GET_FAIL`;
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.get(path).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
    }).catch(err=>dispatch({
      type: failType,
    }));
  };
}
export function getById({path, id, ...rest}) {
  const beginType = `${path}_GET_BEGIN`;
  const succType = `${path}_GET_SUCC`;
  const failType = `${path}_GET_FAIL`;
  path = path.replace(':id', id);
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.get(path).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
    }).catch(err=>dispatch({
      type: failType,
    }));
  };
}

export function post({
  path, body, succ = (()=>{}), fail = (()=>{}), ...rest
}) {
  const beginType = `${path}_POST_BEGIN`;
  const succType = `${path}_POST_SUCC`;
  const failType = `${path}_POST_FAIL`;
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.request({
      url: path,
      method: 'post',
      body,
    }).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
      succ(data);
    }).catch(err=>{
      dispatch({
        type: failType,
        err,
      });
      fail(err);
    });
  };
}
export function put({
  path, body, succ = (()=>{}), fail = (()=>{}), ...rest
}) {
  const beginType = `${path}_PUT_BEGIN`;
  const succType = `${path}_PUT_SUCC`;
  const failType = `${path}_PUT_FAIL`;
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.request({
      url: path,
      method: 'put',
      body,
    }).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
      succ(data);
    }).catch(err=>{
      dispatch({
        type: failType,
        err,
      });
      fail(err);
    });
  };
}

export function del({
  path, id, body, succ = (()=>{}), fail = (()=>{}), ...rest
}) {
  const beginType = `${path}_DELETE_BEGIN`;
  const succType = `${path}_DELETE_SUCC`;
  const failType = `${path}_DELETE_FAIL`;
  path = path.replace(':id', id);
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.request({
      url: path,
      method: 'delete',
      body,
    }).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
      succ(data);
    }).catch(err=>{
      dispatch({
        type: failType,
        err,
      });
      fail(err);
    });
  };
}

export function delById({
  path, id, body, succ = (()=>{}), fail = (()=>{}), ...rest
}) {
  const beginType = `${path}_DELETE_BEGIN`;
  const succType = `${path}_DELETE_SUCC`;
  const failType = `${path}_DELETE_FAIL`;
  path = path.replace(':id',  id);
  return (dispatch, req) => {
    dispatch({
      type: beginType,
    });
    req.request({
      url: path,
      method: 'delete',
      body,
    }).then(data=>{
      dispatch({
        type: succType,
        data: data,
        ...rest
      });
      succ();
    }).catch(err=>{
      dispatch({
        type: failType,
        err,
      });
      fail(err);
    });
  };
}
