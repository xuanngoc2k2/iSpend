# Implementation Plan: iSpend

> Bản đồ TỔNG của project. Tạo trong Phase 0, **KHÔNG BAO GIỜ XÓA**.
> Chỉ update status khi hoàn thành phase/layer.

---

## Project Overview

**Objective:** Quản lý chi tiêu cá nhân với trải nghiệm mobile-first iOS-style.
**Stack:** Next.js, Tailwind, Framer Motion, Zustand, Supabase.
**Timeline:** Ước tính 5-7 ngày.

---

## Phases

### Phase 0 — Planning ✅
- Output: Design spec, ADRs, phases, tasks
- Details: `docs/phases/phase-0.md`

### Phase 1 — Foundation & Auth ✅
- Scope: Setup project, Supabase config, Auth flow, Layout cơ bản.
- Layers: 2
- Definition of Done: Có thể login/logout, project structure sẵn sàng.
- Details: `docs/phases/phase-1.md`

### Phase 2 — Core Features (Home & Entry) ✅
- Scope: Dashboard, Calendar, Add Expense Flow (Keyboard, Form).
- Layers: 2
- Definition of Done: Có thể nhập chi tiêu và xem trên Dashboard.
- Details: `docs/phases/phase-2.md`

### Phase 3 — Camera & Image Storage ✅
- Scope: Custom WebRTC Camera, upload ảnh lên Supabase Storage.
- Layers: 2
- Definition of Done: Có thể chụp ảnh và gắn vào giao dịch.
- Details: `docs/phases/phase-3.md`

### Phase 4 — Statistics & Polish ✅
- Scope: Statistics page, Charts, Animations, Final UI Polish.
- Layers: 2
- Definition of Done: App hoàn thiện, mượt mà, đúng style iOS.
- Details: `docs/phases/phase-4.md`

---

## Layer Overview (Phase hiện tại: Phase 1)

| Layer | Mô tả | Status |
|-------|--------|--------|
| Layer 0 | Project Initialization & Base Styles | ⬜ |
| Layer 1 | Supabase Setup & Auth Flow | ⬜ |

---

## Key Decisions

| # | Decision | Rationale | ADR |
|---|----------|-----------|-----|
| 1 | Supabase Backend | Rapid development, Auth/DB/Storage bundled. | `docs/decisions/001-supabase-backend.md` |
| 2 | Custom WebRTC Camera | Native iOS look and feel. | `docs/decisions/002-custom-webrtc-camera.md` |

---

## Risks & Assumptions

- **Risk:** WebRTC camera permissions on iOS Safari. → **Mitigation:** Fallback to native file input if permission denied.
- **Assumption:** User has a Supabase account or will use provided credentials.

---

> ℹ️ File này là **bản đồ tổng** — luôn giữ nguyên, chỉ update status.
> Chi tiết từng phase → `docs/phases/phase-N.md`
> Tasks đang làm → `tasks/layer-N-todo.md`
> Lịch sử → `tasks/done.md`
