import axios from 'axios';
import {BASE_URL, TIMEOUT} from '../config';
import {getErrorCode, getStatusMessage} from '../utils/httpRequest';
import {logEvent} from '../utils/logEvent';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const errorHandler = error => {
  logEvent('\x1B[33m axios HTTP error', error);
  const code = getErrorCode(error);
  const errorObject = {
    code,
    message: getStatusMessage(code),
    details: error,
  };
  return Promise.reject(errorObject);
};

const options = {
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers,
  data: {},
  maxContentLength: 20000,
};
const request = axios.create(options);

request.interceptors.request.use(
  req => logEvent('axios HTTP request', req) || req,
);
request.interceptors.response.use(
  res => logEvent('\x1B[32maxios HTTP response', res) || res,
  errorHandler,
);

export default request;
