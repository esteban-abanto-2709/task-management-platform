# 🗺️ Roadmap Global - TaskFlow

Visión de alto nivel y objetivos transversales del proyecto. Para tareas técnicas específicas, ver:

- Frontend: [`apps/web/TODO.md`](./apps/web/TODO.md)
- Backend: [`apps/api/TODO.md`](./apps/api/TODO.md)

## 🎯 Hitos Principales

### 📦 Fase 1: Estabilización y DevOps (En Progreso)

Objetivo: Tener un entorno de desarrollo robusto y listo para despliegue.

- [ ] **Dockerización**
  - [ ] `docker-compose.yml` en raíz orquestando todo.
  - [ ] Dockerfiles optimizados para API y Web.
  - [ ] Scripts de "One-click setup" para nuevos desarrolladores.

### 🎨 Fase 2: Experiencia de Usuario y Polish (Próxima Prioridad)

Objetivo: Mejorar la UI/UX y eliminar deuda técnica del Frontend.

- [ ] **Refactorización Frontend**: Modularización masiva de Dashboard.
- [ ] **Consistencia Visual**: Unificar Design System.
- [ ] **Feedback al Usuario**: Skeletons, Toasts de error/éxito mejorados.

### 🚀 Fase 3: Features y Escalabilidad

Objetivo: Funcionalidades avanzadas para producción.

- [ ] ** Métricas Reales**: Dashboard con datos calculados en tiempo real.
- [ ] **Seguridad**: Hardening de API, Rate Limiting.
- [ ] **Testing**: Cobertura crítica (E2E y Unit).
