const admin = require("firebase-admin");
const serviceAccount = require('../Utils/firebase/pb-coder-firebase-adminsdk-9vrxp-2df313c5c5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

class ContenedorFirebase {
    constructor(colleccionName) {
        this.colleccion = db.collection(colleccionName)
    }

    getAll = async () => {
        try {
            let products = await this.colleccion.get()
            return products.docs.map(document => ({
                id: document.id,
                ...document.data()
            }))
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    save = async (product) => {
        try {
            const doc = this.colleccion.doc()
            await doc.create(product)
            return product
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    getById = async (id) => {
        try {
            let product = await this.colleccion.doc(id).get()
            if (product.data()) {
                const response = {
                    id: product.id,
                    ...product.data()
                }
                return response
            } else {
                return 'Producto no encontrado'
            }

        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    deleteAll = async () => {
        try {
            await this.colleccion.doc().delete()
            return 'Productos eliminados'
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    deleteById = async (id) => {
        try {
            let product = await this.colleccion.doc(id).get()
            if (product.data()) {
                await this.colleccion.doc(id).delete()
                return 'Producto eliminado'
            } else {
                return "Producto no encontrado"
            }

        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    update = async (id, product) => {
        try {
            let found = await this.colleccion.doc(id).get()
            if (found.data()) {
                await this.colleccion.doc(id).update(product);
                return product
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al actualizar la información: ${err}`)
        }
    }
}
module.exports = ContenedorFirebase