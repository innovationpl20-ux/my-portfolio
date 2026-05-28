"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BlurFade } from "@/components/ui/blur-fade";

const SPOT_SIZE = 600;
const SPOT_HALF = SPOT_SIZE / 2;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    const xTo = gsap.quickTo(spot, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(spot, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const { left, top } = section.getBoundingClientRect();
      xTo(e.clientX - left - SPOT_HALF);
      yTo(e.clientY - top - SPOT_HALF);
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-12"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 라이트 스팟 — 마우스 추적 */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0"
        style={{
          width: SPOT_SIZE,
          height: SPOT_SIZE,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          willChange: "transform",
          mixBlendMode: "overlay",
        }}
      />

      {/* 하단 페이드 — About 섹션으로 자연스럽게 연결 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-background md:h-48"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:gap-12 md:text-left">
        {/* 모바일: 아바타를 상단에 표시 */}
        <BlurFade delay={0.15} duration={0.5} className="shrink-0 md:hidden">
          <Image
            src="/avatar.png"
            alt="minee 아바타"
            width={160}
            height={160}
            priority
            unoptimized
            className="drop-shadow-xl"
          />
        </BlurFade>

        {/* 텍스트 */}
        <div className="flex flex-col items-center gap-6 md:items-start md:gap-8">
          <BlurFade delay={0.1} duration={0.5}>
            <span className="inline-flex w-fit items-center rounded-full border border-pink-200 bg-pink-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff4da6]">
              Project Manager
            </span>
          </BlurFade>

          <BlurFade delay={0.25} duration={0.5}>
            <h1 className="bg-gradient-to-r from-[#ff4da6] via-[#9b59b6] to-[#4361ee] bg-clip-text text-5xl font-extrabold leading-none text-transparent sm:text-7xl md:text-9xl">
              minee
            </h1>
          </BlurFade>

          <BlurFade delay={0.4} duration={0.5}>
            <p className="max-w-xs text-lg leading-relaxed text-[#706e8a] sm:max-w-md sm:text-xl md:text-2xl">
              제품의 여정을 따라가는 프로젝트 매니저
            </p>
          </BlurFade>

          <BlurFade delay={0.55} duration={0.5}>
            <div className="mt-1 md:mt-2">
              <a
                href="mailto:minyi.park@samsung.com"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-opacity hover:opacity-90"
              >
                연락하기
              </a>
            </div>
          </BlurFade>
        </div>

        {/* 데스크톱: 우측 아바타 */}
        <BlurFade delay={0.3} duration={0.5} className="hidden shrink-0 md:block">
          <Image
            src="/avatar.png"
            alt="minee 아바타"
            width={260}
            height={260}
            priority
            unoptimized
            className="drop-shadow-xl"
          />
        </BlurFade>
      </div>
    </section>
  );
}
