/**
 * @format
 */

import 'react-native';
import React from 'react';
import App, {Section} from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.act(() => {
    const tree = renderer.create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('Section component', () => {
  it('renders title and children', () => {
    const title = 'Test Title';
    const children = 'Test Children';

    const {getByText} = render(<Section title={title}>{children}</Section>);

    expect(getByText(title)).toBeDefined();
    expect(getByText(children)).toBeDefined();
  });
});
