const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items, tax, deliveryMethod } = req.body;

  if (!items || items.length < 1) {
    throw new CustomError.BadRequestError("No items provided");
  }

  if (!tax || !deliveryMethod) {
    throw new CustomError.BadRequestError("Please provide");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError("No items provided");
    }
    const { name, hourlyRate, image, _id } = dbProduct;
    const singleOrderItem = {
      rentalDuration: item.rentalDuration,
      name,
      hourlyRate,
      image,
      product: _id,
    };

    console.log(dbProduct);

    // add item to order
    orderItems = [...orderItems, singleOrderItem];

    // subtotal
    subtotal += item.rentalDuration * hourlyRate;
  }
  const total = tax + subtotal;
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    cartItems: orderItems,
    total,
    subtotal,
    tax,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new CustomError.NotFoundError("No order with such id");
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new CustomError.NotFoundError("No order with such id");
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
