import React, {Component, PropTypes} from 'react';
import { Checkbox, Input, Form, message } from 'antd';
const FormItem = Form.Item;
const styles = require('./Constitution.scss');

export default ({ title, showCheckbox, getFieldDecorator, initialValueObj }) => {
  let isExercise = '';
  let isShowHeader = title === '骨密度';
  let header = '';
  if (showCheckbox) {
    // isExercise = getFieldDecorator('exercise', {
    //   initialValue: initialValueObj.exercise || false,
    // })(
    //   <div>
    //     <Checkbox className="fr" style={{marginRight: '20px'}}>
    //       有锻炼情况
    //     </Checkbox>
    //     <span className='fr' style={{fontSize: '14px'}}>测试部位：</span>
    //   </div>
    // );
  }
  return (
    <FormItem>
        <div style={{width: '100%', textAlign: 'center', fontSize: '24px'}}>{title}评估报告</div>
        <div style={{width: '100%'}}>
          <span style={{width: '10%', fontSize: '14px'}}>测评次数：</span>
          {getFieldDecorator('count', {
            initialValue: initialValueObj.count || '1/1',
          })(<Input style={{width: '6%'}}/>)}
          <span style={{width: '10%', marginLeft: '10px', fontSize: '14px'}}>年龄：</span>
          {getFieldDecorator('age', {
            initialValue: initialValueObj.age || 0,
          })(<Input type='number' style={{width: '6%'}}/>)}
          {
            isShowHeader && <div className='testPart'>
              {
                getFieldDecorator('part', {
                  initialValue: initialValueObj.part || '',
                })(
                  <Input style={{width: '10%'}} className='fr' />
                )
              }
            </div>
          }

          {
            isExercise
          }
        </div>

    </FormItem>
  );
};
