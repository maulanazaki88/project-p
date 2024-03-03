import { TaskType, WorkspaceType } from "@/type";
import { WorkspaceModel } from "../model/workspace.model";
import { DateFormater } from "@/app/utils/DateFormater";
import { NotificationCardProps } from "@/components/notification-card/NotificationCard";

export const createWorkspace = async (data: WorkspaceType) => {
  const exist = await WorkspaceModel.exists({ w_id: data.w_id });

  try {
    if (exist) {
      return {
        exist: true,
        w_id: "",
        message: `workspace-exist`,
      };
    } else {
      const currentDate = new Date();
      const response = await WorkspaceModel.create({
        ...data,
        updated_at: DateFormater(currentDate),
        created_at: DateFormater(currentDate),
      } as WorkspaceType);

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

export const updateWorkspace = async (w_id: string, data: any) => {
  const updated_data = data as WorkspaceType;

  const currentDate = new Date();

  const response = await WorkspaceModel.updateOne(
    { w_id: w_id },
    {
      $set: {
        ...updated_data,
        updated_at: DateFormater(currentDate),
        created_at: DateFormater(currentDate),
      } as WorkspaceType,
    }
  );

  if (response) {
    return {
      updated_count: response.upsertedCount,
      w_id: w_id,
    };
  }
};

export const workspaceAddMember = async (
  w_id: string,
  user: { username: string; u_id: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: DateFormater(currentDate) } as WorkspaceType,
        $push: { member_list: { ...user } },
      }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error adding new member to workspace: ", error.message);
  }
};

export const workspaceDeleteMember = async (
  w_id: string,
  user: { u_id: string; username: string }
) => {
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: DateFormater(currentDate) } as WorkspaceType,
        $pull: { member_list: { u_id: { $eq: user.u_id } } },
      }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error delete member on workspace: ", error.message);
  }
};

export const getWorkspace = async (w_id: string) => {
  try {
    const workspaces = await WorkspaceModel.aggregate([
      { $match: { w_id: w_id } },
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

    if (workspaces) {
      return workspaces[0];
    }
  } catch (error: any) {
    console.error("Error getting workspace data: ", error.message);
  }
};

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
        $set: { updated_at: DateFormater(currentDate) },
      }
    );

    if (response) {
      return { updated_count: response.upsertedCount, w_id: w_id };
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
        $set: { updated_at: DateFormater(currentDate) },
        $push: { task_ids: t_id },
      }
    );

    if (response) {
      return { updated_count: response.upsertedCount, w_id: w_id };
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
        $set: { updated_at: DateFormater(currentDate) },
        $pull: { task_ids: t_id },
      }
    );

    if (response) {
      return { updated_count: response.upsertedCount, w_id: w_id };
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
      updated_at: DateFormater(currentDate),
    } as WorkspaceType);

    if (response) {
      return { updated_count: response.upsertedCount, w_id: w_id };
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
        $set: { updated_at: DateFormater(currentDate) },
        $push: { waiting_list: user },
      }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
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
  try {
    const currentDate = new Date();

    const response = await WorkspaceModel.updateOne(
      { w_id: w_id },
      {
        $set: { updated_at: DateFormater(currentDate) },
        $push: { member_list: user.u_id },
        $pull: { waiting_list: user.u_id },
      }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
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
        $set: { updated_at: DateFormater(currentDate) },
        $pull: { waiting_list: { u_id: { $eq: user.u_id } } },
      }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
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
        $set: { updated_at: DateFormater(currentDate) } as WorkspaceType,
        $pull: {
          member_list: { u_id: { $eq: user.u_id } },
        },
      }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
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
      return {
        deleted_count: response.deletedCount,
        w_id: w_id,
      };
    }
  } catch (error: any) {
    console.error("Error deleting workspace: ", error.message);
  }
};
