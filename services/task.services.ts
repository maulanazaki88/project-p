import { TaskType } from "@/type";
import { TaskModel } from "../model/task.model";
import { DateFormater } from "@/utils/DateFormater";
import { decrypt, encrypt, updateSession } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Assign program to create task, expected to return t_id as string to used it as url param to redirect to created task after the task written in database
 *
 * If succeed will return {exist: false, t_id: t_id, message: success}
 *
 * If there are task with same t_id {exist: true, t_id: null, message: conflict}
 *
 * if there is error occur will return {exist: false, t_id: null, message: failed}
 *
 * @param data - TaskType
 * @returns
 */
export const createTask = async (data: TaskType) => {
  try {
    const exist = await TaskModel.exists({ t_id: data.t_id });

    if (exist) {
      return {
        exist: true,
        t_id: null,
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
        const t_accs_payload = {
          t_id: response.t_id,
          assigned_member: response.assigned_member,
        };

        const expires = new Date(Date.now() + 3600 * 1000 * 12);
        const t_accs_tkn = await encrypt({ t_accs_payload, expires });

        cookies().set("t_accs_tkn", t_accs_tkn, {
          httpOnly: true,
          expires,
        });

        return {
          exist: false,
          t_id: data.t_id,
          message: "success",
        };
      } else {
        return {
          exist: false,
          t_id: null,
          message: "failed",
        };
      }
    }
  } catch (error: any) {
    console.error("Create task error: ", error.message);
  }
};

/**
 * Assign program to update task
 *
 * Success: return {updated_count: 1, t_id: t_id}
 *
 * No task with t_id return {updated_count: 0, t_id: t_id}
 *
 * Failed: return null
 *
 * @param t_id t_id of targeted task
 * @param data subset of TaskType data
 * @returns
 */

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
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error update task: ", error.message);
  }
};

/**
 * Assign program to get task by t_id
 *
 * Success: return TaskType
 *
 * Failed: return null
 *
 * @param t_id t_id of addressed task
 * @returns
 */
export const getTask = async (t_id: string) => {
  try {
    const task = await TaskModel.findOne({ t_id: t_id });

    if (task) {
      const t_accs_payload = {
        t_id: task.t_id,
        assigned_member: task.assigned_member,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const t_accs_tkn = await encrypt({ t_accs_payload, expires });

      cookies().set("t_accs_tkn", t_accs_tkn, {
        httpOnly: true,
        expires,
      });
      return task;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error getting task: ", error.message);
  }
};

/**
 * Assign program to update task specific on add participant
 *
 * Success: return {updated_count: 1, t_id: t_id}
 *
 * No task with t_id return {updated_count: 0, t_id: t_id}
 *
 * Failed: return null
 *
 * @param t_id t_id of targeted task
 * @param user minimal user data username & u_id of participant candidate
 * @returns
 */
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
      const task = await TaskModel.findOne(
        { t_id: t_id },
        { assigned_member: 1 }
      );

      const t_accs_payload = {
        t_id: t_id,
        assigned_member: task.assigned_member,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const t_accs_tkn = await encrypt({ t_accs_payload, expires });

      cookies().set("t_accs_tkn", t_accs_tkn, {
        httpOnly: true,
        expires,
      });
      return {
        updated_count: response.modifiedCount,
        t_id: t_id,
      };
    }
  } catch (error: any) {
    console.error("Error adding participant to task: ", error.message);
  }
};

/**
 * Assign program to update task specific on delete participant
 *
 * Success: return {updated_count: 1, t_id: t_id}
 *
 * No task with t_id return {updated_count: 0, t_id: t_id}
 *
 * Failed: return null
 *
 * @param t_id t_id of targeted task
 * @param user minimal user data username & u_id of participant
 * @returns
 */
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
      const task = await TaskModel.findOne(
        { t_id: t_id },
        { assigned_member: 1 }
      );

      const t_accs_payload = {
        t_id: t_id,
        assigned_member: task.assigned_member,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const t_accs_tkn = await encrypt({ t_accs_payload, expires });

      cookies().set("t_accs_tkn", t_accs_tkn, {
        httpOnly: true,
        expires,
      });
      return {
        updated_count: response.modifiedCount,
        t_id: t_id,
      };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error deleting participant to task: ", error.message);
  }
};

/**
 * Assign program to update task specific on add comment
 *
 * Success: return {updated_count: 1, t_id: t_id}
 *
 * No task with t_id return {updated_count: 0, t_id: t_id}
 *
 * Failed: return null
 *
 * @param t_id t_id of targeted task
 * @param comment contains username, message, and sent time
 * @returns
 */
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
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error adding comment to task: ", error.message);
  }
};

/**
 * Commit to delete task only if user is has access
 *
 * Success: return {deleted_count: 1, t_id: t_id}
 *
 * No task with t_id: return {deleted_count: 0, t_id: t_id}
 *
 * Failed: return null
 *
 * @param t_id t_id of addressed task
 * @returns
 */

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

/**
 * Assign progran to get all task that has participant with u_id
 *
 * Success: return TaskType[]
 *
 * Failed: return null
 *
 * @param u_id
 * @returns
 */

export const getUserAllTask = async (u_id: string) => {
  try {
    const tasks = await TaskModel.find({ "assigned_member.u_id": u_id });

    if (tasks) {
      return tasks;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching all task from user: ", error.message);
  }
};
