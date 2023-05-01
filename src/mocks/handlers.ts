import {albumsHandler} from './albums';
import {commentsHandler} from './comments';

export const handlers = [...albumsHandler, ...commentsHandler];
