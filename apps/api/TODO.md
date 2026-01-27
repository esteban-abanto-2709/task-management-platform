# ⚙️ Backend Roadmap & TODOs (NestJS)

Lista de tareas pendientes, deuda técnica y mejoras para la API.

## 🛠️ Refactorización y Código

- [ ] **Servicios**
  - [ ] `tasks.service.ts`: Extraer validaciones a Guards o Servicios de Permisos.
  - [ ] `projects.service.ts`: Centralizar lógica de permisos.
- [ ] **Arquitectura**
  - [ ] Crear módulo `common/` para utilidades compartidas.
  - [ ] Implementar Interceptores Globales (Transformación y Errores).

## 🔒 Seguridad y Rendimiento

- [ ] **Seguridad**
  - [ ] Rate Limiting (`@nestjs/throttler`).
  - [ ] Sanitización de inputs.
  - [ ] Configurar CORS estricto para producción.
- [ ] **API**
  - [ ] Implementar Paginación en endpoints `/projects` y `/tasks`.
  - [ ] Documentación con Swagger/OpenAPI.

## 🧪 Testing

- [ ] Unit Tests para Services.
- [ ] E2E Tests para flujos de autenticación y creación de recursos.
