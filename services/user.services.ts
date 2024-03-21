import { UserModel } from "../model/user.model";
import { UserType } from "@/type";
import { DateFormater } from "@/utils/DateFormater";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const login = async (data: { email: string; password: string }) => {
  try {
    const user_data = data as UserType;

    const record = (await UserModel.findOne({
      email: user_data.email.toLocaleLowerCase(),
    })) as UserType;

    if (record && (await bcrypt.compare(data.password, record.password))) {
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
        message: "failed",
      };
    } else {
      const u_id = `${data.username}-${uuidv4()}`;
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(data.password, salt);
      const response = (await UserModel.create({
        ...data,
        u_id: u_id,
        password: hashed_password,
        email: data.email.toLocaleLowerCase(),
        created_at: new Date(),
        is_online: 0,
        updated_at: new Date(),
        workspace_ids: [],
        workspace_list: [],
      } as UserType)) as UserType;

      if (response) {
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
        updated_count: response.modifiedCount,
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
        $set: { updated_at: currentDate },
        $push: { workspace_ids: w_id },
      }
    );

    if (response) {
      console.log("user-add-wrokspace-response", response)
      return { updated_count: response.modifiedCount, u_id: u_id };
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
        $set: { updated_at: currentDate },
        $pull: { workspace_ids: w_id },
      }
    );

    if (response) {
      return { updated_count: response.modifiedCount, u_id: u_id };
    }
  } catch (error: any) {
    console.error("Error remove workspace_id to user: ", error.message);
  }
};