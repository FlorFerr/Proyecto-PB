const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

const routerProductos = require('./Routes/ProductosRoute.js')
const routerCarritos = require('./Routes/CarritoRoute.js')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarritos)

app.get('*', (req, res) => {
    res.send({
        error: -2,
        descripcion: `Ruta: ${req.url} - Método: ${req.method} no implementados`
    })
})

const server = app.listen(PORT, () => {
    console.log(`Puerto: ${server.address().port}`)
})

server.on('error', err => {
    console.log(err)
})