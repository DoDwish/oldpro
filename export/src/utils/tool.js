export function obj2query(obj) {
  if (typeof obj !== "object") {
    return '';
  }
  let query = '';
  Object.keys(obj).forEach((item) => {
    const value = obj[item];
    if (value && typeof value !== 'object') {
      query += `${item}=${value}&`;
    } else if (value && typeof value === 'object') {
      query += `${item}=${JSON.stringify(value)}&`;
    }
  });
  return query.slice(0, -1);
}

// 组件中定义state = {saveState: ''}，再调用对于方法 changeState2Begin.call(this, '登陆中');
export function changeState(msg = '') {
  this.setState({
    saveState: msg
  });
}
export function changeState2Fail(err = '请求失败') {
  changeState.call(this, err);
}
export function changeState2Begin(msg = '请求中') {
  changeState.call(this, msg);
}
export function changeState2Succ(msg = '') {
  changeState.call(this, msg);
}

// 知识状态
export function getStatus(status) {
  switch (status) {
  case 0:
    return '待审核';
  case 1:
    return '审核通过';
  case -1:
    return '审核不通过';
  case -2:
    return '驳回';
  default:
    return '';
  }
}

// 格式化日期
const utils = {};
utils.DATE_FORMAT_SHOW = "yyyy-mm-dd";
utils.REGEXP_DATE = new RegExp(/(yyyy|mm|dd|hh|mi|ss|ms)/gi);

utils.format = function(format) {
  if (!format) {
    format = utils.DATE_FORMAT;
  }
  return format.replace(utils.REGEXP_DATE, function(str) {
    switch (str.toLowerCase()) {
    case 'yyyy':
      return this.getFullYear();
    case 'mm':
      return utils.leftPadZero.call((this.getMonth() + 1).toString(), 2);
    case 'dd':
      return utils.leftPadZero.call((this.getDate()).toString(), 2);
    case 'hh':
      return utils.leftPadZero.call((this.getHours()).toString(), 2);
    case 'mi':
      return utils.leftPadZero.call((this.getMinutes()).toString(), 2);
    case 'ss':
      return utils.leftPadZero.call((this.getSeconds()).toString(), 2);
    case 'ms':
      return utils.leftPadZero.call((this.getMilliseconds()).toString(), 2);
    default:
    }
  }.bind(this));
};
utils.formatDateObject = function(date, format) {
  if (date.constructor.name !== 'Date') {
    console.error('日期必须为date对象');
    return undefined;
  }
  return utils.format.call(date, format);
};
utils.leftPadZero = function(width) {
  const pad = width - this.length;
  if (pad > 0) {
    return (utils.times.call("0", pad) + this);
  } else {
    return this;
  }
};
utils.times = function(times) {
  if (times < 1) {
    times = 1;
  }
  let ret = "";
  while (times) {
    ret += this;
    times--;
  }
  return ret;
};
utils.formatDate = function(data, inFormat, outFormat) {
  // 如果data为空,则返回空字符串
  // Added by zhuding@yuchengtech.com o 2011-03-15
  if (!data) {
    return "";
  }
  const parsedDate = utils.parseDate(data, inFormat || utils.DATE_FORMAT);
  // 如果输入的data不合法,则返回空字符串
  // Added by zhuding@yuchengtech.com o 2011-03-15
  if (parsedDate === null) {
    return "";
  }
  if (outFormat && typeof outFormat === "string") {
    return utils.format.call(parsedDate, outFormat);
  } else {
    return utils.format.call(parsedDate, utils.DATE_FORMAT_SHOW);
  }
};

utils.parseDate = function(dateString, format) {
  let year = 2000;
  let month = 0;
  let day = 1;
  let hour = 0;
  let minute = 0;
  let second = 0;
  format = format || utils.DATE_FORMAT_SHOW;

  if (dateString.length !== format.length) {
    console.log("日期和日期对应格式的长度不一致！");
    return null;
  } else {
    if (!utils.isDate(dateString, format)) {
      console.log("日期或格式不合法！");
      return null;
    }
  }
  const matchArray = format.match(utils.REGEXP_DATE);
  for (let index = 0; index < matchArray.length; index++) {
    const postion = format.indexOf(matchArray[index]);
    switch (matchArray[index]) {
    case "yyyy": {
      year = parseInt(dateString.substr(postion, 4), 10);
      break;
    }
    case "mm": {
      month = parseInt(dateString.substr(postion, 2), 10) - 1;
      break;
    }
    case "dd": {
      day = parseInt(dateString.substr(postion, 2), 10);
      break;
    }
    case "hh": {
      hour = parseInt(dateString.substr(postion, 2), 10);
      break;
    }
    case "mi": {
      minute = parseInt(dateString.substr(postion, 2), 10);
      break;
    }
    case "ss": {
      second = parseInt(dateString.substr(postion, 2), 10);
      break;
    }
    default:
    }
  }

  const result = new Date(year, month, day, hour, minute, second);

  // 加上result为空的判断,为了解决传入的字符串格式不正确的问题
  // IE下用isNaN来判断，其它浏览器通过Invalid Date来判断
  // Updated by zhuding@yuchengtech on 2011-2-28
  if (result === "Invalid Date" || isNaN(result)) {
    return null;
  }

  return result;
};

utils.isDate = function(dateString, format) {
  let year;
  let month;
  let day;
  format = format || utils.DATE_FORMAT_SHOW;

  if (dateString.length !== format.length) {
    console.log( "日期和日期对应的格式不对或者长度不对！");
    return false;
  }

  const matchArray = format.match(utils.REGEXP_DATE);
  for (let index = 0; index < matchArray.length; index++) {
    const postion = format.indexOf(matchArray[index]);
    switch (matchArray[index]) {
    case "yyyy": {
      year = parseInt(dateString.substr(postion, 4), 10);
      break;
    }
    case "mm": {
      month = parseInt(dateString.substr(postion, 2), 10) - 1;
      break;
    }
    case "dd": {
      day = parseInt(dateString.substr(postion, 2), 10);
      break;
    }
    default:
    }
  }
  const dateTest = new Date(year, month, day);
  const testYear = dateTest.getFullYear();
  const testMonth = dateTest.getMonth();
  const testDay = dateTest.getDate();
  return (year === testYear && month === testMonth && day === testDay);
};
// 年|月|天|时|分|秒|毫秒：yyyy|mm|dd|hh|mi|ss|ms
// params1: 日期字符串， params2: 输入的日期格式，params3: 期待输出的日期格式。
// 输出特定格式的日期字符串
// formatDateString('20110111', 'yyyymmdd', 'yyyy-mm-dd')
export const formatDateString = utils.formatDate;
// params1: Date对象， params2: 期待输出的日期格式
// 输出特定格式的日期字符串
// formatDate(new Date(), 'yyyy=mm=dd')
export const formatDate = utils.formatDateObject;
// params1: 日期字符串， params2: 输入的日期格式。
// 输出一个Date时间对象
// parseDate('20110101', 'yyyymmdd')
export const parseDate = utils.parseDate;
// params1: 日期字符串，params2:输入的日期字符串格式
// 输出一个boolean
// isDate('20110101', 'yyyymmdd')
export const isDate = utils.isDate;

export function getYearList(long = 6) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const nowYear = date.getFullYear();
  let firstYear;
  let afterYear;
  if (month < 8) {
    firstYear = Number(nowYear) - 1;
    afterYear = nowYear;
  } else {
    firstYear = nowYear;
    afterYear = Number(nowYear) + 1;
  }
  const defaultYear = `${firstYear}-${afterYear}`;
  const arr = [];
  for (let index = 0 - long; index < long; index++ ) {
    let arrTemp = [firstYear + index, afterYear + index];
    arr.push(`${arrTemp[0]}-${arrTemp[1]}`);
  }
  return {
    defaultYear,
    yearList: arr
  };
}

// 核对权限的依赖关系
export function checkDepened(premissions, depends) {
  const sendCodes = premissions.map(item=>item.code);
  let dependCodes = sendCodes.map(item=>depends[item] ? depends[item].depend : []).reduce(function(acc, val) {
    return acc.concat(val);
  }, []);
  dependCodes = Array.from(new Set(dependCodes));
  const noDep = dependCodes.filter(item => !sendCodes.includes(item));
  let tips = noDep.map(item => depends[item] ? depends[item].name : '完整的权限');
  if (tips.length) {
    return `请勾选${tips.toString()}`;
  } else {
    return '';
  }
}
export function isObjEqual(objX, obiY) {
  if ( objX === obiY ) {
    return true;
  }
  if ( ! ( objX instanceof Object ) || ! ( obiY instanceof Object ) ) {
    return false;
  }

  if ( objX.constructor !== obiY.constructor ) {
    return false;
  }

  for (let key in objX ) {
    if ( objX.hasOwnProperty(key) ) {
      if ( ! obiY.hasOwnProperty(key) ) {
        return false;
      }

      if ( objX[key] === obiY[key] ) {
        continue;
      }

      if ( typeof( objX[key] ) !== "object" ) {
        return false;
      }

      if ( ! Object.is( objX[key], obiY[key] ) ) {
        return false;
      }
    }
  }

  for ( let key in obiY ) {
    if ( obiY.hasOwnProperty( key ) && ! objX.hasOwnProperty( key ) ) {
      return false;
    }
  }
  return true;
}

// export function isObjEqual(objX, obiY) {
//   if ( objX === obiY ) {
//     return true;
//   }
//   if ( ! ( objX instanceof Object ) || ! ( obiY instanceof Object ) ) {
//     return false;
//   }
//
//   if ( objX.constructor !== obiY.constructor ) {
//     return false;
//   }
//
//   for (let key in objX ) {
//     if ( objX.hasOwnProperty(key) ) {
//       if ( ! obiY.hasOwnProperty(key) ) {
//         return false;
//       }
//
//       if ( objX[key] === obiY[key] ) {
//         continue;
//       }
//
//       if ( typeof( objX[key] ) !== "object" ) {
//         return false;
//       }
//
//       if ( ! Object.is( objX[key], obiY[key] ) ) {
//         return false;
//       }
//     }
//   }
//
//   for ( let key in obiY ) {
//     if ( obiY.hasOwnProperty( key ) && ! objX.hasOwnProperty( key ) ) {
//       return false;
//     }
//   }
//   return true;
// }
