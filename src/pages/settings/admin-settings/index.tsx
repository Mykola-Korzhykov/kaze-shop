import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
//redux
import SpinnerLayout from '@/layouts/SpinnerLayout';
import Image from 'next/image';
//components
import { UsersRole } from '@/components/screens/Cabinet/CabinetOwner/Display/UsersRole';

const AdminSettings: NextPage = () => {
  return (
    <SpinnerLayout>
      <main className="content">
        <div className="container">
          <div className="page_coordinator">
            <Link href="/cabinet">.../Личный кабинет |</Link>{' '}
            <span>Выдать роль</span>
          </div>

          <UsersRole />
        </div>
      </main>
    </SpinnerLayout>
  );
};

export default AdminSettings;
