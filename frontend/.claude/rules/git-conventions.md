# Git 컨벤션

> 핵심 요약: Conventional Commits(한국어 제목 허용), 브랜치 `type/짧은-설명`,
> PR 본문은 write-pr 스킬로 `docs/PR.md` 작성.

## 커밋 메시지

```text
<type>: <제목 — 한국어 허용, 명사형 종결>

<본문 — 무엇을·왜. 불릿 허용. 선택>
```

- type: `feat` `fix` `chore` `docs` `refactor` `style` `test` `data`(데이터 파일 추가·갱신)
- Jira 등 티켓 prefix 없음.
- 제목 72자 이내. 본문은 변경 이유가 자명하면 생략.
- Claude Code가 커밋할 땐 끝에 `Co-Authored-By: Claude ...` 트레일러.

## 브랜치

- `type/짧은-영문-설명` — 예: `chore/set-fronted`, `feat/chat-stream`, `fix/locker-sheet`.
- 기본 브랜치 `main`. PR 대상도 `main`.

## PR

- 본문은 `.github/PULL_REQUEST_TEMPLATE.md` 구조. write-pr 스킬이 main 대비 diff를 분석해
  `docs/PR.md` 초안을 만든다 (실제 PR 생성은 사람이).
- 푸시 전 `pnpm typecheck && pnpm build` 직접 실행해 통과 확인.
