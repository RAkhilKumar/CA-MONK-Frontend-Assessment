import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../api/blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Tag } from "lucide-react";

const BlogDetail = ({ id }: { id: string | null }) => {
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  // Empty State (Desktop placeholder)
  if (!id) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center animate-in fade-in duration-500">
      <div className="bg-slate-100 p-6 rounded-full mb-4">
        <Tag size={48} className="text-slate-300" />
      </div>
      <h3 className="text-lg font-semibold text-slate-600">Select a story to read</h3>
      <p className="text-sm">Click on any blog card from the list on the left.</p>
    </div>
  );

  // Loading State
  if (isLoading) return (
    <div className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto">
      <Skeleton className="h-64 md:h-80 w-full rounded-2xl" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="space-y-3 pt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );

  if (isError) return <div className="p-8 text-red-500 text-center">Failed to load content.</div>;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
      <div className="max-w-3xl mx-auto p-6 md:p-10 pb-20">
        {/* Cover Image */}
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-2xl overflow-hidden shadow-sm group">
          <img 
            src={blog?.coverImage} 
            alt={blog?.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 text-white">
             <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {blog?.category}
             </span>
          </div>
        </div>
        
        {/* Meta Data */}
        <div className="flex items-center gap-6 mb-6 text-slate-500 text-sm border-b pb-6">
           <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(blog!.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
           </div>
           <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>{blog?.category}</span>
           </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
          {blog?.title}
        </h1>

        {/* Content - Using Tailwind Prose for perfect typography */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
          <p className="whitespace-pre-wrap font-serif">{blog?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;