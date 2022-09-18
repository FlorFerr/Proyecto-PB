const fs = require('fs')
const ContenedorArchivo = require('../../Contenedores/ContenedorArchivo.js')
const productoDao = require('../ProductosDao/ProductosDaoArchivo.js')

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./Data/carrito.txt')
    }

    saveCartItem = async (id, product) => {
        try {
            let carts = await this.getAll()
            const objIndex = carts.findIndex(item => item.id == id)
            if (carts[objIndex]) {
                carts[objIndex].productos.push(product)
                await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2, 'utf-8'))
                return carts[objIndex]
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
            if (carts[objIndex]) {
                const deleteProduct = carts[objIndex].productos.filter(c => c.id != product.id)
                carts[objIndex].productos = deleteProduct
                await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2, 'utf-8'))
                return carts[objIndex]
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