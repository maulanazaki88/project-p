"use client";
import React from "react";
import HomePage from "@/components/home-page/HomePage";
import Context, { ContextType } from "@/context/Store";

const Home: React.FC<{ params: { id: string } }> = (props) => {

  const {user_data_handler_ctx, user_data_ctx} = React.useContext(Context) as ContextType;


  React.useEffect(() => {
    fetch(`/api/get-user/${props.params.id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    })
      .then((res) => res)
      .then((data) => data.json())
      .then((data) => {
        user_data_handler_ctx(data);
        return;
      })
      .catch((e) => console.log(e));
  }, []);

  if (user_data_ctx) {
    return <HomePage data={user_data_ctx} />;
  } else {
    return <div>Loading...</div>;
  }
};
Home.displayName = "Home";
export default Home;
