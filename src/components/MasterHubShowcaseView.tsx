import React, { useState } from 'react';
import { MasterHubProject } from '../types';
import { 
  Globe, 
  Plus, 
  Search, 
  Tag, 
  User, 
  Calendar, 
  Eye, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface MasterHubShowcaseViewProps {
  projects: MasterHubProject[];
  onPublishProject: (project: Omit<MasterHubProject, 'id' | 'publishedAt' | 'status'>) => void;
}

export const MasterHubShowcaseView: React.FC<MasterHubShowcaseViewProps> = ({
  projects,
  onPublishProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPublishModal, setShowPublishModal] = useState(false);

  // New project form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('تولید محتوا و ویدئو');
  const [creatorName, setCreatorName] = useState('');
  const [description, setDescription] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const categories = [
    { id: 'all', label: 'همه خدمات' },
    { id: 'تولید محتوا و ویدئو', label: 'تولید محتوا و ویدئو' },
    { id: 'طراحی گرافیک و تصویر', label: 'طراحی گرافیک' },
    { id: 'بازاریابی و متن', label: 'کپی‌رایتینگ و متن' },
    { id: 'خدمات دیجیتال و بازاریابی', label: 'خدمات دیجیتال عمومی' },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.includes(searchTerm) ||
      p.description.includes(searchTerm) ||
      p.creatorName.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onPublishProject({
      title: title.trim(),
      category,
      creatorName: creatorName.trim() || 'سازنده توانا',
      description: description.trim(),
      priceEstimate: priceEstimate.trim() || 'توافقی / پیشنهادی',
      contactInfo: contactInfo.trim() || 'تماس از طریق اکوسیستم توانا',
      tags: tagsInput ? tagsInput.split('،').map((t) => t.trim()) : ['شهر_توانا', 'هوش_مصنوعی'],
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCreatorName('');
    setPriceEstimate('');
    setContactInfo('');
    setTagsInput('');
    setShowPublishModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top Showcase Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>MasterHub Ecosystem Showcase</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              ویترین مسترهاب (MasterHub) شهر توانا
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              مرکز عرضه خدمات و محصولات دیجیتال ساخته‌شده توسط کاربران شهر توانا. ایده‌ها پس از ساخت با AI، آماده ارائه به کارفرمایان و مشتریان می‌شوند.
            </p>
          </div>

          <button
            onClick={() => setShowPublishModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>انتشار خدمت جدید در مسترهاب</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در عنوان، توضیحات یا نام سازنده..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-800 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-slate-200/90 hover:border-teal-400 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-md">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>تاییدشده توانا</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-teal-800 transition-colors leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-semibold">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span>{project.creatorName}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.publishedAt}</span>
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl font-bold text-slate-800 flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">تعرفه پیشنهادی:</span>
                <span className="text-teal-900 font-black">{project.priceEstimate}</span>
              </div>

              {/* Contact Box */}
              <div className="bg-teal-50/60 border border-teal-200/60 p-2.5 rounded-xl text-[11px] text-teal-950 space-y-1">
                <span className="font-bold text-teal-900 block flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
                  <span>نحوه ارتباط و سفارش:</span>
                </span>
                <p className="font-semibold text-slate-800">{project.contactInfo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <Globe className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">پروژه‌ای پیدا نشد</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            هیچ پروژه‌ای با عبارت جستجو شده پیدا نشد. می‌توانی اولین نفری باشی که خدمت جدیدش را منتشر می‌کند!
          </p>
        </div>
      )}

      {/* Publish Project Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-700" />
                <h2 className="font-black text-slate-900 text-lg">
                  ثبت و انتشار پروژه در مسترهاب
                </h2>
              </div>
              <button
                onClick={() => setShowPublishModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">عنوان خدمت یا محصول:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: ساخت ویدئوی کوتاه‌مدت ۳۰ ثانیه‌ای برای کسب‌وکارهای شهری"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">دسته‌بندی:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 font-bold focus:outline-none"
                  >
                    <option value="تولید محتوا و ویدئو">تولید محتوا و ویدئو</option>
                    <option value="طراحی گرافیک و تصویر">طراحی گرافیک و تصویر</option>
                    <option value="بازاریابی و متن">کپی‌رایتینگ و متن</option>
                    <option value="خدمات دیجیتال و بازاریابی">خدمات دیجیتال عمومی</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">نام یا برند شما:</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="مثلاً: علی رضایی"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">توضیحات کامل خدمت و تحویلی‌ها:</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="شرح کامل کاری که انجام می‌دهید، زمان تحویل و ویژگی‌ها..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">برآورد قیمت / هزینه خدمت:</label>
                  <input
                    type="text"
                    value={priceEstimate}
                    onChange={(e) => setPriceEstimate(e.target.value)}
                    placeholder="مثلاً: ۷۵۰,۰۰۰ تومان یا توافقی"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">اطلاعات تماس یا شناسه پیام‌رسان:</label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="آیدی تلگرام، ایتا، شماره تماس یا ایمیل"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">برچسب‌ها (با کاما «،» جدا کنید):</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="مثلاً: ویدئو، تولید_محتوا، هوش_مصنوعی"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-teal-800 hover:bg-teal-900 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>ثبت نهایی در مسترهاب</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
