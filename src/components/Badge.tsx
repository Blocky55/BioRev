"use client";

import { BadgeLevel } from "@/lib/progress";

const BADGE_STYLES: Record<
  BadgeLevel,
  { bg: string; text: string; label: string }
> = {
  gold: {
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    text: "text-yellow-700 dark:text-yellow-400",
    label: "Gold",
  },
  silver: {
    bg: "bg-gray-100 dark:bg-gray-700/40",
    text: "text-gray-600 dark:text-gray-300",
    label: "Silver",
  },
  bronze: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    text: "text-orange-700 dark:text-orange-400",
    label: "Bronze",
  },
};

export function BadgeIcon({
  level,
  size = "sm",
}: {
  level: BadgeLevel;
  size?: "sm" | "md";
}) {
  const style = BADGE_STYLES[level];
  const dim = size === "md" ? "w-7 h-7 text-[10px]" : "w-5 h-5 text-[9px]";
  const letter = level === "gold" ? "A" : level === "silver" ? "B" : "C";
  return (
    <span
      className={`${dim} rounded-full ${style.bg} ${style.text} font-bold
        inline-flex items-center justify-center flex-shrink-0`}
      title={`${style.label} badge`}
    >
      {letter}
    </span>
  );
}

export { BADGE_STYLES };
