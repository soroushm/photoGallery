import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from '../theme/ThemeProvider';

const queryClient = new QueryClient();

interface ProviderProps {
  children?: React.ReactNode;
}

export const Provider = ({children}: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
