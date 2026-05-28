"use client";

import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";
import { BlurFade } from "@/components/ui/blur-fade";

type WorkDetailContentProps = {
  work: Work;
};

export default function WorkDetailContent({ work }: WorkDetailContentProps) {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12 sm:px-6 sm:py-16 md:gap-10 md:px-12 md:py-24">
      <BlurFade delay={0.1} duration={0.5}>
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#9b59b6] transition-opacity hover:opacity-70"
        >
          ← 모든 작업물 보기
        </Link>
      </BlurFade>

      <BlurFade delay={0.2} duration={0.5}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </BlurFade>

      <BlurFade delay={0.3} duration={0.5}>
        <h1 className="text-2xl font-extrabold sm:text-4xl md:text-5xl">{work.title}</h1>
      </BlurFade>

      <BlurFade delay={0.4} duration={0.5}>
        <p className="text-base leading-relaxed text-[#706e8a] sm:text-lg">
          {work.description}
        </p>
      </BlurFade>

      {work.links.length > 0 && (
        <BlurFade delay={0.5} duration={0.5}>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {work.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
              >
                {link.label}
              </a>
            ))}
          </div>
        </BlurFade>
      )}
    </article>
  );
}
