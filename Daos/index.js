let productosDao
let carritoDao

switch (process.env.SERVICE) {
    case 'fs':
        const ProductosDaoArchivo = require('../Daos/ProductosDao/ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo()
        const CarritoDaoArchivo = require('../Daos/CarritoDao/CarritoDaoArchivo.js')
        carritoDao = new CarritoDaoArchivo()
        break
    case 'mongoDb':
        const ProductosDaoMongoDb = require('../Daos/ProductosDao/ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb()
        const CarritoDaoMongoDb = require('../Daos/CarritoDao/CarritoDaoMongoDb.js')
        carritoDao = new CarritoDaoMongoDb()
        break
    case 'firebase':
        const ProductosDaoFirebase = require('../Daos/ProductosDao/ProductosDaoFirebase.js')
        productosDao = new ProductosDaoFirebase()
        const CarritoDaoFirebase = require('../Daos/CarritoDao/CarritoDaoFirebase.js')
        carritoDao = new CarritoDaoFirebase()
        break
    default:
        break;
}

module.exports = {
    productosDao,
    carritoDao
}