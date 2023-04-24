import {getErrorCode, getStatusMessage} from './httpRequest';

describe('getStatusMessage', () => {
  const STATUS_CODE_MESSAGES = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Permission Denied',
    500: 'Internal Server Error',
    default: 'Request Failed',
  };
  jest.mock('../consts/httpRequest', () => ({
    STATUS_CODE_MESSAGES,
  }));

  test('returns correct status message for known codes', async () => {
    expect(getStatusMessage(400)).toBe('Bad Request');
    expect(getStatusMessage(401)).toBe('Unauthorized');
    expect(getStatusMessage(403)).toBe('Permission Denied');
    expect(getStatusMessage(500)).toBe('Internal Server Error');
  });

  test('returns default status message for unknown codes', async () => {
    expect(getStatusMessage(999)).toBe('Request Failed');
  });
});

describe('getErrorCode', () => {
  test('returns 520 for error with message containing "Network Error"', async () => {
    const error = {message: 'An error occurred: Network Error'};
    expect(getErrorCode(error)).toBe(520);
  });

  test('returns 504 for error with message containing "timeout"', async () => {
    const error = {message: 'Request timed out: timeout'};
    expect(getErrorCode(error)).toBe(504);
  });

  test('returns 504 for error with message containing "Cancel"', async () => {
    const error = {message: 'Request canceled: Cancel'};
    expect(getErrorCode(error)).toBe(504);
  });
});
