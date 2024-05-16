import { Skeleton } from '@/components/ui/skeleton'

export default function PostsLoading(){
  return (
    <div className="grid grid-cols-1 gap-2 2xl:grid-cols-2">
      <PostSkeleton/>
      <PostSkeleton/>
      <PostSkeleton/>
      <PostSkeleton/>
      <PostSkeleton/>
    </div>
  )
}

function PostSkeleton(){
  return (
    <div className="py-2 transition-all duration-75 group">
      <Skeleton className={"h-4 w-[250px]"}/>
      <Skeleton className={"h-2 w-[500px]"}/>
    </div>
  )
}
