"use client";

import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/works";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const cardProps = {
  gradientFrom: "#ff4da6",
  gradientTo: "#9b59b6",
  gradientColor: "#f5f0fb",
  gradientOpacity: 0.35,
} as const;

export default function WorksSection() {
  return (
    <section
      id="works"
      aria-label="Works"
      className="px-6 pb-24 pt-8 md:px-12 md:pt-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">
        <BlurFade inView delay={0.1} duration={0.5}>
          <h2 className="relative inline-block text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Works
            <span className="absolute -bottom-1.5 left-0 h-1 w-14 rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6]" />
          </h2>
        </BlurFade>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <li key={work.slug}>
              <BlurFade inView delay={0.22 + index * 0.08} duration={0.5}>
                <MagicCard {...cardProps} className="rounded-2xl">
                  <Link
                    href={`/works/${work.slug}`}
                    className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:p-5"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={work.thumbnail}
                        alt={`${work.title} 썸네일`}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 px-0.5 pb-0.5 sm:gap-2 sm:px-1 sm:pb-1">
                      <h3 className="text-sm font-semibold sm:text-base">{work.title}</h3>
                      <p className="text-xs leading-relaxed text-[#706e8a] sm:text-sm">
                        {work.summary}
                      </p>
                    </div>
                  </Link>
                </MagicCard>
              </BlurFade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
