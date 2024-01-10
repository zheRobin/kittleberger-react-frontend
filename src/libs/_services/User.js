import { handleRequest } from 'libs/_utils/request';

export const userCreate = (data) => {
  return handleRequest('post', 'api/v1/user/manage/', data);
}

export const userEdit = (id, data) => {
  return handleRequest('put', `api/v1/user/manage/${id}/`, data);
}

export const userDelete = (id) => {
  return handleRequest('delete', `api/v1/user/manage/${id}/`);
}

export const userList = () => {
  return handleRequest('get', 'api/v1/user/manage/');
}

export const changePassword = (data) => {
  return handleRequest('put', 'api/v1/user/change-password/', data);
}