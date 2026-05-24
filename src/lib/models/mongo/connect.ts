import mongoose
  from "mongoose";

const connectionString = "mongodb+srv://placemarkadmin:Placemark123@cluster0.smqchjr.mongodb.net/?appName=Cluster0";

if (!mongoose.connection.readyState) {

  mongoose.connect(
    connectionString
  );

}

export default mongoose;