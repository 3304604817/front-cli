import { parseParameters } from 'utils/utils';
import { SMART_BUSINESS } from '@/utils/config';
import request from 'utils/request';

// const prefix = `${SMART_BUSINESS}/v1`;
const prefix = `/business-26357/v1`;

export async function queryList(params) {
  const param = parseParameters(params);
  return request(`${prefix}/${params.tenantId}/sbss-forecast-order-heads`, {
    method: 'GET',
    query: param,
  });
}

export async function queryDetail(params) {
  const param = parseParameters(params);
  return request(`${prefix}/${params.tenantId}/sbss-forecast-order-heads/${params.id}`, {
    method: 'GET',
    query: param,
  });
}

export async function createForecastOrder(params) {
  return request(`${prefix}/${params.tenantId}/sbss-forecast-order-heads`, {
    method: 'POST',
    body: { ...params },
  });
}

export async function updateForecastOrder(params) {
  return request(`${prefix}/${params.tenantId}/sbss-forecast-order-heads`, {
    method: 'PUT',
    body: { ...params },
  });
}
