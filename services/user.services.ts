import { UserModel } from "../model/user.model";
import { UserType } from "@/type";
import { DateFormater } from "@/app/utils/DateFormater";

export const login = async (data: any) => {
  try {
    const user_data = data as UserType;

    const record = (await UserModel.findOne({
      email: user_data.email,
    })) as UserType;

    if (record && record.password === user_data.password) {
      return { message: "success", u_id: record.u_id };
    } else {
      return { message: "failed", u_id: "" };
    }
  } catch (error: any) {
    console.error("Login error: ", error.message);
  }
};

export const createUser = async (data: UserType) => {
  try {
    const exist = await UserModel.exists({ email: data.email });

    if (exist) {
      return {
        exist: true,
        u_id: "",
        message: "failed",
      };
    } else {
      const response = (await UserModel.create({ ...data })) as UserType;

      if (response) {
        return {
          exist: false,
          u_id: response.u_id,
          message: "success",
        };
      } else {
        return {
          exist: false,
          u_id: "",
          message: "failed",
        };
      }
    }
  } catch (error: any) {
    console.error("Error create user: ", error.message);
  }
};

export const getUser = async (u_id: string) => {
  try {
    const users = await UserModel.aggregate([
      { $match: { u_id: u_id } },
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
    }
  } catch (error: any) {
    console.error("Error getting user data: ", error.message);
  }
};

export const updateUser = async (u_id: string, data: any) => {
  try {
    const updated_data = data as UserType;

    const response = await UserModel.replaceOne(
      { u_id: u_id },
      { ...updated_data }
    );

    if (response) {
      return {
        updated_count: response.upsertedCount,
        u_id: u_id,
      };
    }
  } catch (error: any) {
    console.error("Error update user: ", error.message);
  }
};

export const deleteUser = async (u_id: string) => {
  try {
    const response = await UserModel.deleteOne({ u_id: u_id });

    if (response) {
      return {
        deleted_count: response.deletedCount,
        u_id: u_id,
      };
    }
  } catch (error: any) {
    console.error("Error delete user: ", error.message);
  }
};

export const userAddWorkspace = async (u_id: string, w_id: string) => {
  const currentDate = new Date();
  try {
    const response = await UserModel.updateOne(
      { u_id: u_id },
      {
        $set: { updated_at: DateFormater(currentDate) },
        $push: { workspace_ids: w_id },
      }
    );

    if (response) {
      return { updated_count: response.upsertedCount, u_id: u_id };
    }
  } catch (error: any) {
    console.error("Error Adding new workspace_id to user: ", error.message);
  }
};

export const userDeleteWorkspace = async (u_id: string, w_id: string) => {
  const currentDate = new Date();

  try {
    const response = await UserModel.updateOne(
      { u_id: u_id },
      {
        $set: { updated_at: DateFormater(currentDate) },
        $pull: { workspace_ids: w_id },
      }
    );

    if (response) {
      return { updated_count: response.upsertedCount, u_id: u_id };
    }
  } catch (error: any) {
    console.error("Error remove workspace_id to user: ", error.message);
  }
};
