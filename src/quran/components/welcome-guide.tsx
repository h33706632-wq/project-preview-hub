import { useEffect, useState } from "react";
import { BookOpen, Sparkles, Headphones, Languages, Compass, Clock } from "lucide-react";
import { useLanguage } from "@/quran/components/language-provider";

const KEY = "welcome-guide-seen-v1";

const features = [
  { icon: BookOpen, ar: ["القرآن المكتوب", "مصحف بالرسم العثماني، اضغط على أي آية لسماعها أو لتشغيل السورة كاملة، والشاشة تتحرك مع التلاوة، مع ترجمة إنجليزية لكل آية يمكن إظهارها أو إخفاؤها."], en: ["Written Quran", "Uthmani script. Tap any verse to hear it or play the whole surah; the page follows the recitation, with an optional English translation under each verse."] },
  { icon: Sparkles, ar: ["الكتاب المضيء", "اسأل أي سؤال واحصل على إجابة مستندة إلى القرآن الكريم والسنة."], en: ["The Illuminated Book", "Ask any question and get an answer grounded in the Quran and Sunnah."] },
  { icon: Headphones, ar: ["القرآن المسموع", "تلاوات كاملة تعمل بدون إنترنت."], en: ["Audio Quran", "Full recitations that work offline."] },
  { icon: Languages, ar: ["القرآن بالإنجليزية", "ترجمة كاملة مكتوبة، ويمكنك تغيير لغة التطبيق من الإعدادات."], en: ["Quran in English", "A complete written translation. Change the app language from Settings."] },
  { icon: Clock, ar: ["الأذكار ومواقيت الصلاة", "أذكار وأدعية ومواقيت دقيقة مع تنبيهات."], en: ["Adhkar & prayer times", "Remembrances, duas and accurate prayer times with reminders."] },
  { icon: Compass, ar: ["القبلة", "بوصلة تضيء باللون الأخضر عند الاتجاه الصحيح."], en: ["Qibla", "A compass that turns green when you face the right direction."] },
];

export function WelcomeGuide() {
  const { language, dir } = useLanguage();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setOpen(true); } catch { /* storage unavailable */ }
  }, []);
  if (!open) return null;
  const close = () => { try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ } setOpen(false); };
  const en = language === "en";
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" dir={dir} role="dialog" aria-modal="true">
      <div className="bg-card text-card-foreground w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-5">
        <h2 className="font-serif text-primary text-2xl font-bold text-center mb-1">{en ? "Welcome" : "أهلًا بك"}</h2>
        <p className="text-center text-sm text-muted-foreground font-sans mb-4">{en ? "Here's what you can do in the app" : "هذه أبرز مميزات التطبيق"}</p>
        <ul className="space-y-3">
          {features.map(({ icon: Icon, ar, en: e }) => {
            const [title, desc] = en ? e : ar;
            return (
              <li key={title} className="flex gap-3 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                <div className="min-w-0 font-sans">
                  <p className="font-bold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={close} className="mt-5 w-full h-11 rounded-full bg-primary text-primary-foreground font-sans font-bold">
          {en ? "Get started" : "ابدأ الآن"}
        </button>
      </div>
    </div>
  );
}
