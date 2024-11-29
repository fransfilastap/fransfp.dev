import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="p-4 max-w-sm">
      <div className="mb-4">
        <Skeleton className="h-52 w-full"/>
      </div>
      <div className="mb-2">
        <Skeleton className="h-5 w-3/5"/>
      </div>
      <div className="mb-2">
        <Skeleton className="h-5 w-4/5"/>
      </div>
      <Skeleton className="h-5 w-2/5"/>
    </div>
  )
}

export default LoadingSkeleton
