import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetailContent from "@/components/WorkDetailContent";
import { getWorkBySlug, works } from "@/data/works";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return { title: "작업물을 찾을 수 없습니다" };
  }

  return {
    title: `${work.title} — minee`,
    description: work.summary,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <WorkDetailContent work={work} />;
}
