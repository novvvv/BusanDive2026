# Git 컨벤션

> 핵심 요약: Conventional Commits(한국어 제목 허용, Jira 없음), 브랜치 `type/짧은-설명`,
> PR 본문은 write-pr 스킬로 `docs/PR.md` 작성. 레포 공통 — frontend와 동일 규칙.

## 커밋 메시지

```text
<type>: <제목 — 한국어 허용, 명사형 종결>

<본문 — 무엇을·왜. 불릿 허용. 선택>
```

- type: `feat` `fix` `chore` `docs` `refactor` `style` `test` `data`(데이터·시드 갱신)
- 티켓 prefix 없음. 제목 72자 이내.
- Claude Code가 커밋할 땐 끝에 `Co-Authored-By: Claude ...` 트레일러.

## 브랜치

- `type/짧은-영문-설명` — 예: `feat/chat-graph`, `fix/pickup-cutoff`, `chore/server`.
- 기본 브랜치 `main`. PR 대상도 `main`.

## PR

- 본문은 `.github/PULL_REQUEST_TEMPLATE.md` 구조. write-pr 스킬이 `backend/docs/PR.md` 초안 작성.
- 푸시 전 품질 검사는 수동: `uv run ruff check . && uv run mypy app && uv run pytest` 통과 확인.
