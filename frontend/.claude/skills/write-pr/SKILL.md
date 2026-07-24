---
name: write-pr
description: 반나절(Half Day) FE 레포에서 main 대비 변경사항을 분석해 PR 본문을 docs/PR.md로 작성하고, README·CLAUDE.md 동기화 여부를 점검한다. 실제 PR 생성은 하지 않는다.
---

# write-pr

## 절차

1. `git log main..HEAD --oneline`, `git diff main...HEAD --stat`으로 변경 범위 파악.
   커밋이 많으면 주요 diff를 직접 읽어 의도를 이해한다.
2. `.github/PULL_REQUEST_TEMPLATE.md` 구조 그대로 `frontend/docs/PR.md` 작성 (덮어쓰기).
   - 요약: 무엇을·왜, 2~4문장
   - 변경 사항: 화면·컴포넌트·데이터·설정 단위 불릿
   - 스크린샷: 시각 변경이 있으면 자리 표시(`<!-- TODO: 스크린샷 -->`) 남김
   - 확인 사항: `pnpm typecheck` / `pnpm build` 통과 여부, ko/ja/en 3언어 확인 여부
3. 동기화 점검 — 다음이 diff와 어긋나면 함께 수정:
   - 컴포넌트 추가·삭제 → `.claude/rules/component-dictionary.md`
   - 구조·스크립트 변경 → `.claude/rules/project-convention.md`
   - 새 도메인 용어 → `.claude/rules/term-dictionary.md`
4. 결과 보고: PR 제목 제안(Conventional Commits 형식) + docs/PR.md 경로 + 동기화한 파일 목록.

## 원칙

- PR 생성(gh pr create)은 하지 않는다 — 사람이 검토 후 직접.
- 본문은 한국어, 리뷰어가 diff 없이도 흐름을 이해할 수 있게.
