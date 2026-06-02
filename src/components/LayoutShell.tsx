"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { ProfilePanel } from "./ProfilePanel";
import { Clawd } from "./Clawd";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTopicPage = pathname.startsWith("/topic/");

  return (
    <>
      {isTopicPage && <Sidebar />}
      <main
        className={
          isTopicPage
            ? "lg:ml-[260px] min-h-screen pt-14 lg:pt-0"
            : "min-h-screen"
        }
      >
        {children}
      </main>
      <ProfilePanel />
      <Clawd isTopicPage={isTopicPage} />
    </>
  );
}
