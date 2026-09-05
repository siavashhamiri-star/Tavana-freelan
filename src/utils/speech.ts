/**
 * Voice Speech Recognition (STT) and Speech Synthesis (TTS) Helper Utilities
 * Specialized for Persian (fa-IR) with graceful fallback
 */

// Voice Text-to-Speech (TTS)
export function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('مرورگر شما از قابلیت پخش صوتی (Text-to-Speech) پشتیبانی نمی‌کند.');
    if (onEnd) onEnd();
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text from markdown syntax and json codeblocks
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[*#_~`]/g, '')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fa-IR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
    if (onEnd) onEnd();
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn(e);
    }
  }
}

// Voice Speech-to-Text (STT)
export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('مرورگر شما از قابلیت تبدیل صدا به متن پشتیبانی نمی‌کند. در صورت امکان از گوگل کروم استفاده کنید.');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        onError('صدایی شنیده نشد. لطفاً دوباره دکمه میکروفون را بزنید.');
      } else if (event.error === 'not-allowed') {
        onError('دسترسی به میکروفون مجاز نشد. لطفاً دسترسی را در تنظیمات مرورگر فعال کنید.');
      } else {
        onError('خطا در دریافت صدا.');
      }
      onEnd();
    };

    recognition.onend = () => {
      onEnd();
    };

    return recognition;
  } catch (err: any) {
    onError('امکان راه‌اندازی ضبط صدا وجود ندارد.');
    onEnd();
    return null;
  }
}
