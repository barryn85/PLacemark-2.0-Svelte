import type {
  Model
} from "mongoose";

import mongoose
  from "./connect";

const userSchema =
  new mongoose.Schema({

    firstName: String,

    lastName: String,

    email: String,

    password: String,

  });

let UserMongoose:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model<any>;

try {

  UserMongoose =
    mongoose.model(
      "User"
    );

} catch {

  UserMongoose =
    mongoose.model(
      "User",
      userSchema
    );

}

export {
  UserMongoose
};