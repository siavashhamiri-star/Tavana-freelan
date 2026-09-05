import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../utils/speech';
import { 
  Building2, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  RotateCcw, 
  User, 
  Sparkles,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface ClientSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

const INDUSTRY_PRESETS = [
  { id: 'cafe', name: 'صاحب کافه و رستوران محلی', icon: '☕', tone: 'سخت‌گیر در قیمت، علاقه به جذب جوانان با اینستاگرام' },
  { id: 'clothing', name: 'مدیر فروشگاه پوشاک و بوتیک', icon: '👗', tone: 'علاقه‌مند به ویدئوهای شوکیس و تخفیف‌های ویژه' },
  { id: 'clinic', name: 'مدیر کلینیک زیبایی و پزشکی', icon: '🩺', tone: 'نیازمند محتوای باوقار، علمی و جذب بیماران محلی' },
  { id: 'realestate', name: 'مشاور املاک و مسکن', icon: '🏠', tone: 'سرعت در ساخت ویدئو تورهای ملکی و جذب مشتری واقعی' },
];

export const ClientSimulatorModal: React.FC<ClientSimulatorModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRY_PRESETS[0]);
  const [simMessages, setSimMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simMessages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      startNewSimulation(selectedIndustry);
    } else {
      stopSpeaking();
    }
  }, [isOpen, selectedIndustry]);

  const startNewSimulation = (industry: typeof INDUSTRY_PRESETS[0]) => {
    stopSpeaking();
    const serviceName = userProfile.targetService || 'خدمات دیجیتال و تولید محتوا';
    const initialText = `سلام وقتتون بخیر! من صاحب ${industry.name} هستم. شنیدم شما در زمینه «${serviceName}» فعالیت می‌کنید.\nراستش تا حالا برای این کار هزینه نکردیم؛ برام مهمه بدونم چه مزیتی برای ما داره، هزینه‌اش چقدره و دقیقاً چه خروجی‌ای تحویل می‌دید؟`;

    setSimMessages([
      {
        id: 'sim-init',
        sender: 'assistant',
        text: initialText,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    stopSpeaking();

    const userMsg: ChatMessage = {
      id: 'sim-user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...simMessages, userMsg];
    setSimMessages(updated);
    setInputText('');
    setIsLoading(true);

    try {
      const promptText = `
نقش شما: یک صاحب کسب‌وکار محلی با عنوان "${selectedIndustry.name}".
ویژگی‌ها: ${selectedIndustry.tone}.
کاربر در حال مذاکره برای فروش خدمت دیجیتال خود ("${userProfile.targetService || 'خدمات دیجیتال'}") است.
پیام جدید کاربر/فریلنسر: "${textToSend}"

دستورالعمل رفتار:
۱. کاملاً واقعی، تجربی و مؤدبانه مانند یک صاحب مغازه یا مدیر کسب‌وکار ایرانی پاسخ دهید.
۲. اگر کاربر خوب توضیح داد، راغب شوید و زمان‌بندی و نمونه‌کار بخواهید.
۳. اگر قیمت گفت، کمی چانه‌زنی کنید یا تضمین کیفیت بخواهید.
۴. پاسخ ۲ تا ۳ جمله کوتاه و طبیعی باشد.
`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          history: updated.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      if (data && data.reply) {
        const clientReply: ChatMessage = {
          id: 'sim-client-' + Date.now(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        };
        setSimMessages((prev) => [...prev, clientReply]);
      }
    } catch (e) {
      console.error('Simulation error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      const rec = createSpeechRecognizer(
        (transcript) => {
          setInputText((prev) => (prev ? prev + ' ' + transcript : transcript));
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

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (isSpeakingId === msgId) {
      stopSpeaking();
      setIsSpeakingId(null);
    } else {
      setIsSpeakingId(msgId);
      speakText(text, () => setIsSpeakingId(null));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 dir-rtl">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-4 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
              {selectedIndustry.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  شبیه‌ساز هوشمند گفتگو با کارفرما
                </h2>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  تمرین مذاکره
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                قبل از صحبت با مشتری واقعی، نحوه معرفی ارزش، قیمت‌دهی و مذاکره را تمرین کن.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-800 font-bold p-1.5 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Industry selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs shrink-0">
          <span className="text-slate-500 font-bold whitespace-nowrap">انتخاب صنف:</span>
          {INDUSTRY_PRESETS.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedIndustry.id === ind.id
                  ? 'bg-teal-800 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{ind.icon}</span>
              <span>{ind.name}</span>
            </button>
          ))}
        </div>

        {/* Conversation Box */}
        <div className="flex-1 overflow-y-auto bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-4">
          {simMessages.map((msg) => {
            const isClient = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isClient ? 'justify-start' : 'justify-end'}`}
              >
                {isClient && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-2xs">
                    {selectedIndustry.icon}
                  </div>
                )}

                <div className="max-w-[85%] space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium ${
                      isClient
                        ? 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                        : 'bg-teal-800 text-white shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    {isClient && (
                      <button
                        onClick={() => handleSpeakMessage(msg.id, msg.text)}
                        className="text-slate-400 hover:text-teal-700 transition-colors p-1 cursor-pointer"
                        title="شنیدن صدای کارفرما"
                      >
                        {isSpeakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isClient && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
              <span>کارفرما در حال ارزیابی و پاسخ دادن...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="space-y-2 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleToggleMic}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isListening ? 'در حال ضبط صدا...' : 'تبدیل صدا به متن (میکروفون)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? 'در حال دریافت گفتار شما...' : 'پاسخ یا پیشنهاد قیمت خود را بنویسید یا بگویید...'}
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>ارسال</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </button>

            <button
              type="button"
              onClick={() => startNewSimulation(selectedIndustry)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-xl cursor-pointer"
              title="شروع دوباره گفتگو"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
