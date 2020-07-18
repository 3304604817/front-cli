import { getCurrentOrganizationId, getUserOrganizationId, getCurrentUser } from 'utils/utils';
import codeConfig from '../common/codeConfig';
import { DataSet } from 'choerodon-ui/pro';

const tenantId = getCurrentOrganizationId();
const {
  commCode,
  commLov,
} = codeConfig;

// list查询
const queryListUrl = `/business-26357/v1/${tenantId}/sbss-forecast-order-heads`;

// 新增保存
const saveUrl = `/smart-business/v1/${tenantId}/sbss-forecast-order-heads`;

// 列表字段
const listFields = [
  {
    name: 'id',
    label: '件号',
  },
  {
    name: 'forecastNum',
    label: '预测单编码',
  },
  {
    name: 'purchaseCompanyName',
    label: '采购公司名称',
  },
  {
    name: 'supplierNum',
    label: '供应商编码',
  },
  {
    name: 'supplierName',
    label: '供应商名称',
  },
  {
    name: 'forecastOrderStatus',
    label: '预测单状态',
    lovCode: commLov.sbssDemoLov,
  },
];


/**
 * 记录页面信息
 * @param {*Object} ds -dataSet
 * @param {*String} tabKey -tab 页对应的 key
 * @param {*Object} o -页面信息
 */
function recordPageInfo(ds, tabKey, o = { currentPage: ds.currentPage }) {
  localStorage.setItem(tabKey, JSON.stringify(o));
}

/**
 * 解析页面信息
 * @param {*String} tabKey -tab 页对应的 key
 * @return {*Object} 页面信息
 * {
 *   currentPage: 1 || currentPage,
 * }
 */
function parsePageInfo(tabKey) {
  const v = localStorage.getItem(tabKey);
  if (v){
    return JSON.parse(v);
  } else {
    return {
      currentPage: 1,
    };
  }
}

/**
 * 删除页面信息
 * @param {*String} tabKey -tab 页对应的 key
 */
function deletePageInfo(tabKey) {
  localStorage.removeItem(tabKey);
}

/**
 * 页面信息
 * @return {*Object} 页面信息对象
 */
export function pageInfo() {
  return {
    recordPageInfo,
    parsePageInfo,
    deletePageInfo,
  };
}

// 列表 DS
const itemDs = {
  autoQuery: true,
  queryFields: [
    {
      name: 'forecastNum',
      type: 'string',
      label: '预测单编码',
    },
  ],
  fields: listFields,
  transport: {
    read: ({ params }) => {
      return {
        url: queryListUrl,
        method: 'GET',
        params,
      };
    },
    destroy: ({ data }) => {
      return {
        url: `/business-26357/v1/${tenantId}/sbss-forecast-order-heads`,
        data,
        method: 'DELETE',
      };
    },
    submit: ({ data = [], params }) => {
      return {
        url: `/business-26357/v1/${tenantId}/sbss-forecast-order-heads`,
        data,
        params,
        method: 'POST',
      };
    },
  },
  events: {
    select: ({ dataSet }) => {
      dataSet.modifyBtnsClickStatus();
    },
    unSelect: ({ dataSet }) => {
      dataSet.modifyBtnsClickStatus();
    },
    selectAll: ({ dataSet }) => {
      dataSet.modifyBtnsClickStatus();
    },
    unSelectAll: ({ dataSet }) => {
      dataSet.modifyBtnsClickStatus();
    },
    load: ({ dataSet }) => {
      pageInfo().deletePageInfo(dataSet.tabKey);
    },
  },
};

export { itemDs };
