import {STATUS_CODE_MESSAGES} from '../consts/httpRequest';

export const getStatusMessage = code =>
  STATUS_CODE_MESSAGES[code] ?? STATUS_CODE_MESSAGES.default;

export const getErrorCode = error => {
  const hasText = text => error.message.includes(text);
  if (hasText('Network Error')) {
    return 520;
  }

  if (hasText('timeout') || hasText('Cancel')) {
    return 504;
  }

  return error?.response?.status ?? 500;
};
