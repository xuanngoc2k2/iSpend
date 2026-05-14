# Done Tasks

> Archive tất cả tasks đã hoàn thành, chia theo **Phase > Layer**.

---

<!-- AI tự thêm sections ở đây khi hoàn thành -->
<!-- Format:

## Phase 1 — [Tên Phase]

### Layer 0 — Foundation

| ID | Task | Commit | Date |
|----|------|--------|------|
| 0.1 | [task description] | [hash] | YYYY-MM-DD |

### Layer 1 — [Tên Layer]

| ID | Task | Commit | Date |
|----|------|--------|------|
| 1.1 | [task description] | [hash] | YYYY-MM-DD |

## Phase 2 — [Tên Phase]

### Layer 0 — Foundation

| ID | Task | Commit | Date |
|----|------|--------|------|
| 0.1 | [task description] | [hash] | YYYY-MM-DD |

## Layer Refinement (Post-Completion)

| ID | Task | Type | Commit | Date |
|----|------|------|--------|------|
| R.1 | [task] | Bug/Feature | [hash] | YYYY-MM-DD |

-->

_Chưa có tasks hoàn thành._
# Layer 0 — Project Initialization

> Tasks không phụ thuộc vào nhau. Có thể làm **parallel**.
> Phase: 1 — Foundation & Auth

---

## Tasks

| ID | Task | Status | Commit |
|----|------|--------|--------|
| 1.1 | Initialize Next.js project with Tailwind & TS | ✅ | feat: init nextjs project |
| 1.2 | Config iOS-style theme (colors, fonts, globals.css) | ✅ | feat: config ios theme |
| 1.3 | Install core dependencies (framer-motion, zustand, lucide-react, etc.) | ✅ | chore: install deps |
| 1.4 | Setup Supabase environment and client lib | ✅ | feat: setup supabase |

---

## Tạo Layer Tiếp Theo
...

Khi tất cả tasks ở trên đều ✅ Done:

1. **Move completed tasks** → `tasks/done.md` (section Layer 0)
2. **Phân tích dependency** cho features tiếp theo (xem `docs/SCOPE_BREAKDOWN.md`)
3. **Tạo file mới:** `tasks/layer-1-todo.md` — copy format này, thay header
4. **Update `AGENTS.md`** → Current Layer = 1
5. **Commit:** `chore: complete layer 0, start layer 1`
# Layer 1 — Supabase & Auth Flow

> Tasks phụ thuộc vào Layer 0.
> Phase: 1 — Foundation & Auth

---

## Tasks

| ID | Task | Status | Commit |
|----|------|--------|--------|
| 1.5 | Create Auth Store with Zustand & Supabase | ✅ | feat: add auth store |
| 1.6 | Implement Login & Signup pages with iOS UI | ✅ | feat: add login/signup pages |
| 1.7 | Setup Main Layout with Bottom Tabs & Protected Routes | ✅ | feat: add main layout & bottom nav |

---

## Tạo Layer Tiếp Theo
...
# Layer 1 — Data Integration

> Phase: 2 — Core Features (Home & Entry)

---

## Tasks

| ID | Task | Status | Commit |
|----|------|--------|--------|
| 2.6 | Create Supabase tables (via SQL or instructions) | ✅ | feat: db schema ready |
| 2.7 | Implement Transaction Service (save, list) | ✅ | feat: transaction service & store |
| 2.8 | Connect Dashboard to Real Data from Supabase | ✅ | feat: connect ui to supabase |

---

## Tạo Layer Tiếp Theo
...
# Layer 1 — Image Storage & Upload

> Phase: 3 — Camera & Image Storage

---

## Tasks

| ID | Task | Status | Commit |
|----|------|--------|--------|
| 3.4 | Setup Supabase Storage Bucket 'receipts' & Policies | ✅ | feat: storage bucket ready |
| 3.5 | Implement Image Upload Service (Supabase Storage) | ✅ | feat: upload image service |
| 3.6 | Update Transaction Service to handle image upload | ✅ | feat: integrate upload in flow |

---

## Tạo Layer Tiếp Theo
...
# Layer 0 — Statistics UI & Charts

> Phase: 4 — Statistics & Polish

---

## Tasks

| ID | Task | Status | Commit |
|----|------|--------|--------|
| 4.1 | Implement Statistics Page with Monthly Navigation | ✅ | feat: add statistics page |
| 4.2 | Create Animated Donut Chart for Categories | ✅ | feat: add donut chart |
| 4.3 | Implement Category Breakdown List | ✅ | feat: add category breakdown |

---

## Tạo Layer Tiếp Theo
...
