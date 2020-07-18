import { createPagination, getResponse } from 'utils/utils';
import { queryMapIdpValue } from 'services/api';
import {
  queryList,
  queryDetail,
  createForecastOrder,
  updateForecastOrder,
} from '../services/forecastOrderService';

export default {
  namespace: 'forecastOrder',
  state: {
    list: [],
    detail: {},
    selectMaps: {
      forecastOrderStatusMap: [],
    },
  },
  effects: {
    // effects下面的方法有返回值
    // 查询值集
    *init(_, { call, put }) {
      const result = getResponse(
        yield call(queryMapIdpValue, {
          forecastOrderStatusMap: 'SBSS_FORECAST_ORDER_STATUS', // 预测单状态
        })
      );
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            selectMaps: result,
          },
        });
      }
    },
    // 界面查询
    *queryList({ payload }, { call, put }) {
      const result = yield call(queryList, payload);
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            list: result.content,
            pagination: createPagination(result),
          },
        });
      }
    },
    // 明细查询
    *queryDetail({ payload }, { call, put }) {
      const result = yield call(queryDetail, payload);
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            detail: result,
          },
        });
      }
    },
    *createForecastOrder({ payload }, { call }) {
      const result = yield call(createForecastOrder, payload);
      return getResponse(result);
    },
    *updateForecastOrder({ payload }, { call }) {
      const result = yield call(updateForecastOrder, payload);
      return getResponse(result);
    },
  },
  reducers: {
    // reducers下面的方法没有返回值
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
