# Database Schema Diagrams / Diagramas de Esquema de Base de Datos

## Entity Relationship Diagram / Diagrama de Relación de Entidades

### English
This document contains the database schema diagrams for the Personal Finance Tracker backend application using Mermaid syntax.

### Español
Este documento contiene los diagramas de esquema de base de datos para la aplicación backend de seguimiento de finanzas personales usando sintaxis Mermaid.

## Main Database Schema / Esquema Principal de Base de Datos

```mermaid
erDiagram
    TRANSACTIONS {
        int id PK "Primary Key - Auto Increment"
        varchar user_id "User Identifier (255 chars)"
        varchar title "Transaction Description (255 chars)"
        decimal amount "Transaction Amount (10,2)"
        varchar category "Transaction Category (255 chars)"
        date created_at "Creation Date (Default: CURRENT_DATE)"
    }
```

## Detailed Table Structure / Estructura Detallada de Tablas

### Table: transactions

```mermaid
classDiagram
    class transactions {
        +int id
        +varchar(255) user_id
        +varchar(255) title
        +decimal(10,2) amount
        +varchar(255) category
        +date created_at
        --
        +getTransactionsByUserId()
        +createTransaction()
        +deleteTransaction()
        +getSummaryByUserId()
    }
```

## Data Flow Diagram / Diagrama de Flujo de Datos

```mermaid
flowchart TD
    A[Client Request] --> B[Rate Limiter Middleware]
    B --> C{Rate Limit Check}
    C -->|Allowed| D[Express JSON Parser]
    C -->|Blocked| E[429 Too Many Requests]
    D --> F[Route Handler]
    F --> G[Controller Function]
    G --> H[Input Validation]
    H --> I{Valid Input?}
    I -->|Yes| J[Database Query]
    I -->|No| K[400 Bad Request]
    J --> L[Neon PostgreSQL]
    L --> M[Query Result]
    M --> N[Format Response]
    N --> O[Send Response to Client]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style G fill:#f3e5f5
    style L fill:#e8f5e8
    style O fill:#e1f5fe
```

## API Endpoints Architecture / Arquitectura de Endpoints API

```mermaid
graph LR
    A[Client] --> B[Express Server]
    B --> C[Rate Limiter]
    C --> D[JSON Parser]
    D --> E[Transaction Routes]
    
    E --> F[GET /:userId]
    E --> G[POST /]
    E --> H[DELETE /:id]
    E --> I[GET /summary/:userId]
    
    F --> J[getTransactionsByUserId]
    G --> K[createTransaction]
    H --> L[deleteTransaction]
    I --> M[getSummaryByUserId]
    
    J --> N[Database]
    K --> N
    L --> N
    M --> N
    
    N --> O[Neon PostgreSQL]
    
    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#ffebee
    style E fill:#f3e5f5
    style O fill:#e8f5e8
```

## Transaction Types Flow / Flujo de Tipos de Transacciones

```mermaid
flowchart TD
    A[New Transaction] --> B{Amount Value}
    B -->|Positive| C[Income Transaction]
    B -->|Negative| D[Expense Transaction]
    
    C --> E[Add to Income Summary]
    D --> F[Add to Expenses Summary]
    
    E --> G[Update Balance]
    F --> G
    
    G --> H[Store in Database]
    H --> I[Return Transaction Object]
    
    style C fill:#c8e6c9
    style D fill:#ffcdd2
    style G fill:#e1f5fe
    style H fill:#f3e5f5
```

## Database Constraints and Relationships / Restricciones y Relaciones de Base de Datos

### English

**Table: transactions**
- **Primary Key**: `id` (SERIAL, auto-increment)
- **Required Fields**: All fields are NOT NULL except `created_at` which has a default value
- **Data Types**:
  - `id`: SERIAL (auto-incrementing integer)
  - `user_id`: VARCHAR(255) - stores user identifier
  - `title`: VARCHAR(255) - transaction description
  - `amount`: DECIMAL(10,2) - monetary amount with 2 decimal places
  - `category`: VARCHAR(255) - transaction category
  - `created_at`: DATE - defaults to current date

**Business Rules**:
- Positive amounts represent income
- Negative amounts represent expenses
- Each transaction must belong to a user (user_id)
- Transactions are ordered by creation date (DESC) by default

### Español

**Tabla: transactions**
- **Clave Primaria**: `id` (SERIAL, auto-incremento)
- **Campos Requeridos**: Todos los campos son NOT NULL excepto `created_at` que tiene un valor por defecto
- **Tipos de Datos**:
  - `id`: SERIAL (entero auto-incrementable)
  - `user_id`: VARCHAR(255) - almacena identificador de usuario
  - `title`: VARCHAR(255) - descripción de la transacción
  - `amount`: DECIMAL(10,2) - cantidad monetaria con 2 decimales
  - `category`: VARCHAR(255) - categoría de la transacción
  - `created_at`: DATE - por defecto fecha actual

**Reglas de Negocio**:
- Cantidades positivas representan ingresos
- Cantidades negativas representan gastos
- Cada transacción debe pertenecer a un usuario (user_id)
- Las transacciones se ordenan por fecha de creación (DESC) por defecto

## Future Schema Extensions / Extensiones Futuras del Esquema

```mermaid
erDiagram
    USERS {
        int id PK
        varchar email
        varchar name
        timestamp created_at
        timestamp updated_at
    }
    
    CATEGORIES {
        int id PK
        varchar name
        varchar description
        varchar color
        timestamp created_at
    }
    
    TRANSACTIONS {
        int id PK
        int user_id FK
        int category_id FK
        varchar title
        decimal amount
        timestamp created_at
        timestamp updated_at
    }
    
    BUDGETS {
        int id PK
        int user_id FK
        int category_id FK
        decimal limit_amount
        varchar period
        timestamp created_at
    }
    
    USERS ||--o{ TRANSACTIONS : "has many"
    USERS ||--o{ BUDGETS : "has many"
    CATEGORIES ||--o{ TRANSACTIONS : "categorizes"
    CATEGORIES ||--o{ BUDGETS : "limits"
```

---

**Note / Nota**: These diagrams represent the current database schema and potential future extensions for the Personal Finance Tracker backend application.

**Nota**: Estos diagramas representan el esquema actual de la base de datos y posibles extensiones futuras para la aplicación backend de seguimiento de finanzas personales.