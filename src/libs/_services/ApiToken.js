import { handleRequest } from 'libs/_utils/request';

export const tokenList = () => {
    return handleRequest('get', 'api/v1/core/apikey/');
}

export const createToken = name => {
    return handleRequest('post', 'api/v1/core/apikey/', name);
}

export const deleteToken = id => {
    return handleRequest('delete', `api/v1/core/apikey/${id}`);
}