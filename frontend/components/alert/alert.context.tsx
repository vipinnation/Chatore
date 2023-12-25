'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

interface SnackbarContextData {
  toastMessage: any;
}

const SnackbarContext = createContext<SnackbarContextData | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps & { message: string; severity: AlertProps['severity'] }>({
    open: false,
    autoHideDuration: 4000,
    onClose: () => setSnackbar((prev) => ({ ...prev, open: false })),
    message: '',
    severity: 'success',
    anchorOrigin: { vertical: 'top', horizontal: 'right' }
  });

  const toastMessage = (message: string, type: 'success' | 'error' | 'warning') => {
    try {
      setSnackbar((prev) => ({
        ...prev,
        ...{
          open: true,
          message,
          severity: type
        }
      }));
    } catch (error) {}
  };

  return (
    <SnackbarContext.Provider value={{ toastMessage }}>
      {children}
      <Snackbar {...snackbar}>
        <Alert onClose={snackbar.onClose as any} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextData => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
