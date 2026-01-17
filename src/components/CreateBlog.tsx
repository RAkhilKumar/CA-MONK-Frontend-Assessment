import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateBlog = ({ onCancel }: { onCancel: () => void }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "", 
    category: "TECH", 
    description: "", 
    content: "", 
    coverImage: "https://images.unsplash.com/photo-1499750310159-5b9887b50d56?w=800&q=80"
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // 1. Refresh the list automatically
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      // 2. Go back to main view
      onCancel(); 
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      category: [formData.category], // API expects array
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 md:p-8 custom-scrollbar">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">Write a New Story</h2>
          <Button variant="ghost" onClick={onCancel} className="md:hidden">Cancel</Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-600 font-semibold">Blog Title</Label>
            <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="text-lg font-medium" placeholder="Enter an engaging title..." />
          </div>

          {/* Grid changes from 1 column (mobile) to 2 columns (md) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-600 font-semibold">Category</Label>
              <Input value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. TECH" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-600 font-semibold">Cover Image URL</Label>
              <Input value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} placeholder="https://..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-600 font-semibold">Short Description</Label>
            <Textarea required className="h-24 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="A brief summary..." />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-600 font-semibold">Content</Label>
            <Textarea required className="h-80 font-mono text-sm leading-relaxed" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} placeholder="Start typing your story..." />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={mutation.isPending} className="px-8 bg-blue-600 hover:bg-blue-700">
              {mutation.isPending ? "Publishing..." : "Publish Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateBlog;