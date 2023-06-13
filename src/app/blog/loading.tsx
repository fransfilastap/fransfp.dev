import Container from "@/components/container";

export default function BlogPostsLoadingSkeleton() {
  return (
    <Container className="p-6 my-20">
      <div className="flex flex-col items-start justify-between gap-2 mb-10 animate-pulse">
        <div className="block h-[100px] w-[300px] bg-slate-200 "></div>
        <div className="h-[50px] w-[350px] bg-slate-200"></div>
      </div>
      <section className="flex flex-col gap-2 my-4">
        <div className="h-10 w-36 bg-slate-200"></div>
        <div className="flex flex-row w-full gap-2 overflow-x-scroll">
          <div className="w-[50px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[100px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[75px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[150px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[150px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[100px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[170px] bg-slate-200 h-10 rounded-full"></div>
          <div className="w-[100px] bg-slate-200 h-10 rounded-full"></div>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2 p-8 h-[300px] rounded-lg shadow cursor-pointer group bg-slate-100 shadow-gray-50/20 "></div>
        <div className="flex flex-col gap-2 p-8 h-[100px] rounded-lg shadow cursor-pointer group bg-slate-100 shadow-gray-50/20 "></div>
        <div className="flex flex-col gap-2 p-8 h-[100px] rounded-lg shadow cursor-pointer group bg-slate-100 shadow-gray-50/20 "></div>
        <div className="flex flex-col gap-2 p-8 h-[100px] rounded-lg shadow cursor-pointer group bg-slate-100 shadow-gray-50/20 "></div>
        <div className="flex flex-col gap-2 p-8 h-[100px] rounded-lg shadow cursor-pointer group bg-slate-100 shadow-gray-50/20 "></div>
        <div className="flex flex-col gap-2 p-8 h-[100px] rounded-lg shadow cursor-pointer group bg-slate-100 shadow-gray-50/20 "></div>
      </div>
    </Container>
  );
}
