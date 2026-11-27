import { createFileRoute } from "@tanstack/react-router";
import Settings from "@/quran/pages/settings";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "الإعدادات | تقوى القلوب" }, { name: "description", content: "لغة التطبيق والإشعارات وسياسة الخصوصية" }] }),
  component: Settings,
});
