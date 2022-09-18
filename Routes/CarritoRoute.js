const express = require('express')
const {
    getCarts,
    getCartById,
    postCart,
    postProductToCart,
    deleteProductToCart,
    deleteCart
} = require('../Controllers/CarritoController.js')
const {
    Router
} = express

const routerProductos = Router()

routerProductos.get('/:id', getCartById)
routerProductos.delete('/:id', deleteCart)

routerProductos.get('/', getCarts)
routerProductos.post('/', postCart)

routerProductos.post('/:id/productos', postProductToCart)
routerProductos.delete('/:id/productos', deleteProductToCart)








module.exports = routerProductos