import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  X,
  Save,
  ArrowRight,
} from "lucide-react";

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
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImage =
      formData.coverImage.trim() === ""
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
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center">
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/camonk-logo.webp"
              alt="Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-base sm:text-lg md:text-2xl font-bold text-slate-900 tracking-tight">
              CA MONK
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto mt-6 md:mt-10 px-4 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-12 shadow-sm border border-slate-100 relative"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6 md:mb-12 border-b border-slate-100 pb-4 md:pb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(-1)}
              className="rounded-full text-sm"
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </Button>

            <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <Save size={14} />
              <span className="text-[10px] sm:text-xs font-bold uppercase">
                {mutation.isPending ? "Saving..." : "Unsaved"}
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
            {/* TITLE */}
            <Textarea
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
              className="text-2xl sm:text-3xl md:text-6xl font-medium tracking-tight border-none px-0 shadow-none placeholder:text-slate-300 focus-visible:ring-0 bg-transparent leading-tight"
            />

            {/* GRID INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
              {/* CATEGORY */}
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm md:text-base font-semibold">
                  Category
                </Label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Technology, Health..."
                    className="pl-10 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl bg-slate-50"
                  />
                </div>
              </div>

              {/* COVER IMAGE */}
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm md:text-base font-semibold">
                  Cover Image URL
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData({ ...formData, coverImage: e.target.value })
                    }
                    placeholder="https://..."
                    className="pl-10 h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* IMAGE PREVIEW */}
            {formData.coverImage.length > 10 && (
              <div className="relative h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden border">
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, coverImage: "" })
                  }
                  className="absolute top-3 right-3 bg-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm md:text-base font-semibold">
                Short Summary
              </Label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Short description..."
                className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base md:text-lg rounded-2xl bg-slate-50"
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm md:text-base font-semibold">
                Main Content
              </Label>
              <Textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Write your story..."
                className="min-h-[320px] sm:min-h-[420px] md:min-h-[500px] text-sm sm:text-base md:text-lg font-serif leading-relaxed rounded-2xl"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                className="h-11"
              >
                Discard
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-11 px-8 bg-black text-white rounded-full"
              >
                {mutation.isPending ? "Publishing..." : "Publish Story"}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateBlog;
