import React, {Component} from 'react';
import Uploader from './OSSUploader';
import {Icon} from 'antd';
import { EXPERT_LICENCE_POLICY } from '../constants/urls';
require('../../static/ueditor/ueditor.config');
require('../../static/ueditor/ueditor.all.min');
require('../../static/ueditor/lang/zh-cn/zh-cn');
require('../../static/ueditor/themes/default/css/ueditor.css');
/*
  checkAndSubmit() {
    console.log(this.ue.getContent());
  }
  <Ueditor ref={(ref)=>{this.ue = ref;}}/>
  <button style={{'zIndex': 1000, color: 'red'}} onClick={this.checkAndSubmit.bind(this)}>Submit</button>

 */
const UEditor = React.createClass({
  displayName: 'UEditor',
  // 设置默认的属性值
  getDefaultProps: function() {
    return {disabled: false, height: 200, content: '', id: 'editor', hasVideo: true};
  },
  insertImg: function(url) {
    this.insertHtml(`<img src='${url}' />`);
  },
  insertVideo: function(url) {
    this.insertHtml(`<video controls src='${url}' />`);
  },
  render: function() {
    return (
      <div>
        <script id={this.props.id} name="content" type="text/plain"></script>
        <div style={{'marginTop': '2px'}}>
          <Uploader
            policyUrl={EXPERT_LICENCE_POLICY}
            onChange={this.insertImg}
            showImg={false}
            jsx={<span style={{color: '#4169E1'}}><Icon type="picture" />  插入图片</span>}
          />
          {this.props.hasVideo ? <span style={{marginLeft: 20}}>
            <Uploader
              accept={'video/rm,video/mp4,video/avi,video/wmv,video/rmvb,video/3gp'}
              policyUrl={EXPERT_LICENCE_POLICY}
              onChange={this.insertVideo}
              showImg={false}
              jsx={<span style={{color: '#4169E1'}}><Icon type="picture" />  插入视屏</span>}
            />
          </span> : ''}
        </div>
      </div>
    );
  },
  // 调用初始化方法
  componentDidMount: function() {
    this.initEditor();
  },
// 编辑器配置项初始化
  initEditor: function() {
    const id = this.props.id;
    const ue = window.UE.getEditor(id, {
      // 工具栏，不配置有默认项目
      toolbars: [[
        'fullscreen', 'source', '|', 'undo', 'redo', '|',
        'bold', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'formatmatch',
        '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
        'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'horizontal', 'date', 'time', '|', 'selectall', 'cleardoc', 'removeformat'
      ]],
      lang: 'zh-cn',
      insertorderedlist: {
        'decimal': '',         // '1,2,3...'
        'lower-alpha': '',    // 'a,b,c...'
        'lower-roman': '',    // 'i,ii,iii...'
        'upper-alpha': '', // 'A,B,C'
        'upper-roman': '' // 'I,II,III...'
      },
      insertunorderedlist: {
        'circle': '',  // '○ 小圆圈'
        'disc': '',    // '● 小圆点'
        'square': ''   // '■ 小方块'
      },
      // 字体
      'fontfamily': [
             {label: '', name: 'songti', val: '宋体,SimSun'},
             {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
             {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
             {label: '', name: 'heiti', val: '黑体, SimHei'},
             {label: '', name: 'lishu', val: '隶书, SimLi'},
             {label: '', name: 'andaleMono', val: 'andale mono'},
             {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
             {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
             {label: '', name: 'comicSansMs', val: 'comic sans ms'},
             {label: '', name: 'impact', val: 'impact,chicago'},
             {label: '', name: 'timesNewRoman', val: 'times new roman'}
      ],
      // 字号
      'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
      // 为编辑器实例添加一个路径，必需项
      'UEDITOR_HOME_URL': '/ueditor/',
      enableAutoSave: false,
      autoSyncData: false,
      autoHeightEnabled: false,
      initialFrameHeight: this.props.height,
      initialFrameWidth: '100%',
      // 是否允许编辑
      readonly: this.props.disabled
    });
    this.editor = ue;
    const self = this;


    this.editor.ready(function(ueditor) {
      if (!ueditor) {
        // 如果初始化后ueditor不存在删除后重新调用
        window.UE.delEditor(self.props.id);
        self.initEditor();
      }
    });
  },
  ready: function(fn) {
    if (this.editor) {
      this.editor.ready(fn);
    }
    return '';
  },
  // 获取编辑器的内容
  getContent: function() {
    if (this.editor) {
      return this.editor.getContent();
    }
    return '';
  },
  /**
   * 写入内容｜追加内容
   * @param {Boolean} isAppendTo    [是否是追加]
   * @param {String}  appendContent [内容]
   */
  setContent: function(appendContent, isAppendTo) {
    if (this.editor) {
      this.editor.setContent(appendContent, isAppendTo);
    }
  },
  // 获取纯文本
  getContentTxt: function() {
    if (this.editor) {
      return this.editor.getContentTxt();
    }
    return '';
  },
  // 获得带格式的纯文本
  getPlainTxt: function() {
    if (this.editor) {
      return this.editor.getPlainTxt();
    }
    return '';
  },
  // 判断是否有内容
  hasContent: function() {
    if (this.editor) {
      return this.editor.hasContents();
    }
    return false;
  },
  // 插入给定的html
  insertHtml: function(content) {
    if (this.editor) {
      this.editor.execCommand('insertHtml', content);
    }
  },
  // 使编辑器获得焦点
  setFocus: function() {
    if (this.editor) {
      this.editor.focus();
    }
  },
  // 设置高度
  setHeight: function(height) {
    if (this.editor) {
      this.editor.setHeight(height);
    }
  }
});
module.exports = UEditor;