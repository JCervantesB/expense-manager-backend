# Personal Finance Tracker Backend

## Project Overview / Descripción del Proyecto

### English
This backend application powers a personal finance tracking system where users can register and manage their income and expenses. Built with Node.js and Express following MVC architecture, it provides a secure RESTful API for transaction management with PostgreSQL database integration through Neon and Redis-based rate limiting.

**Key Features:**
- User transaction management (income and expenses)
- Financial summary calculations
- RESTful API endpoints with MVC architecture
- PostgreSQL database with Neon integration
- Redis-based rate limiting with Upstash
- Real-time transaction tracking
- Category-based transaction organization
- Modular and scalable code structure

### Español
Esta aplicación backend alimenta un sistema de seguimiento de finanzas personales donde los usuarios pueden registrar y gestionar sus ingresos y gastos. Construido con Node.js y Express siguiendo arquitectura MVC, proporciona una API RESTful segura para la gestión de transacciones con integración de base de datos PostgreSQL a través de Neon y limitación de velocidad basada en Redis.

**Características Principales:**
- Gestión de transacciones de usuario (ingresos y gastos)
- Cálculos de resumen financiero
- Endpoints de API RESTful con arquitectura MVC
- Base de datos PostgreSQL con integración Neon
- Limitación de velocidad basada en Redis con Upstash
- Seguimiento de transacciones en tiempo real
- Organización de transacciones basada en categorías
- Estructura de código modular y escalable

## Folder Structure / Estructura de Carpetas

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js          # Database connection configuration
│   │   └── upstash.js     # Redis rate limiting configuration
│   ├── controllers/
│   │   └── transactionsController.js  # Transaction business logic
│   ├── middleware/
│   │   └── rateLimiter.js # Rate limiting middleware
│   ├── routes/
│   │   └── transactionsRoute.js       # API route definitions
│   └── server.js          # Main server file and app configuration
├── documentation/
│   ├── README.md          # Project documentation
│   └── mermaid.md         # Database schema diagrams
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── package-lock.json      # Dependency lock file
```

## Database Schema / Esquema de Base de Datos

### English
The database uses PostgreSQL with the following schema:

### Español
La base de datos utiliza PostgreSQL con el siguiente esquema:

```mermaid
erDiagram
    TRANSACTIONS {
        int id PK
        varchar user_id
        varchar title
        decimal amount
        varchar category
        date created_at
    }
```

### Table: transactions
| Field | Type | Description (EN) | Descripción (ES) |
|-------|------|------------------|------------------|
| id | SERIAL PRIMARY KEY | Unique transaction identifier | Identificador único de transacción |
| user_id | VARCHAR(255) | User identifier | Identificador de usuario |
| title | VARCHAR(255) | Transaction description | Descripción de la transacción |
| amount | DECIMAL(10,2) | Transaction amount (positive for income, negative for expenses) | Monto de la transacción (positivo para ingresos, negativo para gastos) |
| category | VARCHAR(255) | Transaction category | Categoría de la transacción |
| created_at | DATE | Transaction creation date | Fecha de creación de la transacción |

## Technologies Used / Tecnologías Utilizadas

### Backend Framework / Framework Backend
- **Node.js** - JavaScript runtime environment / Entorno de ejecución JavaScript
- **Express.js** - Web application framework / Framework de aplicación web

### Database / Base de Datos
- **PostgreSQL** - Relational database / Base de datos relacional
- **Neon** - Serverless PostgreSQL platform / Plataforma PostgreSQL serverless
- **@neondatabase/serverless** - Neon database driver / Driver de base de datos Neon

### Caching & Rate Limiting / Caché y Limitación de Velocidad
- **Redis** - In-memory data structure store / Almacén de estructuras de datos en memoria
- **Upstash** - Serverless Redis platform / Plataforma Redis serverless
- **@upstash/redis** - Upstash Redis client / Cliente Redis de Upstash
- **@upstash/ratelimit** - Rate limiting library / Librería de limitación de velocidad

### Development Tools / Herramientas de Desarrollo
- **nodemon** - Development server with auto-restart / Servidor de desarrollo con reinicio automático
- **dotenv** - Environment variable management / Gestión de variables de entorno
- **cors** - Cross-Origin Resource Sharing / Intercambio de recursos de origen cruzado

## Architecture Overview / Descripción de la Arquitectura

### English
The backend follows a **Model-View-Controller (MVC)** architecture pattern for better code organization and maintainability:

**Structure:**
- **Server Layer** (`src/server.js`): Main application entry point with Express setup and middleware configuration
- **Routes Layer** (`src/routes/`): API endpoint definitions and route handling
- **Controllers Layer** (`src/controllers/`): Business logic and request/response handling
- **Middleware Layer** (`src/middleware/`): Custom middleware for rate limiting and request processing
- **Configuration Layer** (`src/config/`): Database and external service configurations
- **Environment Configuration** (`.env`): Secure storage of environment variables

**API Design:**
- RESTful endpoints following standard HTTP methods
- JSON request/response format
- Rate limiting for API protection (100 requests per 60 seconds)
- Error handling with appropriate HTTP status codes
- Input validation for data integrity
- Modular controller-based architecture

**Data Flow:**
1. Client sends HTTP request to API endpoint
2. Rate limiting middleware checks request limits
3. Express middleware processes the request
4. Route handler delegates to appropriate controller
5. Controller validates input data and executes business logic
6. Database query executed through Neon connection
7. Response sent back to client with appropriate status code

### Español
El backend sigue un patrón de arquitectura **Modelo-Vista-Controlador (MVC)** para mejor organización y mantenibilidad del código:

**Estructura:**
- **Capa del Servidor** (`src/server.js`): Punto de entrada principal de la aplicación con configuración Express y middleware
- **Capa de Rutas** (`src/routes/`): Definiciones de endpoints API y manejo de rutas
- **Capa de Controladores** (`src/controllers/`): Lógica de negocio y manejo de solicitudes/respuestas
- **Capa de Middleware** (`src/middleware/`): Middleware personalizado para limitación de velocidad y procesamiento de solicitudes
- **Capa de Configuración** (`src/config/`): Configuraciones de base de datos y servicios externos
- **Configuración de Entorno** (`.env`): Almacenamiento seguro de variables de entorno

**Diseño de API:**
- Endpoints RESTful siguiendo métodos HTTP estándar
- Formato de solicitud/respuesta JSON
- Limitación de velocidad para protección de API (100 solicitudes por 60 segundos)
- Manejo de errores con códigos de estado HTTP apropiados
- Validación de entrada para integridad de datos
- Arquitectura modular basada en controladores

**Flujo de Datos:**
1. El cliente envía solicitud HTTP al endpoint de la API
2. El middleware de limitación de velocidad verifica los límites de solicitud
3. El middleware de Express procesa la solicitud
4. El manejador de ruta delega al controlador apropiado
5. El controlador valida los datos de entrada y ejecuta la lógica de negocio
6. Se ejecuta la consulta de base de datos a través de la conexión Neon
7. Se envía la respuesta de vuelta al cliente con el código de estado apropiado

## API Endpoints / Endpoints de la API

### English

#### GET `/health`
- **Description**: Health check endpoint
- **Response**: Simple text confirmation that server is running

#### GET `/api/transactions/:userId`
- **Description**: Retrieve all transactions for a specific user
- **Parameters**: `userId` (string) - User identifier
- **Response**: Array of transaction objects ordered by creation date (descending)

#### POST `/api/transactions`
- **Description**: Create a new transaction
- **Body**: 
  ```json
  {
    "user_id": "string",
    "title": "string",
    "amount": "number",
    "category": "string"
  }
  ```
- **Response**: Created transaction object

#### DELETE `/api/transactions/:id`
- **Description**: Delete a specific transaction
- **Parameters**: `id` (number) - Transaction identifier
- **Response**: Confirmation message

#### GET `/api/transactions/summary/:userId`
- **Description**: Get financial summary for a user
- **Parameters**: `userId` (string) - User identifier
- **Response**: 
  ```json
  {
    "balance": "number",
    "income": "number",
    "expenses": "number"
  }
  ```

### Español

#### GET `/health`
- **Descripción**: Endpoint de verificación de salud
- **Respuesta**: Confirmación de texto simple de que el servidor está funcionando

#### GET `/api/transactions/:userId`
- **Descripción**: Recuperar todas las transacciones para un usuario específico
- **Parámetros**: `userId` (string) - Identificador de usuario
- **Respuesta**: Array de objetos de transacción ordenados por fecha de creación (descendente)

#### POST `/api/transactions`
- **Descripción**: Crear una nueva transacción
- **Cuerpo**: 
  ```json
  {
    "user_id": "string",
    "title": "string",
    "amount": "number",
    "category": "string"
  }
  ```
- **Respuesta**: Objeto de transacción creado

#### DELETE `/api/transactions/:id`
- **Descripción**: Eliminar una transacción específica
- **Parámetros**: `id` (number) - Identificador de transacción
- **Respuesta**: Mensaje de confirmación

#### GET `/api/transactions/summary/:userId`
- **Descripción**: Obtener resumen financiero para un usuario
- **Parámetros**: `userId` (string) - Identificador de usuario
- **Respuesta**: 
  ```json
  {
    "balance": "number",
    "income": "number",
    "expenses": "number"
  }
  ```

## Setup Instructions / Instrucciones de Configuración

### English

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- PostgreSQL database (Neon account recommended)

#### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   PORT=5001
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. **Database Setup**
   - Create a Neon PostgreSQL database
   - Copy the connection string to your `.env` file
   - The application will automatically create the required tables on first run

5. **Redis Setup (Upstash)**
   - Create an Upstash Redis database
   - Copy the REST URL and token to your `.env` file
   - This enables rate limiting functionality

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Verify installation**
   - Open your browser and navigate to `http://localhost:5001/health`
   - You should see "Funcionando correctamente" message

#### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string from Neon
- `PORT`: Server port (optional, defaults to 5001)
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token

### Español

#### Prerrequisitos
- Node.js (v14 o superior)
- Gestor de paquetes npm o yarn
- Base de datos PostgreSQL (se recomienda cuenta Neon)

#### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configuración de Entorno**
   Crear un archivo `.env` en el directorio raíz con las siguientes variables:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   PORT=5001
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. **Configuración de Base de Datos**
   - Crear una base de datos PostgreSQL en Neon
   - Copiar la cadena de conexión a tu archivo `.env`
   - La aplicación creará automáticamente las tablas requeridas en la primera ejecución

5. **Configuración de Redis (Upstash)**
   - Crear una base de datos Redis en Upstash
   - Copiar la URL REST y el token a tu archivo `.env`
   - Esto habilita la funcionalidad de limitación de velocidad

6. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

7. **Verificar instalación**
   - Abrir el navegador y navegar a `http://localhost:5001/health`
   - Deberías ver el mensaje "Funcionando correctamente"

#### Variables de Entorno Requeridas
- `DATABASE_URL`: Cadena de conexión PostgreSQL de Neon
- `PORT`: Puerto del servidor (opcional, por defecto 5001)
- `UPSTASH_REDIS_REST_URL`: URL REST de Upstash Redis
- `UPSTASH_REDIS_REST_TOKEN`: Token REST de Upstash Redis

## Development / Desarrollo

### English

#### Available Scripts
- `npm run dev`: Start development server with nodemon (auto-restart on file changes)
- `npm start`: Start production server

#### Development Workflow
1. Make changes to the code
2. The server automatically restarts thanks to nodemon
3. Test your changes using API client (Postman, Thunder Client, etc.)
4. Check server logs in the terminal for any errors

#### Adding New Features
1. Define new API endpoints in `server.js`
2. Add appropriate database queries
3. Implement error handling
4. Test the new functionality
5. Update this documentation

### Español

#### Scripts Disponibles
- `npm run dev`: Iniciar servidor de desarrollo con nodemon (reinicio automático en cambios de archivo)
- `npm start`: Iniciar servidor de producción

#### Flujo de Trabajo de Desarrollo
1. Realizar cambios en el código
2. El servidor se reinicia automáticamente gracias a nodemon
3. Probar los cambios usando cliente API (Postman, Thunder Client, etc.)
4. Verificar logs del servidor en la terminal para cualquier error

#### Agregar Nuevas Características
1. Definir nuevos endpoints de API en `server.js`
2. Agregar consultas de base de datos apropiadas
3. Implementar manejo de errores
4. Probar la nueva funcionalidad
5. Actualizar esta documentación

---

**Author / Autor**: Julio Cervantes - [GitHub](https://github.com/JCervantesB)

**License / Licencia**: ISC

**Version / Versión**: 1.0.0