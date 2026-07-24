# DB Schema Changelog

> `.claude/hooks/db_schema_changelog.py`가 `app/models/*.py` 변경을 감지해 한 줄씩 기록한다.
> 기록이 생기면 `.claude/rules/db-schema.sql`(DDL 단일 출처)과 대조해 동기화할 것.

<!-- db-schema-changelog -->
