import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING);

const db = mongoose.connection;

// db.on("error", () => {
//   console.error("Failed to connect to MongoDB");
// });

// db.on("open", () => {
//   console.log("Connected to MongoDB!");
// });

const TaskSchema: Schema = new Schema({
  t_id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  assigned_member: {
    type: [
      {
        u_id: String,
        username: String,
      },
    ],
  },
  deadline: {
    type: Date,
  },
  priority: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  activity_list: {
    type: [
      {
        a_id: String,
        activity_desc: String,
        created_at: String,
        activity_type: String,
      },
    ],
  },
  w_id: {
    type: String,
  },
  seen_by: {
    type: [
      {
        u_id: String,
        username: String,
      },
    ],
  },
  comments: {
    type: [
      {
        username: String,
        message: String,
        time: Date,
      },
    ],
  },
  status: {
    type: String,
  },
  updated_at: {
    type: Date,
  },
  author: {
    type: String,
  },
});

export const TaskModel =
  mongoose.models?.Task || mongoose.model("Task", TaskSchema, "tasks");
