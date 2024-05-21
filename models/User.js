import mongoose from "mongoose";
// import userImageDefault from "../public/assets/images/user-image-default.jpg";
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Vui lòng nhập họ và tên",
    },
    email: {
      type: String,
      required: "Vui lòng nhập địa chỉ Email",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
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
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    whishlist: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
