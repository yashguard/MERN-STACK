const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: String,
        required: true,
      },
      productImg: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    defailt: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    defailt: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    defailt: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    defailt: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processind",
  },
  delivered: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
