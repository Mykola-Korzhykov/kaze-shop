import { FC } from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

type Props = {
    pageTitle: string;
    title: string;
    description: string;
    preview: string;
}

const MetaHead: FC<Props> = ({pageTitle, title, description, preview}) => {
    return (
        <NextSeo title={pageTitle} 
                 description={description} 
                 openGraph={{title, description, images: [{url: preview, alt: 'Preview Image'}]}} />
    );
}

export default MetaHead;