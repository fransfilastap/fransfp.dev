import { chakra, ChakraProps, Heading, HeadingProps, useColorModeValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export type SectionProps = ChakraProps & {
	title?: string | ReactNode;
	children: ReactNode | ReactNode[];
};

export type SectionTitleProps = HeadingProps & {
	children: string | ReactNode;
};

const SectionTitle: React.FunctionComponent<SectionTitleProps> = ({
	children,
	...props
}: SectionTitleProps): React.ReactElement => (
	<Heading fontWeight='600' fontSize={{ base: '2xl', md: '2xl' }} {...props}>
		{children}
	</Heading>
);

const Section: React.FunctionComponent<SectionProps> = ({
	title,
	children,
	...props
}: SectionProps): React.ReactElement => (
	<chakra.section display='flex' flexDir='column' {...props}>
		<SectionTitle mb={{ base: '4', md: '4' }} color={useColorModeValue('gray.800', 'white')}>
			{title}
		</SectionTitle>
		{children}
	</chakra.section>
);

export { Section };
