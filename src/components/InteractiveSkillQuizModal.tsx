import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Award, Check, Sparkles, X, Flame, Laptop, Clock } from 'lucide-react';

interface InteractiveSkillQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

const COMMON_SKILLS = [
  'ادیت و تولید ویدئو با گوشی',
  'تولید محتوا و ادمینی اینستاگرام',
  'طراحی گرافیک و بنر تبلیغاتی',
  'نویسندگی، خلاصه‌نویسی و ترجمه',
  'تایپ و ورود سریع داده‌ها',
  'طراحی وب‌سایت و لندینگ پیج',
  'کپی‌رایتینگ و متون فروش',
  'عکاسی محصول با گوشی',
];

const COMMON_EQUIPMENT = [
  'گوشی هوشمند (اندروید/آیفون)',
  'اینترنت پرسرعت',
  'لپ‌تاپ یا کامپیوتر خانگی',
  'میکروفون یقه‌ای یا ضبط صوت',
  'رینگ‌لایت یا نور ثابت',
];

export const InteractiveSkillQuizModal: React.FC<InteractiveSkillQuizModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userProfile.skills || []);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(userProfile.equipment || []);
  const [timeCommitment, setTimeCommitment] = useState<string>(userProfile.timeCommitment || '۵ تا ۱۵ ساعت در هفته');

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleEquipment = (eq: string) => {
    if (selectedEquipment.includes(eq)) {
      setSelectedEquipment(selectedEquipment.filter((e) => e !== eq));
    } else {
      setSelectedEquipment([...selectedEquipment, eq]);
    }
  };

  const handleSave = () => {
    onUpdateProfile({
      skills: selectedSkills,
      equipment: selectedEquipment,
      timeCommitment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 dir-rtl">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                سنجش سریع و کلیکی توانمندی‌ها
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                در کمتر از ۱ دقیقه بوم حرفه‌ای خود را با کارت‌های آماده تکمیل کنید.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Skills Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>مهارت‌ها و علاقه‌مندی‌ها (انتخاب چندتایی):</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COMMON_SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 rounded-xl text-xs font-bold border text-right transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-800 text-white border-teal-700 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{skill}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-300" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Equipment Selection */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Laptop className="w-4 h-4 text-teal-600" />
            <span>امکانات و ابزارهای فعلی شما:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COMMON_EQUIPMENT.map((eq) => {
              const isSelected = selectedEquipment.includes(eq);
              return (
                <button
                  key={eq}
                  type="button"
                  onClick={() => toggleEquipment(eq)}
                  className={`p-3 rounded-xl text-xs font-bold border text-right transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-700 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{eq}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-300" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Time Commitment */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-600" />
            <span>زمان هفتگی قابل تخصیص:</span>
          </label>
          <select
            value={timeCommitment}
            onChange={(e) => setTimeCommitment(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none"
          >
            <option value="کمتر از ۵ ساعت در هفته">کمتر از ۵ ساعت در هفته</option>
            <option value="۵ تا ۱۵ ساعت در هفته">۵ تا ۱۵ ساعت در هفته</option>
            <option value="۱۵ تا ۳۰ ساعت در هفته">۱۵ تا ۳۰ ساعت در هفته</option>
            <option value="بیش از ۳۰ ساعت در هفته">بیش از ۳۰ ساعت در هفته (تمام‌وقت)</option>
          </select>
        </div>

        {/* Action button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>ثبت در بوم حرفه‌ای من</span>
        </button>
      </div>
    </div>
  );
};
