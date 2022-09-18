const ContenedorMongoDb = require('../../Contenedores/ContenedorMongoDb.js')
const productoModel = require('../../Models/ProductosModel.js')

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(productoModel)
    }
}
module.exports = ProductosDaoMongoDb