import {setupServer} from 'msw/native';
import 'react-native-url-polyfill/auto';

import {handlers} from '../../mocks/handlers';

// Setup native requests interception using the given handlers.
export const server = setupServer(...handlers);
