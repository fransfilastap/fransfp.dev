import { chakra, ChakraProps, HStack, Icon } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { FiEye } from 'react-icons/fi';
import fetcher from '@/lib/fetcher';
import { PostViewResponse } from '@/types';

interface ViewsCountProps extends ChakraProps {
	slug: string;
}

const ViewCounter: React.FunctionComponent<ViewsCountProps> = (props): React.ReactElement => {
	const { slug, color, ...rest } = props;
	const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher);
	const views = data?.total ? Number(data?.total) : '----';

	useEffect(() => {
		const registerView = () => {
			fetch(`/api/views/${slug}`, { method: 'POST' });
		};
		registerView();
	}, [slug]);

	return (
		<HStack gap={1}>
			<Icon color={color} as={FiEye} />
			<chakra.span {...rest} color={color} fontSize={'small'}>
				{views}
			</chakra.span>
		</HStack>
	);
};

export default ViewCounter;
