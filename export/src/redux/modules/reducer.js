import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import loginRed from './Login/LoginRed';
import knowledgeManagementRed from './KnowledgeManagement/KnowledgeManagementRed';
import AddKnowledgeRed from './KnowledgeManagement/AddKnowledgeRed';
import KnowledgeDetailsRed from './KnowledgeManagement/KnowledgeDetailsRed';
import accountRed from './account/accountRed';
import roleRed from './account/roleRed';
import constitutionRed from './BodyTestManagement/ConstitutionRed';
import constitutionAddRed from './BodyTestManagement/ConstitutionAddRed';
import prescriptionRed from './exercisePrescription/prescriptionRed';
import WarningDatabaseRed from './WarningDatabase/WarningDatabaseRed';
import PhysicalManagementRed from './PhysicalManagement/PhysicalManagementRed';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  loginRed,
  knowledgeManagementRed,
  AddKnowledgeRed,
  accountRed,
  roleRed,
  KnowledgeDetailsRed,
  prescriptionRed,
  WarningDatabaseRed,
  constitutionRed,
  constitutionAddRed,
  PhysicalManagementRed,
});
