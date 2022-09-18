const admin = require('firebase-admin');
const ContenedorFirebase = require('../../Contenedores/ContenedorFirebase.js')
const ProductosDaoFirebase = require('../ProductosDao/ProductosDaoFirebase.js')
const productosDao = new ProductosDaoFirebase()

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('cart')
    }

    saveCart = async () => {
        try {
            const doc = this.colleccion.doc()
            await doc.create({
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                products: [],
            })
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
                    await this.update(id, cart)
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
                    await this.update(id, cart)
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
}
module.exports = CarritoDaoFirebase