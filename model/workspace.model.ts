import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING);

const db = mongoose.connection;

// db.on("error", () => {
//   console.error("Failed to connect to MongoDB");
// });

// db.on("open", () => {
//   console.log("Connected to MongoDB!");
// });

const WorkspaceSchema: Schema = new Schema({
  w_id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  notification_list: {
    type: [
      {
        username: String,
        message: String,
        created_at: String,
        w_id: String,
      },
    ],
  },
  status: {
    type: String,
  },
  admin_list: {
    type: [
      {
        u_id: String,
        username: String,
      },
    ],
  },
  member_list: {
    type: [
      {
        u_id: String,
        username: String,
      },
    ],
  },
  task_ids: {
    type: [String],
  },
  activity_list: {
    type: [
      {
        a_id: String,
        activity_desc: String,
        created_at: Date,
        activity_type: String,
      },
    ],
  },
  updated_at: {
    type: Date,
  },
  created_at: {
    type: Date,
  },
  waiting_list: {
    type: [{ u_id: String, username: String }],
  },
});

export const WorkspaceModel =
  mongoose.models.Workspace ||
  mongoose.model("Workspace", WorkspaceSchema, "workspaces");
