"use client";

import { usePathname } from "next/navigation";
import { topics } from "@/lib/topics";
import { Sidebar } from "./Sidebar";
import { ProfilePanel } from "./ProfilePanel";
import { Clawd } from "./Clawd";
import { BlurtBox } from "./BlurtBox";
import { ToastProvider } from "./Toast";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTopicPage = pathname.startsWith("/topic/");

  // Extract topic info for BlurtBox
  const topicId = isTopicPage ? pathname.split("/topic/")[1] : null;
  const topic = topicId ? topics.find((t) => t.id === topicId) : null;

  return (
    <ToastProvider>
      {isTopicPage && <Sidebar />}
      <main
        className={`relative z-[1] ${
          isTopicPage
            ? "lg:ml-[260px] min-h-screen pt-14 lg:pt-0"
            : "min-h-screen"
        }`}
      >
        {children}
      </main>
      <ProfilePanel />
      <Clawd isTopicPage={isTopicPage} />
      {topic && <BlurtBox topicId={topic.id} topicName={topic.name} />}
    </ToastProvider>
  );
}
