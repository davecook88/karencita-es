import mongoose from "mongoose";
import { UserTypes } from "../interfaces/user";

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<UserTypes.UserSchema>({
  username: {
    type: String,
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  emailUnsubscribed: {
    type: Boolean,
  },
});

const UserModel =
  (mongoose.models?.User as mongoose.Model<UserTypes.UserSchema, {}, {}>) ||
  mongoose.model<UserTypes.UserSchema>("User", UserSchema);
export default UserModel;
