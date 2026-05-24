import type {
  Model
} from "mongoose";

import mongoose
  from "mongoose";

const placemarkSchema =
  new mongoose.Schema({

    userid: String,

    name: String,

    category: String,

    attendance: Number,

    lat: Number,

    lng: Number,

    image: String,

  });

let PlacemarkMongoose:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Model<any>;

try {

  PlacemarkMongoose =
    mongoose.model(
      "Placemark"
    );

} catch {

  PlacemarkMongoose =
    mongoose.model(
      "Placemark",
      placemarkSchema
    );

}

export {
  PlacemarkMongoose
};