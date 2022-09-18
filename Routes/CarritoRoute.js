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

routerProductos.get('/', getCarts)

routerProductos.get('/:id', getCartById)

routerProductos.post('/', postCart)

routerProductos.post('/:id/productos', postProductToCart)

routerProductos.delete('/:id', deleteCart)

routerProductos.delete('/:id/productos', deleteProductToCart)

module.exports = routerProductos