const ContenedorArchivo = require('../../Contenedores/ContenedorArchivo.js')

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./Data/productos.txt')
    }
    /*  getById = async (id) => {
         try {
             const list = await this.getAll()
             const product = list.find(p => p.id == id)
             if (product) {
                 return product
             } else {
                 return {
                     error: "Producto no encontrado"
                 }
             }
         } catch (err) {
             throw new Error(`Error al obtener la información: ${err}`)
         }
     } */
}

module.exports = ProductosDaoArchivo;