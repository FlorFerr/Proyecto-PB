const ContenedorMongoDb = require('../../Contenedores/ContenedorMongoDb.js')
const cartModel = require('../../Models/CarritoModel.js')
const ProductosDaoMongoDb = require('../ProductosDao/ProductosDaoMongoDb.js')
const productosDao = new ProductosDaoMongoDb()

class CarritoDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(cartModel)
    }

    saveCart = async () => {
        try {
            await this.save()
            return 'Carrito creado'
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    saveCartItem = async (id, product) => {
        try {
            const cart = await this.getById(id)
            if (cart) {
                const producto = await productosDao.getById(product.id)
                if (producto.name) {
                    cart.products.push({
                        ...product
                    })
                    this.save(cart)
                    return cart
                } else {
                    return 'Producto no encontrado'
                }
            } else {
                return 'Carrito no encontrado'
            }
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    deleteCartItem = async (id, product) => {
        try {
            const cart = await this.getById(id)
            if (cart) {
                const found = cart.products.find(element => element.id == product.id)
                if (found) {
                    const deleteProduct = cart.products.filter(element => element.id != product.id)
                    cart.products = deleteProduct
                    this.save(cart)
                    return cart
                } else {
                    return 'Producto no encontrado'
                }
            } else {
                return 'Carrito no encontrado'
            }
        } catch (err) {
            throw new Error(`Error al eliminar la información: ${err}`)
        }
    }

}
module.exports = CarritoDaoMongoDb