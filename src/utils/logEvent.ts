const isDevelopment = process.env.NODE_ENV === 'development';
const logFn = console.log;

export const logEvent = (...args) => isDevelopment && logFn(...args);
