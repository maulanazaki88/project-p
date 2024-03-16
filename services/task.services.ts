import { TaskType } from "@/type";
import { TaskModel } from "../model/task.model";
import { DateFormater } from "@/app/utils/DateFormater";

export const createTask = async (data: TaskType) => {
  try {
    const exist = await TaskModel.exists({ t_id: data.t_id });

    if (exist) {
      return {
        exist: true,
        t_id: data.t_id,
        message: "conflict",
      };
    } else {
      const currentDate = new Date();

      const response = await TaskModel.create({
        ...data,
        updated_at: currentDate,
        created_at: currentDate,
      } as TaskType);

      if (response) {
        return {
          exist: false,
          t_id: data.t_id,
          message: "success",
        };
      } else {
        return {
          exist: false,
          t_id: "",
          message: "failed",
        };
      }
    }
  } catch (error: any) {
    console.error("Create task error: ", error.message);
  }
};

export const updateTask = async (t_id: string, data: any) => {
  try {
    const currentDate = new Date();
    const updated_data = {
      ...data,
      updated_at: currentDate,
    } as TaskType;

    const response = await TaskModel.updateOne(
      { t_id: t_id },
      { $set: { ...updated_data } }
    );

    if (response) {
      return {
        updated_count: response.modifiedCount,
        t_id: t_id,
      };
    }
  } catch (error: any) {
    console.error("Error update task: ", error.message);
  }
};

export const getTask = async (t_id: string) => {
  try {
    const tasks = await TaskModel.aggregate([
      { $match: { t_id: t_id } },
      {
        $lookup: {
          from: "workspaces",
          localField: "w_id",
          foreignField: "w_id",
          pipeline: [{ $project: { _id: 0, name: 1 } }],
          as: "workspace",
        },
      },
      { $project: { _id: 0 } },
      { $unwind: "$workspace" },
    ]);

    if (tasks) {
      return tasks[0];
    }
  } catch (error: any) {
    console.error("Error getting task: ", error.message);
  }
};

export const taskAddParticipant = async (
  t_id: string,
  user: { username: string; u_id: string }
) => {
  try {
    const currentDate = new Date();
    const response = await TaskModel.updateOne(
      { t_id: t_id },
      {
        $set: { updated_at: currentDate } as TaskType,
        $push: { assigned_member: user },
      }
    );

    if (response) {
      return {
        updated_count: response.modifiedCount,
        t_id: t_id,
      };
    }
  } catch (error: any) {
    console.error("Error adding participant to task: ", error.message);
  }
};

export const taskDeleteParticipant = async (
  t_id: string,
  user: { username: string; u_id: string }
) => {
  try {
    const currentDate = new Date();
    const response = await TaskModel.updateOne(
      { t_id: t_id },
      {
        $set: { updated_at: currentDate } as TaskType,
        $pull: { assigned_member: { u_id: { $eq: user.u_id } } },
      }
    );

    if (response) {
      return {
        updated_count: response.modifiedCount,
        t_id: t_id,
      };
    }
  } catch (error: any) {
    console.error("Error deleting participant to task: ", error.message);
  }
};

export const taskAddComment = async (
  t_id: string,
  comment: { username: string; message: string; time: string }
) => {
  try {
    const currentDate = new Date();

    const response = await TaskModel.updateOne(
      { t_id: t_id },
      {
        $set: { updated_at: currentDate } as TaskType,
        $push: { comments: comment },
      }
    );

    if (response) {
      return {
        updated_count: response.modifiedCount,
        t_id: t_id,
      };
    }
  } catch (error: any) {
    console.error("Error adding participant to task: ", error.message);
  }
};

export const deleteTask = async (t_id: string) => {
  try {
    const response = await TaskModel.deleteOne({ t_id: t_id });

    if (response) {
      return {
        deleted_count: response.deletedCount,
        t_id: t_id,
      };
    }
  } catch (error: any) {
    console.error("Error deleting task: ", error.message);
  }
};
