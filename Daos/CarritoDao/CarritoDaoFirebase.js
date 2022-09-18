const admin = require('firebase-admin');
const ContenedorFirebase = require('../../Contenedores/ContenedorFirebase.js')

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('cart')
    }

    saveCart = async () => {
        const doc = this.colleccion.doc()
        await doc.create({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            products: [],
        })
    }

    saveCartItem = async (id) => {
        const cart = this.getById(id)
        console.log(cart)

    }

}
module.exports = CarritoDaoFirebase