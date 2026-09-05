import React, { useState } from 'react';
import { UserProfile, RoadmapStep, ActiveTab } from '../types';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  Laptop, 
  Flame, 
  Plus, 
  X, 
  Wand2, 
  Bot, 
  ShieldAlert, 
  ArrowLeft,
  Sparkles,
  Edit3
} from 'lucide-react';

interface UserCanvasRoadmapViewProps {
  userProfile: UserProfile;
  roadmapSteps: RoadmapStep[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onUpdateStepStatus: (stepId: number, newStatus: 'completed' | 'in_progress' | 'pending') => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const UserCanvasRoadmapView: React.FC<UserCanvasRoadmapViewProps> = ({
  userProfile,
  roadmapSteps,
  onUpdateProfile,
  onUpdateStepStatus,
  onNavigateTab,
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [newEquipment, setNewEquipment] = useState('');
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [targetServiceInput, setTargetServiceInput] = useState(userProfile.targetService || '');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      onUpdateProfile({
        skills: [...userProfile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile({
      skills: userProfile.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEquipment.trim()) {
      onUpdateProfile({
        equipment: [...userProfile.equipment, newEquipment.trim()],
      });
      setNewEquipment('');
    }
  };

  const handleRemoveEquipment = (eqToRemove: string) => {
    onUpdateProfile({
      equipment: userProfile.equipment.filter((eq) => eq !== eqToRemove),
    });
  };

  const handleSaveTargetService = () => {
    if (targetServiceInput.trim()) {
      onUpdateProfile({ targetService: targetServiceInput.trim() });
      setIsEditingTarget(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-teal-400" />
              <h1 className="text-2xl font-black">بوم حرفه‌ای و نقشه راه اختصاصی شما</h1>
            </div>
            <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed">
              مدیریت سنجش توانایی‌ها، ابزارها و گام‌های عملیاتی برای تبدیل ایده به محصول/خدمت دیجیتال.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('advisor')}
            className="bg-teal-700 hover:bg-teal-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>مشاوره جدید با AI</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Career Canvas Profile Editor (1 col) */}
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-700" />
                <span>بوم حرفه‌ای من</span>
              </h2>
            </div>

            {/* Target Service Card */}
            <div className="bg-teal-50/80 border border-teal-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-teal-800">خدمت دیجیتال هدف:</span>
                <button
                  onClick={() => setIsEditingTarget(!isEditingTarget)}
                  className="text-teal-700 hover:text-teal-900 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingTarget ? 'انصراف' : 'ویرایش'}</span>
                </button>
              </div>

              {isEditingTarget ? (
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    value={targetServiceInput}
                    onChange={(e) => setTargetServiceInput(e.target.value)}
                    className="w-full bg-white border border-teal-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none"
                  />
                  <button
                    onClick={handleSaveTargetService}
                    className="w-full bg-teal-800 text-white text-xs font-bold py-1.5 rounded-xl cursor-pointer"
                  >
                    ثبت تغییرات
                  </button>
                </div>
              ) : (
                <p className="font-extrabold text-teal-950 text-sm leading-relaxed">
                  {userProfile.targetService || 'هنوز انتخاب نشده'}
                </p>
              )}
            </div>

            {/* Skills & Strengths Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>مهارت‌ها و علایق شما:</span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {userProfile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddSkill} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="افزودن مهارت جدید..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
                <button
                  type="submit"
                  disabled={!newSkill.trim()}
                  className="bg-teal-700 text-white font-bold p-1.5 rounded-xl disabled:opacity-50 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Equipment Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Laptop className="w-4 h-4 text-teal-600" />
                <span>امکانات و ابزارهای شما:</span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {userProfile.equipment.map((eq, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-bold"
                  >
                    <span>{eq}</span>
                    <button
                      onClick={() => handleRemoveEquipment(eq)}
                      className="text-emerald-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddEquipment} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  placeholder="افزودن ابزار (گوشی، اینترنت، لپ‌تاپ)..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
                <button
                  type="submit"
                  disabled={!newEquipment.trim()}
                  className="bg-emerald-700 text-white font-bold p-1.5 rounded-xl disabled:opacity-50 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Time Commitment Selector */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>زمان هفتگی در دسترس:</span>
              </label>
              <select
                value={userProfile.timeCommitment}
                onChange={(e) => onUpdateProfile({ timeCommitment: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="کمتر از ۵ ساعت در هفته">کمتر از ۵ ساعت در هفته (پاره‌پوقت محدود)</option>
                <option value="۵ تا ۱۵ ساعت در هفته">۵ تا ۱۵ ساعت در هفته (پاره‌پوقت معمولی)</option>
                <option value="۱۵ تا ۳۰ ساعت در هفته">۱۵ تا ۳۰ ساعت در هفته (نیمه‌وقت فعال)</option>
                <option value="بیش از ۳۰ ساعت در هفته">بیش از ۳۰ ساعت در هفته (تمام‌وقت)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Col: Personalized Roadmap Execution (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-700" />
                  <span>نقشه راه عملیاتی توانا</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  مراحل پیشرفت پروژه شما از ایده اولیه تا انتشار در مسترهاب
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {roadmapSteps.map((step) => {
                const isCompleted = step.status === 'completed';
                const isInProgress = step.status === 'in_progress';

                return (
                  <div
                    key={step.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isCompleted
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : isInProgress
                        ? 'bg-teal-50/80 border-teal-300 ring-2 ring-teal-500/20 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isInProgress
                              ? 'bg-teal-800 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {step.id}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-slate-900 text-base">
                            {step.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Status Toggle Button */}
                      <button
                        onClick={() =>
                          onUpdateStepStatus(
                            step.id,
                            isCompleted ? 'in_progress' : 'completed'
                          )
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-700' : 'text-slate-400'}`} />
                        <span>{isCompleted ? 'تکمیل شد' : 'علامت‌گذاری به‌عنوان تکمیل'}</span>
                      </button>
                    </div>

                    {/* Step Direct Action Links */}
                    <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {step.actionType === 'ai_chat' && (
                          <button
                            onClick={() => onNavigateTab('advisor')}
                            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Bot className="w-3.5 h-3.5" />
                            <span>گفتگو و ارزیابی با مشاور AI</span>
                          </button>
                        )}

                        {step.actionType === 'content_studio' && (
                          <button
                            onClick={() => onNavigateTab('studio')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Wand2 className="w-3.5 h-3.5" />
                            <span>تولید محتوا در استودیوی ساخت</span>
                          </button>
                        )}

                        {step.actionType === 'masterhub_publish' && (
                          <button
                            onClick={() => onNavigateTab('masterhub')}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>ورود به ویترین مسترهاب</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400 font-medium">
                        گام {step.id} از ۴
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
