import { Router } from 'express'
import userRouter from 'routes/user.route'
import orderRouter from 'routes/order.route'

const rootRouter = Router()

rootRouter.use('/user', userRouter)
rootRouter.use('/order', orderRouter)

export default rootRouter
