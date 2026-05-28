"use client";

import { type FormEvent, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const cardProps = {
  gradientFrom: "#ff4da6",
  gradientTo: "#9b59b6",
  gradientColor: "#f5f0fb",
  gradientOpacity: 0.35,
} as const;

const inputClassName =
  "w-full rounded-xl border border-[#f0ebf8] bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-[#706e8a]/60 focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20 disabled:cursor-not-allowed disabled:opacity-60";

type FormStatus = {
  type: "success" | "error";
  message: string;
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          botcheck: formData.get("botcheck"),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        code?: string;
      };

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: "메일이 전송됐어요. 곧 답장드릴게요",
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          message:
            result.code === "rate_limited" && result.message
              ? result.message
              : "전송에 실패했어요. 잠시 후 다시 시도해주세요",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "전송에 실패했어요. 잠시 후 다시 시도해주세요",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="px-6 pb-32 pt-8 md:px-12 md:pb-24 md:pt-12"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-5">
          <BlurFade inView delay={0.1} duration={0.5}>
            <h2 className="relative inline-block text-4xl font-extrabold md:text-5xl">
              Contact
              <span className="absolute -bottom-1.5 left-0 h-1 w-14 rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6]" />
            </h2>
          </BlurFade>

          <BlurFade inView delay={0.22} duration={0.5}>
            <p className="max-w-lg text-lg leading-relaxed text-[#706e8a]">
              프로젝트 문의· 협업, 편하게 보내주세요
            </p>
          </BlurFade>
        </header>

        <BlurFade inView delay={0.32} duration={0.5}>
          <MagicCard {...cardProps} className="rounded-2xl">
            <form
              className="flex flex-col gap-5 p-6 md:p-8"
              onSubmit={handleSubmit}
            >
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm font-semibold">
                  이름
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="이름을 입력해주세요"
                  required
                  disabled={isSubmitting}
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm font-semibold">
                  이메일
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  required
                  disabled={isSubmitting}
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold"
                >
                  메시지
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="문의 내용을 입력해주세요"
                  required
                  disabled={isSubmitting}
                  className={`${inputClassName} min-h-[120px] resize-y`}
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff4da6] to-[#9b59b6] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "보내는 중..." : "보내기"}
                </button>

                {status && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-[#9b59b6]"
                        : "text-[#ff4da6]"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </MagicCard>
        </BlurFade>
      </div>
    </section>
  );
}
