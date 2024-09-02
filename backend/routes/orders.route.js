import express from 'express'
import {
  addOrderItem,
  getAllOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/orders.controller.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItem).get(protect, admin, getAllOrder)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, admin, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliverd').put(protect, admin, updateOrderToDelivered)

export default router
