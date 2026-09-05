import { UserProfile, RoadmapStep, MasterHubProject } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  skills: [],
  interests: [],
  equipment: [],
  timeCommitment: 'نامشخص',
  experience: 'در حال ارزیابی اولیه',
  targetService: 'در حال انتخاب بهترین خدمت با مشاور هوشمند',
  knowledgeGaps: [],
};

export const INITIAL_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: 'شناخت توانایی‌ها و انتخاب خدمت',
    description: 'گفتگو با مشاور هوشمند برای سنجش مهارت‌ها، امکانات و انتخاب خدمت دیجیتال مناسب',
    status: 'in_progress',
    actionType: 'ai_chat',
  },
  {
    id: 2,
    title: 'یادگیری ابزار AI و تولید محتوا/خدمت',
    description: 'استفاده از استودیوی خلق توانا برای ساخت نمونه‌کار، ویدئو، پوستر یا متن تبلیغاتی',
    status: 'pending',
    actionType: 'content_studio',
  },
  {
    id: 3,
    title: 'بسته‌بندی خدمت و قیمت‌گذاری',
    description: 'تنظیم پیشنهاد کار (پروپوزال)، شرایط همکاری و آماده‌سازی جهت عرضه به مشتری',
    status: 'pending',
    actionType: 'proposal_builder',
  },
  {
    id: 4,
    title: 'انتشار در مسترهاب شهر توانا',
    description: 'ثبت نهایی پروژه در ویترین مسترهاب برای دیده شدن توسط مشتریان و اکوسیستم',
    status: 'pending',
    actionType: 'masterhub_publish',
  },
];

export const MOCK_MASTERHUB_PROJECTS: MasterHubProject[] = [
  {
    id: 'thub-001',
    title: 'تولید ویدئوی کوتاه تبلیغاتی برای فروشگاه‌های محلی با AI',
    category: 'تولید محتوا و ویدئو',
    creatorName: 'علی رضایی (کاربر توانا)',
    description: 'طراحی سناریو، تولید محتوای تصویری هوشمند و ادیت سریع ویدئوهای ۳۰ ثانیه‌ای برای اینستاگرام مغازه‌ها و کسب‌وکارهای شهری.',
    priceEstimate: 'از ۷۵۰,۰۰۰ تومان هر ویدئو',
    tags: ['ویدئو_تبلیغاتی', 'اینستاگرام', 'هوش_مصنوعی', 'کسب_و_کار_محلی'],
    contactInfo: 'ارسال پیام مستقیم در تلگرام یا ایتا: @Ali_Tavana_Dev',
    publishedAt: '۱۴۰۵/۰۵/۲۰',
    status: 'published',
    viewCount: 142,
  },
  {
    id: 'thub-002',
    title: 'طراحی بنر و پوستر تبلیغاتی اینستاگرام با هوش مصنوعی',
    category: 'طراحی گرافیک و تصویر',
    creatorName: 'سارا امینی',
    description: 'تولید کاور پست، استوری، بنر تخفیف و لوگوی تجاری با ابزارهای تولید تصویر AI و تحویل ۲۴ ساعته.',
    priceEstimate: 'پکیج ۵ عددی ۱,۲۰۰,۰۰۰ تومان',
    tags: ['طراحی_گرافیک', 'پوستر_تبلیغاتی', 'هوش_مصنوعی'],
    contactInfo: 'ایمیل: sara.graphic@tavanahub.ir',
    publishedAt: '۱۴۰۵/۰۵/۱۸',
    status: 'published',
    viewCount: 98,
  },
  {
    id: 'thub-003',
    title: 'نگارش پروپوزال و متون تبلیغاتی فروش دیجیتال (کپی‌رایتینگ)',
    category: 'بازاریابی و متن',
    creatorName: 'رضا کریمی',
    description: 'نویسندگی متن لندینگ پیج، سناریوی فروش تلفنی و پیامک‌های تبلیغاتی با رویکرد روانشناسی فروش و ابزارهای هوش مصنوعی.',
    priceEstimate: 'توافقی بر اساس حجم پروژه',
    tags: ['کپی_رایتینگ', 'متن_تبلیغاتی', 'بازاریابی'],
    contactInfo: 'شماره تماس / روبیکا: 09120000000',
    publishedAt: '۱۴۰۵/۰۵/۱۵',
    status: 'published',
    viewCount: 210,
  },
];

export const EXAMPLE_PROMPTS = [
  'می‌خواهم برای مغازه‌های شهرمان ویدئوی تبلیغاتی بسازم ولی بلد نیستم.',
  'بلدم با ادمینی اینستاگرام کار کنم اما چطور اولین مشتری محلی را پیدا کنم؟',
  'تایپ و ترجمه بلدم؛ چطور با هوش مصنوعی سرعت و درآمدم را بالا ببرم؟',
  'می‌خواهم برای کسب‌وکارها بنر، گرافیک و موکاپ تبلیغاتی بزنم.',
];
