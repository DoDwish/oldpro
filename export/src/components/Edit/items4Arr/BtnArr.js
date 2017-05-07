
import React, {Component, PropTypes} from 'react';
import {Button, Alert} from 'antd';
/*
   btnArr = [{type: 'submit', text: ''}]
   唯一特殊值特殊type：submit
   多加一个text文本内容属性,
   其他参考antd Button的属性， 有：
   type， htmlType， icon， shape， size， loading， onClick， ghost
 */

export default ({ btnArr = [] }) => {
  return (
    <div style={{'textAlign': 'center'}}>
      {
        btnArr.map((item, index) => {
          //  为null，不为object，为空object，返回空
          if (!item || typeof item !== 'object' || Object.keys(item).length === 0) {
            return null;
          }
          if (index !== 0) {
            item.style = {
              marginLeft: 40
            };
          }
          if (item.type === 'submit') {
            item.type = 'primary';
            item.htmlType = 'submit';
          }
          return getButton(item, index);
        }
      )}
    </div>
  );
};


function getButton(obj = {}, index) {
  const {text = ''} = obj;
  delete obj.text;
  return (<Button key={index} {...obj}>{text}</Button>);
}
