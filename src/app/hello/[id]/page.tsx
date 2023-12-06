import React from "react";

const Page: React.FC<{ params: { id: string } }> = (props) => {
  return <h1>Hello {decodeURI(props.params.id)}</h1>;
};

export default Page;