# 🎨 Frontend TODO - TaskFlow Web

> **Status**: MVP Complete ✅  
> **Focus**: Critical fixes only before moving to next project

---

## 🎯 MVP Completion Checklist

### ✅ Core Features (DONE)

- [x] Landing page
- [x] Authentication (login/register)
- [x] Protected routes
- [x] Dashboard with projects list
- [x] Project detail page
- [x] Task management
- [x] Inline editing (projects & tasks)
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] State management (Zustand + Context)

---

## 🔥 CRITICAL - Must Fix Before CV Upload

### 1. Environment Variables ⚠️

- [ ] **Create `.env.example` file**
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:4000
  ```
- [ ] **Document in README**
  - Add setup instructions
  - Explain what each var does

**Priority**: HIGH  
**Estimated Time**: 15 minutes  
**Why**: Required for anyone cloning the repo

---

### 2. Loading States Consistency 🔄

- [ ] **Audit all loading states**
  - Verify dashboard shows skeleton/spinner while loading
  - Check project detail page
  - Check task detail page
  - Ensure no "flash of empty state"

**Priority**: MEDIUM  
**Estimated Time**: 30 minutes  
**Why**: Professional UX polish

---

### 3. Error Boundaries 🚨

- [ ] **Add basic error boundary**
  - Wrap app in error boundary
  - Show friendly error page instead of crash
  - File: `apps/web/src/app/error.tsx` (Next.js convention)

**Priority**: MEDIUM  
**Estimated Time**: 30 minutes  
**Why**: Prevents white screen of death

---

### 4. 404 Page 🔍

- [ ] **Create custom 404 page**
  - File: `apps/web/src/app/not-found.tsx`
  - Add link back to dashboard
  - Match design system

**Priority**: LOW  
**Estimated Time**: 20 minutes  
**Why**: Professional touch

---

## 🧹 Quick Cleanup Tasks

### UI Polish (Quick wins)

- [ ] **Remove "Coming soon" placeholders**
  - In `StatsGrid` component (dashboard metrics)
  - Either remove or implement real counters
  - File: `apps/web/src/components/dashboard/StatsGrid.tsx`

**Priority**: MEDIUM  
**Estimated Time**: 1 hour (to implement real counters)  
**Alternative**: Remove the cards entirely (10 minutes)

---

- [ ] **Fix search bar in header**
  - Currently non-functional
  - Either remove or add note "Search (coming soon)"
  - File: `apps/web/src/components/dashboard/layout/DashboardHeader.tsx`

**Priority**: LOW  
**Estimated Time**: 5 minutes (to hide) or 3 hours (to implement)  
**Recommendation**: Hide for MVP

---

- [ ] **Help page placeholder**
  - Route exists but page missing: `/dashboard/help`
  - Add simple page or remove link

**Priority**: LOW  
**Estimated Time**: 20 minutes

---

### Code Quality

- [ ] **Remove console.logs**
  - Search for `console.log` in all files
  - Remove or replace with proper error handling

**Priority**: LOW  
**Estimated Time**: 15 minutes

---

- [ ] **TypeScript strict mode audit**
  - Fix any `any` types if possible
  - Verify no `@ts-ignore` without comments

**Priority**: LOW  
**Estimated Time**: 30 minutes

---

## 🎨 Visual Polish (Optional)

### Design Consistency

- [ ] **Verify responsive breakpoints**
  - Test on mobile (375px)
  - Test on tablet (768px)
  - Test on desktop (1920px)
  - Sidebar should collapse on mobile

**Priority**: MEDIUM  
**Estimated Time**: 1 hour  
**Why**: Mobile experience matters

---

- [ ] **Empty states**
  - "No projects" state exists ✅
  - "No tasks" state exists ✅
  - Verify they look good

**Priority**: LOW  
**Estimated Time**: 15 minutes

---

### Accessibility (Nice-to-have)

- [ ] **Add ARIA labels** where needed
- [ ] **Keyboard navigation** audit
- [ ] **Focus indicators** visible

**Priority**: LOW (but impressive)  
**Estimated Time**: 2 hours  
**Why**: Shows you care about a11y

---

## 📊 Production Readiness (Post-CV Upload)

**These are for AFTER you've moved on, if you come back to this project**:

### Performance

- [ ] Implement code splitting
- [ ] Image optimization
- [ ] Bundle size analysis
- [ ] Lighthouse audit (target: 90+)

### Features

- [ ] Real-time metrics in dashboard
- [ ] Search functionality
- [ ] Filters and sorting
- [ ] Bulk operations
- [ ] Keyboard shortcuts

### Testing

- [ ] Component tests (Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests

### UX Enhancements

- [ ] Toast notifications system
- [ ] Confirmation modals for destructive actions
- [ ] Undo/redo functionality
- [ ] Optimistic UI updates
- [ ] Skeleton loaders everywhere

---

## ✅ Definition of "Done" for MVP

**The frontend is CV-ready when**:

1. ✅ All core features work (they do)
2. ⚠️ User profile shows actual data (needs fix)
3. ✅ Responsive on mobile/tablet/desktop
4. ✅ No broken links or 404s (mostly)
5. ⚠️ No "Coming soon" placeholders (needs fix)
6. ✅ Loading states exist
7. ⚠️ Error boundary exists (needs add)
8. ✅ Clean code (no obvious bugs)

**Current Status**: 5/8 complete

**Remaining Time to "Done"**: 2-3 hours max

---

## 🎯 Recommended Action Plan

### Critical Path (2 hours)

1. Create `.env.example` and document (15 min)
2. Fix user profile in header (15 min)
3. Add error boundary (30 min)
4. Remove/fix "Coming soon" in StatsGrid (choose: 10 min to remove OR 1 hour to implement)
5. Hide search bar (5 min)
6. Add 404 page (20 min)
7. Quick responsive test (15 min)

### Optional (1 more hour)

8. Implement real dashboard metrics (1 hour)
9. Add help page (20 min)
10. Accessibility audit (40 min)

### Then STOP and move to next project ✋
