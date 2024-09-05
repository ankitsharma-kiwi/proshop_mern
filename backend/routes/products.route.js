import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  createProductReview
} from '../controllers/products.controler.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getSingleProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
