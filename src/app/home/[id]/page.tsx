import React from "react";
import { getUser } from "@/server/actions";
import HomePage from "@/components/home-page/HomePage";

const Home: React.FC<{ params: { id: string } }> = async (props) => {
  const { data, status } = await getUser(props.params.id);

  if (data && status == 200) {
    return <HomePage data={data} />;
  } else {
    return <div>Loading...</div>;
  }
};
Home.displayName = "Home";
export default Home;
