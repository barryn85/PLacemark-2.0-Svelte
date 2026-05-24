import {
  UserMongoose
} from "./user";

export const userStore = {

  async add(
    user: any
  ) {

    const newUser =
      new UserMongoose(
        user
      );

    return await newUser
      .save();

  },

  async findBy(
    email: string
  ) {

    return await UserMongoose
      .findOne({
        email: email
      })
      .lean();

  },

};