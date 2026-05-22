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
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-14">
        <header className="flex flex-col gap-5">
          <BlurFade inView delay={0.1} duration={0.5}>
            <h2 className="relative inline-block text-4xl font-extrabold md:text-5xl">
              About
              <span className="absolute -bottom-1.5 left-0 h-1 w-14 rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6]" />
            </h2>
          </BlurFade>

          <BlurFade inView delay={0.22} duration={0.5}>
            <p className="max-w-lg text-lg leading-relaxed text-[#706e8a]">
              제품의 여정을 따라가는 프로젝트 매니저
            </p>
          </BlurFade>
        </header>

        <div className="flex flex-col gap-4">
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
                <div className="flex items-center justify-between p-6 md:px-8">
                  <span className="font-semibold">{item.title}</span>
                  <span className="inline-flex w-[7.5rem] shrink-0 items-center justify-center rounded-full bg-[#f5f0fb] px-3 py-1 text-center text-xs font-medium tabular-nums text-[#9b59b6]">
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
