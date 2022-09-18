const connectDB = require('../Utils/mongoDB/connection.js')
connectDB()
class ContenedorMongoDb {
    constructor(model) {
        this.model = model
    }

    getAll = async () => {
        try {
            let products = await this.model.find({})
            return products
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    save = async (product) => {
        try {
            let createProduct = new this.model(
                product
            )
            await createProduct.save()
            return createProduct
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    getById = async (id) => {
        try {
            let product = await this.model.findOne({
                _id: id
            });
            if (product) {
                return product
            } else {
                return "Elemento no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    deleteAll = async () => {
        try {
            await this.model.deleteMany({})
            return 'Productos eliminados'
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    deleteById = async (id) => {
        try {
            let product = await this.model.findOne({
                _id: id
            });
            if (product) {
                await this.model.deleteOne({
                    _id: id
                })
                return 'Producto eliminado'
            } else {
                return "Elemento no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    update = async (id, product) => {
        try {
            let producto = await this.model.findOne({
                _id: id
            });
            if (producto) {
                await this.model.updateOne({
                    _id: id
                }, {
                    $set: {
                        name: product.name,
                        price: product.price,
                        thumbnail: product.thumbnail
                    }
                })
                return product
            } else {
                return "Elemento no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al actualizar: ${err}`)
        }
    }
}

module.exports = ContenedorMongoDb