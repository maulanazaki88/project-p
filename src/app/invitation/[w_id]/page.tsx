import React from "react";
import InvitationLandingPage from "@/components/invitation-landing-page/InvitationLandingPage";
import Loading from "@/components/loading/LoadingLight";

const InvitationLanding: React.FC<{ params: { w_id: string } }> = async (
  props
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/workspace/get/${props.params.w_id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    }
  );

  const data = await response.json();

  if (data) {
    return <InvitationLandingPage data={data} />;
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

export default InvitationLanding;
