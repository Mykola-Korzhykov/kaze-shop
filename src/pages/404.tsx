import { NextPage } from 'next';
import React from 'react';
import ErrorModal from '@/components/UI/ErrorModal';
import Link from 'next/link';
const ErrorPage: NextPage = () => {
  return (
    <main className="content">
      <div className="container">
        <div className="page_coordinator">
          <Link href="/">Главная</Link> | <span>404</span>
        </div>
        <ErrorModal
          title="404"
          buttonText="Вернуться на главную"
          buttonHref="/"
          description={'Упс, что то пошло не по плану('}
        />
      </div>
    </main>
  );
};

export default ErrorPage;
