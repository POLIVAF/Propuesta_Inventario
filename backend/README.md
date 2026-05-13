# Sistema de Registro de Inventario - Backend

Este proyecto es el backend para el Sistema de Registro de Inventario. Está construido con **Node.js, Express, Sequelize y PostgreSQL**.

## ¿Cómo correr el proyecto completo tú mismo?

Como la aplicación consta de dos proyectos separados (Backend y Frontend), lo ideal es que abras **dos terminales diferentes** en tu editor (VS Code, Cursor, etc.).

### Terminal 1 (Backend):
1. Entra a la carpeta del backend: `cd backend`
2. Inicia el servidor: `npm start`
*(Verás un mensaje que dice "Database synced successfully" y "Server running on port 3000").*

### Terminal 2 (Frontend):
1. Entra a la carpeta del frontend: `cd frontend`
2. Inicia el servidor de Angular: `npm start`
*(Verás cómo compila y te avisará que está corriendo en el puerto 4200).*

Ve a tu navegador a la ruta [http://localhost:4200](http://localhost:4200) ¡y listo! Puedes crear un usuario nuevo, iniciar sesión y empezar a registrar tu inventario.

---

### Variables de Entorno (.env)
Asegúrate de tener configurado correctamente tu archivo `.env` en este directorio con las credenciales de tu base de datos de PostgreSQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=inventory_db
JWT_SECRET=super_secret_jwt_key_change_me
```
