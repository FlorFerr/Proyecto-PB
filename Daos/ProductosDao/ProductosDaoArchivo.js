const ContenedorArchivo = require('../../Contenedores/ContenedorArchivo.js')

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./Data/productos.txt')
    }
}

module.exports = ProductosDaoArchivo;