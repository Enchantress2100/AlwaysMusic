//realizar la conexion con PostgreSQL con la clase client
const { Client } = require('pg')

//conexion por propiedades:
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: 'postgres',
    port: 5432
}
const informacion = process.argv.slice(2) //path to node (command line arguments)
const client = new Client(config)
client.connect()

//registrar estudiante
async function registrar() {
    const res = await client.query(
        `insert into estudiante(nombre, rut, curso, nivel) values('${informacion[1]}', '${informacion[2]}','${informacion[3]}', '${informacion[4]}') RETURNING *; `
    )
    console.log(`Estudiante "${informacion[1]}" agregado con éxito`)
    client.end()
}
if (informacion[0]=='registrar') {
    registrar()
}
//node index.js registrar 'Maria Torres' '12.454.673-6' 'batería' '5' (ingresar los datos en consola)


//obtener por consola el registro de un estudiante, con el rut

async function consulta() {
    const res = await client.query(
        `SELECT * FROM estudiante WHERE rut='${informacion[2]}'`
    )
    console.log(`El estudiante con rut: ${informacion[2]} es:`, res.rows)
    client.end()
}
if (informacion[0]=='consulta') {
    consulta()
}
//node index.js consulta rut '15.476.778-8' (ingresar en consola)

//obtener por consola el registro de todos los estudiantes
async function registro() {
    const res = await client.query(
        "SELECT * FROM estudiante"
    )
    console.log("Registro de estudiantes: ", res.rows)
    client.end()
}
if (informacion[0]=='registro') {
    registro()
}
//node index.js registro 

//actualizar los datos de un estudiante en la base de datos
async function actualizar() {
    const res = await client.query(
        `UPDATE estudiante SET nombre='${informacion[1]}' WHERE curso='cello' RETURNING *;`
    )
    console.log('registro modificado del estudiante: ', res.rows[0])
    client.end()
}
if (informacion[0]=='actualizar') {
    actualizar()
}
//node index.js actualizar 'Cecilia Thauby'

//eliminar los datos de un estudiante
async function eliminar() {
    const res = await client.query(
        `DELETE FROM estudiante where nombre='${informacion[1]}'`
    )
    console.log(`registro del estudiante con nombre '${informacion[1]}' borrado `)
}
if (informacion[0]=='eliminar') {
    eliminar()
}
//node index.js eliminar 'Carmen Luisa' 