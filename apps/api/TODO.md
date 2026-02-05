# ⚙️ Backend TODO - TaskFlow API

> **Focus**: Support new Core Features (Visibility, Priorities, Features)

## 🚀 Phase 1: Core Evolution (Backend)

### Schema & Data Modeling

- [ ] **Update Prisma Schema**
  - Add `Visibility` enum (PUBLIC, PRIVATE) to Project
  - [x] Add `Priority` enum (VERY_HIGH...VERY_LOW) to Task
  - [x] Rename `TaskStatus` OPEN -> TODO (and IN_PROGRESS -> DOING)
  - Create `Feature` model (id, name, description, projectId)
  - Update relations (Project -> Features -> Tasks)

### API Features

- [ ] **Features Module**
  - Create CRUD endpoints for Features
  - Ensure Project ownership validation
- [ ] **Task Enhancements**
  - [x] Update Task DTOs to support Priority
  - [ ] Support FeatureId in Task DTOs
  - [ ] Implement linking tasks to feature
- [ ] **Project Enhancements**
  - Implement visibility logic in `findOne` (allow public access without auth options)

---

## 🧹 Technical Debt & Clean Up

- [ ] Remove any `console.log()` statements
- [ ] Fix ESLint warnings
- [ ] Add Swagger/OpenAPI documentation
- [ ] Add at least ONE test file as example

---

## 📊 Production Readiness (Post-Core)

### Security Enhancements

- [ ] Rate limiting with `@nestjs/throttler`
- [ ] Helmet.js for security headers
- [ ] CORS strict configuration for production

### Architecture

- [ ] Repository pattern implementation
- [ ] Separate permission guards/services
- [ ] Database migrations strategy
