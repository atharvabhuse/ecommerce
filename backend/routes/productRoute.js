//import express
const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

//create router using express.router()
const router = express.Router()

//when GET request is made to '/products' the getAllProducts function get called, which sends response 'route is working' with status code
// router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAllProducts)
router.route("/products").get(getAllProducts)

//when POST request is made to '/product/new' the createProduct function get called, it creates new data which we post on postman 
//admin authentication route is commented out
// router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/admin/product/new").post(isAuthenticatedUser,createProduct)

//when PUT request is made to '/product/:id' the createProduct function get called, it updates data 
//when DELETE request is made to '/product/:id' the createProduct function get called, it deletes data
//when GET request is made to '/product/:id' the getProductDetails function get called, used to get data for particular user

//admin authentication route is commented out
// router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(getProductDetails)
router.route("/admin/product/:id").put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)

//export router object
module.exports = router
