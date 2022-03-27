import Head from 'next/head';
import React from 'react';

type Props = {
	titlePage: string
};

const Heading = ({ titlePage }: Props) => {
	return (
		<Head>
			<title>{titlePage || 'Dashboard'} | AppName</title>
			
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="theme-color" content="#333" />
			<meta name="description" content="Admin dashboard using NextJS" />
			<meta name='keywords' content='Admin dashboard using NextJS' />
			<meta name='author' content='ichsankurnia' />
			<link rel="apple-touch-icon" href="/favicon.ico" />
		</Head>
	)
};

export default Heading;
