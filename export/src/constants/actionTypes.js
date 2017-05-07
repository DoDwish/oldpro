// 用到的所有action type都放在这里

// export const _BEGIN = '_BEGIN';
// export const _SUCC = '_SUCC';
// export const _FAIL = '_FAIL';

export const SEARCH_KNOWLEDGE_STATUS = 'SEARCH_KNOWLEDGE_STATUS'; // 按状态查看列表

export const KONWLEDGE_CHOOSE_PATH = 'KONWLEDGE_CHOOSE_PATH';// 知识库和待审核列表路径切换
// 学校账号管理列表查询
export const CHANGE_SHCOOL_ACOUNT_NAME = 'CHANGE_SHCOOL_ACOUNT_NAME';
export const CHANGE_SHCOOL_ACOUNT_TEL = 'CHANGE_SHCOOL_ACOUNT_TEL';
// 学校管理角色勾选
export const CHANGE_ROLE_CHECK = 'CHANGE_ROLE_CHECK';

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'; // 选择分类
export const IS_SEARCH_STATUS = 'IS_SEARCH_STATUS'; // 是否按状态搜索
export const IS_STATUS_EQUAL0 = 'IS_STATUS_EQUAL0';// 是否是审核列表

// 体质管理
export const CHANGE_REGION = 'CHANGE_REGION';

// 获取学校
export const SCHOOL_LIST_BEGIN = 'SCHOOL_LIST_BEGIN';
export const SCHOOL_LIST_SUCC = 'SCHOOL_LIST_SUCC';
export const SCHOOL_LIST_FAIL = 'SCHOOL_LIST_FAIL';
export const SCHOOL_FILTERS_UPDATE = 'SCHOOL_FILTER_UPDATE';

export const CONSTITUTION_LIST_BEGIN = 'CONSTITUTION_LIST_BEGIN';
export const CONSTITUTION_LIST_SUCC = 'CONSTITUTION_LIST_SUCC';
export const CONSTITUTION_LIST_FAIL = 'CONSTITUTION_LIST_FAIL';

// 行政区域三级接口
export const REGION_BEGIN = 'REGION_BEGIN';
export const REGION_SUCC = 'REGION_SUCC';
export const REGION_FAIL = 'REGION_FAIL';
// 年级和学年
export const CLASS_YEAR = 'CLASS_YEAR';
// 改变分页
export const CHANGE_PAGE = 'CHANGE_PAGE';
