# 🍦 Gelato Paradiso - Aplicación Web

¡Bienvenido a Gelato Paradiso! Una aplicación web completa que simula la página de una heladería, con un panel de administración para gestionar los productos.

Este proyecto cuenta con un backend construido en Node.js con Express que expone una API REST, y un frontend de una sola página (SPA) servido estáticamente.

 <!-- Reemplaza con una captura de pantalla de tu proyecto -->

## ✨ Características

### Para Clientes:
- **Catálogo de Sabores:** Visualiza todos los sabores de helado disponibles con imágenes, descripciones y precios.
- **Filtros Dinámicos:** Filtra los sabores por tipo (crema, fruta, chocolate, etc.) para encontrar rápidamente tus preferidos.
- **Diseño Responsivo:** La interfaz se adapta perfectamente a dispositivos móviles y de escritorio.

### Para Administradores:
- **Panel de Administración Seguro:** Acceso protegido por contraseña a un panel de gestión.
- **Gestión de Sabores (CRUD):**
  - **Crear:** Añadir nuevos sabores de helado al menú.
  - **Leer:** Ver la lista completa de sabores existentes.
  - **Actualizar:** Editar la información de cualquier sabor.
  - **Eliminar:** Quitar sabores del menú.
- **Previsualización de Imágenes:** Visualiza la imagen del helado mientras añades o editas la URL.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js:** Framework web para construir la API REST y servir los archivos.
- **MongoDB:** Base de datos NoSQL para almacenar los sabores y usuarios.
- **Mongoose:** ODM para modelar y facilitar la interacción con MongoDB.
- **`jsonwebtoken` (JWT):** Para la creación de tokens de sesión para usuarios.
- **`bcryptjs`:** Para hashear y proteger las contraseñas de los usuarios.
- **`dotenv`:** Para gestionar variables de entorno de forma segura.

### Frontend
- **HTML5, CSS3, JavaScript :** La base de la interfaz de usuario.
- **Font Awesome:** Para los iconos utilizados en toda la aplicación.
- **Google Fonts:** Para la tipografía personalizada ("Poppins" y "Dancing Script").

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Una instancia de MongoDB (local o en la nube como MongoDB Atlas).

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/heladeria-main1-main.git
    cd heladeria-main1-main
    ```

2.  **Instala las dependencias del backend:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    - Crea un archivo llamado `.env` en la raíz del proyecto.
    - Copia el contenido del archivo `.env.example` y pégalo en tu nuevo archivo `.env`.
    - Rellena los valores correspondientes:
      ```env
      # URL de conexión a tu base de datos MongoDB
      MONGO_URI="mongodb+srv://..."

      # Clave secreta para firmar los tokens JWT (puedes usar un generador de contraseñas)
      JWT_SECRET="una_clave_muy_secreta_y_larga"

      # Contraseña para acceder al panel de administración
      ADMIN_PASSWORD="helado123"
      ```

4.  **Inicia el servidor:**
    ```bash
    npm start
    ```
    O, si no tienes un script `start` en tu `package.json`:
    ```bash
    node server.js
    ```

5.  **¡Listo! Abre tu navegador:**
    - **Página principal:** http://localhost:3001
    - **Panel de administración:** http://localhost:3001/admin.html

    La contraseña para el panel de administración es la que configuraste en `ADMIN_PASSWORD` en tu archivo `.env`.

---

## 📂 Estructura del Proyecto

```
/
├── public/         # Contiene todos los archivos del frontend (HTML, CSS, JS)
├── controllers/    # Lógica de negocio para las rutas de la API
├── models/         # Esquemas de Mongoose para la base de datos
├── routes/         # Definición de las rutas (endpoints) de la API
├── .env            # (Local) Variables de entorno
├── .env.example    # Plantilla para las variables de entorno
├── server.js       # Archivo principal para iniciar el servidor y conectar a la BD
└── package.json    # Dependencias y scripts del proyecto
```
