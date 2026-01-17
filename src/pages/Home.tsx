import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../api/blogs";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Filter, ChevronRight, BookOpen, PenTool, Mail, ArrowRight, Twitter, Linkedin, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
  { title: "Finance", count: "25 articles", color: "bg-emerald-100", img: "/icons8-bank-100.png" },
  { title: "IT", count: "18 articles", color: "bg-indigo-100", img: "/icons8-cyber-security-100.png" },
  { title: "Business", count: "32 articles", color: "bg-amber-100", img: "/icons8-investment-100.png" },
  { title: "Education", count: "14 articles", color: "bg-rose-100", img: "/icons8-education-100.png" },
  { title: "Sports", count: "40 articles", color: "bg-orange-100", img: "/icons8-pass-the-baton-100.png" },
  { title: "Design", count: "28 articles", color: "bg-violet-100", img: "/icons8-design-100.png" },
  { title: "Technology", count: "45 articles", color: "bg-cyan-100", img: "/icons8-technology-100.png" },
  { title: "Environment", count: "12 articles", color: "bg-teal-100", img: "/icons8-environment-100.png" },
];

const Home = () => {
  const navigate = useNavigate();
  const { data: blogs, isLoading } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
          
          {/* Logo & Company Name */}
          <div 
            className="flex items-center gap-2 md:gap-3 cursor-pointer flex-shrink-0" 
            onClick={() => navigate("/")}
          >
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
             <span className="text-lg md:text-2xl font-extrabold text-slate-900 tracking-tight">CA MONK</span>
          </div>

          {/* Search Bar (Hidden on mobile) */}
          <div className="hidden md:block flex-1 max-w-md relative mx-4">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <Input className="pl-12 bg-slate-100 border-none rounded-full h-11 focus-visible:ring-black" placeholder="Search for articles..." />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
             <Button size="icon" variant="ghost" className="rounded-full text-slate-600 hover:bg-slate-100 h-9 w-9 md:h-10 md:w-10">
               <Bell size={20} className="md:w-[22px] md:h-[22px]" />
             </Button>
             
             <Button 
               onClick={() => navigate('/create')} 
               className="rounded-full bg-black text-white hover:bg-slate-800 px-3 md:px-6 h-9 md:h-10 font-semibold shadow-lg shadow-slate-200 transition-all active:scale-95"
             >
               <PenTool size={16} className="md:mr-2" /> 
               <span className="hidden md:inline">Write a Blog</span>
             </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-10 space-y-8 md:space-y-12">
        
        {/* Hero Section */}
        <div className="text-center md:text-left py-2 md:py-4">
          <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight leading-tight">
            The CA Monk Blog
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Insights on Finance, Technology, and Career Growth. Stay updated with the latest trends.
          </p>
        </div>

        {/* Top Categories */}
        <div>
          <div className="flex items-center justify-between mb-4 md:mb-6">
             <div className="flex items-center gap-2 md:gap-3">
               <h2 className="text-xl md:text-2xl font-bold text-slate-900">Explore Topics</h2>
             </div>
             <Button variant="ghost" className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-black text-sm md:text-base px-2 md:px-4">
               View all <ChevronRight size={16} className="ml-1"/>
             </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard 
                key={cat.title} 
                title={cat.title} 
                count={cat.count} 
                color={cat.color} 
                img={cat.img} 
              />
            ))}
          </div>
        </div>

        {/* Articles Section */}
        <div className="pb-10 md:pb-20">
          <div className="flex items-center justify-between mb-6 md:mb-8">
             <div className="flex items-center gap-2 md:gap-3">
               <h2 className="text-xl md:text-2xl font-bold text-slate-900">Latest Articles</h2>
               <span className="bg-slate-200 text-slate-700 px-2 py-0.5 md:py-1 rounded-lg text-[10px] md:text-xs font-bold">{blogs?.length || 0}</span>
             </div>
             <Button variant="outline" className="rounded-full gap-2 border-slate-300 hidden sm:flex">
               <Filter size={16} /> Sort by
             </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="space-y-3">
                   <Skeleton className="h-48 md:h-64 rounded-[1.5rem] md:rounded-[2rem] w-full" />
                   <Skeleton className="h-6 w-3/4" />
                   <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {blogs?.map((blog: any) => (
                <div 
                  key={blog.id} 
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="group bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative h-48 md:h-60 mb-4 md:mb-5 overflow-hidden rounded-[1rem] md:rounded-[1.5rem]">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-white/90 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-sm">
                      {Array.isArray(blog.category) ? blog.category[0] : blog.category}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-medium text-slate-400 mb-2 md:mb-3">
                      <span>5 min read</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-slate-500 line-clamp-2 mb-4 md:mb-6 leading-relaxed">
                      {blog.description}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-3 pt-3 md:pt-4 border-t border-slate-50">
                      <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                        <img src="/camonk-logo.webp" alt="CA Monk" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">CA Monk Team</p>
                        <p className="text-[10px] font-medium text-slate-400">Official Blog</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black text-white pt-12 md:pt-16 pb-8 mt-auto">
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

// Updated Category Card to use IMG tag instead of Icon
const CategoryCard = ({ title, count, color, img }: any) => (
  <div className={`
    p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-transparent 
    flex items-center gap-3 md:gap-4 hover:shadow-lg transition-all cursor-pointer group
    ${color} 
  `}>
    <div className="h-10 w-10 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-white/60 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
        {/* IMAGE RENDERED HERE */}
        <img src={img} alt={title} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="font-bold text-sm md:text-lg text-slate-900 truncate">{title}</h3>
      <p className="text-[10px] md:text-sm text-slate-600 flex items-center gap-1 font-medium mt-0.5 md:mt-1 whitespace-nowrap">
          <BookOpen size={12} className="md:w-[14px] md:h-[14px] text-slate-500"/> {count}
      </p>
    </div>
  </div>
);

export default Home;