import { UserModel } from "../model/user.model";
import { WorkspaceModel } from "../model/workspace.model";
import { TaskModel } from "../model/task.model";
import { TaskType, UserType, WorkspaceType } from "@/type";
import { DateFormater } from "@/utils/DateFormater";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "@/lib";
import { updateSession } from "@/lib";
import { cookies } from "next/headers";

/**
 * Assign program to do user authentication
 *
 * If Autenthicated will return {u_id : u_id, email: email, username: username}
 * - And will set swift_session cookie to client
 *
 * If NOT Authenticated will return {u_id: "", email: "", username: ""}
 * @param data - is for adding user data, email and password
 * @param data.email - user's email
 * @param data.password   user's password
 *
 */

export const login = async (data: { email: string; password: string }) => {
  try {
    const user_data = data as UserType;

    const record = (await UserModel.findOne({
      email: user_data.email.toLocaleLowerCase(),
    })) as UserType;

    if (record && (await bcrypt.compare(data.password, record.password))) {
      const safe_user = {
        u_id: record.u_id,
        email: record.email,
        username: record.username,
        workspace_ids: record.workspace_ids,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const swift_session = await encrypt({ safe_user, expires });

      cookies().set("swift_session", swift_session, {
        expires,
        httpOnly: true,
      });

      return {
        message: "success",
        u_id: record.u_id,
        email: record.email,
        username: record.username,
      };
    } else {
      return { message: "failed", u_id: "", email: "", username: "" };
    }
  } catch (error: any) {
    console.error("Login error: ", error.message);
  }
};

/**
 * Assign program to create user
 * 
 * If there is already user with same email will return {exist: true, u_id: null, message:conflict}
 * 
 * If there is NO user with same email will return {exist: false, u_id: u_id, message: success }
 * 
 * If there is NO user with same email BUT there's internall server error will return {exist: false, u_id: null, message: error }
 * 
 * If success will create user along with place holder data for getting started
 * - Also set swift_session to client cookie
 
 * @param data - is for adding user data
 * 
 */
export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const exist = await UserModel.exists({ email: data.email });

    if (exist) {
      return {
        exist: true,
        u_id: "",
        message: "conflict",
      };
    } else {
      const currentDate = new Date();
      const u_id = `${data.username}-${uuidv4()}`;
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(data.password, salt);

      const demo_w_id = `wks-demo-1-${u_id}`;

      const workspace_guide = {
        activity_list: [],
        admin_list: [{ u_id: u_id, username: data.username }],
        created_at: currentDate,
        description: "Your guide to learn workspace!",
        member_list: [{ u_id: u_id, username: data.username }],
        name: "Getting started!",
        notification_list: [],
        status: "ON-GOING",
        task_ids: [
          `demo-next-up-1-${u_id}`,
          `demo-in-progress-1-${u_id}`,
          `demo-revised-1-${u_id}`,
          `demo-completed-1-${u_id}`,
        ],
        task_list: [],
        updated_at: currentDate,
        w_id: demo_w_id,
        waiting_list: [],
      } satisfies WorkspaceType;

      const response = (await UserModel.create({
        ...data,
        u_id: u_id,
        password: hashed_password,
        email: data.email.toLocaleLowerCase(),
        created_at: currentDate,
        is_online: 0,
        updated_at: currentDate,
        workspace_ids: [demo_w_id],
        workspace_list: [workspace_guide],
      } as UserType)) as UserType;

      const workspace_res = (await WorkspaceModel.insertMany([
        workspace_guide,
      ])) as WorkspaceType[];

      const tasks_res = (await TaskModel.insertMany([
        {
          activity_list: [],
          assigned_member: [{ u_id: u_id, username: data.username }],
          author: u_id,
          comments: [],
          created_at: currentDate,
          deadline: currentDate,
          description: "Next-Up stage to organize upcoming task to do.",
          priority: "MED",
          seen_by: [],
          status: "NEXT-UP",
          t_id: `demo-next-up-1-${u_id}`,
          title: "Next Up Stage",
          updated_at: currentDate,
          w_id: demo_w_id,
          workspace_name: "",
        },

        {
          activity_list: [],
          assigned_member: [{ u_id: u_id, username: data.username }],
          author: u_id,
          comments: [],
          created_at: currentDate,
          deadline: currentDate,
          description: "In Progress stage to organize on process tasks.",
          priority: "MED",
          seen_by: [],
          status: "IN-PROGRESS",
          t_id: `demo-in-progress-1-${u_id}`,
          title: "In Progress Stage",
          updated_at: currentDate,
          w_id: demo_w_id,
          workspace_name: "",
        },
        {
          activity_list: [],
          assigned_member: [{ u_id: u_id, username: data.username }],
          author: u_id,
          comments: [],
          created_at: currentDate,
          deadline: currentDate,
          description: "Revised stage to organize tasks that need revision.",
          priority: "MED",
          seen_by: [],
          status: "REVISED",
          t_id: `demo-revised-1-${u_id}`,
          title: "Revised Stage",
          updated_at: currentDate,
          w_id: demo_w_id,
          workspace_name: "",
        },
        {
          activity_list: [],
          assigned_member: [{ u_id: u_id, username: data.username }],
          author: u_id,
          comments: [],
          created_at: currentDate,
          deadline: currentDate,
          description: "Revised stage to organize completed task.",
          priority: "MED",
          seen_by: [],
          status: "COMPLETED",
          t_id: `demo-completed-1-${u_id}`,
          title: "Completed Stage",
          updated_at: currentDate,
          w_id: demo_w_id,
          workspace_name: "",
        },
      ])) as TaskType[];

      if (response && workspace_res && tasks_res) {
        const safe_user = {
          u_id: response.u_id,
          email: response.email,
          username: response.username,
          workspace_ids: response.workspace_ids,
        };

        const expires = new Date(Date.now() + 3600 * 1000 * 12);
        const swift_session = await encrypt({ safe_user, expires });

        cookies().set("swift_session", swift_session, {
          expires,
          httpOnly: true,
        });
        return {
          exist: false,
          u_id: response.u_id,
          username: response.username,
          email: response.email,
          message: "success",
        };
      } else {
        return {
          exist: false,
          u_id: "",
          username: "",
          email: "",
          message: "error",
        };
      }
    }
  } catch (error: any) {
    console.error("Error create user: ", error.message);
  }
};

/**
 *   - will return hydrated user data with same u_id OR null if its unavailable
 * @param u_id
 * @returns
 */
export const getUser = async (u_id: string) => {
  try {
    const users = await UserModel.aggregate([
      { $match: { u_id: decodeURIComponent(u_id) } },
      { $project: { _id: 0 } },
      {
        $lookup: {
          from: "workspaces",
          localField: "workspace_ids",
          foreignField: "w_id",
          pipeline: [
            {
              $lookup: {
                from: "tasks",
                localField: "task_ids",
                foreignField: "t_id",
                pipeline: [{ $project: { _id: 0 } }],
                as: "task_list",
              },
            },
            { $project: { _id: 0 } },
          ],
          as: "workspace_list",
        },
      },
    ]);

    if (users) {
      return users[0];
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error getting user data: ", error.message);
  }
};

/**
 * To update user data with object containing subset of UserType data
 *
 * If succeed will return {updated_count: 1, u_id: u_id}
 *
 * * If there are no user with u_id {updated_count: 0}
 *
 * If failed will return null
 *
 * @param u_id - user id that want to be updated
 * @param data object that subset of UserType
 * @returns
 */

export const updateUser = async (u_id: string, data: any) => {
  try {
    const updated_data = data as UserType;

    const response = await UserModel.replaceOne(
      { u_id: u_id },
      { ...updated_data }
    );

    if (response) {
      return {
        updated_count: response.modifiedCount,
        u_id: u_id,
      };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error update user: ", error.message);
  }
};

/**
 * Delete user with u_id
 *
 * If succeed will return {deleted_count: 1, u_id: u_id}
 *
 * If there are no user with u_id {deleted_count: 0}
 *
 * If failed will return null
 *
 * @param u_id - user id that want to be updated
 * @returns
 */
export const deleteUser = async (u_id: string) => {
  try {
    const response = await UserModel.deleteOne({ u_id: u_id });

    if (response) {
      return {
        deleted_count: response.deletedCount,
        u_id: u_id,
      };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error delete user: ", error.message);
  }
};

/**
 * Commiting adding new w_id to wokrspace_list to user with u_id after being confirmed by workspace owner
 *
 * If succeed will return {updated_count: 1, u_id: u_id}
 *
 * If there are no user with u_id {updated_count: 0}
 *
 * If failed will return null
 *
 * @param u_id - user id that want to be updated
 * @returns
 */

export const userAddWorkspace = async (u_id: string, w_id: string) => {
  const currentDate = new Date();
  try {
    const response = await UserModel.updateOne(
      { u_id: u_id },
      {
        $set: { updated_at: currentDate },
        $push: { workspace_ids: w_id },
      }
    );

    if (response) {
      console.log("user-add-wrokspace-response", response);
      return { updated_count: response.modifiedCount, u_id: u_id };
    } else {
      return;
    }
  } catch (error: any) {
    console.error("Error Adding new workspace_id to user: ", error.message);
  }
};

/**
 * User with u_id remove w_id from workspace list
 *
 * It is follow action from user commit to delete worksppace or being kicked or exit from workspace
 *
 * @param u_id u_id of user that commiting to delete workspace- must be owner or admin
 * @param w_id w_id ow workspace that want to be deleted
 * @returns
 */

export const userDeleteWorkspace = async (u_id: string, w_id: string) => {
  const currentDate = new Date();

  try {
    const response = await UserModel.updateOne(
      { u_id: u_id },
      {
        $set: { updated_at: currentDate },
        $pull: { workspace_ids: w_id },
      }
    );

    if (response) {
      return { updated_count: response.modifiedCount, u_id: u_id };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error remove workspace_id to user: ", error.message);
  }
};

