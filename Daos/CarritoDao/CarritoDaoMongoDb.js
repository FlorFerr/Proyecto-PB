const ContenedorMongoDb = require('../../Contenedores/ContenedorMongoDb.js')
const cartModel = require('../../Models/CarritoModel.js')

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(cartModel)
    }
}
module.exports = ProductosDaoMongoDb