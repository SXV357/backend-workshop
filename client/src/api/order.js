import axios from 'axios'

const OrderClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/order`,
  timeout: 1000,
})

export const createOrder = ({productName, quantity}) => 
  OrderClient.post('/', {
    productName,
    quantity,
  })

export const getOrder = ({id}) => OrderClient.get(`/${id}`)

export const getOrders = () => OrderClient.get()

export const updateOrder = ({id, productName, quantity}) => 
  OrderClient.patch(`/${id}`, {
    productName,
    quantity,
  })

export const deleteOrder = ({id}) => OrderClient.delete(`/${id}`)