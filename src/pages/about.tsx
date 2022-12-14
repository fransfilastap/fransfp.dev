import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { parseContent } from '@/lib/content-parser';
import PageLayout, { PageProps } from '@/components/layouts/page';

const AboutPage: NextPage<PageProps> = (props) => <PageLayout content={props.content} />;

export default AboutPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	const about = await parseContent('about', 'pages');
	return {
		props: {
			content: JSON.parse(JSON.stringify(about))
		}
	};
};
