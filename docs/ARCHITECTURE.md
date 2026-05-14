# Architecture — iSpend

> Technical architecture document.
> Last updated: 2026-05-14

---

## 1. System Overview

```
User (Mobile Browser) 
        ↓
Next.js Frontend (Vercel)
        ↓
Supabase (Auth, Postgres, Storage)
```

## 2. Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | Next.js 14 | App Router, SSR/Static optimized. |
| Styling | Tailwind CSS | Utility-first, rapid UI development. |
| Animations | Framer Motion | Smooth iOS-like spring animations. |
| State | Zustand | Lightweight global state. |
| Backend | Supabase | All-in-one Auth, DB, and Storage. |
| Database | PostgreSQL | Reliable relational data. |
| Auth | Supabase Auth | Built-in email/password and social login. |

## 3. Data Models

```sql
-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  amount NUMERIC NOT NULL,
  note TEXT,
  category_id UUID REFERENCES categories(id),
  wallet_id UUID REFERENCES wallets(id),
  image_url TEXT,
  type TEXT CHECK (type IN ('income', 'expense')),
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallets table
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('cash', 'bank')),
  balance NUMERIC DEFAULT 0
);
```

## 4. Folder Structure

```
/app          - Pages and layouts (Next.js App Router)
/components   - UI components (GlassCard, CustomKeyboard, etc.)
/hooks        - Custom React hooks
/lib          - Utility functions and Supabase client
/store        - Zustand stores
/services     - Data fetching and logic
/types        - TypeScript types
```

## 5. Key Decisions

- **Supabase:** Chosen for speed and integrated storage.
- **WebRTC Camera:** To provide a native integrated camera experience.
- **Glassmorphism:** To match iOS system aesthetics.

## 6. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| WebRTC permissions on iOS | Fallback to native `<input type="file">`. |
| Complexity of custom keyboard | Use a simple grid layout with Framer Motion for feedback. |
