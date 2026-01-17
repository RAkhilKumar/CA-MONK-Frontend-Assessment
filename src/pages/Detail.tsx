import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogById, fetchBlogs } from "../api/blogs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ArrowLeft,Search, Share2, Facebook, Twitter, Linkedin, Mail, MessageCircle, Heart, ArrowRight } from "lucide-react";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
  });

  const { data: relatedBlogs } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });

  if (isLoading) return <div className="max-w-7xl mx-auto p-10"><Skeleton className="h-[60vh] w-full rounded-3xl" /></div>;
  if (!blog) return <div className="p-10 text-center">Blog not found</div>;

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
          
          {/* Logo & Company Name */}
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
             <img 
               src="/camonk-logo.webp" 
               alt="Logo" 
               className="h-8 w-8 md:h-10 md:w-10 object-contain"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.parentElement!.classList.add('bg-black', 'rounded-xl', 'p-1', 'md:p-2');
               }} 
             />
             <div className="h-8 w-8 md:h-10 md:w-10 bg-black rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl hidden group-hover:flex">C</div>
             <span className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight">CA MONK</span>
          </div>

          
          <div className="hidden md:block flex-1 max-w-md relative mx-4">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <Input className="pl-12 bg-slate-100 border-none rounded-full h-11 focus-visible:ring-black" placeholder="Search for articles..." />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-10 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Column (Article) */}
        <div className="lg:col-span-8">
           {/* Title matched to Home Page style (Larger & Tighter) */}
           <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 font-semibold text-slate-600 hover:text-black mb-3 hover:bg-slate-50 rounded-full pl-2">
           <ArrowLeft size={20} /> <span className="hidden md:inline">Back to Homepage</span>
           </Button>
           <h1 className="text-3xl md:text-6xl font-medium text-slate-900 mb-6 leading-tight tracking-tight">
             {blog.title}
           </h1>
           
           <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
              <img src={`https://i.pravatar.cc/150?u=${blog.id}`} className="h-12 w-12 rounded-full ring-2 ring-slate-100" alt="Author" />
              <div>
                <p className="font-bold text-slate-900 text-lg">Dr. Alex Morgan</p>
                <p className="text-sm font-medium text-slate-500 flex flex-wrap items-center gap-2 mt-1">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-100">
                      {blog.category[0]}
                    </span> 
                    <span>• {new Date(blog.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric'})}</span>
                </p>
              </div>
           </div>

           <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm mb-10 border border-slate-100">
             <img src={blog.coverImage} alt="Cover" className="w-full h-auto object-cover max-h-[400px] md:max-h-[600px]" />
           </div>

           <div className="prose prose-lg prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-8 prose-img:rounded-3xl">
             <p className="font-bold text-xl md:text-2xl text-slate-900 leading-relaxed mb-8 not-prose tracking-tight">
               {blog.description}
             </p>
             <div className="whitespace-pre-wrap font-serif text-lg md:text-xl text-slate-700 leading-loose">
               {blog.content}
             </div>
           </div>

           {/* Interaction Bar */}
           <div className="mt-12 md:mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Likes & Comments (Always visible) */}
              <div className="flex gap-3 w-full md:w-auto">
                 <Button variant="outline" className="flex-1 md:flex-none rounded-full gap-2 border-slate-200 h-11 px-6 hover:bg-slate-50 hover:text-red-500">
                    <Heart size={18} /> 1.3k Likes
                 </Button>
                 <Button variant="outline" className="flex-1 md:flex-none rounded-full gap-2 border-slate-200 h-11 px-6 hover:bg-slate-50 hover:text-blue-500">
                    <MessageCircle size={18} /> 55 Comments
                 </Button>
              </div>
              
              {/* Shares & Profiles (Now grouped together) */}
              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium w-full md:w-auto justify-between md:justify-end">
                 <div className="flex items-center gap-2">
                    <Share2 size={18} /> 
                    <span>960 Shares</span>
                 </div>
                 
                 {/* Random Profiles Pile placed here */}
                 <div className="flex -space-x-2">
                     <img src="https://i.pravatar.cc/150?u=share" alt="User" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                     <img src="https://i.pravatar.cc/150?u=share" alt="User" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                     <img src="https://i.pravatar.cc/150?u=share" alt="User" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                 </div>
              </div>

           </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-10 md:space-y-12">
          
          {/* Share Widget */}
          <div className="bg-white p-0 lg:sticky lg:top-32">
            <h3 className="font-bold text-xl mb-6 text-slate-900 tracking-tight">Share to</h3>
            
            <div className="flex gap-3 mb-10 md:mb-12">
               {[Linkedin, Facebook, Twitter, Mail].map((Icon, i) => (
                 <button key={i} className="h-11 w-11 bg-slate-50 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all text-slate-600">
                    <Icon size={18} />
                 </button>
               ))}
            </div>

            {/* Related Articles */}
            <h3 className="font-bold text-xl mb-6 text-slate-900 tracking-tight">Related Articles</h3>
            <div className="space-y-6 md:space-y-8">
               {relatedBlogs?.slice(0, 4).map((item: any) => (
                 <div key={item.id} className="flex gap-4 md:gap-5 group cursor-pointer" onClick={() => navigate(`/blog/${item.id}`)}>
                    <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                       <img src={item.coverImage} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="thumb" />
                    </div>
                    <div className="flex flex-col justify-center">
                       <h4 className="font-bold text-sm md:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 mb-2 tracking-tight">
                         {item.title}
                       </h4>
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{item.category}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white pt-12 md:pt-16 pb-8 mt-auto rounded-t-[2rem] md:rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                 <img src="/camonk-logo.png" alt="Logo" className="h-8 w-8 object-contain brightness-0 invert" onError={(e) => e.currentTarget.style.display='none'}/>
                 <span className="text-2xl font-extrabold tracking-tight">CA MONK</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                At CA Monk, we empower CA aspirants and finance professionals with the skills, mentorship, and opportunities needed to succeed in audit, taxation, and finance careers.
              </p>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                  <button key={i} className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div className="md:col-span-3">
              <h4 className="font-bold text-lg mb-6 tracking-tight">Explore</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Career Guidance</li>
                <li className="hover:text-white cursor-pointer transition-colors">Latest Articles</li>
                <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="md:col-span-4">
              <h4 className="font-bold text-lg mb-4 tracking-tight">Stay Updated</h4>
              <p className="text-slate-400 text-sm mb-6">Get the latest articles and career tips delivered to your inbox.</p>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    placeholder="Enter your email" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl h-12 pl-12 pr-4 text-sm focus:outline-none focus:border-gray-600 transition-colors placeholder:text-gray-600"
                  />
                </div>
                <Button className="w-full rounded-xl h-12 bg-white text-black hover:bg-gray-200 font-bold">
                  Subscribe <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 CA Monk. All rights reserved.</p>
            <p className="text-center">
              Developed by{" "}
              <a 
                href="https://www.linkedin.com/in/rotta-akhil-kumar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-slate-400 hover:text-white transition-colors underline decoration-slate-700 hover:decoration-white"
              >
                Akhil Kumar Rotta
              </a>
            </p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Detail;