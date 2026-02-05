# 🗺️ Roadmap - TaskFlow

> **Focus**: Core Platform Evolution & Rebranding

## 🚀 Phase 1: Core Platform Evolution (Current Focus)

**Objetivo**: Transformar la plataforma en un sistema especializado para desarrollo de software (Software Development Management System), mejorando la organización y la identidad visual.

### 1.1 Project Visibility System

- [ ] **Visibility Settings**
  - Implementar sistema Public/Private en proyectos
  - UI exclusiva para "Viewers" en proyectos públicos (sin permisos de edición)
  - Indicadores visuales de visibilidad en el dashboard

### 1.2 Advanced Classification

- [x] **Priority System**
  - [x] Implementar 5 niveles: Very High, High, Medium, Low, Very Low
  - [x] Visual badges/colors para cada prioridad

- [x] **Workflow Refinement**
  - Renombrar estado: "OPEN" → "TODO"
  - Migración de datos existentes

### 1.3 Feature-Based Organization (New Layer)

- [ ] **Feature Layer Implementation**
  - Nueva entidad "Features" entre Proyectos y Tareas
  - Casos de uso: "Enemigos", "Login System", "Inventory", etc.
  - Relación: Project -> Features -> Tasks
  - Filtrado y agrupación por Feature en el tablero

### 1.4 Rebranding & UX Overhaul

- [ ] **Software Dev Identity**
  - Rediseño enfocado en estética "Dev" (Dark mode first, technical typography)
  - Paleta de colores más técnica (Console colors, Syntax highlighting themes)
- [ ] **Design System Updates**
  - Nuevos componentes de UI alineados al rebrand
  - Mejora en la densidad de información para power users

---

## 🔧 Phase 2: Technical Debt & Production Polish

**Objetivo**: Llevar el proyecto a calidad production-ready y pagar deuda técnica.

### 2.1 DevOps & Deployment

- [ ] **Docker & Docker Compose**
  - Dockerfile para API y Web
  - docker-compose.yml orquestando todo
- [ ] **CI/CD Pipeline**
- [ ] **Deployment** (Railway/Vercel)

### 2.2 Quality & Security

- [ ] **Backend Testing** (Unit/Integration)
- [ ] **Frontend Testing** (Component/E2E)
- [ ] **API Security** (Rate limiting, CORS, Sanitization)

---

## 🎨 Phase 3: Future Enhancements

**Objetivo**: Features avanzadas que agregan valor real

- [ ] **Collaboration Features** (Team Workspaces)
- [ ] **Enhanced Task Management** (Details, Attachments)
- [ ] **Analytics & Insights**
- [ ] **Mobile App**

---

## 🎯 Next Steps Priority

1.  **Database Schema Update** (Visibility, Priorities, Features)
2.  **Backend Logic** (Features CRUD, Task Updates)
3.  **Frontend Rebranding** (Theme, Colors)
4.  **Frontend Logic** (Features UI, Priority UI)
