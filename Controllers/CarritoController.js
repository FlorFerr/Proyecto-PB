const {
    carritoDao
} = require("../Daos/index.js")

const getCarts = async (req, res) => {
    carritoDao.getAll()
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const getCartById = async (req, res) => {
    const {
        id
    } = req.params
    carritoDao.getById(id)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const postCart = async (req, res) => {
    carritoDao.saveCart()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const deleteCart = async (req, res) => {
    const {
        id
    } = req.params
    carritoDao.deleteById(id)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const postProductToCart = async (req, res) => {
    const {
        id
    } = req.params
    const product = req.body
    carritoDao.saveCartItem(id, product)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}

const deleteProductToCart = async (req, res) => {
    const {
        id
    } = req.params
    const product = req.body
    carritoDao.deleteCartItem(id, product)
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = {
    getCarts,
    getCartById,
    postCart,
    postProductToCart,
    deleteProductToCart,
    deleteCart
}