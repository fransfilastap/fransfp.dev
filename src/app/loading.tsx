import React from 'react'
import PostsLoading from '@/components/posts-loading'

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="p-4 xcontainer">
      <PostsLoading/>
    </div>
  )
}

export default LoadingSkeleton
