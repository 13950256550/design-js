import request from '../utils/request';

export async function fetchData(param) {
  return request(`/proxy/api/data/${param}`, { method: 'GET' });
}

export async function fetchCodeList(param) {
  return request(`/proxy/api/codelist/${param}`, { method: 'GET' });
}

export async function updateData(fileid,data) {
  return request(`/proxy/api/updateData/${fileid}`, {
    method: 'POST',
    body: data,
  });
}

export async function getFile(params) {
  return request(`/proxy/api/getFile/${params}`, {
    method: 'GET',
  });
}

export async function updateFile(fileid,data) {
  return request(`/proxy/api/updateFile/${fileid}`, {
    method: 'POST',
    body: data,
  });
}

export async function calculate(params){
  return request(`/proxy/admin/calculate/${params}`, {
    method: 'GET',
  });
}
