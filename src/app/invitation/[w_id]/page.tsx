import React from "react";
import InvitationLandingPage from "@/components/invitation-landing-page/InvitationLandingPage";

const InvitationLanding: React.FC<{ params: { w_id: string } }> = async (
  props
) => {
  const response = await fetch(`http://localhost:8000/api/get-workspace/${props.params.w_id}`);

  const data = await response.json();

  if (data) {
    return <InvitationLandingPage data={data} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default InvitationLanding