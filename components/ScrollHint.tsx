"use client";

import { useEffect, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

const SCROLL_HIDE_OFFSET = 64;

export default function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > SCROLL_HIDE_OFFSET);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BlurFade
      delay={0.85}
      duration={0.5}
      className={`pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center transition-opacity duration-500 md:bottom-8 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={scrollToAbout}
        aria-label="About 섹션으로 스크롤"
        className={`pointer-events-auto flex flex-col items-center gap-2 rounded-full px-4 py-2 text-[#706e8a] transition-colors hover:text-[#9b59b6] ${
          hidden ? "pointer-events-none" : ""
        }`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
          아래로 스크롤
        </span>
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full border border-[#9b59b6]/25 bg-white/60 shadow-sm backdrop-blur-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce text-[#9b59b6]"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </span>
      </button>
    </BlurFade>
  );
}
