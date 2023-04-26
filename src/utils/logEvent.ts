const isProduction = process.env.NODE_ENV === 'production';
const logFn = console.log;
export const logEvent = (...args) => !isProduction && logFn(...args);
