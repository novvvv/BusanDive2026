---
name: write-pr
description: 반나절(Half Day) BE 레포에서 main 대비 변경사항을 분석해 PR 본문을 backend/docs/PR.md로 작성하고, CLAUDE.md·rules 동기화 여부를 점검한다. 실제 PR 생성은 하지 않는다.
---

# write-pr

## 절차

1. `git log main..HEAD --oneline`, `git diff main...HEAD --stat`으로 변경 범위 파악.
   주요 diff를 직접 읽어 의도를 이해한다.
2. `.github/PULL_REQUEST_TEMPLATE.md` 구조 그대로 `backend/docs/PR.md` 작성 (덮어쓰기).
   - 요약: 무엇을·왜, 2~4문장
   - 변경 사항: 엔드포인트·그래프 노드·모델·설정 단위 불릿
   - 확인 사항: `uv run ruff check .` / `uv run mypy app` / `uv run pytest` 통과 여부
3. 동기화 점검 — diff와 어긋나면 함께 수정:
   - 모델 변경 → `.claude/rules/db-schema.sql` (changelog 확인)
   - 새 용어·intent·판정 코드 → `.claude/rules/term-dictionary.md`
   - 구조·의존성·스크립트 변경 → `backend/CLAUDE.md` 도구 절
4. 결과 보고: PR 제목 제안(Conventional Commits) + docs/PR.md 경로 + 동기화 파일 목록.

## 원칙

- PR 생성(gh pr create)은 하지 않는다 — 사람이 검토 후 직접.
- 본문은 한국어, 리뷰어가 diff 없이도 흐름을 이해할 수 있게.
