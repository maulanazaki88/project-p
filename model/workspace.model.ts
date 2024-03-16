import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING);

const db = mongoose.connection;

db.on("error", () => {
  console.error("Failed to connect to MongoDB");
});

db.on("open", () => {
  console.log("Connected to MongoDB!");
});

const WorkspaceSchema: Schema = new Schema({
  w_id: {
    type: "String",
  },
  name: {
    type: "String",
  },
  description: {
    type: "String",
  },
  notification_list: {
    type: ["Mixed"],
  },
  status: {
    type: "String",
  },
  admin_list: {
    type: ["Mixed"],
  },
  member_list: {
    type: ["Mixed"],
  },
  task_ids: {
    type: ["String"],
  },
  activity_list: {
    type: ["Mixed"],
  },
  updated_at: {
    type: "Date",
  },
  created_at: {
    type: "Date",
  },
  waiting_list: {
    type: ["Mixed"],
  },
});

export const WorkspaceModel =
  mongoose.models.Workspace ||
  mongoose.model("Workspace", WorkspaceSchema, "workspaces");
