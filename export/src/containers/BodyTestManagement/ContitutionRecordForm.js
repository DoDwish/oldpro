import React, { Component, PropTypes } from 'react';
import { Form, Input } from 'antd';
import ReportHeader from './ReportHeader';
import ReportFooter from './ReportFooter';
import ReportAnalyze from './ReportAnalyze';
import FormItems from '../../components/Edit/FormItems';
const FormItem = Form.Item;

export default ({items, title, showCheckbox, suggestion1, suggestion2, score, submit, isAdd, cancel,
  getFieldDecorator, getFieldValue, initialValueObj }) => {
  return (
    <div className="conTable">
      <Form style={{marginTop: '20px'}} onSubmit={submit}>
        <FormItem>
          <ReportHeader initialValueObj={initialValueObj} showCheckbox={showCheckbox}
            title={title} getFieldDecorator={getFieldDecorator}/>
        </FormItem>
        {
          items.map((item, index) => {
            return (
              <div key={index} style={{marginTop: '50px'}}>
                <span style={{fontSize: '16px', fontWeight: 'bold'}}>{item.label}</span>
                <div style={{marginTop: '10px'}}>
                  {
                    item.jsx
                  }
                </div>
              </div>
            );
          })
        }
        { suggestion1 }
        { suggestion2 }
        { score }
        <ReportFooter
          cancel={cancel}/>
      </Form>
    </div>
  );
};
