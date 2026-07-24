#!/usr/bin/env bash
# 푸시 전 게이트 — 배포·데모에서 실패할 것을 로컬에서 먼저 잡는다.
# 우회: git push --no-verify
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT/frontend"

echo "[pre-push] pnpm typecheck"
pnpm typecheck

echo "[pre-push] pnpm build"
pnpm build

echo "[pre-push] OK"
