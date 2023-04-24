import {logEvent} from './logEvent';

describe('logEvent', () => {
  test('logEvent working as intended', () => {
    const arg1 = 'example';
    const arg2 = {key: 'value'};
    expect(() =>
      logEvent(arg1, arg2, null, undefined, false),
    ).not.toThrowError();
  });
});
