import {
  PlacemarkMongoose} from "./placemark";

export const placemarkStore = {

  async find() {

    return await PlacemarkMongoose
      .find()
      .lean();

  },

  async add(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    placemark: any
  ) {

    const newPlacemark =
      new PlacemarkMongoose(
        placemark
      );

    return await newPlacemark
      .save();

  },

  async delete(
    id: string
  ) {

    await PlacemarkMongoose
      .deleteOne({
        _id: id
      });

  },

  async updatePlacemark(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    placemark: any
  ) {

    await PlacemarkMongoose
      .updateOne(
        {
          _id: placemark._id
        },
        placemark
      );

  },

};