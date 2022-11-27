import { FunctionComponent } from 'react';
import { PostMetadata } from '@/lib/types';
import { EmptyState } from '@/components/empty/EmptyState';
import BlogPostItem from '@/components/BlogPostItem';
import MotionDiv from '@/components/Motion';
import { childAnimationProps, staggerAnimationProps } from '@/lib/constants/animation';
import { Text } from '@chakra-ui/react';

export type BlogPostListProps = {
	posts: PostMetadata[];
};

const BlogPostList: FunctionComponent<BlogPostListProps> = ({ posts }) => {
	if (posts.length <= 0) {
		return (
			<EmptyState>
				<Text>No article for that query.</Text>
			</EmptyState>
		);
	}

	return (
		<MotionDiv display={'flex'} flexDir={'column'} gap={4} {...staggerAnimationProps}>
			{posts.map((post, index) => (
				<BlogPostItem
					description={post.description}
					key={index}
					title={post.title}
					slug={post.slug}
					tags={post.tags}
					date={post.date}
					cover={post.cover}
					motionProps={childAnimationProps}
					author={post.author}
				/>
			))}
		</MotionDiv>
	);
};

export default BlogPostList;
