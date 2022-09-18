const {
    productosDao
} = require('../Daos/index.js')

const getProducts = async (req, res) => {
    productosDao.getAll()
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const getProductById = async (req, res) => {
    const {
        id
    } = req.params
    productosDao.getById(id)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const postProduct = async (req, res) => {
    const product = req.body
    productosDao.save(product)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const putProduct = async (req, res) => {
    const {
        id
    } = req.params
    const {
        name,
        price,
        thumbnail
    } = req.body

    productosDao.update((id), {
            name,
            price,
            thumbnail
        })
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })

}

const deleteProduct = async (req, res = response) => {
    const {
        id
    } = req.params
    productosDao.deleteById(id)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const deleteAllProducts = async (req, res = response) => {
    await productosDao.deleteAll()
        .then(response => {
            res.send(response)
        }).catch(err => {
            console.log(err)
        })
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct,
    deleteAllProducts
}