'use client';
import { useSnackbar } from '@/components/alert/alert.context';
import React from 'react';

type Props = {};

const TestPage = (props: Props) => {
  const { toastMessage } = useSnackbar();

  return (
    <div className="pt-20">
      <button onClick={(e) => toastMessage('Data Upadted ', 'success')}>Update Context</button>
    </div>
  );
};

export default TestPage;
