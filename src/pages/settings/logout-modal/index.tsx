import React from 'react';
import SpinnerLayout from '@/layouts/SpinnerLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import LogoutModal from '@/components/modals/LogoutModal/LogoutModal';

const LogoutModalPage: NextPage = () => {
  const [number, setNumber] = React.useState(1);

  return (
    <SpinnerLayout>
      <main className="content">
        <div className="container">
          <div className="page_coordinator">
            <Link href="/cabinet">.../Личный кабинет | </Link>{' '}
            <span>Выдать роль</span>
          </div>

          <LogoutModal closeModal={setNumber} />
        </div>
      </main>
    </SpinnerLayout>
  );
};

export default LogoutModalPage;
