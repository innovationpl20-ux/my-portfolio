"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
] as const;

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function SectionIndicator() {
  const [activeId, setActiveId] = useState<string>("hero");
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* 데스크톱: 우측 도트 내비게이션 */}
      <nav
        aria-label="섹션 위치"
        className="fixed right-5 top-1/2 z-[9999] hidden -translate-y-1/2 md:block lg:right-8"
      >
        <ul className="flex flex-col items-center gap-1.5">
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;

            return (
              <li key={id}>
                <button
                  type="button"
                  aria-label={`${label} 섹션으로 이동`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => scrollToSection(id)}
                  className="flex items-center justify-center p-0.5"
                >
                  <span
                    aria-hidden="true"
                    className={`block shrink-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "size-2 bg-gradient-to-br from-[#ff4da6] to-[#9b59b6]"
                        : "size-1.5 bg-[#9b59b6]/30 hover:bg-[#9b59b6]/50"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 모바일: 하단 내비게이션 바 */}
      <nav
        aria-label="섹션 내비게이션"
        className="fixed inset-x-0 bottom-0 z-[9999] md:hidden"
      >
        <div className="mx-3 mb-3 flex items-center justify-around rounded-2xl border border-[#f0ebf8] bg-white/80 px-2 py-2 shadow-lg backdrop-blur-md">
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;

            return (
              <button
                key={id}
                type="button"
                aria-label={`${label} 섹션으로 이동`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToSection(id)}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[0.625rem] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff4da6] to-[#9b59b6] text-white"
                    : "text-[#706e8a] active:bg-[#f5f0fb]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </>,
    document.body,
  );
}
