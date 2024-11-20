import Order from 'models/order.model'
import to from 'await-to-js'

export const getOrders = async (req, res) => {
    const [error, orders] = await to(Order.find({}).lean())
    if (error) return res.status(500).send({ error })
  
    return res.json({ orders })
}

export const getOrder = async (req, res) => {
    const { id } = req.params
    const [error, order] = await to(Order.findById(id).lean())
    if (error) return res.status(500).send({ error })
  
    return res.json({ order })
}

export const createOrder = async (req, res) => {
    const { productName, quantity } = req.body
    if (!productName) return res.status(400).send({ error: 'productName required' })
    if (!quantity) return res.status(400).send({error: 'quantity required'})
    if (quantity < 0) return res.status(400).send({error: 'quantity should be positive'})

    const [error, order] = await to(Order.create({ productName, quantity }))
    if (error) return res.status(500).send({ error })
    return res.json({ order })
}

export const updateOrder = async (req, res) => {
    const { id } = req.params
    const { productName, quantity } = req.body
    const [error, order] = await to(
        Order.findByIdAndUpdate(
        id,
        { productName, quantity },
        { returnDocument: 'after' }
        ).lean()
    )
    if (error) return res.status(500).send({ error })
    return res.json({ order })
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params
    const [error, order] = await to(Order.findByIdAndDelete(id).lean())
    if (error) return res.status(500).send({ error })
    return res.json({ order })
}