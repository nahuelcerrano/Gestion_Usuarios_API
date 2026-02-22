
# 🚀 Sistema de Gestión de Usuarios (Full Stack)

Este es un proyecto Full Stack desarrollado como práctica técnica de arquitectura cliente-servidor. Consiste en una API RESTful construida con **.NET 8** conectada a una base de datos **PostgreSQL**, consumida por una interfaz moderna en **React** estilizada con **Tailwind CSS**.

![Captura de pantalla del proyecto](https://i.imgur.com/piaOxeg.png) 


## 🛠️ Tecnologías Utilizadas

**Backend:**
* C# / .NET 8
* ASP.NET Core Web API
* Entity Framework Core (ORM)
* PostgreSQL

**Frontend:**
* React (con Vite)
* Tailwind CSS v3
* Bun (Package Manager)

## 📋 Requisitos Previos

Para ejecutar este proyecto localmente, necesitas tener instalado:
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [PostgreSQL](https://www.postgresql.org/download/) corriendo localmente.
* [Bun](https://bun.sh/) (o Node.js/npm) para correr el frontend.

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/nahuelcerrano/Gestion_Usuarios_API.git](https://github.com/nahuelcerrano/Gestion_Usuarios_API.git)
cd gestion-usuarios-app

```

### 2. Configurar y levantar el Backend (.NET)

```bash
# Entrar a la carpeta del backend
cd Backend

# Aplicar las migraciones para crear la base de datos y la tabla
dotnet ef database update

# Levantar la API
dotnet watch run

```

*La API estará corriendo en `http://localhost:5000` (o el puerto que te indique la consola). Puedes ver la documentación interactiva entrando a `/swagger`.*

### 3. Configurar y levantar el Frontend (React)

Abre una **nueva terminal** y ejecuta:

```bash
# Entrar a la carpeta del frontend
cd Frontend

# Instalar las dependencias (súper rápido con Bun)
bun install

# Levantar el servidor de desarrollo
bun run dev

```

*El frontend estará disponible en `http://localhost:5173`. ¡Abre esa URL en tu navegador y listo!*

## 🔌 Endpoints de la API

La API REST cuenta con los siguientes endpoints principales bajo la ruta `/api/usuarios`:

* `GET /` - Obtiene la lista de todos los usuarios.
* `GET /{id}` - Obtiene un usuario específico por su ID.
* `POST /` - Crea un nuevo usuario.
* `PUT /{id}` - Actualiza los datos de un usuario existente.
* `DELETE /{id}` - Elimina un usuario.
