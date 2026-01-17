import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image as ImageIcon, Sparkles, X, Save, ArrowRight } from "lucide-react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    coverImage: "",
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/"); // Go back home after success
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = formData.coverImage.trim() === "" 
      ? "https://images.unsplash.com/photo-1499750310159-5b9887b50d56?w=800&q=80" 
      : formData.coverImage;

    mutation.mutate({
      ...formData,
      category: [formData.category || "General"], 
      coverImage: finalImage,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20">
      {/* Navbar (Empty or Minimal based on your requirement, just holding space or logo if needed) */}
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

          {/* Search Bar (Hidden on mobile)
          <div className="hidden md:block flex-1 max-w-md relative mx-4">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <Input className="pl-12 bg-slate-100 border-none rounded-full h-11 focus-visible:ring-black" placeholder="Search for articles..." />
          </div> */}
        </div>
      </nav>

      {/* Main Form Container - max-w-7xl to match Home Page Width */}
      <main className="max-w-7xl mx-auto mt-6 md:mt-10 px-4 md:px-10">
        
        {/* The White Card Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
           
           {/* Decorative Background Blur */}
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
           
           {/* Header Area INSIDE the form: Back Button (Left) & Unsaved Changes (Right) */}
           <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                 <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="rounded-full hover:bg-slate-100 pl-2 -ml-2">
                    <ArrowLeft size={20} className="mr-2" /> <span className="font-semibold text-slate-700">Back</span>
                 </Button>
                 <span className="text-sm font-medium text-slate-400 hidden sm:inline">|</span>
                 <span className="text-sm font-medium text-slate-400 hidden sm:inline">Drafts / New Story</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Save size={14} />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide">
                    {mutation.isPending ? "Saving..." : "Unsaved changes"}
                  </span>
              </div>
           </div>

           {/* Content Area - Restricted Width (max-w-4xl) to stay inside the "Red Rectangle" area */}
           <div className="relative space-y-8 md:space-y-12 max-w-4xl mx-auto">
              
              {/* Title Section */}
              <div className="space-y-4">
                <Input 
                  required
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="Title" 
                  className="text-4xl md:text-6xl font-medium tracking-tight border-none px-0 shadow-none placeholder:text-slate-300 focus-visible:ring-0 h-auto py-2 bg-transparent leading-tight w-full"
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1.5 bg-black rounded-full" />
                  <p className="text-sm text-slate-400 font-medium">Start writing your next masterpiece</p>
                </div>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-4">
                 <div className="space-y-3">
                    <Label className="text-slate-900 font-bold ml-1 text-base">Category</Label>
                    <div className="relative">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <Input 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        placeholder="e.g. Technology, Health..." 
                        className="pl-12 bg-slate-50 border-slate-200 rounded-2xl h-14 focus-visible:ring-black text-lg"
                      />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <Label className="text-slate-900 font-bold ml-1 text-base">Cover Image URL</Label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <Input 
                        value={formData.coverImage} 
                        onChange={(e) => setFormData({...formData, coverImage: e.target.value})} 
                        placeholder="https://..." 
                        className="pl-12 bg-slate-50 border-slate-200 rounded-2xl h-14 focus-visible:ring-black text-lg"
                      />
                    </div>
                 </div>
              </div>
              
              {/* Image Preview */}
              {formData.coverImage.length > 10 && (
                <div className="relative w-full h-48 md:h-80 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                  <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  <button type="button" onClick={() => setFormData({...formData, coverImage: ""})} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-slate-600 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Description */}
              <div className="space-y-3">
                 <Label className="text-slate-900 font-bold ml-1 text-base">Short Summary</Label>
                 <Textarea 
                   required
                   value={formData.description} 
                   onChange={(e) => setFormData({...formData, description: e.target.value})} 
                   placeholder="Write a catchy summary that appears on the card..." 
                   className="min-h-[120px] resize-none bg-slate-50 border-slate-200 rounded-3xl p-6 focus-visible:ring-black text-slate-600 leading-relaxed text-lg"
                 />
              </div>

              {/* Content */}
              <div className="space-y-3">
                 <Label className="text-slate-900 font-bold ml-1 text-base">Main Content</Label>
                 <Textarea 
                   required
                   value={formData.content} 
                   onChange={(e) => setFormData({...formData, content: e.target.value})} 
                   placeholder="Tell your story..." 
                   className="min-h-[500px] bg-white border-slate-200 rounded-3xl p-6 md:p-8 focus-visible:ring-black font-serif text-lg md:text-xl leading-loose shadow-inner"
                 />
              </div>

              {/* Bottom Action Section */}
              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-slate-400 text-sm hidden md:block">
                    By publishing, you agree to our Terms of Service.
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="rounded-full h-12 px-6">
                        Discard
                    </Button>
                    <Button 
                        type="submit"
                        disabled={mutation.isPending}
                        className="rounded-full bg-black text-white hover:bg-slate-800 px-8 h-12 text-lg font-bold shadow-xl shadow-slate-200 transition-transform active:scale-95 w-full md:w-auto"
                    >
                        {mutation.isPending ? "Publishing..." : "Publish Story"} <ArrowRight className="ml-2" size={18} />
                    </Button>
                </div>
              </div>

           </div>
        </form>
      </main>
    </div>
  );
};

export default CreateBlog;