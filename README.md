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