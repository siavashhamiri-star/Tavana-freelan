import React, { useRef } from 'react';
import { UserProfile } from '../types';
import { Share2, Download, X, ShieldCheck } from 'lucide-react';

interface DigitalServiceCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

export const DigitalServiceCardModal: React.FC<DigitalServiceCardModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const serviceTitle = userProfile.targetService || 'خدمات دیجیتال و تولید محتوا با AI';
  const skillsList = userProfile.skills.length > 0 ? userProfile.skills : ['تولید محتوا', 'هوش مصنوعی', 'پوستر و ویدئو'];

  const handlePrintCard = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html dir="rtl" lang="fa">
          <head>
            <title>کارت خدمت دیجیتال توانا</title>
            <style>
              body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; padding: 40px; background: #0f172a; color: #fff; }
              .card { width: 420px; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 30px; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); border: 2px solid #5eead4; }
              .badge { background: rgba(255,255,255,0.2); font-size: 11px; padding: 4px 12px; border-radius: 20px; display: inline-block; font-weight: bold; }
              .title { font-size: 20px; font-weight: 900; margin-top: 15px; margin-bottom: 10px; line-height: 1.4; }
              .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 15px; }
              .tag { background: rgba(255,255,255,0.15); font-size: 11px; padding: 3px 8px; border-radius: 8px; }
              .footer { margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 11px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="badge">کارت رسمی خدمت — شهر توانا</div>
              <div class="title">${serviceTitle}</div>
              <p style="font-size: 12px; opacity: 0.9;">آماده عقد قرارداد و تحویل سریع با کیفیت هوش مصنوعی</p>
              <div class="tags">
                ${skillsList.map((s) => `<span class="tag"># ${s}</span>`).join('')}
              </div>
              <div class="footer">
                اکوسیستم شهر توانا | جهت مشاوره و سفارش پیام دهید
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 dir-rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-teal-700" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              کارت معرفی خدمت دیجیتال جهت اشتراک‌گذاری
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Card Preview */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border-2 border-teal-500/50 space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-extrabold px-3 py-0.5 rounded-full">
              کارت رسمی خدمت — شهر توانا
            </span>
            <span className="text-[10px] text-teal-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>تایید شده با AI</span>
            </span>
          </div>

          <div className="space-y-1 pt-2">
            <h3 className="text-lg font-black leading-snug text-white">
              {serviceTitle}
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              تولید و تحویل با استانداردهای کیفیت هوش مصنوعی
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {skillsList.map((skill, idx) => (
              <span key={idx} className="bg-teal-700/60 text-teal-100 border border-teal-600/60 text-[11px] px-2.5 py-0.5 rounded-lg font-bold">
                # {skill}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-teal-700/60 flex items-center justify-between text-[11px] text-teal-200">
            <span className="font-semibold">جهت سفارش و مشاوره پیام دهید</span>
            <span className="font-black text-emerald-300">Tavana City Hub</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <p className="text-xs text-slate-500 text-center font-medium">
            می‌توانی از این کارت تصویر یا فایل چاپی تهیه کنی و در پیام‌رسان‌های ایتا، تلگرام یا اینستاگرام برای مشتریانت بفرستی.
          </p>
          <button
            onClick={handlePrintCard}
            className="w-full bg-teal-800 hover:bg-teal-900 text-white font-extrabold py-3 rounded-2xl text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>چاپ و دریافت فایل کارت خدمت</span>
          </button>
        </div>
      </div>
    </div>
  );
};
