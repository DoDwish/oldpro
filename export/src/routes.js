import React from 'react';
import {IndexRoute, Route, IndexRedirect} from 'react-router';
import {
  Home,
  NotFound,
  Main,
  Login,
  NotAuthor,
  KnowledgeManagement,
  PendingList,
  AddKnowledge,
  KnowledgeDetails,
  Account,
  Role,
  AccountEdit,
  RoleEdit,
  Constitution,
  ConstitutionEdit,
  ConstitutionAdd,
  ConstitutionBatchImport,
  ConstitutionSingleAdd,
  ExercisePrescription,
  PrescriptionEdit,
  WarningDatabase,
  WarningEdit,
  PhysicalManagement,
  AddPhysical,
  PhysicalEnter,
  PhysicalImport,
} from 'containers';

export default (store) => {
  // 页面刷新时候，进行判断是否已经登陆，没登陆跳转到登陆页
  const requireLogin = (nextState, replace, next) => {
    const token = window.localStorage.getItem('SMARTSPORT/EXPERT-USER/TOKEN');
    if (!token) {
      replace('/login');
    }
    // TODO 测试不用登陆
    // localStorage.setItem('SMARTSPORT/EXPERT-USER/TOKEN', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsbSI6Im1hbmFnZW1lbnQtdXNlciIsImlhdCI6MTQ4NjM3MjU5NywiZXhwIjoxNTcyNjg2MTk3LCJzdWIiOiI1ODg1OWY1ZGYxMzE3NDAyMGNlNWMyZjMiLCJqdGkiOiI1ODk4M2VmNTM2YzVhMzY4OWM1MTFlODUifQ.LyoeIAILJclOsHwFjZfDnZHGxGkkiy6HWLR39-tTpfg')
    // localStorage.setItem('SMARTSPORT/EXPERT-USER/USER', '{"_id":"58859f5df13174020ce5c2f3","accountId":"admin","name":"admin","role":"588022c39e892f96b9a8b0de","status":1,"createdAt":"2017-01-23T06:14:53.633Z","__v":0}')
    next();
  };
  const onChange = ()=>{
    // 路由跳转的时候滚动到页面顶部
    document.getElementsByTagName('div')[1].scrollTop = 0;
  };
  return (
    <Route>
      <Route onEnter={requireLogin} onChange={onChange} path='/' name='home' breadcrumbName='首页' component={Main}>
        <IndexRoute name='home' group='homeGroup' component={Home}/>
        <Route path='account' name='account' group='account' breadcrumbName='账号管理' component={Account} >
          <Route path='add' name='account' group='account' breadcrumbName='新增账号' component={AccountEdit} />
          <Route path='edit' name='account' group='account' breadcrumbName='编辑账号' component={AccountEdit} />
        </Route>
        <Route path='role' name='role' group='account' breadcrumbName='角色管理' component={Role} >
          <Route path='add' name='role' group='account' breadcrumbName='新增角色' component={RoleEdit} />
          <Route path='edit' name='role' group='account' breadcrumbName='编辑角色' component={RoleEdit} />
        </Route>
        <Route path='/knowledgeManagement' name='knowledgeManagement' group='knowledgeManagement' component={KnowledgeManagement} >
          <Route path='add' name='knowledgeManagement' group='knowledgeManagement' breadcrumbName='新增' component={AddKnowledge} />
          <Route path='edit' name='knowledgeManagement' group='knowledgeManagement' breadcrumbName='编辑' component={AddKnowledge} />
          <Route path='details' name='knowledgeManagement' group='knowledgeManagement' breadcrumbName='详情' component={KnowledgeDetails} />
        </Route>
        <Route path='exercisePrescription' name='exercisePres' group='prescriptionGroup' breadcrumbName='指导方案管理' component={ExercisePrescription}>
          <Route path='add' name='exercisePres' group='prescriptionGroup' breadcrumbName='新增方案' component={PrescriptionEdit} />
          <Route path='edit/:id' name='exercisePres' group='prescriptionGroup' breadcrumbName='编辑方案' component={PrescriptionEdit} />
        </Route>
        <Route path='/pendingList' name='pendingList' group='knowledgeManagement' breadcrumbName='待审核列表' component={KnowledgeManagement} >
          <Route path='edit' name='pendingList' group='knowledgeManagement' breadcrumbName='编辑' component={AddKnowledge} />
          <Route path='details' name='pendingList' group='knowledgeManagement' breadcrumbName='详情' component={KnowledgeDetails} />
        </Route>
        <Route path='constitution' name='constitution' group='bodyTestManagement' breadcrumbName='体质管理' component={Constitution}>
          {/* <Route path='constitutionEdit' name='constitutionEdit' group='bodyTestManagement' breadcrumbName='编辑' component={ConstitutionEdit} /> */}
          <Route path='bactchImport' name='constitution' group='bodyTestManagement' breadcrumbName='批量导入' component={ConstitutionBatchImport}/>
          <Route path='constitutionAdd' name='constitution' group='bodyTestManagement' breadcrumbName='录入体测成绩' component={ConstitutionAdd}/>
          <Route path='singleAdd/:type' name='constitution' group='bodyTestManagement' breadcrumbName='单个录入' component={ConstitutionSingleAdd}/>
          <Route path='singleEdit/:type' name='constitution' group='bodyTestManagement' breadcrumbName='编辑录入' component={ConstitutionSingleAdd}/>
        </Route>
        <Route path='physicalManagement' name='physicalManagement' group='medical' breadcrumbName='血脂体检数据' component={PhysicalManagement} >
          <Route path='add' name='physicalManagement' group='medical' breadcrumbName='新增体检数据' component={AddPhysical}>
            <Route path='enter' name='physicalManagement' group='medical' breadcrumbName='录入血脂体检' component={PhysicalEnter} />
          </Route>
          <Route path='edit/:id' name='physicalManagement' group='medical' breadcrumbName='编辑录入体检数据' component={PhysicalEnter} />
          <Route path='import' name='physicalManagement' group='medical' breadcrumbName='批量导入' component={PhysicalImport} />
        </Route>
        <Route path='WarningDatabase' name='WarningDatabase' group='WarningDatabase' breadcrumbName='预警库管理' component={WarningDatabase} >
          <Route path='add' name='WarningDatabase' group='WarningDatabase' breadcrumbName='新增预警' component={WarningEdit} />
          <Route path='edit/:warningId' name='WarningDatabase' group='WarningDatabase' breadcrumbName='编辑预警' component={WarningEdit} />
        </Route>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/forget-pwd-valiate' component={Login}/>
      <Route path='/forget-pwd-set' component={Login}/>
      <Route path='/change-pwd' component={Login}/>
      <Route path='/not-author' component={NotAuthor}/>
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
