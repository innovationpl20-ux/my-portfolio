export type WorkLink = {
  label: string;
  href: string;
};

export type Work = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  thumbnail: string;
  links: WorkLink[];
};

export const works: Work[] = [
  {
    slug: "one-ui-xr",
    title: "One UI XR",
    summary: "XR 환경을 위한 One UI 경험 기획 및 프로젝트 관리",
    description:
      "2025년 10월 출시된 Galaxy XR를 위한 One UI XR 프로젝트입니다. Android XR 환경에서 AI-native 멀티모달 경험을 자연스럽게 탐색할 수 있도록 인터페이스 여정을 설계했습니다. 헤드셋·배터리팩 분리 구조와 passthrough UI 등 XR 특화 요구사항을 반영하여, 디자인·개발·QA 팀과 함께 출시 일정과 품질을 동시에 맞췄습니다.",
    thumbnail: "/works/one-ui-xr.png",
    links: [
      { label: "Behance", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    slug: "one-ui-8",
    title: "One UI 8",
    summary: "차세대 모바일 UX를 위한 One UI 8 릴리즈 프로젝트",
    description:
      "2026년 2월 출시된 Galaxy S26 시리즈와 함께 선보인 One UI 8 프로젝트입니다. 통일된 디자인 언어와 Galaxy AI 3세대 경험을 중심으로 기능 우선순위와 스프린트 계획을 수립했습니다. Privacy Display, ambient island 카메라 등 하드웨어 변화에 맞춘 UX 의사결정을 조율하며, 출시 후 피드백 루프를 로드맵에 반영하는 구조를 마련했습니다.",
    thumbnail: "/works/one-ui-8.png",
    links: [{ label: "Dribbble", href: "#" }],
  },
  {
    slug: "one-ui-9",
    title: "One UI 9",
    summary: "AI 기반 개인화 경험을 담은 One UI 9 프로젝트",
    description:
      "AI OS를 기반으로 한 차세대 One UI 9 프로젝트입니다. 출시 예정 제품을 대비해 개인화·맥락 인식·프로액티브 AI 경험을 미래지향적으로 설계하고 있습니다. 초기 컨셉 단계부터 로드맵 수립, 베타 테스트 계획까지 PM으로 참여하며, 멀티팀 의존성과 리스크 관리 체계를 정립하고 있습니다.",
    thumbnail: "/works/one-ui-9.png",
    links: [
      { label: "Behance", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}
