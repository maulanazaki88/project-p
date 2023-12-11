
import { TaskType, UserType, WorkspaceType } from "@/type";

export const getUser = async (id: string) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/get-user/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const createUser = async (data: UserType) => {
  console.log("create user executed")
  const response = await fetch(`${process.env.PYTHON_HOST}/api/create-user/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
  const status = response.status;

  console.log(response)

  return {
    data : json,
    status: status
  };
};

export const updateUser = async (id: string, data: UserType) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/update-user/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/delete-user/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const createWorkspace = async (data: WorkspaceType) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/create-workspace/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const getWorkspace = async (id: string) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/get-workspace/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const updateWorkspace = async (id: string, data: WorkspaceType) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/update-workspace/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const deleteWorkspace = async (id: string) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/delete-workspace/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json();
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const createTask = async (data: TaskType) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/create-task/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const getTask = async (id: string) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/get-task/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const updateTask = async (id: string, data: TaskType) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/update-task/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${process.env.PYTHON_HOST}/api/delete-task/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json()
  const status = response.status;

  return {
    data : json,
    status: status
  };
};
