/**
 * @format
 */

import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import App from '../src/App';

it('renders correctly', () => {
  renderer.act(() => {
    const tree = renderer.create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
