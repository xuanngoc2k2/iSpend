# Project: iSpend

> 🧠 File này là source of truth cho MỌI AI coding agent.

---

## ▶ AUTO-START — Đọc section này TRƯỚC
...
(rest of the section remains same)
...

## Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS.
- **UI & Animation:** Framer Motion, shadcn/ui, Lucide React.
- **State Management:** Zustand.
- **Backend & Auth:** Supabase.
- **Charts:** Recharts.

## Folder Structure
- `/app`: Pages & Layouts.
- `/components`: UI (shared), Features (specific blocks).
- `/hooks`: Custom hooks (Supabase, UI).
- `/store`: Zustand stores.
- `/lib`: Configs (supabase client, utils).
- `/types`: TypeScript definitions.
- `/services`: API/Supabase interaction logic.

---

## Coding Principles (BẮT BUỘC)
...
(rest of the section remains same)
...

---

## Phase & Task

- **Current Phase:** Phase 4 — Statistics & Polish
- **Current Layer:** Layer 0 — Statistics UI & Charts
- **Implementation Plan:** xem `docs/IMPLEMENTATION_PLAN.md`
- **Phase details:** xem `docs/phases/phase-4.md`
- **Tasks:** xem `tasks/layer-0-todo.md`
- **Scope breakdown:** xem `docs/SCOPE_BREAKDOWN.md`

### Hierarchy: Plan → Phase → Layer → Task

```
docs/IMPLEMENTATION_PLAN.md          ← Plan TỔNG (permanent, chỉ update status)
  └── docs/phases/phase-N.md         ← Plan chi tiết từng phase (permanent)
       └── tasks/layer-X-todo.md     ← Tasks phase HIỆN TẠI (overwrite khi đổi phase)
            └── tasks/done.md        ← Archive (Phase > Layer > Tasks)
```

### Task Files — Dependency-Driven Layers

Dùng **Dependency-Driven approach** (xem `docs/SCOPE_BREAKDOWN.md`):
- `tasks/layer-0-todo.md` — Foundation (no dependency)
- `tasks/layer-1-todo.md` — Depends on Layer 0 (tạo khi cần)
- `tasks/layer-2-todo.md` — Depends on Layer 1 (tạo khi cần)
- ... (thêm layer tùy scope)
- `tasks/layer-refinement-todo.md` — Post-completion bugs/features
- `tasks/done.md` — Completed tasks (chia section: Phase > Layer)

**Quy tắc:**
- Số layer phụ thuộc vào dependency analysis — không cố định
- Mỗi layer chứa nhiều task **độc lập** (có thể parallel)
- Layer N xong **100%** → mới bắt đầu Layer N+1
- KHÔNG được nhảy cóc layer
- Khi **chuyển phase** → overwrite `layer-X-todo.md`, move tasks cũ vào `done.md`

---

## 🔄 After Completion — Layer Refinement

Sau khi hoàn thành **tất cả phases**, user check lại và báo bug/feature mới.

**Workflow:**
1. User báo → Bug hoặc feature mới
2. AI brainstorm → Clarify + propose 2-3 approaches
3. User approve → Confirm phương án
4. Tạo task → Thêm vào `tasks/layer-refinement-todo.md`
5. Pick + implement → Như các layer khác
6. Update `docs/IMPLEMENTATION_PLAN.md` status nếu cần

---

## Memory & Knowledge

### Memory (riêng tư — gitignored)
Sau mỗi session, ghi notes vào `memory/YYYY-MM-DD.md`:
- Tasks completed + AI tool used
- Issues encountered
- Key files changed
- Next steps

### Knowledge (shared — committed)
Khi phát hiện bug/pattern đáng nhớ:
1. Tạo `docs/knowledge/YYYY-MM-DD-[topic].md` (dùng `docs/knowledge/TEMPLATE.md`)
2. Update `docs/knowledge/INDEX.md`
3. Nếu pattern cực quan trọng → thêm vào mục "Learned Rules" ở trên

### Decisions (shared — committed)
Khi có architecture/tech decision quan trọng:
- Tạo `docs/decisions/NNN-[topic].md` (dùng `docs/decisions/TEMPLATE.md`)

---

## Codebase Navigation

### Primary: Code-Review-Graph (MCP — tự động)
```bash
# Cài đặt (1 lần — dùng pipx để tránh conflict Python)
pipx install code-review-graph && code-review-graph install
# hoặc: uv tool install code-review-graph

# Build lần đầu (chạy trong root project)
code-review-graph build

# Update (tự động qua git hook, hoặc thủ công)
code-review-graph update
```

### Pre-Code / Post-Code Scripts
```bash
# Trước khi code: kiểm tra môi trường
./scripts/ai-preflight.sh

# Sau khi code: chạy verification
./scripts/ai-review.sh
```

Sau khi build, AI tự động dùng MCP tools để navigate — không cần đọc file thủ công.

### Verify AI Đang Dùng Graph
Nếu user muốn kiểm tra AI có thực sự dùng code-review-graph:
- Hỏi AI: "List các tool MCP bạn đang có"
- Kiểm tra Completion Report có dòng "Graph tools used: ✅" không
- Trong Cursor: Settings → MCP Servers → kiểm tra chấm xanh
- Trong Claude Code: gõ `/mcp` để xem danh sách servers
