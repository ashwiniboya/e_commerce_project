import supabase from '../config/supabase.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (simplified for now)
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  try {
    const { data: createdOrder, error } = await supabase
      .from('orders')
      .insert([
        {
          items: orderItems,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          items_price: itemsPrice,
          tax_price: taxPrice,
          shipping_price: shippingPrice,
          total_price: totalPrice,
          status: 'Placed',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Order not found' });
      }
      throw error;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
export const getOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase.from('orders').select('*');
    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
