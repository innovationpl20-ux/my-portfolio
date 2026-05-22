# Portfolio — Agent Governance

## Critical

<!-- BEGIN:nextjs-agent-rules -->
This is NOT the Next.js you know. This version (16.x) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Operational Commands

```bash
bun dev          # 개발 서버
bun build        # 프로덕션 빌드
bun start        # 프로덕션 서버 실행
bun lint         # ESLint 검사
bun add <pkg>    # 패키지 설치
```

패키지 매니저: **Bun 고정** — npm / yarn / pnpm 사용 금지.

## Project Context

개인 포트폴리오 사이트. 기술 역량과 프로젝트 이력을 시각적으로 전달하는 것이 목적.

Tech Stack: Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui · Magic UI · GSAP · Bun

## Golden Rules

### Immutable

- API 키·시크릿을 코드에 하드코딩하지 마라. 반드시 `.env.local`을 사용한다.
- `.env.local`은 절대 커밋하지 마라 (`.gitignore` 확인).
- 코드 작성 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 확인한다.

### UI 레이어 우선순위 (Do's)

- 스타일링은 **Tailwind 우선**으로 해결한다.
- 폼·다이얼로그·모달은 **shadcn/ui** 컴포넌트를 사용한다.
- 진입(mount) 애니메이션은 **Magic UI** 컴포넌트를 사용한다.
- 마우스 인터랙션·스크롤 기반 고급 애니메이션은 **GSAP**을 사용한다.
- 컴포넌트는 필요할 때만 설치한다 — Tailwind로 해결 가능하면 설치하지 않는다.

### Don'ts

- `app/` 내에 `'use client'` 없이 브라우저 API를 사용하지 마라.
- shadcn/ui 컴포넌트를 직접 수정하지 마라 — wrapper 컴포넌트를 만들어 확장한다.
- GSAP과 Magic UI를 동일 요소에 중복 적용하지 마라.
- `any` 타입을 남용하지 마라. 불가피할 경우 `// eslint-disable` 주석과 이유를 명시한다.

## Standards & References

- **언어:** 답변·주석 모두 한국어.
- **컴포넌트 위치:** `components/ui/` (shadcn/ui 자동 생성), `components/` (커스텀).
- **파일 네이밍:** 컴포넌트는 PascalCase (`HeroSection.tsx`), 유틸은 camelCase (`formatDate.ts`).
- **커밋 메시지:** `type(scope): 한국어 설명` — type은 `feat / fix / style / refactor / chore`.
- **Maintenance Policy:** 이 파일의 규칙이 실제 코드와 괴리가 생기면 업데이트를 제안하라.
