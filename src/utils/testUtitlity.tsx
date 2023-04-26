import React from 'react';
import {Provider} from '../common';

export const wrapper = ({children}) => <Provider>{children}</Provider>;
