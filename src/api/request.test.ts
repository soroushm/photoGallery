import {rest} from 'msw';
import {BASE_URL, TIMEOUT} from '../config';
import {logEvent} from '../utils/logEvent';
import request from './request';
import {server} from '../service/msw/server';

jest.mock('../utils/logEvent');
jest.mock('../utils/httpRequest');

describe('request', () => {
  test('should create an axios instance with the correct options', () => {
    server.use(
      rest.get(`${BASE_URL}/api/test`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({data: true}));
      }),
    );
    expect(request.defaults.baseURL).toBe(BASE_URL);
    expect(request.defaults.timeout).toBe(TIMEOUT);
    expect(request.defaults.data).toEqual({});
    expect(request.defaults.maxContentLength).toBe(20000);
  });

  test('should log an axios HTTP request event', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/test`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({data: true}));
      }),
    );
    const config = {
      method: 'get',
      url: '/api/test',
      params: {id: 123},
    };
    await request(config);
    expect(logEvent).toHaveBeenCalledTimes(2);
  });

  test('should log an axios HTTP response event', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/test`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({data: true}));
      }),
    );
    const config = {
      method: 'get',
      url: '/api/test',
      params: {id: 123},
    };
    const response = await request(config);
    expect(logEvent).toHaveBeenNthCalledWith(
      1,
      'Axios HTTP request',
      expect.objectContaining(config),
    );
    expect(response.data).toEqual({data: true});
    expect(response.status).toBe(200);
  });
});
