# Specifications: iSpend

> Chi tiết requirements và chức năng của project.

---

## Functional Requirements

### 1. Home Page
- Header chào hỏi ("Chào buổi sáng ☀️"), tên user, badge trạng thái.
- Toggle view Ngày/Tháng.
- Summary cards: Chi (Đỏ), Thu (Xanh).
- Wallet filters (Tất cả, Wallet, Bank).
- Monthly Calendar grid với các điểm đánh dấu giao dịch.
- FAB (Floating Action Button) dấu "+" để thêm chi tiêu.

### 2. Add Expense Flow
- **Step 1: Camera/Picker**
  - Custom WebRTC Camera UI.
  - Chụp ảnh, chọn ảnh từ gallery, hoặc bỏ qua.
- **Step 2: Add Expense Page**
  - Background là ảnh vừa chụp blur nhẹ.
  - Input số tiền cực lớn (Placeholder "0đ").
  - Category chips (Ăn uống, Sức khỏe, Di chuyển, Mua sắm, Khác).
  - Wallet selector.
  - Toggle Thu/Chi.
  - Custom Numeric Keypad.

### 3. Statistics Page
- Toggle Tháng/Năm/Tất cả.
- Navigation giữa các tháng.
- Animated Donut Chart hiển thị tổng chi tiêu.
- Danh sách category với phần trăm và progress bar.

### 4. Bottom Tab Bar
- Floating nav: Trang chủ, Thống kê, Tài khoản, Ngân sách, Cá nhân.

---

## Non-Functional Requirements

- **Performance:** Load nhanh, animation mượt 60fps trên mobile.
- **Security:** Supabase Auth (Email/Google).
- **UX:** iOS-like interactions, touch feedback, safe area support.
- **UI:** Dark mode #0B0B12, Glassmorphism, Rounded corners (24-32px).

---

## User Stories

- As a user, I want to take a photo of my receipt so I don't forget what I bought.
- As a user, I want a big keypad to enter amounts quickly on the go.
- As a user, I want to see my spending distribution in a beautiful chart.

---

## UI/UX Notes

- Refer to `/images` for visual guidelines.
- Primary color: Subtle gradients, iOS Dark system.
- Font: San Francisco (system default).

---

> ℹ️ File này có thể được paste nguyên văn từ file mô tả chức năng của user.
> Phase 0 sẽ đọc và clarify thêm nếu cần.
