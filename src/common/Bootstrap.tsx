import React, {useCallback, useEffect} from 'react';
import type {AppStateStatus} from 'react-native';
import {AppState, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {onlineManager, focusManager} from '@tanstack/react-query';

interface BootstrapProps {
  children?: React.ReactNode;
}

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

export const Bootstrap = ({children}: BootstrapProps) => {
  const onAppStateChange = useCallback((status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, [onAppStateChange]);

  return <>{children}</>;
};
