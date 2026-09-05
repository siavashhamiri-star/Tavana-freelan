import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { EXAMPLE_PROMPTS } from '../data/defaults';
import { speakText, stopSpeaking } from '../utils/speech';
import { 
  Sparkles, 
  ArrowLeft, 
  Wand2, 
  Briefcase, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Layers,
  Lightbulb,
  Video,
  FileText,
  DollarSign,
  Volume2,
  VolumeX,
  Smartphone,
  MessageSquare,
  Award,
  Share2,
  Heart
} from 'lucide-react';

interface HomePageProps {
  onSelectOption: (optionType: 'build_service' | 'create_content' | 'monetize_skills') => void;
  onSubmitNaturalLanguagePrompt: (promptText: string) => void;
  onOpenDisclaimer: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSimulator?: () => void;
  onOpenQuiz?: () => void;
  onOpenCard?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectOption,
  onSubmitNaturalLanguagePrompt,
  onOpenDisclaimer,
  setActiveTab,
  onOpenSimulator,
  onOpenQuiz,
  onOpenCard,
}) => {
  const [naturalPrompt, setNaturalPrompt] = useState('');
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (naturalPrompt.trim()) {
      onSubmitNaturalLanguagePrompt(naturalPrompt.trim());
    }
  };

  const handlePromptChipClick = (promptText: string) => {
    setNaturalPrompt(promptText);
    onSubmitNaturalLanguagePrompt(promptText);
  };

  const handleToggleVoiceIntro = () => {
    if (isPlayingIntro) {
      stopSpeaking();
      setIsPlayingIntro(false);
    } else {
      setIsPlayingIntro(true);
      const textToRead = "به شهر توانا خوش آمدید. اینجا اکوسیستم توانمندسازی، فریلنسری و خلق ارزش است. با کمک هوش مصنوعی یاد بگیرید، خدمات دیجیتال بسازید، در شبیه‌ساز مذاکره با کارفرما تمرین کنید، و به درآمد برسید. این برنامه با حمایت کامل صوتی و تصویری برای استفاده همه افراد و توان‌یابان عزیز طراحی شده است.";
      speakText(textToRead, () => setIsPlayingIntro(false));
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-[#faf9f5] border-b border-slate-200/60 pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Ecosystem Badge & Android Readiness */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-teal-900 border border-emerald-300/80 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>اکوسیستم شهر توانا — دستیار هوشمند فریلنسری و خلق ارزش</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-slate-900 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-500/40">
              <Smartphone className="w-3.5 h-3.5 text-teal-400" />
              <span>نسخه اندروید (APK و AAB) آماده انتشار</span>
            </div>

            <button
              onClick={handleToggleVoiceIntro}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-300 cursor-pointer transition-all"
              title="شنیدن صوتی معرفی شهر توانا"
            >
              {isPlayingIntro ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span className="text-red-600">توقف صوت</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>راهنمای صوتی</span>
                </>
              )}
            </button>
          </div>

          {/* Large Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            شهر توانا
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-extrabold text-teal-800 tracking-wide">
            «اینجا جایی است که می‌توانی آینده‌ات را بسازی.»
          </p>

          {/* Sub-slogan pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-600">
            <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">بساز</span>
            <span>•</span>
            <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">خلق کن</span>
            <span>•</span>
            <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">یاد بگیر</span>
            <span>•</span>
            <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">بفروش</span>
            <span>•</span>
            <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg border border-emerald-300 font-bold">درآمد کسب کن</span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            با کمک هوش مصنوعی یاد بگیر، خلق کن، خدمات دیجیتال بساز، آن‌ها را به مشتریان عرضه کن و مسیر حرفه‌ای خودت را بساز.
          </p>

          {/* Social Inclusion & Accessibility Banner */}
          <div className="bg-emerald-50 border border-emerald-300/80 rounded-2xl p-3.5 max-w-2xl mx-auto text-right text-emerald-950 text-xs leading-relaxed flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">
                حمایت ویژه از اشتغال و توانمندسازی افراد دارای نیازهای ویژه، معلولان، ناشنوایان و نابینایان عزیز.
              </span>
            </div>
            <span className="bg-emerald-200/80 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
              دسترسی صوتی و تصویری
            </span>
          </div>

          {/* Honest Disclaimer Banner */}
          <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-4 max-w-2xl mx-auto text-right text-amber-950 text-xs sm:text-sm leading-relaxed shadow-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-900 block">نکته مهم و صادقانه:</span>
              <p className="text-amber-900/90 font-medium">
                «ما ابزار، آموزش و مشاوره را در اختیارت می‌گذاریم؛ پیدا کردن مشتری و موفقیت تجاری به تلاش و عملکرد خودت بستگی دارد.»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Interactive Power Tools */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span>ابزارهای تعاملی پیشرفته شهر توانا</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                ویژه‌های آماده‌سازی برای ورود به بازار واقعی کار
              </p>
            </div>
            <div className="text-xs font-bold text-teal-300 bg-teal-900/50 px-3 py-1 rounded-full border border-teal-700">
              اتوماسیون ۱۰۰٪ بدون خطا
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {onOpenSimulator && (
              <button
                onClick={onOpenSimulator}
                className="bg-slate-800/80 hover:bg-slate-700 text-right p-4 rounded-2xl border border-slate-700 hover:border-amber-400 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    شبیه‌ساز
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300">
                  شبیه‌ساز مذاکره با کارفرما
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تمرین گفتگوی واقعی و قیمت‌دادن به صاحب مغازه یا مدیر شرکت محلی.
                </p>
              </button>
            )}

            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="bg-slate-800/80 hover:bg-slate-700 text-right p-4 rounded-2xl border border-slate-700 hover:border-teal-400 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                    ۱ دقیقه
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-teal-300">
                  آزمون سریع مهارت‌ها
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  انتخاب کلیکی مهارت‌ها و تجهیزات جهت ثبت فوری در بوم شما.
                </p>
              </button>
            )}

            {onOpenCard && (
              <button
                onClick={onOpenCard}
                className="bg-slate-800/80 hover:bg-slate-700 text-right p-4 rounded-2xl border border-slate-700 hover:border-emerald-400 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    کارت ویزیت AI
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-300">
                  کارت خدمت دیجیتال
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  طراحی کارت رسمی خدمت برای ارسال در ایتا، تلگرام و اینستاگرام.
                </p>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3 Main Action Cards (سه گزینه اصلی) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            یک مسیر را انتخاب کن یا به زبان خودت توضیح بده:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Option 1: میخواهم یک خدمت بسازم */}
          <div
            onClick={() => onSelectOption('build_service')}
            className="group bg-white hover:bg-teal-50/50 border-2 border-slate-200 hover:border-teal-500 rounded-2xl p-6 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                  «می‌خواهم یک خدمت بسازم»
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  تعریف خدمات دیجیتال مثل ویدئوی تبلیغاتی، ادمینی، طراحی سایت، ترجمه یا پوستر برای ارائه به مشتریان.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>شروع ساخت خدمت</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Option 2: میخواهم با AI محتوا تولید کنم */}
          <div
            onClick={() => onSelectOption('create_content')}
            className="group bg-white hover:bg-teal-50/50 border-2 border-slate-200 hover:border-teal-500 rounded-2xl p-6 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                  «می‌خواهم با AI محتوا تولید کنم»
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  تولید متون تبلیغاتی، سناریوی استوری و پست اینستاگرام، تصویر پوستر و پروپوزال با هوش مصنوعی.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>ورود به استودیوی خلق</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Option 3: میخواهم از مهارتم درآمد بسازم */}
          <div
            onClick={() => onSelectOption('monetize_skills')}
            className="group bg-white hover:bg-teal-50/50 border-2 border-slate-200 hover:border-teal-500 rounded-2xl p-6 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                  «می‌خواهم از مهارتم درآمد بسازم»
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  ارزیابی امکانات، علایق و مهارت‌های فعلی شما برای طراحی بهترین استراتژی کسب درآمد فریلنسری.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>مشاوره و سنجش مهارت</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Natural Language Interactive Conversation Section (بخش گفتگو) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-2 border-teal-200 rounded-3xl p-6 sm:p-8 shadow-md glow-teal space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
              <Lightbulb className="w-4 h-4 text-teal-700" />
              <span>مشاوره هوشمند با هوش مصنوعی توانا</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              «چه کاری دوست داری انجام بدهی؟»
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium">
              به زبان ساده و خودمانی توضیح بده چه فکری در سر داری یا چه مهارتی داری. هوش مصنوعی توانا بر اساس همان برایت مسیر می‌سازد.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={naturalPrompt}
                onChange={(e) => setNaturalPrompt(e.target.value)}
                placeholder="مثلاً: می‌خواهم برای مغازه‌های شهرمان ویدئوی تبلیغاتی بسازم ولی بلد نیستم..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all resize-none font-medium"
              />
              <button
                type="submit"
                disabled={!naturalPrompt.trim()}
                className="mt-2 w-full sm:w-auto sm:absolute sm:left-3 sm:bottom-3 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>شروع گفتگو و دریافت مسیر</span>
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </form>

          {/* Clickable Example Chips */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-slate-500">
              یا از این مثال‌های رایج انتخاب کن:
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptChipClick(promptText)}
                  className="text-right text-xs bg-slate-100 hover:bg-teal-100/70 text-slate-700 hover:text-teal-900 border border-slate-200/80 rounded-xl px-3.5 py-2 transition-all cursor-pointer font-medium"
                >
                  «{promptText}»
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Philosophy & Key Features Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h3 className="text-xl font-bold text-white">فلسفه اکوسیستم «شهر توانا»</h3>
                <p className="text-xs text-slate-400 mt-1">
                  توانمندسازی واقعی جویندگان کار و صاحبان مهارت‌های دیجیتال
                </p>
              </div>
              <span className="bg-teal-900/80 text-teal-300 border border-teal-700 text-xs px-3 py-1 rounded-full font-bold">
                مشاور شخصی + استودیوی خلق
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs leading-relaxed text-slate-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>۱. ارزیابی دقیق هوشمند</span>
                </div>
                <p>
                  هوش مصنوعی ابتدا امکانات، زمان و مهارت‌های شما را بررسی کرده و راهکار اختصاصی پیش پایتان می‌گذارد.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>۲. استودیوی ساخت فوری</span>
                </div>
                <p>
                  بدون نیاز به تجربه قبلی، سناریوی ویدئو، متن تبلیغاتی و پروپوزال تجاری با AI برای شما آماده می‌شود.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>۳. ویترین مسترهاب (MasterHub)</span>
                </div>
                <p>
                  خدمت یا محصول ساخته‌شده را مستقیم به ویترین مسترهاب شهر توانا برای عرضه ارسال کنید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
