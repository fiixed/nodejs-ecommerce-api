import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId, //ref id of object instead of entire object
        ref: "Order",
      },
    ],
    wishLists: [
      {
        type: mongoose.Schema.Types.ObjectId, //ref id of object instead of entire object
        ref: "WishList",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true, // Mongoose will add two properties of type Date to your schema: createdAt, updatedAt
  }
);

//compile the schema to model
const User = mongoose.model('User', UserSchema);

export default User;
