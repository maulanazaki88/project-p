"use client";
import React from "react";
import HomePage from "@/components/home-page/HomePage";
import Context, { ContextType } from "@/context/Store";
import Loading from "@/components/loading/LoadingLight";
import { UserType } from "@/type";

const Home: React.FC<{ params: { id: string } }> = (props) => {
  const { user_data_handler_ctx, user_data_ctx } = React.useContext(
    Context
  ) as ContextType;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false)
        user_data_handler_ctx(data);
        return;
      })
      .catch((e) => console.log(e));
  }, []);


  if (!isLoading && user_data_ctx) {
    return <HomePage data={user_data_ctx} />;
  } else {
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading color="#1a1a2e" size={100} />
      </div>
    );
  }
};
Home.displayName = "Home";
export default Home;
