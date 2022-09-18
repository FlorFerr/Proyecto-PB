const fs = require('fs')
const ContenedorArchivo = require('../../Contenedores/ContenedorArchivo.js')
const ProductosDaoArchivo = require('../ProductosDao/ProductosDaoArchivo.js')
const productosDao = new ProductosDaoArchivo()

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./Data/carrito.txt')
    }

    saveCart = async () => {
        try {
            const carts = await this.getAll()
            const savedIds = []
            let id
            let timestamp
            if (carts.length > 0) {
                carts.forEach(i => {
                    savedIds.push(i.id)
                })
                const queryId = Math.max.apply(null, savedIds)
                id = queryId + 1
                timestamp = Date.now()
                await fs.promises.writeFile(this.route, JSON.stringify([...carts, {
                    id: id,
                    timestamp: timestamp,
                    productos: []
                }], null, 2), 'utf-8')
            } else {
                id = 1
                timestamp = Date.now()
                await fs.promises.writeFile(this.route, JSON.stringify([{
                    id: id,
                    timestamp: timestamp,
                    productos: []
                }], null, 2), 'utf-8')
            }
            return {
                id: id,
                timestamp
            }
        } catch (err) {
            console.log(`Hubo un error al guardar el carrito: ${err.message}`)
        }
    }

    saveCartItem = async (id, product) => {
        try {
            let carts = await this.getAll()
            const objIndex = carts.findIndex(item => item.id == id)
            const producto = await productosDao.getById(product.id)
            if (carts[objIndex]) {
                if (producto.name) {
                    carts[objIndex].productos.push(producto)
                    await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2, 'utf-8'))
                    return carts[objIndex]
                } else {
                    return {
                        error: "Producto no encontrado"
                    }
                }
            } else {
                return {
                    error: "Carrito no encontrado"
                }
            }
        } catch (err) {
            console.log(`Hubo un error al agregar el producto: ${err.message}`)
        }
    }

    deleteCartItem = async (id, product) => {
        try {
            let carts = await this.getAll()
            const objIndex = carts.findIndex(item => item.id == id)
            const producto = await productosDao.getById(product.id)
            if (carts[objIndex]) {
                if (producto.name) {
                    const deleteProduct = carts[objIndex].productos.filter(c => c.id != producto.id)
                    carts[objIndex].productos = deleteProduct
                    await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2, 'utf-8'))

                    return carts[objIndex]
                } else {
                    return {
                        error: "Producto no encontrado"
                    }
                }
            } else {
                return {
                    error: "Carrito no encontrado"
                }
            }
        } catch (err) {
            console.log(`Hubo un error al agregar el producto: ${err.message}`)
        }
    }
}

module.exports = CarritoDaoArchivo;