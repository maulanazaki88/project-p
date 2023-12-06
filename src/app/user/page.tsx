"use client";
import React from "react";
import { UserType } from "@/type";

const UserPage: React.FC = () => {
  const [data, setData] = React.useState<UserType>({
    u_id: "",
    username: "",
    email: "",
    password: "",
    workspace_list: [],
    created_at: "",
    is_online: 0,
  });

  const [tryResponse, setTryResponse] = React.useState<number | string>("wait");

  const [users, setUsers] = React.useState<UserType[]>([]);

  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitData = async () => {
    console.log("SUBMIT");
    const response = await fetch("/api/create-user", {
      body: JSON.stringify(data),
      headers: { "content-type": "json/application" },
      method: "POST",
    });

    setTryResponse("wait");

    if (response.status == 200) {
      const data = await response.json();
      setTryResponse(data.message);
      console.log(data.message);
    } else {
      setTryResponse("Failed");
    }
  };

  const deleteUser = async (u_id: string) => {
    const response = await fetch(`/api/delete-user/${u_id}`, {
      method: "DELETE",
      headers: {"content-type" : "json/application"},
    });

    console.log(await response.json());
  };

  React.useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/get-all-users", {
        method: "GET",
        headers: { "content-type": "json/application" },
      });

      const data = await response.json();

      setUsers(data);
    };

    getUsers();

    let getInterval = setInterval(getUsers, 5000);

    return function cleanUp() {
      clearInterval(getInterval);
    };
  }, []);

  return (
    <section>
      <fieldset>
        <form method="post">
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            onChange={(e) => dataChangeHandler(e)}
            name="username"
            type="text"
            placeholder="Username"
            value={data.username}
          />
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            onChange={(e) => dataChangeHandler(e)}
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            onChange={(e) => dataChangeHandler(e)}
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
          />
        </form>
        <button type="button" onClick={submitData}>
          Submit
        </button>
      </fieldset>
      <p>{tryResponse}</p>
      <ul>
        {users.map((user, index) => {
          return (
            <li key={index + "user"}>
              <p>
                {user.u_id} || {user.username}
              </p>
              <button type="button" onClick={() => deleteUser(user.u_id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

UserPage.displayName = "UserPage";
export default UserPage;
