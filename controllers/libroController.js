//Acceso a la BD mysql/promise
const db = require('../config/db')

//Métodos exportados

//req   require  (solicitud)
//res   response (respuesta)

//Crear
exports.crearLibro = async (req, res) => {
  console.log('Ejecutaste POST')
}

//Listar
exports.obtenerLibros = async (req, res) => {
  const sql = "SELECT id, titulo, autor, numpaginas, categoria FROM libros"

  try {
    //Deserialización
    const [libros] = await db.query(sql)
    res.status(200).json(libros)
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor!' })
  }
}

//Buscar por ID
exports.obtenerLibroPorId = async (req, res) => {
  //1.- Obteniendo el ID desde la URL
  const { id } = req.params

  //2.- Preparar consulta
  const sql = "SELECT id, descripcion, garantia, precio FROM libros WHERE id = ?";

  //3.- Transacción
  try {
    //4. Deserialización - PRIMER VALOR DEL ARREGLO
    const [libros] = await db.query(sql, [id])

    //5. No encontramos el libro con el ID enviado
    if (libros.length == 0) {
      //Cuando se ejecuta "return" se FINALIZA el método
      return res.status(404).json({ mensaje: 'No encontramos el libro!' })
    }

    //6.- Enviamos los resultados
    res.status(200).json(libros[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor!' })
  }
}

//Actualizar
exports.actualizarLibro = async (req, res) => {
  //1. Obtener parámetros
  const { id } = req.params

  //2. Leer JSON body
  const { titulo, autor, numpaginas, categoria } = req.body

  //3. Validación: al menos un campo debe estar presente
  if (!titulo && !autor && numpaginas == undefined && !categoria) {
    return res.status(400).json({ mensaje: 'Falta completar los campos' })
  }

  //4. Construcción dinámica de consulta
  let sqlParts = []  // campos que se actualizarán
  let values = []    // valores para esos campos

  if (titulo) {
    sqlParts.push('titulo = ?')
    values.push(titulo)
  }

  if (autor) {
    sqlParts.push('autor = ?')
    values.push(autor)
  }

  if (numpaginas !== undefined) {
    sqlParts.push('numpaginas = ?')
    values.push(numpaginas)
  }

  if (categoria) {
    sqlParts.push('categoria = ?')
    values.push(categoria)
  }

  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: 'No hay datos por actualizar' })
  }

  //5. Construir SQL dinámico
  values.push(id)
  const sql = `UPDATE libros SET ${sqlParts.join(', ')} WHERE id = ?`

  try {
    const [result] = await db.query(sql, values)

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No encontramos el libro con el ID indicado' })
    }

    res.status(200).json({ mensaje: 'Libro actualizado correctamente' })
  }
  catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno en el servidor' })
  }
}


//Eliminar
exports.eliminarLibro = async (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM libros WHERE id = ?"

  try {
    const [result] = await db.query(sql, [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Libro no encontrado para eliminar!' })
    }

    res.status(200).json({ mensaje: 'Libro eliminado correctamente' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}
