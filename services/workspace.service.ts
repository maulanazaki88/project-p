import { WorkspaceType } from "@/type";
import { WorkspaceModel } from "../model/workspace.model";
import { NotificationCardProps } from "@/components/notification-card/NotificationCard";
import { encrypt } from "@/lib";
import { cookies } from "next/headers";

/**
 *
 * Assign program to create new workspace, assigning current user as its owner & admin, expeect return w_id to use it as url slug to redirect to workspace after being created on database
 *
 * Success - return {exist: false, w_id: w_id, message: success} and create w_accs_tkn with payload u_ids contain admin_list also m_accs_tkn to allow authorized user open workspace and task
 *
 * Existing workspace with w_id - return {exist: true, w_id: null}
 *
 * @param data -WorkspaceType data
 * @returns
 */
export const createWorkspace = async (data: WorkspaceType) => {
  const exist = await WorkspaceModel.exists({ w_id: data.w_id });

  try {
    if (exist) {
      return {
        exist: true,
        w_id: "",
        message: `conflict`,
      };
    } else {
      const currentDate = new Date();
      const response = await WorkspaceModel.create({
        ...data,
        updated_at: currentDate,
        created_at: currentDate,
      } as WorkspaceType);

      const w_accs_payload = {
        w_id: data.w_id,
        admin_list: data.admin_list,
        member_list: data.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });

      if (response) {
        return {
          exist: false,
          w_id: data.w_id,
          message: "success",
        };
      } else {
        return {
          exist: false,
          w_id: "",
          message: "workspace-exist",
        };
      }
    }
  } catch (error: any) {
    console.error("Error create workspace: ", error.message);
  }
};

/**
 * Assign program to update workspace data e.g name, description
 *
 * Success - return {updated_count: 1, w_id: w_id}
 *
 * Failed - return null
 *
 * @param w_id - Addressed workspace
 * @param data - Subset of workspace object from WorkspaceType
 * @returns
 */
export const updateWorkspace = async (w_id: string, data: any) => {
  const updated_data = data as WorkspaceType;

  const currentDate = new Date();

  const response = await WorkspaceModel.updateOne(
    { w_id: w_id },
    {
      $set: {
        ...updated_data,
        updated_at: currentDate,
        created_at: currentDate,
      } as WorkspaceType,
    }
  );

  if (response) {
    return {
      updated_count: response.modifiedCount,
      w_id: w_id,
    };
  } else {
    return null;
  }
};

/**
 * Assign program to update workspace sepcificly on adding memberlist, happen as user with access accept other user request to join
 *
 * Success - return {updated_count: 1, w_id: w_id}
 *
 * No workspace with w_id - return {updated_count: 1, w_id: w_id}
 *
 * @param w_id -addressed workspace w_id
 * @param user - subset of UserType {username: string, u_id: string} to display its username after being sccepted by owner or admin
 * @returns
 */
export const workspaceAddMember = async (
  w_id: string,
  user: { username: string; u_id: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate } as WorkspaceType,
        $push: { member_list: { ...user } },
      }
    );

    if (response) {
      const record = await WorkspaceModel.findOne(
        { w_id: w_id },
        { member_list: 1, admin_list: 1 }
      );

      const w_accs_payload = {
        w_id: w_id,
        admin_list: record.admin_list,
        member_list: record.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });

      return {
        updated_count: response.modifiedCount,
        w_id: w_id,
      };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error adding new member to workspace: ", error.message);
  }
};

/**
 * Assign program to update workspace sepcificly on deleting memberlist with u_id, happen as user with access kick other member or member itself exit from workspace
 *
 * Success - return {updated_count: 1, w_id: w_id}
 *
 * No workspace with w_id - return {updated_count: 1, w_id: w_id}
 *
 * @param w_id - addressed workspace w_id
 * @param user - subset of UserType {username: string, u_id: string} to display its username after being sccepted by owner or admin
 * @returns
 */
export const workspaceDeleteMember = async (
  w_id: string,
  user: { u_id: string; username: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate } as WorkspaceType,
        $pull: { member_list: { u_id: { $eq: user.u_id } } },
      }
    );

    if (response) {
      const record = await WorkspaceModel.findOne(
        { w_id: w_id },
        { member_list: 1, admin_list: 1 }
      );

      const w_accs_payload = {
        w_id: w_id,
        admin_list: record.admin_list,
        member_list: record.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });
      return {
        updated_count: response.modifiedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error delete member on workspace: ", error.message);
  }
};

/**
 * Assign program to retrieve hydrated workspace data
 *
 * Success - return data WorkspaceType
 *
 * Failed - return null
 *
 * @param w_id addressed workspace
 * @returns
 */
export const getWorkspace = async (w_id: string) => {
  try {
    const workspaces = await WorkspaceModel.aggregate([
      { $match: { w_id: decodeURIComponent(w_id) } },
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
    ]);

    const workspace = workspaces[0];

    if (workspace) {
      const w_accs_payload = {
        w_id: w_id,
        admin_list: workspace.admin_list,
        member_list: workspace.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });

      return workspace;
    }
  } catch (error: any) {
    console.error("Error getting workspace data: ", error.message);
  }
};

/**
 * Assign program to update workspace specificly
 *
 * @param w_id addressed workspace w_id
 * @param data NotidicaionCardProps data
 * @returns
 */
export const workspaceCreateAnnouncement = async (
  w_id: string,
  data: NotificationCardProps
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $push: { notification_list: data },
        $set: { updated_at: currentDate },
      }
    );

    if (response) {
      return { updated_count: response.modifiedCount, w_id: w_id };
    }
  } catch (error: any) {
    console.error("Cant create announcement :", error.message);
  }
};

export const workspaceAddTask = async (w_id: string, t_id: string) => {
  try {
    const currentDate = new Date();
    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate },
        $push: { task_ids: t_id },
      }
    );

    if (response) {
      return { updated_count: response.modifiedCount, w_id: w_id };
    }
  } catch (error: any) {
    console.error("Error adding task to workspace: ", error.message);
  }
};

export const workspaceDeleteTask = async (w_id: string, t_id: string) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate },
        $pull: { task_ids: t_id },
      }
    );

    if (response) {
      return { updated_count: response.modifiedCount, w_id: w_id };
    }
  } catch (error: any) {
    console.error("Error deleting task from workspace: ", error.message);
  }
};

export const replaceWorkspace = async (w_id: string, data: WorkspaceType) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.replaceOne({ w_id: w_id }, {
      ...data,
      updated_at: currentDate,
    } as WorkspaceType);

    if (response) {
      const workspace = await WorkspaceModel.findOne({ w_id: w_id });
      const w_accs_payload = {
        w_id: w_id,
        admin_list: workspace.admin_list,
        member_list: workspace.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });
      return { updated_count: response.modifiedCount, w_id: w_id };
    }
  } catch (error: any) {
    console.error("Error replace workspace: ", error.message);
  }
};

export const addMemberWaitingList = async (
  w_id: string,
  user: { u_id: string; username: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate },
        $push: { waiting_list: user },
      }
    );

    if (response) {
      return {
        updated_count: response.modifiedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error adding member to waiting list: ", error.message);
  }
};

export const accWaitingList = async (
  w_id: string,
  user: { u_id: string; username: string }
) => {
  console.log("w_id & user", w_id);
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate },
        $push: { member_list: user },
        $pull: { waiting_list: { u_id: user.u_id } },
      }
    );

    if (response) {
      const workspace = await WorkspaceModel.findOne({ w_id: w_id });
      const w_accs_payload = {
        w_id: w_id,
        admin_list: workspace.admin_list,
        member_list: workspace.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });
      console.log("acc-waiting-list-res", response);
      return {
        updated_count: response.modifiedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Acc from waiting list error: ", error.message);
  }
};

export const rejWaitingList = async (
  w_id: string,
  user: { u_id: string; username: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate },
        $pull: { waiting_list: { u_id: { $eq: user.u_id } } },
      }
    );

    if (response) {
      const workspace = await WorkspaceModel.findOne({ w_id: w_id });
      const w_accs_payload = {
        w_id: w_id,
        admin_list: workspace.admin_list,
        member_list: workspace.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });
      return {
        updated_count: response.modifiedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error reject user from waiting list: ", error.message);
  }
};

export const workspaceRemoveMember = async (
  w_id: string,
  user: { u_id: string; username: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: currentDate } as WorkspaceType,
        $pull: {
          member_list: { u_id: { $eq: user.u_id } },
        },
      }
    );

    if (response) {
      const workspace = await WorkspaceModel.findOne({ w_id: w_id });
      const w_accs_payload = {
        w_id: w_id,
        admin_list: workspace.admin_list,
        member_list: workspace.member_list,
      };

      const expires = new Date(Date.now() + 3600 * 1000 * 12);
      const w_accs_tkn = await encrypt({ w_accs_payload, expires });

      cookies().set("w_accs_tkn", w_accs_tkn, {
        expires,
        httpOnly: true,
      });
      return {
        updated_count: response.modifiedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error removing member from workspace: ", error.message);
  }
};

export const deleteWorkspace = async (w_id: string) => {
  try {
    const response = await WorkspaceModel.deleteOne({ w_id: w_id });

    if (response) {
      cookies().delete("w_accs_tkn");
      return {
        deleted_count: response.deletedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error deleting workspace: ", error.message);
  }
};

export const getUserAllWorkspace = async (u_id: string) => {
  try {
    const workspaces = await WorkspaceModel.find({ "member_list.u_id": u_id });
    if (workspaces) {
      return workspaces;
    }
  } catch (error: any) {
    console.error(
      `Error fetching all workspace from user ${u_id} :`,
      error.message
    );
  }
};

export const getWorkspaceMemberList = async (w_id: string) => {
  try {
    const workspace = (await WorkspaceModel.findOne({
      w_id: w_id,
    })) as WorkspaceType;

    if (workspace) {
      return workspace.member_list;
    } else {
      throw new Error();
    }
  } catch (error: any) {
    console.error("Error getting workspace member list: ", error.message);
  }
};

export const getWorkspaceWaitingList = async (w_id: string) => {
  try {
    const workspace = (await WorkspaceModel.findOne({
      w_id: w_id,
    })) as WorkspaceType;

    if (workspace) {
      return workspace.waiting_list;
    } else {
      throw new Error();
    }
  } catch (error: any) {
    console.error("Error getting workspace waiting list");
  }
};

