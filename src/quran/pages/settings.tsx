import { useLanguage } from "@/quran/components/language-provider";
import { Link } from "@/quran/wouter-shim";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { LanguagePicker } from "@/quran/components/language-picker";

export default function Settings() {
  const { dir: uiDir, language } = useLanguage();
  const ar = language === "ar";
  return (
    <div className="mx-auto max-w-xl space-y-4 py-4" dir={uiDir}>
      <div className="flex items-center gap-2">
        <Link href="/" className="p-2 text-foreground" aria-label={ar ? "العودة" : "Back"}>{ar ? <ChevronRight /> : <ChevronLeft />}</Link>
        <h1 className="text-2xl font-bold text-foreground">{ar ? "الإعدادات" : "Settings"}</h1>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <span className="font-semibold text-foreground">{ar ? "لغة التطبيق" : "App language"}</span>
        <LanguagePicker />
      </div>
      <Link href="/privacy" className="flex items-center justify-between rounded-xl border border-border bg-card p-4 font-semibold text-foreground">
        {ar ? "سياسة الخصوصية" : "Privacy policy"}
        {ar ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
      </Link>
    </div>
  );
}
