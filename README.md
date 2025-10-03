# 📚 API Biblioteca

Este proyecto es una API REST construida con Node.js, Express y MySQL para gestionar libros en una biblioteca.

⚙️ Tecnologías utilizadas

Node.js

Express

MySQL2 (con promesas)

Body-parser

📂 Estructura del proyecto
```
biblioteca/
│── config/
│   └── db.js          # Configuración de conexión a la BD
│── controllers/
│   └── libroController.js  # Controlador con lógica de negocio
│── routes/
│   └── libroRoutes.js # Definición de rutas
│── index.js           # Punto de entrada principal
│── package.json

```

🗄️ Base de datos
```sql
CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  numpaginas INT,
  categoria VARCHAR(100)
);
```

El servidor se iniciará en:
👉 http://localhost:3000/api/libros

