import React from 'react';
import { ShieldAlert, Award, CheckCircle2, HeartHandshake, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 dir-rtl">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                شفافیت و بیانیه عملکرد «شهر توانا»
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                فلسفه و قوانین بنیادین اکوسیستم توانا
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 font-bold p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Slogan Card */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-5 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold bg-teal-500/30 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-500/40">
            فلسفه اصلی
          </span>
          <p className="text-lg font-black text-emerald-300">
            «شهر توانا؛ جایی برای ساختن آینده.»
          </p>
          <p className="text-xs text-slate-300 font-semibold">
            «اینجا جایی است که می‌توانی آینده‌ات را بسازی.»
          </p>
          <div className="text-[11px] text-teal-200 font-medium pt-1 border-t border-teal-800/80">
            زیرشعار: بساز، خلق کن، یاد بگیر، بفروش، درآمد کسب کن.
          </div>
        </div>

        {/* Critical Disclaimer Statement */}
        <div className="bg-amber-50 border-2 border-amber-300/90 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm space-y-2 leading-relaxed font-medium">
          <div className="flex items-center gap-2 font-black text-amber-900 text-base">
            <HeartHandshake className="w-5 h-5 text-amber-600" />
            <span>تعهد ما و مسئولیت کاربر:</span>
          </div>
          <p className="bg-white p-3 rounded-xl border border-amber-200/80 text-slate-800 font-bold leading-loose shadow-2xs">
            «ما ابزار، آموزش و مشاوره را در اختیارت می‌گذاریم؛ پیدا کردن مشتری و موفقیت تجاری به تلاش و عملکرد خودت بستگی دارد.»
          </p>
          <p className="text-xs text-amber-900/90 pt-1">
            در اکوسیستم شهر توانا هرگز وعده‌های کاذب یا درآمد تضمینی داده نمی‌شود. هدف ما توانمندسازی واقعی با ابزارهای استاندارد هوش مصنوعی است.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="space-y-3 text-xs">
          <h3 className="font-extrabold text-slate-900 text-sm">اصول سه‌گانه تعامل در این برنامه:</h3>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">۱. احترام و صداقت کامل</span>
                <span className="text-slate-600 font-medium">
                  پاسخ‌های AI بر اساس نیاز واقعی شما تنظیم می‌شوند و از ادعاهای غیرواقعی پرهیز می‌شود.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">۲. امید واقع‌بینانه</span>
                <span className="text-slate-600 font-medium">
                  تمرکز روی مهارت‌آموزی عملی و ساخت خروجی‌های واقعی، نه روی راه‌های میان‌بر خیالی.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">۳. توانمندسازی و استقلال کاری</span>
                <span className="text-slate-600 font-medium">
                  آموزش استفاده مستقیم از هوش مصنوعی تا بتوانید به عنوان یک فریلنسر مستقل کار کنید.
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-2xl text-xs transition-colors shadow-xs cursor-pointer"
        >
          متوجه شدم و موافقم
        </button>
      </div>
    </div>
  );
};
