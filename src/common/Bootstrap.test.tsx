import React from 'react';
import {render} from '@testing-library/react-native';
import {AppState, Platform, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Bootstrap} from './Bootstrap';

describe('Bootstrap', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the children and handle AppState and NetInfo events', async () => {
    // Mock Platform.OS to test different platforms
    jest.spyOn(Platform, 'select').mockImplementation(obj => obj.ios);

    // Mock AppState and NetInfo event listeners
    const appStateAddEventListenerSpy = jest.spyOn(
      AppState,
      'addEventListener',
    );
    const netInfoAddEventListenerSpy = jest.spyOn(NetInfo, 'addEventListener');

    const {getByText} = render(
      <Bootstrap>
        <Text>Test content</Text>
      </Bootstrap>,
    );
    await appStateAddEventListenerSpy.mock.calls[0][1]('active');

    expect(getByText('Test content')).toBeDefined();

    // Check if the AppState event listener is added
    expect(appStateAddEventListenerSpy).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    // Check if the NetInfo event listener is added
    expect(netInfoAddEventListenerSpy).toHaveBeenCalled();
  });
});
