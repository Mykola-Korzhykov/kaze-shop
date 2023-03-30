import React from 'react';
import SpinnerLayout from '../layouts/SpinnerLayout';
import Catalog from '@/components/screens/Catalog/Catalog';
import { NextPage } from 'next';
const CatalogPage: NextPage = () => {
  return (
    <SpinnerLayout>
      <Catalog />
    </SpinnerLayout>
  );
};

export default CatalogPage;
