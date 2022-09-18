const fs = require('fs')

class ContenedorArchivo {
    constructor(route) {
        this.route = route
    }

    getAll = async () => {
        try {
            const products = await fs.promises.readFile(this.route, 'utf-8')
            return JSON.parse(products)
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    save = async (product) => {
        try {
            const list = await this.getAll()
            const savedIds = []
            let id
            let timestamp
            if (list.length > 0) {
                list.forEach(i => {
                    savedIds.push(i.id)
                })
                const queryId = Math.max.apply(null, savedIds)
                id = queryId + 1
                timestamp = Date.now()
                await fs.promises.writeFile(this.route, JSON.stringify([...list, {
                    ...product,
                    id: id,
                    timestamp: timestamp
                }], null, 2), 'utf-8')
            } else {
                id = 1
                await fs.promises.writeFile(this.route, JSON.stringify([{
                    ...product,
                    id: id,
                    timestamp: timestamp
                }], null, 2), 'utf-8')
            }
            return {
                ...product,
                id: id,
                timestamp: timestamp
            }
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    getById = async (id) => {
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
    }

    deleteById = async (id) => {
        try {
            const list = await this.getAll()
            const product = await this.getById(id)
            if (product) {
                const deleteProduct = list.filter(p => p.id != id)
                await fs.promises.writeFile(this.route, JSON.stringify(deleteProduct, null, 2), 'utf-8')
                return ("Producto eliminado")
            }
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    deleteAll = async () => {
        try {
            const list = await this.getAll()
            if (list.length) {
                await fs.promises.writeFile(this.route, '[]', 'utf-8')
                return "Productos eliminados"
            } else {
                return {
                    error: "No se encontraron productos"
                }
            }
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    getProductRandom = async () => {
        try {
            const list = await this.getAll()
            const ids = []
            list.map(e => ids.push(e.id))
            const idRandom = ids[Math.floor(Math.random() * ids.length)]
            return this.getById(idRandom)
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    update = async (id, product) => {
        try {
            let list = await this.getAll()
            const objIndex = list.findIndex(item => item.id == id)
            if (objIndex >= 0) {
                const timestamp = Date.now()
                list[objIndex] = {
                    ...product,
                    id,
                    timestamp
                }
                await fs.promises.writeFile(this.route, JSON.stringify(list, null, 2, 'utf-8'))
                return product
            } else {
                return {
                    error: "Producto no encontrado"
                }
            }
        } catch (err) {
            throw new Error(`Error al actualizar la información: ${err}`)
        }
    }
}

module.exports = ContenedorArchivo;