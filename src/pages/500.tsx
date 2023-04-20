import { NextPage } from 'next';
import React from 'react';
import ErrorModal from '@/components/UI/ErrorModal';
import Link from 'next/link';
const Error500: NextPage = () => {
    return (
        <main className="content">
            <div className="container">
                <div className="page_coordinator">
                    <Link href="/">Главная</Link> | <span>500</span>
                </div>
                <ErrorModal
                    title="500"
                    buttonText="Вернуться на главную"
                    buttonHref="/"
                    description={'Упс, что то пошло не по плану('}
                />
            </div>
        </main>
    );
};

export default Error500;
