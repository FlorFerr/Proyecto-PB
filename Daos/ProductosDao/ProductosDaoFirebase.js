const ContenedorFirebase = require('../../Contenedores/ContenedorFirebase.js')

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('products')
    }
}
module.exports = ProductosDaoFirebase