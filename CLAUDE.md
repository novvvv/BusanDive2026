# CLAUDE.md — BusanDive2026 (반나절 · 半日 · Half Day)

부산 DIVE 2026 해커톤 — 여행 마지막 반나절, 짐 보관·픽업까지 대화 하나로 해결하는
AI 여행 어시스턴트. 모노레포다.

> **이 파일은 루트 세션용 얇은 라우터다.** 실제 작업 규칙은 각 하위 CLAUDE.md에 있다 —
> FE 작업은 `frontend/`에서, BE 작업은 `backend/`에서 세션을 여는 것을 권장한다.
> 루트 세션에서 하위 코드를 만질 때는 해당 하위 CLAUDE.md와 `.claude/rules/`를 먼저 읽는다.

## 구조

| 경로 | 내용 | 하네스 |
| --- | --- | --- |
| `frontend/` | Next.js 14 모바일 웹뷰 (화면·디자인 시스템) | [frontend/CLAUDE.md](frontend/CLAUDE.md) + `frontend/.claude/` |
| `backend/` | FastAPI + LangGraph 에이전트 서버 | [backend/CLAUDE.md](backend/CLAUDE.md) + `backend/.claude/` |
| `data/` | 시드 원천 — 부산교통공사 CSV, 짐캐리(zimcarry) JSON. **수치 임의 수정 금지** |

## 공통 규칙

- 커밋·브랜치·PR: Conventional Commits, 티켓 prefix 없음, 브랜치 `type/짧은-설명`.
  상세는 [frontend/.claude/rules/git-conventions.md](frontend/.claude/rules/git-conventions.md) (backend 동일).
- `main` 직접 커밋 금지 — 브랜치 → PR.
- 완료 선언 전 검증 직접 실행: FE `pnpm typecheck && pnpm build` / BE `uv run ruff check . && uv run mypy app && uv run pytest`.
- 한국어로 답한다. 확실한 정보만, 비가역 작업은 경고 + 롤백 방법 제시.
