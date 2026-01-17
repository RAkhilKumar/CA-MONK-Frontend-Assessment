import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../api/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
  onSelectBlog: (id: string) => void;
  selectedId: string | null;
}

const BlogList = ({ onSelectBlog, selectedId }: BlogListProps) => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <div className="p-4 space-y-4"><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /></div>;

  return (
    <div className="flex flex-col gap-3 p-4 h-[calc(100vh-80px)] overflow-y-auto">
      {blogs?.map((blog) => (
        <Card
          key={blog.id}
          onClick={() => onSelectBlog(blog.id)}
          className={`cursor-pointer transition-all hover:shadow-md border-2 
            ${selectedId === blog.id ? "border-blue-500 bg-blue-50" : "border-transparent"}`}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between text-xs font-bold uppercase mb-1">
              <span className="text-rose-500">{blog.category[0]}</span>
              <span className="text-gray-400">{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <CardTitle className="text-base text-blue-700">{blog.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-gray-500 line-clamp-2">{blog.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default BlogList;