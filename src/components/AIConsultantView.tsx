import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile, RoadmapStep, ActiveTab } from '../types';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../utils/speech';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Wand2, 
  Compass, 
  ShieldAlert, 
  RefreshCw, 
  CheckCircle2, 
  ChevronLeft,
  ArrowRight,
  Zap,
  Clock,
  Laptop,
  Flame,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Award,
  Share2
} from 'lucide-react';

interface AIConsultantViewProps {
  messages: ChatMessage[];
  userProfile: UserProfile;
  roadmapSteps: RoadmapStep[];
  onSendMessage: (messageText: string) => Promise<void>;
  isLoading: boolean;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenDisclaimer: () => void;
  onOpenSimulator?: () => void;
  onOpenQuiz?: () => void;
  onOpenCard?: () => void;
  initialPromptText?: string;
}

export const AIConsultantView: React.FC<AIConsultantViewProps> = ({
  messages,
  userProfile,
  roadmapSteps,
  onSendMessage,
  isLoading,
  onNavigateTab,
  onOpenDisclaimer,
  onOpenSimulator,
  onOpenQuiz,
  onOpenCard,
  initialPromptText,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      stopSpeaking();
      const text = inputMessage.trim();
      setInputMessage('');
      await onSendMessage(text);
    }
  };

  const handleQuickAnswer = async (quickText: string) => {
    if (!isLoading) {
      stopSpeaking();
      await onSendMessage(quickText);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      const rec = createSpeechRecognizer(
        (transcript) => {
          setInputMessage((prev) => (prev ? prev + ' ' + transcript : transcript));
          setIsListening(false);
        },
        (errorMsg) => {
          alert(errorMsg);
          setIsListening(false);
        },
        () => setIsListening(false)
      );

      if (rec) {
        recognizerRef.current = rec;
        setIsListening(true);
        rec.start();
      }
    }
  };

  const handleToggleSpeech = (msgId: string, text: string) => {
    if (isSpeakingId === msgId) {
      stopSpeaking();
      setIsSpeakingId(null);
    } else {
      setIsSpeakingId(msgId);
      speakText(text, () => setIsSpeakingId(null));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 shadow-md border border-teal-800/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/30 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">مشاور و همراه هوشمند توانا</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  سیستم صوتی و متنی
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                ارزیابی دقیق امکانات، طراحی خدمت اختصاصی و هدایت گام‌به‌گام تا کسب درآمد
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenSimulator && (
              <button
                onClick={onOpenSimulator}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>شبیه‌ساز کارفرما</span>
              </button>
            )}
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="bg-teal-800/80 hover:bg-teal-700 text-teal-100 border border-teal-600/60 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4 text-teal-300" />
                <span>آزمون سریع مهارت</span>
              </button>
            )}
            {onOpenCard && (
              <button
                onClick={onOpenCard}
                className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/60 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-300" />
                <span>کارت خدمت دیجیتال</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Chat Conversation + User Canvas Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section (2 cols on desktop) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl shadow-xs flex flex-col h-[650px] overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#faf9f6]/50">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs font-medium'
                          : 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white shadow-xs font-medium'
                      }`}
                    >
                      <div className="whitespace-pre-line dir-rtl">
                        {msg.text}
                      </div>

                      {/* Suggested Action Buttons if Assistant returns an action */}
                      {isAssistant && msg.suggestedAction && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                          <button
                            onClick={() => onNavigateTab('studio')}
                            className="bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Wand2 className="w-3.5 h-3.5 text-teal-700" />
                            <span>تولید محتوا در استودیوی خلق</span>
                          </button>
                          <button
                            onClick={() => onNavigateTab('canvas')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>مشاهده نقشه راه</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] text-slate-400">
                        {msg.timestamp}
                      </span>
                      {isAssistant && (
                        <button
                          onClick={() => handleToggleSpeech(msg.id, msg.text)}
                          className="text-slate-400 hover:text-teal-700 transition-colors p-1 cursor-pointer flex items-center gap-1 text-[11px]"
                          title="پخش صوتی پیام"
                        >
                          {isSpeakingId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                          <span className="text-[10px]">{isSpeakingId === msg.id ? 'توقف' : 'صدا'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs flex items-center gap-3 text-xs text-slate-600">
                  <RefreshCw className="w-4 h-4 text-teal-600 animate-spin" />
                  <span>مشاور هوشمند توانا در حال تحلیل و تولید پاسخ اختصاصی...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Intake Answer Chips */}
          <div className="bg-slate-50 border-t border-slate-200 p-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-bold whitespace-nowrap">پاسخ‌های آماده:</span>
              <button
                onClick={() => handleQuickAnswer('امکانات من: گوشی هوشمند و اینترنت پرسرعت دارم.')}
                className="bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 px-3 py-1 rounded-lg shrink-0 font-medium cursor-pointer"
              >
                📱 گوشی و اینترنت دارم
              </button>
              <button
                onClick={() => handleQuickAnswer('امکانات من: لپ‌تاپ دارم و حدود ۱۰ ساعت در هفته وقت دارم.')}
                className="bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 px-3 py-1 rounded-lg shrink-0 font-medium cursor-pointer"
              >
                💻 لپ‌تاپ + ۱۰ ساعت وقت
              </button>
              <button
                onClick={() => handleQuickAnswer('علاقه من: تولید ویدئوهای کوتاه تبلیغاتی برای مغازه‌های محلی.')}
                className="bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 px-3 py-1 rounded-lg shrink-0 font-medium cursor-pointer"
              >
                🎬 تولید ویدئو و ریلز
              </button>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleToggleMic}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
                title={isListening ? 'در حال ضبط صدا...' : 'گفتار به متن فارسی (میکروفون)'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isListening ? 'در حال شنیدن صدای شما...' : 'پاسخ یا سوال خود را اینجا بنویسید یا بگویید...'}
                disabled={isLoading}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>ارسال</span>
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </div>

        {/* User Profile & Roadmap Sidebar (1 col on desktop) */}
        <div className="space-y-5">
          {/* Live Profile Canvas Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base">بوم حرفه‌ای شما</h3>
              </div>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                به‌روزرسانی زنده
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Target Service */}
              <div className="bg-teal-50/70 border border-teal-200/80 p-3 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-teal-800 block">خدمت هدف انتخاب‌شده:</span>
                <p className="font-bold text-teal-950 text-sm">
                  {userProfile.targetService || 'در حال مشخص‌سازی توسط مشاور'}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>مهارت‌ها و علایق:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {userProfile.skills.length > 0 ? (
                    userProfile.skills.map((s, idx) => (
                      <span key={idx} className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg font-semibold text-slate-700">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">در حال سنجش با AI...</span>
                  )}
                </div>
              </div>

              {/* Equipment */}
              <div className="space-y-1">
                <span className="text-slate-500 font-bold flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-teal-600" />
                  <span>امکانات و ابزارها:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {userProfile.equipment.length > 0 ? (
                    userProfile.equipment.map((eq, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold">
                        {eq}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">هنوز وارد نشده</span>
                  )}
                </div>
              </div>

              {/* Weekly Time */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>زمان هفتگی:</span>
                </span>
                <span className="font-bold text-slate-900">{userProfile.timeCommitment}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('canvas')}
              className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>ویرایش کامل بوم</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Mini Roadmap Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">گام‌های نقشه راه شما</h3>
              <span className="text-xs text-slate-500 font-semibold">۴ مرحله</span>
            </div>

            <div className="space-y-3">
              {roadmapSteps.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                    step.status === 'completed'
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : step.status === 'in_progress'
                      ? 'bg-teal-50 border-teal-300 text-teal-950 font-medium ring-1 ring-teal-300/50'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        step.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {step.id}
                      </span>
                      <span>{step.title}</span>
                    </span>
                    {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-600 pr-6 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('studio')}
              className="w-full bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>ورود به استودیوی ساخت محتوا</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
