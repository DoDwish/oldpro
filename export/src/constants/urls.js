// URL地址公共配置，所有用到的url都是放在这里
import config from './config';

const PROTOCOL = 'http://';
const HOST = config.host;
const PORT = config.port;
const PROXY = '/proxy';
// const DOMAIN = `${PROTOCOL}${HOST}:${PORT}${PROXY}`;
const DOMAIN = '/proxy';
const DOMAIN3000 = '/proxy3000';
const DOMAIN3002 = '/proxy3002';

export {DOMAIN};

export const EXPERT_LICENCE_POLICY = `${DOMAIN}/api/auth/upload/knowledge`;
// 登陆，登出，修改密码
export const LOGIN = `${DOMAIN}/api/expert_user/login`;
export const VERIFY_CODE = `${DOMAIN}/api/expert_user/verify_code`;
export const VERIFY = `${DOMAIN}/api/expert_user/verify`;
export const SET_PWD = `${DOMAIN}/api/expert_user/set_password`;
export const CHANGE_PWD = `${DOMAIN}/api/auth/expert_user/change_password`;

export const KNOWLEDGE_LIST = `${DOMAIN}/api/auth/knowledge`; // 获取知识列表, 新建知识
export const KNOWLEDGE_COUNT = `${DOMAIN}/api/auth/knowledge/count`; // 获取知识列表
export const KNOWLEDGE_TYPE = `${DOMAIN}/api/auth/knowledge_type`; // 获取类型列表
export const KNOWLEDGE_EDIT = `${DOMAIN}/api/auth/knowledge/:id`; // 编辑知识
export const KNOWLEDGE_AUDIT = `${DOMAIN}/api/auth/knowledge/audit/:id`; // 审核知识
// 专家账号管理
export const EXPERT_USER = `${DOMAIN}/api/auth/expert_user`;
export const EXPERT_USER_EDIT = `${DOMAIN}/api/auth/expert_user/:id`;
export const EXPERT_USER_COUNT = `${DOMAIN}/api/auth/expert_user/count`;
// 专家角色管理
export const EXPERT_ROLE = `${DOMAIN}/api/auth/expert_role`;
export const EXPERT_ROLE_EDIT = `${DOMAIN}/api/auth/expert_role/:id`;
export const EXPERT_PERMISSION = `${DOMAIN}/api/auth/expert_permission/:id`;
export const EXPERT_PERMISSION_ALL = `${DOMAIN}/api/auth/expert_permission`;

export const FETCH_CATEGORY = `${DOMAIN}/api/auth/knowledge_category/all`;// 获取知识分类
export const GET_DETAIL = `${DOMAIN}/api/auth/knowledge/:id`;// 获取知识详情

// 处方管理
export const GET_ALL_PRESCRIPTION = `${DOMAIN}//api/auth/exercise_prescription`;// 获取所有处方
export const DEL_PRESCRIPTION = `${DOMAIN}/api/auth/exercise_prescription/:id`;// 删除某个处方
export const EXERCISE_PRESCRIPTION = `${DOMAIN}/api/auth/exercise_prescription/count`;// 获取所有处方条数
export const FETCH_COMPETITIVE_ABILITY = `${DOMAIN}/api/auth/competitive_ability`;// 获取处方竞技能力表
export const POST_EXERCISE_PRESCRIPTION = `${DOMAIN}/api/auth/exercise_prescription`;// 创建处方
export const EDIT_EXERCISE_PRESCRIPTION = `${DOMAIN}/api/auth/exercise_prescription/:id`;// 编辑处方

// 预警库管理
export const WARNING_LIST = `${DOMAIN}/api/auth/body_warning`;// 获取预警库列表
export const WARNING_COUNT = `${DOMAIN}/api/auth/body_warning/count`;// 获取预警库列表总数
export const WARNING_EDIT = `${DOMAIN}/api/auth/body_warning/:id`;// 编辑预警库
export const WARNING_DELETE = `${DOMAIN}/api/auth/body_warning/:id`;// 删除预警库
export const COMPETITIVE_ABILITY_LIST = `${DOMAIN}/api/auth/competitive_ability`; // 获取竞技能力列表
export const PHYSIQUE_SUBJECT_LIST = `${DOMAIN}/api/physique_subject`; // 获取预警项目

// 体测管理
export const CLASS_LIST = `${DOMAIN}/api/auth/school_class`; // 获取班级列表
export const CONSTITUTION_LIST = `${DOMAIN}/api/auth/constitution`; // 体质列表
export const CONSTITUTION_COUNT = `${DOMAIN}/api/auth/constitution/count`; // 体质报告总数
export const CLASS_DICT = `${DOMAIN}/api/class_dict`; // 获取静态班级列表
export const GRADE_DICT = `${DOMAIN}/api/grade_dict`; // 获取静态年级列
export const STUDENT_LIST = `${DOMAIN}/api/auth/student`; // 获取学生列表
export const STUDENT_COUNT = `${DOMAIN}/api/auth/student/count`; // 获取学生总数
export const CONSTITUTION_TEMPLATE = `${DOMAIN}/api/template/constitution/download`; // 下载体质报告模板
export const CONSTITUTION_IMPORT = `${DOMAIN}/api/auth/constitution/import`; // 导入体质数据
export const CONSTITUTION_EDIT = `${DOMAIN}/api/auth/constitution/:id`;
// export const CONSTITUTION_ADD = `${DOMAIN}/api/auth/constitution`;
// 行政区域三级接口
export const REGION = `${DOMAIN3000}/api/region`;
export const SCHOOL = `${DOMAIN}/api/auth/school`;
// 新增体检管理录入数据
export const MEDICAL_ADD = `${DOMAIN}/api/auth/medical`;
// 编辑体检管理
export const MEDICAL_EDIT = `${DOMAIN}/api/auth/medical/:id`;
// 获取体检报告总条数
export const MEDICAL_COUNT = `${DOMAIN}/api/auth/medical/count`;
// 查询体检报告
export const PHYSICAL_SEARCH = `${DOMAIN}/api/auth/medical`;
// 学校 // TODO
export const SCHOOL_LIST = `${DOMAIN}/api/auth/school`;
// 下载体检模板
export const PHYSICAL_TEMPLET = `${DOMAIN}/api/template/medical/download`;
// 导入体检数据
export const PHYSICAL_IMPORT = `${DOMAIN}/api/auth/medical/import`;
// 新增编辑体检数据学生列表
export const STUDENT = `${DOMAIN}/api/auth/student`;

export const DEPEND = `${DOMAIN}/api/auth/permission/depend`;
