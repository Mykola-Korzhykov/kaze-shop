import { NextPage } from 'next';
import React from 'react';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import Compare from '@/components/screens/Compare/Compare';
const ComparePage: NextPage = () => {
  return (
    <SpinnerLayout>
      <Compare />
    </SpinnerLayout>
  );
};

export default ComparePage;
