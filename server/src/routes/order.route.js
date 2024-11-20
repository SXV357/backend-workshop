import { Router } from 'express'
import {
    createOrder,
    deleteOrder,
    getOrder,
    getOrders,
    updateOrder,
  } from 'controllers/order.controller'

const orderRouter = Router()

orderRouter.get('/', getOrders)
orderRouter.get('/:id', getOrder)
orderRouter.post('/', createOrder)
orderRouter.delete('/:id', deleteOrder)
// here we use patch instead of put
// patch allows modification of fields whereas put overrides the object entirely
orderRouter.patch('/:id', updateOrder)

export default orderRouter