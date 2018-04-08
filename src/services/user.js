import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/proxy/admin/currentUser/${params}`);
}

export async function getCurrentUserMenus(params) {
  return request(`/proxy/admin/menus/${params}`);
}
