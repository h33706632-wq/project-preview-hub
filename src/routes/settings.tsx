import { createFileRoute } from "@tanstack/react-router";
import Settings from "@/quran/pages/settings";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [
    { title: "الإعدادات | تقوى القلوب" },
    { name: "description", content: "لغة التطبيق وسياسة الخصوصية" },
    { property: "og:title", content: "الإعدادات | تقوى القلوب" },
    { property: "og:description", content: "لغة التطبيق وسياسة الخصوصية" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Settings,
});
