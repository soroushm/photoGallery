/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {MOCK_MOD} from './src/config';

if (MOCK_MOD && process.env.NODE_ENV === 'development') {
  // we dont want to import nativeServer to production build
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {server} = require('./src/service/msw/nativeServer');
  server.listen({onUnhandledRequest: 'warn'});
}

AppRegistry.registerComponent(appName, () => App);
