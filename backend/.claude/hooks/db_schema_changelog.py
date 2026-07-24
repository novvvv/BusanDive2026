#!/usr/bin/env python3
"""PostToolUse hook: app/models/*.py 변경 감지 → changelog 한 줄 기록 + db-schema.sql 동기화 지시.

- 감시 대상: MODELS_PREFIX 하위 .py (Write/Edit)
- diff 요약까지는 하지 않는다 — 변경 사실 + 파일만 기록하고, 스키마 동기화 판단은 Claude가
  db-schema.sql과 대조해서 한다. (ponytail: git diff 파싱은 필요해질 때)
- stdlib만, Python 3.11+. 실패해도 도구 흐름을 막지 않는다 (항상 exit 0).
"""
import json
import sys
from datetime import UTC, datetime
from pathlib import Path

CHANGELOG_REL = ".claude/logs/db-schema-changelog.md"
SCHEMA_REL = ".claude/rules/db-schema.sql"
MODELS_PREFIX = "app/models/"
MARKER = "<!-- db-schema-changelog -->"


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
    if not (rel.startswith(MODELS_PREFIX) and rel.endswith(".py")):
        return
    if rel.endswith("__init__.py"):
        return

    log = root / CHANGELOG_REL
    log.parent.mkdir(parents=True, exist_ok=True)
    if not log.exists():
        log.write_text(f"# DB Schema Changelog\n\n{MARKER}\n", encoding="utf-8")
    stamp = datetime.now(UTC).strftime("%Y-%m-%d %H:%M UTC")
    with log.open("a", encoding="utf-8") as f:
        f.write(f"- {stamp} · **모델 변경** `{rel}` → `{SCHEMA_REL}` 동기화 확인 필요\n")
    print(f"[db-schema] 모델 변경: {rel} — {SCHEMA_REL}와 일치하는지 확인하고 어긋나면 DDL을 갱신하세요.")


if __name__ == "__main__":
    try:
        main()
    finally:
        sys.exit(0)
