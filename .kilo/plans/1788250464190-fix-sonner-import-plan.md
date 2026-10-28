# Fix `@/components/ui/sonner` Module Not Found Error

## Problem

`src/features/auth/store/authStore.ts:4` imports from `@/components/ui/sonner`, but:

- No file named `sonner.tsx` / `sonner.ts` exists in `src/components/ui/`.
- The `sonner` npm package is **not** installed in `package.json` (project uses `@base-ui/react/toast` instead).
- A custom `src/components/ui/toast.tsx` already exports a `toast` manager with `.success()` / `.error()` methods that match the call sites (`authStore.ts:69`, `authStore.ts:73`).

Result: TypeScript / Vite cannot resolve the import → build fails.

## Decision

Switch the import to the existing `toast.tsx` module. The exported `toast` object's API is API-compatible with the Sonner-style `toast.success()` / `toast.error()` calls already used in `authStore.ts`, so no call-site changes are required.

Also mount the `<Toaster />` component once at the app root so the toasts actually render (the `toast` manager is created in `toast.tsx:8` but never rendered anywhere — currently `App.tsx` and `RootLayout.tsx` contain no `<Toaster />`).

## Affected Files

- `src/features/auth/store/authStore.ts` — change the import.
- `src/routes/RootLayout.tsx` — mount `<Toaster />` (preferred, so it covers all routes).
  - Alternative: mount in `src/App.tsx`. RootLayout is preferable because it already wraps every route via `<Outlet />`.

## Tasks

1. **Fix the import** in `src/features/auth/store/authStore.ts:4`:
   ```ts
   import { toast } from '@/components/ui/toast';
   ```

2. **Mount the Toaster** in `src/routes/RootLayout.tsx`:
   ```tsx
   import { Toaster } from '@/components/ui/toast';
   // ...
   <div className="min-h-screen flex flex-col">
     <Navbar />
     <main className="flex-1">
       <Outlet />
     </main>
     <Toaster />
   </div>
   ```

## Verification

- Run `npm run build` — should complete with no `Cannot find module '@/components/ui/sonner'` error.
- Trigger `signOut()` in the app and confirm a success toast appears.
- Trigger an auth error path and confirm an error toast appears.

## Out of Scope / Note

The previously reported `signUp` parameter order mismatch (interface declares `firstName, lastName, email, password` but implementation reads `email, password, firstName, lastName`) is still present in `authStore.ts:55`. Fixing it is a separate concern and not required to resolve the current import error. Flag for a follow-up if not already addressed.
