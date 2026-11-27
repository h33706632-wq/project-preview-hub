import { useLanguage } from "@/quran/components/language-provider";
import { Link } from "@/quran/wouter-shim";
import { ChevronRight, ExternalLink } from "lucide-react";

const sections: { title: string; body: string[] }[] = [
  { title: "مقدمة", body: ["يحترم تطبيق «تقوى القلوب | محمد صديق المنشاوي | تطبيق متكامل» خصوصيتك. توضح هذه الصفحة البيانات التي يتعامل معها التطبيق وكيف تُستخدم."] },
  { title: "البيانات المحفوظة على جهازك", body: ["المفضلة والعلامات وإعدادات التذكير وعدّاد التسبيح تُحفظ على هاتفك فقط، ولا تُرسل إلينا.", "تُحذف هذه البيانات إذا حذفت التطبيق أو مسحت بياناته من إعدادات الهاتف."] },
  { title: "الموقع الجغرافي", body: ["يُستخدم موقعك فقط لحساب مواقيت الصلاة واتجاه القبلة، وبعد موافقتك. لا نحفظ موقعك ولا نشاركه مع أحد لأغراض تجارية."] },
  { title: "حساسات الحركة", body: ["تُستخدم بوصلة الهاتف في صفحة القبلة فقط لتحديد الاتجاه، ولا تُحفظ قراءاتها."] },
  { title: "الإشعارات", body: ["تُجهَّز تذكيرات الأذكار والتسابيح داخل هاتفك، ويمكنك إيقافها في أي وقت من صفحة «الإشعارات والتذكير» أو من إعدادات الهاتف."] },
  { title: "أسئلة «الكتاب المضيئ»", body: ["عند طرح سؤال يُرسل نص السؤال إلى خدمة ذكاء اصطناعي لإعداد الإجابة. لا تكتب في سؤالك معلومات شخصية أو حساسة."] },
  { title: "الإعلانات", body: ["يعرض التطبيق إعلانات عبر Google AdMob. قد تجمع جوجل معرّف الإعلانات في جهازك وبيانات تقنية عامة لعرض الإعلانات وقياسها، وفق سياسة خصوصية جوجل: policies.google.com/privacy", "يمكنك إعادة ضبط معرّف الإعلانات أو تقييد الإعلانات المخصصة من إعدادات جوجل في هاتفك.", "تم منع فئات الإعلانات غير اللائقة قدر الإمكان."] },
  { title: "الأطفال", body: ["التطبيق مناسب لجميع الأعمار، ولا نجمع عن قصد أي بيانات شخصية من الأطفال."] },
  { title: "التغييرات على هذه السياسة", body: ["قد نحدّث هذه السياسة من وقت لآخر، وتظهر النسخة الأحدث دائمًا في هذه الصفحة."] },
  { title: "التواصل", body: ["لأي استفسار عن الخصوصية، راسلنا على البريد: hamza152524@gmail.com"] },
];

// رابط سياسة الخصوصية المنشور على الويب (نفس الصفحة على موقع التطبيق المباشر)
const sectionsEn: { title: string; body: string[] }[] = [
  { title: "Introduction", body: ["The app \"Taqwa Al-Quloob | Muhammad Siddiq Al-Minshawi | Complete App\" respects your privacy. This page explains what data the app handles and how it is used."] },
  { title: "Data stored on your device", body: ["Favorites, bookmarks, reminder settings and the tasbeeh counter are stored only on your phone and are never sent to us.", "This data is deleted if you uninstall the app or clear its data from your phone settings."] },
  { title: "Location", body: ["Your location is used only to calculate prayer times and the Qibla direction, and only with your permission. We do not store your location or share it with anyone for commercial purposes."] },
  { title: "Motion sensors", body: ["The phone compass is used only on the Qibla page to determine direction; its readings are not stored."] },
  { title: "Notifications", body: ["Adhkar and tasbeeh reminders are prepared on your phone, and you can turn them off at any time from the \"Notifications & Reminders\" page or your phone settings."] },
  { title: "\"Illuminated Book\" questions", body: ["When you ask a question, its text is sent to an AI service to prepare the answer. Do not include personal or sensitive information in your question."] },
  { title: "Advertising", body: ["The app shows ads through Google AdMob. Google may collect your device's advertising ID and general technical data to serve and measure ads, according to Google's privacy policy: policies.google.com/privacy", "You can reset your advertising ID or limit personalized ads from the Google settings on your phone.", "Inappropriate ad categories have been blocked as much as possible."] },
  { title: "Children", body: ["The app is suitable for all ages, and we do not knowingly collect any personal data from children."] },
  { title: "Changes to this policy", body: ["We may update this policy from time to time; the latest version always appears on this page."] },
  { title: "Contact", body: ["For any privacy question, email us at: hamza152524@gmail.com"] },
];

const PRIVACY_WEB_URL = "https://github-project-peek.lovable.app/privacy-policy.html";

export default function Privacy() {
  const { t: tr, dir: uiDir, language, locale } = useLanguage();
  return (
    <div className="mx-auto max-w-xl space-y-4 py-4" dir={uiDir}>
      <div className="flex items-center gap-2">
        <Link href="/" className="p-2 text-foreground" aria-label={tr("العودة")}>
          <ChevronRight />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">{tr("سياسة الخصوصية")}</h1>
      </div>
      <p className="text-sm text-muted-foreground">{language === "en" ? "Last updated: October 2026" : "آخر تحديث: أكتوبر 2026"}</p>
      
      {(language === "en" ? sectionsEn : sections).map((s) => (
        <section key={s.title} className="space-y-2 rounded-xl border border-border bg-card p-4">
          <h2 className="font-bold text-foreground">{s.title}</h2>
          {s.body.map((p) => <p key={p} className="leading-7 text-muted-foreground">{p}</p>)}
        </section>
      ))}

      <div className="pt-2 text-center">
        <a
          href={PRIVACY_WEB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline"
        >
          <span>{language === "en" ? "View the web version of the privacy policy" : "عرض نسخة الويب لسياسة الخصوصية"}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
