import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING);

const db = mongoose.connection;

db.on("error", () => {
  console.error("Failed to connect to MongoDB");
});

db.on("open", () => {
  console.log("Connected to MongoDB!");
});


const UserSchema: Schema = new Schema({
  u_id: {
    type: "String",
  },
  username: {
    type: "String",
  },
  email: {
    type: "String",
  },
  password: {
    type: "String",
  },
  workspace_ids: {
    type: ["String"],
  },
  created_at: {
    type: "String",
  },
  updated_at: {
    type: "String",
  },
  is_online: {
    type: "Number",
  },
});

export const UserModel =
  mongoose.models?.User||
  mongoose.model("User", UserSchema, "users");
