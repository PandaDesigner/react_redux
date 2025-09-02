# Plan de Migración a Arquitectura Hexagonal

## 📋 Resumen Ejecutivo

Este documento detalla el plan sistemático para migrar el proyecto React/Redux/Next.js a una arquitectura hexagonal, manteniendo la integridad funcional y mejorando la mantenibilidad del código.

## 🎯 Objetivos de la Migración

- **Mantenibilidad**: Separar lógica de negocio de la presentación
- **Escalabilidad**: Estructura modular para nuevos features
- **Testabilidad**: Componentes aislados y testeables
- **Separación de responsabilidades**: Capas bien definidas

## 📊 Análisis de Estructura Actual

### Features Identificados:

#### 1. Pokemon Feature 🎮
- **Componente**: `src/feature/pokemon/pokemon.component.tsx`
- **Estado**: `src/lib/reducers/pokemon.slice.ts`
- **Thunk**: `src/lib/thunk/pokemon.thunk.ts`
- **Página**: `src/app/pokemon/page.tsx`
- **Dependencias**: Redux Toolkit, API externa (PokeAPI)

#### 2. Counter Feature 🔢
- **Componente**: `src/feature/count/counter.components.tsx`
- **Estado**: `src/lib/reducers/contador.slice.ts`
- **Página**: `src/app/counter/page.tsx`
- **Dependencias**: Redux Toolkit (operaciones síncronas)

#### 3. Auth Feature 🔐
- **Estado**: Carpeta preparada pero vacía
- **Nota**: Feature futuro para implementar

### Infraestructura Compartida:
- **Store**: `src/lib/store/store.ts`
- **Hooks**: `src/lib/hooks.ts`
- **Provider**: `src/app/StoreProvider.tsx`

## 🏗️ Nueva Estructura Hexagonal

```
src/
├── feature/
│   ├── pokemon/
│   │   ├── core/                    # Lógica de negocio pura
│   │   │   ├── pokemon.service.ts   # Servicios de dominio
│   │   │   ├── pokemon.entity.ts    # Entidades de dominio
│   │   │   └── pokemon.types.ts     # Tipos de dominio
│   │   ├── repository/              # Adaptadores de datos
│   │   │   ├── pokemon.repository.ts
│   │   │   └── pokemon-api.adapter.ts
│   │   ├── hooks/                   # Puentes UI ↔ Actions
│   │   │   └── use-pokemon.hooks.ts
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── pokemon-list.component.tsx
│   │   │   ├── pokemon-card.component.tsx
│   │   │   └── pokemon-pagination.component.tsx
│   │   ├── types/                   # Tipos específicos del feature
│   │   │   └── pokemon.types.ts
│   │   ├── actions/                 # Next.js Server Actions
│   │   │   └── pokemon.actions.ts
│   │   ├── server/                  # Utilidades del servidor
│   │   │   └── pokemon.server.ts
│   │   └── pokemon.tsx              # Entry point del feature
│   │
│   ├── counter/
│   │   ├── core/
│   │   │   ├── counter.service.ts
│   │   │   ├── counter.entity.ts
│   │   │   └── counter.types.ts
│   │   ├── hooks/
│   │   │   └── use-counter.hooks.ts
│   │   ├── components/
│   │   │   ├── counter-display.component.tsx
│   │   │   └── counter-controls.component.tsx
│   │   ├── types/
│   │   │   └── counter.types.ts
│   │   ├── actions/
│   │   │   └── counter.actions.ts
│   │   └── counter.tsx
│   │
│   └── auth/                        # Feature futuro
│       ├── core/
│       ├── repository/
│       ├── hooks/
│       ├── components/
│       ├── types/
│       ├── actions/
│       ├── server/
│       └── auth.tsx
│
├── shared/                          # Infraestructura compartida
│   ├── store/
│   │   ├── store.ts
│   │   └── root-reducer.ts
│   ├── hooks/
│   │   └── redux.hooks.ts
│   ├── types/
│   │   └── common.types.ts
│   └── utils/
│       └── common.utils.ts
│
└── components/                      # Componentes UI globales
    └── ui/
```

## 📅 Plan de Migración por Fases

### Fase 1: Preparación de Infraestructura ⚙️
**Duración estimada**: 1-2 días

1. **Crear estructura de carpetas hexagonal**
2. **Migrar store y hooks compartidos a `/shared`**
3. **Establecer convenciones de naming**
4. **Configurar herramientas de validación**

### Fase 2: Migración Pokemon Feature (Piloto) 🎮
**Duración estimada**: 3-4 días
**Prioridad**: Alta - Feature más complejo, ideal para validar arquitectura

#### Pasos detallados:
1. **Crear `pokemon.service.ts`** - Extraer lógica de negocio del thunk
2. **Crear `pokemon.repository.ts`** - Abstraer llamadas a API
3. **Crear `pokemon-api.adapter.ts`** - Adaptador para PokeAPI
4. **Migrar componente a arquitectura modular**
5. **Crear `use-pokemon.hooks.ts`** - Puente entre UI y actions
6. **Crear `pokemon.actions.ts`** - Server Actions de Next.js
7. **Actualizar imports y dependencias**
8. **Pruebas de integración**

### Fase 3: Migración Counter Feature 🔢
**Duración estimada**: 2-3 días
**Prioridad**: Media - Feature simple, validación de patrones

#### Pasos:
1. **Aplicar misma estructura hexagonal**
2. **Crear servicios de dominio simples**
3. **Modularizar componentes**
4. **Migrar estado a nueva estructura**
5. **Pruebas de funcionalidad**

### Fase 4: Preparación Auth Feature 🔐
**Duración estimada**: 1-2 días
**Prioridad**: Baja - Feature futuro

#### Pasos:
1. **Crear estructura completa**
2. **Definir interfaces y contratos**
3. **Preparar integración con Supabase**
4. **Documentar patrones para desarrollo futuro**

## 🧪 Estrategia de Testing y Validación

### Testing por Fase:

#### Tests de Unidad:
- Servicios de dominio (`*.service.test.ts`)
- Repositorios (`*.repository.test.ts`)
- Hooks personalizados (`*.hooks.test.ts`)

#### Tests de Integración:
- Flujo completo de cada feature
- Interacción entre capas
- APIs externas (mocks)

#### Tests E2E:
- Funcionalidad completa desde UI
- Navegación entre features
- Estados de error y loading

### Criterios de Validación:
✅ **Funcionalidad**: Todas las características existentes funcionan igual
✅ **Performance**: No degradación en tiempos de respuesta
✅ **Mantenibilidad**: Código más modular y testeable
✅ **Escalabilidad**: Fácil agregar nuevos features
✅ **Separación**: Lógica de negocio independiente de UI

## 🔄 Consideraciones de Retrocompatibilidad

### Estrategia de Migración Sin Interrupciones:

1. **Migración Gradual**: Un feature a la vez
2. **Mantener Interfaces**: Preservar contratos existentes durante transición
3. **Feature Flags**: Habilitar/deshabilitar nueva arquitectura por feature
4. **Rollback Plan**: Capacidad de revertir cambios rápidamente
5. **Documentación**: Cada paso documentado para trazabilidad

### Puntos Críticos de Atención:
- **Redux Store**: Mantener estructura de estado durante migración
- **API Calls**: Preservar comportamiento de llamadas externas
- **Routing**: No cambiar rutas existentes de Next.js
- **Props Interface**: Mantener contratos de componentes

## 📊 Beneficios Esperados

### Mantenibilidad 🔧
- Lógica de negocio separada de UI
- Componentes más pequeños y enfocados
- Fácil localización de bugs

### Escalabilidad 📈
- Estructura consistente para nuevos features
- Reutilización de patrones establecidos
- Independencia entre features

### Testing 🧪
- Servicios testeable de forma aislada
- Mocks más simples para repositorios
- Cobertura de testing mejorada

### Separación de Responsabilidades 🎯
- **Core**: Lógica de negocio pura
- **Repository**: Acceso a datos
- **Components**: Presentación
- **Hooks**: Orquestación UI-Logic

## 🚀 Próximos Pasos Inmediatos

1. **Validar el plan con el equipo**
2. **Comenzar Fase 1: Preparación de infraestructura**
3. **Crear branch de migración para Pokemon feature**
4. **Establecer métricas de éxito**
5. **Definir cronograma detallado**

## 📝 Notas de Implementación

- **Convenciones de Naming**: Seguir estándares establecidos en custom_instructions
- **TypeScript**: Tipado estricto en todas las capas
- **Testing**: Cobertura mínima del 80%
- **Documentación**: Cada componente debe tener su documentación
- **Performance**: Usar React.memo y optimizaciones donde sea necesario

---

**Fecha de creación**: $(date)
**Versión**: 1.0
**Estado**: En progreso