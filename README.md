# 📚 API Biblioteca

Este proyecto es una API REST construida con Node.js, Express y MySQL para gestionar libros en una biblioteca.

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

