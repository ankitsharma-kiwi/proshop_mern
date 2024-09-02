import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/order.model.js'

// @desc Create New Order
// @route POST /api/orders
// @access private
export const addOrderItem = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc Get Logged in user order
// @route Get /api/orders/myorders
// @access private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.send(200).json(orders);
})

// @desc Get Order by Id
// @route Get /api/orders/:id
// @access private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if(order){
    res.send(200).json(order)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update Order to paid
// @route Put /api/orders/:id/pay
// @access private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update Order to paid')
})

// @desc Update Order to Delivered
// @route Put /api/orders/:id/deliver
// @access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const products = await Order.find({})
  res.send('Update Order to Delivered')
})

// @desc Update Order to paid
// @route Put /api/orders/
// @access private/admin
export const getAllOrder = asyncHandler(async (req, res) => {
  const products = await Order.find({})
  res.send('Get all orders')
})
