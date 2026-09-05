/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AIConsultantView } from './components/AIConsultantView';
import { CreationStudioView } from './components/CreationStudioView';
import { UserCanvasRoadmapView } from './components/UserCanvasRoadmapView';
import { MasterHubShowcaseView } from './components/MasterHubShowcaseView';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ClientSimulatorModal } from './components/ClientSimulatorModal';
import { InteractiveSkillQuizModal } from './components/InteractiveSkillQuizModal';
import { DigitalServiceCardModal } from './components/DigitalServiceCardModal';

import { 
  ActiveTab, 
  ChatMessage, 
  UserProfile, 
  RoadmapStep, 
  MasterHubProject 
} from './types';

import { 
  INITIAL_USER_PROFILE, 
  INITIAL_ROADMAP_STEPS, 
  MOCK_MASTERHUB_PROJECTS 
} from './data/defaults';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Persistent User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('tavana_user_profile');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch (e) {
      return INITIAL_USER_PROFILE;
    }
  });

  // Persistent Roadmap Steps
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_roadmap_steps');
      return saved ? JSON.parse(saved) : INITIAL_ROADMAP_STEPS;
    } catch (e) {
      return INITIAL_ROADMAP_STEPS;
    }
  });

  // Persistent MasterHub Projects
  const [masterhubProjects, setMasterhubProjects] = useState<MasterHubProject[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_masterhub_projects');
      return saved ? JSON.parse(saved) : MOCK_MASTERHUB_PROJECTS;
    } catch (e) {
      return MOCK_MASTERHUB_PROJECTS;
    }
  });

  // Initial Chat Messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tavana_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'welcome-001',
        sender: 'assistant',
        text: `سلام و درود! به اکوسیستم «شهر توانا» خوش آمدید. ✨\n\nمن مشاور و همراه شخصی شما هستم. فلسفه ما این است: «شهر توانا؛ جایی برای ساختن آینده.»\n\nمن اینجا هستم تا با هم ایده، مهارت یا علاقه شما را بررسی کنیم و آن را به یک خدمت دیجیتال واقعی و قابل ارائه تبدیل کنیم.\n\nبرای شروع، خوشحال می‌شوم کمی شما را بشناسم:\n- چه کاری بلد هستید یا به چه کاری علاقه دارید؟\n- چه امکاناتی (مثل گوشی، لپ‌تاپ یا اینترنت) در اختیار دارید؟\n- حدوداً چه مقدار زمان در هفته می‌توانید وقت بگذارید؟\n\nهمچنین به یاد داشته باشید: ما ابزار، آموزش و مشاوره را در اختیارتان می‌گذاریم؛ پیدا کردن مشتری و موفقیت تجاری به تلاش و عملکرد خودتان بستگی دارد.`,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tavana_user_profile', JSON.stringify(userProfile));
    } catch (e) {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('tavana_roadmap_steps', JSON.stringify(roadmapSteps));
    } catch (e) {}
  }, [roadmapSteps]);

  useEffect(() => {
    try {
      localStorage.setItem('tavana_masterhub_projects', JSON.stringify(masterhubProjects));
    } catch (e) {}
  }, [masterhubProjects]);

  useEffect(() => {
    try {
      localStorage.setItem('tavana_chat_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  // Handler for sending messages to Gemini API
  const handleSendMessage = async (textMessage: string) => {
    const userMsgId = 'user-' + Date.now();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textMessage,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textMessage,
          history: updatedMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
          userProfile,
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const assistantMsg: ChatMessage = {
          id: 'assistant-' + Date.now(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: data.extractedData?.suggestedAction,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Process extracted updates from AI to user profile and roadmap
        if (data.extractedData) {
          if (data.extractedData.updatedProfile) {
            setUserProfile((prev) => ({
              ...prev,
              ...data.extractedData.updatedProfile,
              skills: Array.from(new Set([...prev.skills, ...(data.extractedData.updatedProfile.skills || [])])),
              equipment: Array.from(new Set([...prev.equipment, ...(data.extractedData.updatedProfile.equipment || [])])),
            }));
          }

          if (data.extractedData.roadmapSteps && Array.isArray(data.extractedData.roadmapSteps)) {
            setRoadmapSteps(data.extractedData.roadmapSteps);
          }
        }
      } else {
        const errorMsg: ChatMessage = {
          id: 'error-' + Date.now(),
          sender: 'assistant',
          text: 'متأسفانه مشکلی در پردازش پیام به وجود آمد. لطفاً دوباره امتحان کنید.',
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (e) {
      console.error('Chat error:', e);
      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        sender: 'assistant',
        text: 'خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Home Page 3 Main Option Actions
  const handleSelectHomeOption = (optionType: 'build_service' | 'create_content' | 'monetize_skills') => {
    if (optionType === 'build_service') {
      setActiveTab('advisor');
      handleSendMessage('سلام، می‌خواهم یک خدمت دیجیتال برای عرضه به مشتریان بسازم. لطفاً قدم به قدم من را راهنمایی کن.');
    } else if (optionType === 'create_content') {
      setActiveTab('studio');
    } else if (optionType === 'monetize_skills') {
      setActiveTab('advisor');
      handleSendMessage('سلام، می‌خواهم مهارت‌ها، علاقه و امکاناتم را بررسی کنی و بهترین روش کسب درآمد از خدمات دیجیتال را پیشنهاد بدهی.');
    }
  };

  // Home Page Natural Language Input
  const handleSubmitNaturalLanguagePrompt = (promptText: string) => {
    setActiveTab('advisor');
    handleSendMessage(promptText);
  };

  // MasterHub Publishing
  const handlePublishToMasterHub = async (projectData: Omit<MasterHubProject, 'id' | 'publishedAt' | 'status'>) => {
    try {
      const res = await fetch('/api/masterhub/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();
      if (res.ok && data.project) {
        setMasterhubProjects((prev) => [data.project, ...prev]);

        // Also update step 4 in roadmap to completed!
        setRoadmapSteps((prev) =>
          prev.map((step) => (step.id === 4 ? { ...step, status: 'completed' } : step))
        );
      }
    } catch (e) {
      console.error('Publish error:', e);
    }
  };

  const handleUpdateStepStatus = (stepId: number, newStatus: 'completed' | 'in_progress' | 'pending') => {
    setRoadmapSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, status: newStatus } : s))
    );
  };

  const handleUpdateProfile = (updatedFields: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-slate-800 dir-rtl font-['Vazirmatn',sans-serif]">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSelectOption={handleSelectHomeOption}
            onSubmitNaturalLanguagePrompt={handleSubmitNaturalLanguagePrompt}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
            setActiveTab={setActiveTab}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenCard={() => setIsCardModalOpen(true)}
          />
        )}

        {activeTab === 'advisor' && (
          <AIConsultantView
            messages={messages}
            userProfile={userProfile}
            roadmapSteps={roadmapSteps}
            onSendMessage={handleSendMessage}
            isLoading={isLoadingChat}
            onNavigateTab={setActiveTab}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenCard={() => setIsCardModalOpen(true)}
          />
        )}

        {activeTab === 'studio' && (
          <CreationStudioView
            onPublishToMasterHub={handlePublishToMasterHub}
            onNavigateTab={setActiveTab}
            userTargetService={userProfile.targetService}
          />
        )}

        {activeTab === 'canvas' && (
          <UserCanvasRoadmapView
            userProfile={userProfile}
            roadmapSteps={roadmapSteps}
            onUpdateProfile={handleUpdateProfile}
            onUpdateStepStatus={handleUpdateStepStatus}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'masterhub' && (
          <MasterHubShowcaseView
            projects={masterhubProjects}
            onPublishProject={handlePublishToMasterHub}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <span className="text-white font-bold text-sm block">
              شهر توانا | Tavana AI Freelance & Creation Hub
            </span>
            <p className="text-slate-400 text-[11px] mt-0.5">
              «اینجا جایی است که می‌توانی آینده‌ات را بسازی.» — اپلیکیشن شماره ۱۶ اکوسیستم شهر توانا
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
            >
              بیانیه عملکرد و عدم تضمین درآمد
            </button>
            <span>•</span>
            <span className="text-slate-400">طراحی شده با هوش مصنوعی برای ایرانیان</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <ClientSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        userProfile={userProfile}
      />

      <InteractiveSkillQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      <DigitalServiceCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        userProfile={userProfile}
      />
    </div>
  );
}
