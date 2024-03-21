import React from "react";
import InvitationLandingPage from "@/components/invitation-landing-page/InvitationLandingPage";

const InvitationLanding: React.FC<{ params: { w_id: string } }> = async (
  props
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-workspace/${props.params.w_id}`, {
      method: "GET",
      headers: {
        'content-type' : "application/json"
      },
      cache: "no-cache"
    }
  );

  const data = await response.json();

  if (data) {
    return <InvitationLandingPage data={data} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default InvitationLanding;
