import React, { useState } from 'react';
import { ActiveTab, MasterHubProject } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { 
  Wand2, 
  Video, 
  FileText, 
  Send, 
  Copy, 
  Check, 
  Globe, 
  Sparkles, 
  Download, 
  Share2, 
  Briefcase,
  Layers,
  ArrowRight,
  Lightbulb,
  Printer,
  Volume2,
  VolumeX
} from 'lucide-react';

interface CreationStudioViewProps {
  onPublishToMasterHub: (project: Omit<MasterHubProject, 'id' | 'publishedAt' | 'status'>) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  userTargetService?: string;
}

export const CreationStudioView: React.FC<CreationStudioViewProps> = ({
  onPublishToMasterHub,
  onNavigateTab,
  userTargetService,
}) => {
  const [activeType, setActiveType] = useState<'video_script' | 'ad_copy' | 'client_proposal' | 'landing_page_copy'>('video_script');
  const [prompt, setPrompt] = useState(userTargetService || 'تولید ویدئوی کوتاه تبلیغاتی برای کافه و مغازه‌های محلی');
  const [targetAudience, setTargetAudience] = useState('صاحبان کسب‌وکارهای شهری و مشتریان محلی');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  // Quick preset topics
  const presets = [
    { label: 'ویدئوی ۳۰ ثانیه‌ای اینستاگرام', prompt: 'ساخت ویدئوی تبلیغاتی محلی برای مغازه‌های لباس‌فروشی و کافه' },
    { label: 'پروپوزال خدمات ادمینی و تولید محتوا', prompt: 'ارائه خدمت مدیریت پیج اینستاگرام و تولید ۵ پست در هفته' },
    { label: 'متن تبلیغاتی طراحی سایت سریع با AI', prompt: 'معرفی خدمت ساخت وب‌سایت در ۳ روز برای آموزشگاه‌ها و پزشکان' },
    { label: 'کاور و بنر تخفیف ویژه فروشگاهی', prompt: 'تولید متن و ایده پوستر تبلیغاتی برای جشنواره فروش بهاره' },
  ];

  const handleToggleVoice = () => {
    if (!generatedContent) return;
    if (isPlayingSpeech) {
      stopSpeaking();
      setIsPlayingSpeech(false);
    } else {
      setIsPlayingSpeech(true);
      speakText(generatedContent, () => setIsPlayingSpeech(false));
    }
  };

  const handlePrint = () => {
    if (!generatedContent) return;
    window.print();
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedContent(null);
    setPublishedSuccess(false);

    try {
      const res = await fetch('/api/generate-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeType,
          prompt,
          targetAudience,
        }),
      });

      const data = await res.json();
      if (res.ok && data.content) {
        setGeneratedContent(data.content);
      } else {
        alert(data.error || 'خطا در تولید محتوا.');
      }
    } catch (err) {
      console.error('Asset generation error:', err);
      alert('ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendToMasterHub = () => {
    if (!generatedContent) return;

    const titleMap = {
      video_script: 'پکیج تولید ویدئوی کوتاه تبلیغاتی با AI',
      ad_copy: 'خدمت کپی‌رایتینگ و متون تبلیغاتی با AI',
      client_proposal: 'پروپوزال تخصصی خدمات دیجیتال',
      landing_page_copy: 'طراحی ساختار و محتوای لندینگ پیج معرفی خدمت',
    };

    onPublishToMasterHub({
      title: `${titleMap[activeType]} - ${prompt.substring(0, 35)}`,
      category: activeType === 'video_script' ? 'تولید محتوا و ویدئو' : 'خدمات دیجیتال و بازاریابی',
      creatorName: 'سازنده توانا',
      description: generatedContent.substring(0, 250) + '...',
      priceEstimate: 'توافقی / پیشنهادی به مشتری',
      tags: ['هوش_مصنوعی', 'شهر_توانا', 'تولید_محتوا', 'خدمت_دیجیتال'],
      contactInfo: 'ارسال پیام مستقیم از طریق مسترهاب توانا',
    });

    setPublishedSuccess(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-emerald-700/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full">
                Studio AI
              </span>
              <h1 className="text-2xl font-black">استودیوی خلق و تولید محتوای توانا</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed">
              تولید فوری سناریوی ویدئو، متون تبلیغاتی، پروپوزال رسمی و بسته‌بندی کامل خدمت دیجیتال برای ارائه به مشتریان.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('masterhub')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span>مشاهده ویترین مسترهاب</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'video_script', label: 'سناریوی ویدئوی کوتاه', icon: Video, desc: 'ویدئو ۳۰ ثانیه‌ای اینستاگرام' },
          { id: 'ad_copy', label: 'متن تبلیغاتی و پست', icon: FileText, desc: 'کپی‌رایتینگ و متون فروش' },
          { id: 'client_proposal', label: 'پروپوزال رسمی مشتری', icon: Briefcase, desc: 'پیشنهاد قیمت و شرایط همکاری' },
          { id: 'landing_page_copy', label: 'بسته معرفی / لندینگ', icon: Layers, desc: 'متن کامل صفحه معرفی خدمت' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveType(tab.id as any);
                setGeneratedContent(null);
                setPublishedSuccess(false);
              }}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-teal-800 text-white border-teal-700 shadow-md ring-2 ring-teal-500/50'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
              </div>
              <div>
                <h3 className="font-extrabold text-sm">{tab.label}</h3>
                <p className={`text-[10px] mt-1 ${isActive ? 'text-teal-200' : 'text-slate-500'}`}>
                  {tab.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preset Chips */}
      <div className="space-y-2 bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200/80">
        <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>موضوعات آماده پیشنهادی:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(p.prompt)}
              className="text-xs bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generator Form & Output Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-teal-700" />
            <span>تنظیمات تولید خروجی</span>
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                عنوان ایده یا خدمت شما:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="موضوع، محصول یا خدمت دیجیتالی که می‌خواهی بسازی..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all font-medium resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                مخاطب هدف شما (اختیاری):
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="مثلاً: صاحبان کافه، فروشگاه‌های پوشاک، یا مشتریان محلی"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 disabled:opacity-50 text-white font-black py-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>هوش مصنوعی توانا در حال خلق است...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>تولید محتوا با هوش مصنوعی</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Result Column */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>خروجی تولیدشده</span>
            </h2>

            {generatedContent && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className="bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  title="شنیدن متن تولید شده با صوت"
                >
                  {isPlayingSpeech ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span>{isPlayingSpeech ? 'توقف' : 'شنیدن'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  title="چاپ یا ذخیره PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>چاپ</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'کپی شد!' : 'کپی'}</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 overflow-y-auto max-h-[380px] text-sm leading-relaxed text-slate-800 whitespace-pre-line font-medium dir-rtl">
            {generatedContent ? (
              generatedContent
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12 space-y-3">
                <Wand2 className="w-10 h-10 text-slate-300 animate-bounce" />
                <p className="text-xs max-w-xs font-medium">
                  ایده خود را در فرم سمت راست وارد کن و دکمه تولید را بزن تا محتوای اختصاصی برایت ساخته شود.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons for MasterHub */}
          {generatedContent && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {publishedSuccess ? (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>با موفقیت در ویترین مسترهاب ثبت شد!</span>
                  <button
                    onClick={() => onNavigateTab('masterhub')}
                    className="underline text-emerald-800 hover:text-emerald-900 font-black cursor-pointer"
                  >
                    مشاهده مسترهاب
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSendToMasterHub}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-2xl text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>ارسال مستقیم خدمت/محصول به مسترهاب شهر توانا</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
