# Claude Code / Opencode Instructions

> **Đọc `AGENTS.md` trước** — đó là source of truth cho project này.
> File này chỉ chứa Claude-specific notes.

## How To Start
Đọc `AGENTS.md` → section "AUTO-START" → follow state detection logic.

## Claude-Specific Notes
- Ưu tiên Sonnet cho regular tasks (feature, bugfix, test)
- Dùng Opus cho architecture decisions, complex refactors (>5 files)
- Dùng `ultrathink` hoặc extended thinking khi cần reasoning sâu
- Sub-directory `CLAUDE.md` cho rules cụ thể từng folder nếu cần
- Commit message: `feat/fix/test/chore: [mô tả ngắn]`
