#### Project Rules - Sistema de Gestión de Tareas y Reservas

Framework y Tecnologías

### Framework principal: Next.js

- Lenguaje: TypeScript obligatorio
- Validación: Zod para todos los schemas y validaciones
- Estado global: Redux
- Base de datos y Auth: Supabase
- UI/UX: shadcn/ui

### Arquitectura y Estructura

- Patrón arquitectónico: Arquitectura hexagonal
- Carpetas por feature (ejemplo con booking/):

feature/
├── booking/
│ ├── core/  
│ ├── repository/  
│ ├── hooks/  
│ ├── components/  
│ ├── types/  
│ ├── actions/  
│ └── server/

- Archivo raíz del feature: booking.tsx para entrypoint de página/feature.

### Naming Convention de Archivos

- Servicios (lógica de negocio / core): name-case.service.ts
- Actions de Next.js: name-case.actions.ts
- Custom hooks: use-case.hooks.ts
- Componentes reutilizables de la feature: name-case.component.tsx
- Views / Entry Components: name-case.tsx
  Ejemplo con booking:

booking.service.ts
booking.actions.ts
useBooking.hooks.ts
booking-form.component.tsx
booking.tsx

### Paradigma de Programación

- POO obligatoria para lógica de negocio en servicios
- Separación estricta entre UI y lógica de negocio
- Next.js Actions obligatoriamente en feature/name/actions
- Server utilities en feature/name/server
- Hooks personalizados:
  - Actúan solo como puente (UI ↔ Actions ↔ Servicios)
- Usar React 19 hooks:
  - useActionState para flujos async con actions
  - useOptimistic para estados temporales
  - use para promesas/contextos async

### Metodología

- Scrum para gestión de backlog y sprints
- Cada historia de usuario → una tarea atómica en Jira o herramienta equivalente

### Integraciones con WhatsApp, email y redes sociales como canales de entrada de reservas/tareas

### Estilo de Código

- Cada línea debe terminar con ;
- Línea en blanco después de cada sentencia
- Convenciones:
  - camelCase → funciones, variables, hooks
  - PascalCase → clases y componentes
  - snake_case → base de datos
    UI limpia: ningún service o repository debe ser usado directamente dentro de componentes → solo vía hooks

### Funcionalidades Core

- Auth con Supabase
- Gestión de tareas con estados SCRUM
- Booking de servicios (reservas) con calendarios y validación de disponibilidad
- Dashboard administrativo centralizado
- Restricciones
- No usar librerías distintas a shadcn/ui para UI
- Actions no pueden ir fuera de /actions
- Servicios no deben mezclarse con UI ni hooks
- Hooks no contienen POO, solo orquestan.

### Restricciones

- No usar librerías distintas a shadcn/ui para UI
- Actions no pueden ir fuera de /actions
- Servicios no deben mezclarse con UI ni hooks
- Hooks no contienen POO, solo orquestan

Estructura de carpeta recomendada
feature/
└── name/
│ ├── rules/
│ │ └── name_rules.md
│ └── check-list/
│ │ └── name_list.md
Contenido mínimo en check-list/name_list.md
Identificación del Feature
Nombre de la feature
Sprint o milestone al que pertenece
Status Tracking
[ ] → pendiente
[x] → completado
[~] → en progreso
Checklist dividido por etapas
Setup inicial (estructura de carpetas, base de datos en Supabase, schemas en Zod, etc.)
Lógica (core/service)
Actions (server actions Next.js)
Hooks (React 19: useActionState, useOptimistic, etc.)
UI Components (con shadcn/ui)
Repository (integraciones con Supabase u otros servicios)
Tests (unitarios / integración / e2e)
Integraciones externas (WhatsApp, email, redes sociales si aplica)

### Ejemplo real:

- Ruta: feature/booking/check-list/name_list.md

# Checklist - Booking Feature

## Identificación

- Feature: Booking (reservas de servicios)
- Sprint: Sprint 02 - Gestión de reservas v1

---

## Checklist de tareas

### Setup inicial

- [x] Crear carpetas base (`core`, `repository`, `hooks`, `components`, `actions`, `server`, `types`, `rules`, `check-list`)
- [x] Definir `booking.schema.ts` con Zod
- [ ] Configurar tabla `bookings` en Supabase

### Lógica (core/service)

- [ ] Implementar `booking.service.ts` con clases (OOP)
- [ ] Validación de disponibilidad de horarios

### Actions

- [ ] Crear `booking.actions.ts`
- [ ] Action `createBooking`
- [ ] Action `cancelBooking`

### Hooks

- [ ] `useBooking.hooks.ts` usando `useActionState`
- [ ] Manejo de updates optimistas con `useOptimistic`

### UI Components

- [ ] `booking-form.component.tsx`
- [ ] `booking-list.component.tsx`

### Repository

- [ ] `booking.repository.ts` con llamadas a Supabase

### Tests

- [ ] Unit test de `booking.service.ts`
- [ ] Integration test de `booking.actions.ts`
- [ ] E2E test desde UI → DB

### Integraciones externas

- [ ] WhatsApp API para confirmación de reserva
- [ ] Email SMTP para notificación de usuario
- [ ] Social Media API (Facebook Events) opcional

Ruta: feature/booking/rules/name_rules.md

# Booking Rules

## Descripción

La feature `booking` gestiona reservas online de servicios.  
Resuelve la necesidad de agendar citas vía WhatsApp, email o redes sociales.

## Arquitectura Interna

- `booking.service.ts`: lógica OOP para manejar reservas
- `booking.actions.ts`: server actions de creación y cancelación
- `useBooking.hooks.ts`: orquestación de UI ↔ Actions
- `booking-form.component.tsx`: formulario UI (shadcn/ui)
- `repository/booking.repository.ts`: conexión con Supabase

## Flujo principal

1. Usuario envía solicitud → componente `booking-form.component.tsx`
2. Hook `useBooking.hooks.ts` dispara validaciones (Zod)
3. Hook llama a `booking.actions.ts` usando `useActionState`
4. Action delega a `booking.service.ts` (OOP)
5. Service persiste con `booking.repository.ts` en Supabase

## Reglas especiales

- Los estados UI deben manejarse con `useOptimistic`
- Las validaciones de fechas → Zod schema en `/types/booking.schema.ts`
- Reservas duplicadas se rechazan en capa `service`

## Integraciones

- WhatsApp API
- Email SMTP
- Facebook Events API

## Casos de prueba

- Unit test: `booking.service.ts` (lógica de disponibilidad)
- Integration test: `booking.actions.ts`
- E2E: flujo de reserva desde formulario hasta DB persistida
