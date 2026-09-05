import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Sparkles, 
  Bot, 
  Wand2, 
  Compass, 
  Globe, 
  Menu, 
  X, 
  ShieldAlert, 
  ChevronLeft,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDisclaimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenDisclaimer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as ActiveTab, label: 'صفحه اصلی', icon: Sparkles },
    { id: 'advisor' as ActiveTab, label: 'مشاور همراه AI', icon: Bot, badge: 'هوشمند' },
    { id: 'studio' as ActiveTab, label: 'استودیو خلق و تولید', icon: Wand2 },
    { id: 'canvas' as ActiveTab, label: 'بوم و مسیر راه من', icon: Compass },
    { id: 'masterhub' as ActiveTab, label: 'ویترین مسترهاب', icon: Globe, badge: 'عرضه' },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Ecosystem Top Bar Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 flex justify-between items-center dir-rtl">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-teal-700 text-teal-100 text-[10px] px-2 py-0.5 rounded-full font-bold">
            اپلیکیشن ۱۶
          </span>
          <span className="font-medium text-slate-300">
            اکوسیستم «شهر توانا» — دستیار هوشمند فریلنسری و خلق ارزش
          </span>
        </div>
        <button
          onClick={onOpenDisclaimer}
          className="hidden sm:flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors text-xs font-semibold cursor-pointer underline underline-offset-2"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>شرایط و شفافیت عملکرد</span>
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  شهر توانا
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  Tavana AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                جایی برای ساختن آینده
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 border border-teal-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                      isActive ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Disclaimer for Mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDisclaimer}
              className="sm:hidden text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded-lg text-xs font-medium flex items-center gap-1"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleTabClick('advisor')}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>مشاوره و ساخت خدمت</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="باز کردن منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-lg space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
