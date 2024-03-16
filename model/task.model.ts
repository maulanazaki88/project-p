import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING);

const db = mongoose.connection;

db.on("error", () => {
  console.error("Failed to connect to MongoDB");
});

db.on("open", () => {
  console.log("Connected to MongoDB!");
});

const TaskSchema: Schema = new Schema({
  t_id: {
    type: "String",
  },
  title: {
    type: "String",
  },
  description: {
    type: "String",
  },
  assigned_member: {
    type: ["Mixed"],
  },
  deadline: {
    type: "Date",
  },
  priority: {
    type: "String",
  },
  created_at: {
    type: "Date",
  },
  activity_list: {
    type: ["Mixed"],
  },
  w_id: {
    type: "String",
  },
  seen_by: {
    type: ["Mixed"],
  },
  comments: {
    type: ["Mixed"],
  },
  status: {
    type: "String",
  },
  updated_at: {
    type: "Date",
  },
  author: {
    type: "String",
  },
});

export const TaskModel =
  mongoose.models?.Task || mongoose.model("Task", TaskSchema, "tasks");
