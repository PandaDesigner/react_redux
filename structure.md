src/
├── feature/
│ ├── pokemon/
│ │ ├── core/ # Lógica de negocio pura
│ │ │ ├── pokemon.service.ts # Servicios de dominio
│ │ │ ├── pokemon.entity.ts # Entidades de dominio
│ │ │ └── pokemon.types.ts # Tipos de dominio
│ │ ├── repository/ # Adaptadores de datos
│ │ │ ├── pokemon.repository.ts
│ │ │ └── pokemon-api.adapter.ts
│ │ ├── hooks/ # Puentes UI ↔ Actions
│ │ │ └── use-pokemon.hooks.ts
│ │ ├── components/ # Componentes reutilizables
│ │ │ ├── pokemon-list.component.tsx
│ │ │ ├── pokemon-card.component.tsx
│ │ │ └── pokemon-pagination.component.tsx
│ │ ├── types/ # Tipos específicos del feature
│ │ │ └── pokemon.types.ts
│ │ ├── actions/ # Next.js Server Actions
│ │ │ └── pokemon.actions.ts
│ │ ├── server/ # Utilidades del servidor
│ │ │ └── pokemon.server.ts
│ │ └── pokemon.tsx # Entry point del feature
│ │
│ ├── counter/
│ │ ├── core/
│ │ │ ├── counter.service.ts
│ │ │ ├── counter.entity.ts
│ │ │ └── counter.types.ts
│ │ ├── hooks/
│ │ │ └── use-counter.hooks.ts
│ │ ├── components/
│ │ │ ├── counter-display.component.tsx
│ │ │ └── counter-controls.component.tsx
│ │ ├── types/
│ │ │ └── counter.types.ts
│ │ ├── actions/
│ │ │ └── counter.actions.ts
│ │ └── counter.tsx
│ │
│ └── auth/ # Feature futuro
│ ├── core/
│ ├── repository/
│ ├── hooks/
│ ├── components/
│ ├── types/
│ ├── actions/
│ ├── server/
│ └── auth.tsx
│
├── shared/ # Infraestructura compartida
│ ├── store/
│ │ ├── store.ts
│ │ └── root-reducer.ts
│ ├── hooks/
│ │ └── redux.hooks.ts
│ ├── types/
│ │ └── common.types.ts
│ └── utils/
│ └── common.utils.ts
│
└── components/ # Componentes UI globales
└── ui/
