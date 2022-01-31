import Head from 'next/head';
import React from 'react';

type Props = {
	titlePage: string
};

const Heading = ({ titlePage }: Props) => {
	return (
		<Head>
			<title>{titlePage || 'Dashboard'} | AppName</title>
		</Head>
	)
};

export default Heading;
