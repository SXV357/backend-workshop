import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { deleteOrder, getOrder, getOrders, updateOrder, createOrder } from '../api/order';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import to from 'await-to-js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState();
  const [orderId, setOrderId] = useState('');
  const [deleteOrderId, setDeleteOrderId] = useState('');

  // This useEffect will run ONCE on component mount
  // Useful for setting initial values
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    const [error, res] = await to(getOrders());
    if (error) return;

    const { data } = res;
    if (data.orders) setOrders(data.orders);
  };

  const onOrderIdChange = (e) => {
    setOrderId(e.target.value.trim());
  };

  const onOrderFind = async () => {
    const [error, res] = await to(getOrder({ id: orderId }));
    if (error) {
      setOrder(null);
      return;
    }

    const { data } = res;
    if (data.order) setOrder(data.order);
  };

  const onOrderDelete = async () => {
    await to(deleteOrder({ id: deleteOrderId }));
    setDeleteOrderId('');
  };

  const onCreateOrder = async (e) => {
    e.preventDefault();
    const productName = e.target.productName.value.trim();
    const quantity = parseInt(e.target.quantity.value.trim(), 10);

    await to(createOrder({ productName, quantity }));

    e.target.productName.value = '';
    e.target.quantity.value = '';
    getAllOrders();
  };

  const onUpdateOrder = async (e) => {
    e.preventDefault();
    const productName = e.target.productName.value.trim();
    const quantity = parseInt(e.target.quantity.value.trim(), 10);
    const id = e.target.id.value.trim();

    await to(updateOrder({ id, productName, quantity }));

    e.target.productName.value = '';
    e.target.quantity.value = '';
    e.target.id.value = '';
    getAllOrders();
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h5">Order API</Typography>

      <Box my={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1">All orders</Typography>
          <Button onClick={getAllOrders}>Refresh</Button>
        </Stack>
        {orders.length ? (
          <ul>
            {orders.map(({ productName, quantity, _id }) => (
              <li key={_id}>
                {productName} (Quantity: {quantity}) (id: {_id})
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No orders currently</Typography>
        )}
      </Box>

      <hr />

      <Box my={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            label="Search by order id"
            value={orderId}
            onChange={onOrderIdChange}
            sx={{ width: '300px' }}
          />
          <Button onClick={onOrderFind}>Find!</Button>
        </Stack>
        <Typography sx={{ mt: 2 }}>
          {order
            ? `${order?.productName} (Quantity: ${order?.quantity}) (id: ${order?._id})`
            : 'No order found'}
        </Typography>
      </Box>

      <hr />

      <Box my={4} py={3}>
        <Typography>Create an order</Typography>

        <form onSubmit={onCreateOrder}>
          <Stack direction="row" alignItems="center" spacing={2} mt={2}>
            <TextField label="Product Name" name="productName" required />
            <TextField label="Quantity" name="quantity" type="number" required />
            <Button type="submit">Create!</Button>
          </Stack>
        </form>
      </Box>

      <hr />

      <Box my={4} py={3}>
        <Typography>Update an order</Typography>

        <form onSubmit={onUpdateOrder}>
          <Stack direction="row" alignItems="center" spacing={2} mt={2}>
            <TextField
              label="Order id"
              name="id"
              required
              sx={{ width: '300px' }}
            />
            <TextField label="Product Name" name="productName" />
            <TextField label="Quantity" name="quantity" type="number" />
            <Button type="submit">Update!</Button>
          </Stack>
        </form>
      </Box>

      <hr />

      <Box mt={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            label="Delete by order id"
            value={deleteOrderId}
            onChange={(e) => setDeleteOrderId(e.target.value.trim())}
            sx={{ width: '300px' }}
          />
          <Button onClick={onOrderDelete}>Delete!</Button>
        </Stack>
      </Box>
    </Container>
  );
}
