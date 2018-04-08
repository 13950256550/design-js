import request from '../utils/request';

export async function fetchData(param) {
  return request(`/proxy/api/data/${param}`, { method: 'GET' });
}

export async function fetchCodeList(param) {
  return request(`/proxy/api/codelist/${param}`, { method: 'GET' });
}

export async function updateData(params) {
  return request('/proxy/api/updateData/1D/1d_in1', {
    method: 'POST',
    body: params,
  });
}

export async function getFile(params) {
  return request(`/proxy/api/getFile/${params}`, {
    method: 'GET',
  });
}

export async function updateFile(params) {
  return request('/proxy/api/updateFile/1D/1d_in1', {
    method: 'POST',
    body: params,
  });
}

export async function get1dOutput() {
  return request('/proxy/api/getAeroData', {
    method: 'GET',
  });
}
