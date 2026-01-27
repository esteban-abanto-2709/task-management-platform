# 🎨 Frontend Roadmap & TODOs (Next.js)

Este documento rastrea la deuda técnica, refactorización y mejoras específicas para la aplicación web.

## 🚨 Prioridad Alta: Refactorización

**Objetivo de la semana:** Desacoplar componentes "God Object" para mejorar mantenibilidad.

- [ ] **Desacoplar `dashboard/page.tsx`** (Muy complejo)
  - [ ] Crear hook `useProjects` para lógica de fetching y estado.
  - [ ] Extraer componente `<StatsCards />` (Tarjetas de resumen).
  - [ ] Extraer componente `<ProjectsTable />` (Tabla principal).
  - [ ] Extraer componente `<CreateProjectDialog />` (Modal).
  - [ ] Mover lógica de formularios a hooks personalizados.

- [ ] **Desacoplar `dashboard/projects/[id]/page.tsx`** (Crítico)
  - [ ] Crear hook `useProject(id)` para manejo de datos del proyecto.
  - [ ] Crear hook `useTasks(projectId)` para manejo de tareas.
  - [ ] Componentizar UI:
    - [ ] `<ProjectHeader />` (Título y acciones).
    - [ ] `<ProjectInfo />` (Detalles y descripción).
    - [ ] `<TasksList />` (Lista de items).
    - [ ] `<TaskItem />` (Item individual).

## 💄 Diseño & UI

- [ ] **Implementar Design System**
  - [ ] Definir tokens de colores (terminar de decidir entre Glassmorphism vs Flat).
  - [ ] Estandarizar componentes base (`Button`, `Input`, `Card`).
  - [ ] Unificar estilos de `Navbar` y `Footer` entre Landing y Dashboard.

## 🏗️ Mejoras Técnicas

- [ ] **Hooks Globales**
  - [ ] `hooks/useApi.ts`: Wrapper para llamadas al backend con manejo de errores consistente.
- [ ] **UX**
  - [ ] Implementar Skeleton Loaders (reemplazar textos "Loading...").
  - [ ] Añadir Error Boundaries para evitar pantallas blancas en caso de fallo.
- [ ] **Testing**
  - [ ] Tests de integración para flujos principales (Crear proyecto, Crear tarea).

## 🔮 Funcionalidades Futuras

- [ ] KPIs reales en Dashboard (conectar con backend).
- [ ] Filtros y búsqueda en tablas.
