#!/usr/bin/env python3
"""PostToolUse hook: components/ 구조 변화(생성·삭제) 감지 → 로그 한 줄 + 사전 갱신 환기.

- 감시 대상: COMPONENTS_PREFIX 하위 .tsx (반나절 FE는 notices.tsx처럼 소문자 모음 파일도
  컴포넌트 소스이므로 PascalCase 제한 없음)
- 생성 = 파일이 존재하지만 git 인덱스에 없음 / 삭제 = 파일이 사라짐 (이름변경은 삭제+생성 2줄)
- stdlib만 사용, Python 3.11+. 실패해도 도구 흐름을 막지 않는다 (항상 exit 0).
"""
import json
import subprocess
import sys
from datetime import UTC, datetime
from pathlib import Path

CHANGELOG_REL = ".claude/logs/component-changelog.md"
DICTIONARY_REL = ".claude/rules/component-dictionary.md"
COMPONENTS_PREFIX = "src/components/"
MARKER = "<!-- component-changelog -->"


def _is_component(rel: str) -> bool:
    return rel.startswith(COMPONENTS_PREFIX) and rel.endswith(".tsx")


def _tracked(rel: str) -> bool:
    try:
        out = subprocess.run(
            ["git", "ls-files", "--error-unmatch", rel],
            capture_output=True, timeout=5,
        )
        return out.returncode == 0
    except Exception:
        return True  # git 불가 시 "생성" 오탐을 내지 않는다


def main() -> None:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return
    if payload.get("tool_name") not in ("Write", "Edit"):
        return
    file_path = (payload.get("tool_input") or {}).get("file_path") or ""
    root = Path.cwd()
    try:
        rel = str(Path(file_path).resolve().relative_to(root.resolve()))
    except ValueError:
        return
    if not _is_component(rel):
        return

    exists = Path(rel).exists()
    if exists and _tracked(rel):
        return  # 기존 파일 수정 — 구조 변화 아님
    event = "생성" if exists else "삭제"

    log = root / CHANGELOG_REL
    log.parent.mkdir(parents=True, exist_ok=True)
    if not log.exists():
        log.write_text(f"# Component Changelog\n\n{MARKER}\n", encoding="utf-8")
    stamp = datetime.now(UTC).strftime("%Y-%m-%d %H:%M UTC")
    line = f"- {stamp} · **{event}** `{rel}` → `{DICTIONARY_REL}` 갱신 필요\n"
    with log.open("a", encoding="utf-8") as f:
        f.write(line)
    # Claude에게 사전 갱신 환기 (PostToolUse stdout은 트랜스크립트에 노출)
    print(f"[component-changelog] {event}: {rel} — {DICTIONARY_REL} 표를 갱신하세요.")


if __name__ == "__main__":
    try:
        main()
    finally:
        sys.exit(0)
