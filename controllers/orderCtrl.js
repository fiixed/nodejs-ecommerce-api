import asyncHandler from "express-async-handler";

import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

//@desc create orders
//@route POST /api/v1/orders
//@access private

export const createOrderCtrl = asyncHandler(async (req, res) => {
  //Get the payload(orderItems, shippingAddress, totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  //Find the user
  const user = await User.findById(req.userAuthId);
  //Check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No order items");
  }
  //Place/create order - save to DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  //push order into user
  user.orders.push(order?._id);
  await user.save();
  //Update the product qty
  //1. find product in order items using mongo queries.  What value inside orderItems has _id
  const products = await Product.find({ _id: { $in: orderItems } });
  //2. update qty
  orderItems?.map(async(order) => {
    const product = products?.find((product)=> {
        return product?._id.toString() == order?._id.toString();
    })
    if (product) {
        product.totalSold += order.qty;
    }
    await product.save();
  })
  //make payment (Stripe)
  //Payment webhook
  //Update the user order
});
