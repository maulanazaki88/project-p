import React from "react";
import ConfirmedInvitationPage from "@/components/confirmed-invitation-page/ConfirmedInvitationPage";

const ConfirmedInvitation: React.FC<{ params: { u_id: string } }> = async (
  props
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user/${props.params.u_id}`, {
      method: "GET",
      headers: {
        'content-type' : "application/json"
      },
      cache: "no-cache"
    }
  );

  const data = await response.json();

  if (data) {
    return <ConfirmedInvitationPage data={data} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default ConfirmedInvitation;
