"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const careers = [
  { title: "One UI 9", period: "2026 — 현재" },
  { title: "One UI 8", period: "2025 — 2026" },
  { title: "One UI XR", period: "2023 — 2025" },
] as const;

const cardProps = {
  gradientFrom: "#ff4da6",
  gradientTo: "#9b59b6",
  gradientColor: "#f5f0fb",
  gradientOpacity: 0.35,
} as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="px-6 pb-24 pt-8 md:px-12 md:pt-12"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 md:gap-14">
        <header className="flex flex-col gap-4 md:gap-5">
          <BlurFade inView delay={0.1} duration={0.5}>
            <h2 className="relative inline-block text-3xl font-extrabold sm:text-4xl md:text-5xl">
              About
              <span className="absolute -bottom-1.5 left-0 h-1 w-14 rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6]" />
            </h2>
          </BlurFade>

          <BlurFade inView delay={0.22} duration={0.5}>
            <p className="max-w-lg text-base leading-relaxed text-[#706e8a] sm:text-lg">
              제품의 여정을 따라가는 프로젝트 매니저
            </p>
          </BlurFade>
        </header>

        <div className="flex flex-col gap-3 md:gap-4">
          <BlurFade inView delay={0.32} duration={0.5}>
            <h3 className="px-1 text-xs font-bold uppercase tracking-widest text-[#9b59b6]">
              경력
            </h3>
          </BlurFade>

          {careers.map((item, index) => (
            <BlurFade
              key={item.title}
              inView
              delay={0.42 + index * 0.08}
              duration={0.5}
            >
              <MagicCard
                {...cardProps}
                className="rounded-2xl"
              >
                <div className="flex items-center justify-between p-4 sm:p-6 md:px-8">
                  <span className="text-sm font-semibold sm:text-base">{item.title}</span>
                  <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#f5f0fb] px-2.5 py-1 text-center text-[0.6875rem] font-medium tabular-nums text-[#9b59b6] sm:w-[7.5rem] sm:px-3 sm:text-xs">
                    {item.period}
                  </span>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
