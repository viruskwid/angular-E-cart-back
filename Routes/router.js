const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtmiddleware')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')
const router = new express.Router()

//getallproducts
router.get('/all-products',productController.getAllProductController)
//register
router.post('/register',userController.register)
//login
router.post('/login',userController.login)
//get a product
router.get('/view-product/:id',productController.getAproductController)
//add to wishlist
router.post('/add-to-wishlist',jwtMiddleware,wishlistController.addToWishlistController)

//get wishlist
router.get('/get-wishlist',jwtMiddleware,wishlistController.getWishlistController)

//remove from wishlist
router.delete('/wishlist-remove/:id',jwtMiddleware,wishlistController.removeProductWishlistController)
//add to cart
router.post(`/add-to-cart`,jwtMiddleware,cartController.addToCartController)
//get cart 
router.get(`/get-cart`,jwtMiddleware,cartController.getCartController)
//remove cart item
router.delete('/remove-cart/:id',jwtMiddleware,cartController.removeCartItemController)
//increment cart quantity
router.get('/cart-increment/:id',jwtMiddleware,cartController.incrementQuantity)
//decrement cart quantity
router.get('/cart-decrement/:id',jwtMiddleware,cartController.decrementQuantity)
//empty cart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyController)
module.exports = router