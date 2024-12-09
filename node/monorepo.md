# Ecommerce Microservices Monorepo Setup Guide

## Directory Structure
```
ecommerce-platform/
├── .github/
│   └── workflows/            # CI/CD workflows
├── .husky/                   # Git hooks
├── apps/
│   ├── frontend/            # Next.js frontend application
│   └── services/
│       ├── product/         # Product service
│       ├── cart/            # Cart service
│       ├── user/            # User service
│       ├── order/           # Order service
│       ├── inventory/       # Inventory service
│       └── shipping/        # Shipping service
├── packages/
│   ├── eslint-config/       # Shared ESLint configuration
│   ├── typescript-config/   # Shared TypeScript configuration
│   ├── ui-components/      # Shared UI components
│   └── utils/              # Shared utilities
├── docs/
│   ├── architecture/       # Architecture documentation
│   ├── api/               # API documentation
│   └── guides/            # Development guides
├── tools/
│   ├── scripts/           # Build and deployment scripts
│   └── generators/        # Code generators
├── .gitignore
├── package.json
├── turbo.json             # Turborepo configuration
├── pnpm-workspace.yaml    # PNPM workspace configuration
└── README.md
```

## Initial Setup Steps

1. Initialize the project:
```bash
mkdir ecommerce-platform
cd ecommerce-platform
pnpm init
```

2. Install core dependencies:
```bash
pnpm add -D turbo typescript @types/node eslint prettier husky lint-staged
```

3. Create `pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/**'
  - 'packages/**'
```

4. Create `turbo.json`:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
    }
  }
}
```

5. Update root `package.json`:
```json
{
  "name": "ecommerce-platform",
  "version": "0.0.1",
  "private": true,
  "workspaces": [
    "apps/**",
    "packages/**"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@types/node": "^18.x",
    "eslint": "^8.x",
    "husky": "^8.x",
    "lint-staged": "^13.x",
    "prettier": "^2.x",
    "turbo": "^1.x",
    "typescript": "^4.x"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

6. Create shared TypeScript configuration in `packages/typescript-config/base.json`:
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "exclude": ["node_modules"]
}
```

7. Setup a microservice (example for product service):
```bash
mkdir -p apps/services/product
cd apps/services/product
pnpm init
```

8. Create `apps/services/product/package.json`:
```json
{
  "name": "@ecommerce/product-service",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "tsc",
    "dev": "ts-node-dev src/index.ts",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.x",
    "@nestjs/common": "^9.x",
    "@nestjs/core": "^9.x",
    "@nestjs/platform-express": "^9.x"
  },
  "devDependencies": {
    "@types/express": "^4.x",
    "@types/jest": "^29.x",
    "jest": "^29.x",
    "ts-jest": "^29.x",
    "ts-node-dev": "^2.x",
    "typescript": "^4.x"
  }
}
```

9. Setup Git hooks with Husky:
```bash
pnpm husky install
pnpm husky add .husky/pre-commit "pnpm lint-staged"
```

10. Create `.lintstagedrc.js`:
```javascript
module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,yml}': ['prettier --write'],
};
```

## Service Template Structure
Each service should follow this structure:

```
service-name/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── services/        # Business logic
│   ├── models/          # Data models
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── index.ts         # Service entry point
├── test/                # Test files
├── Dockerfile          # Container configuration
├── .env.example        # Environment variables template
├── package.json        # Service dependencies
└── tsconfig.json       # TypeScript configuration
```

## Shared Package Setup

1. Create UI components package:
```bash
mkdir -p packages/ui-components
cd packages/ui-components
pnpm init
```

2. Create utility package:
```bash
mkdir -p packages/utils
cd packages/utils
pnpm init
```

## Documentation Setup

1. Create basic documentation structure:
```bash
mkdir -p docs/{architecture,api,guides}
```

2. Create initial documentation files:
```markdown
# docs/architecture/overview.md
# System Architecture

## Services Overview
- Product Service
- Cart Service
- User Service
- Order Service
- Inventory Service
- Shipping Service

## Communication Patterns
- REST APIs
- Message Queues
- Event Bus

## Data Flow
[Add data flow diagrams]

## Technology Stack
- Frontend: Next.js
- Backend: NestJS/Express
- Database: [Your choice]
- Message Queue: [Your choice]
- Cache: Redis
```

## Next Steps:
1. Set up individual services with their specific dependencies
2. Configure Docker for each service
3. Set up CI/CD pipelines
4. Add monitoring and logging infrastructure
5. Create development environment setup documentation
6. Set up API gateway/BFF (Backend for Frontend)