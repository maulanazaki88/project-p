import React from "react";
import ConfirmedInvitationPage from "@/components/confirmed-invitation-page/ConfirmedInvitationPage";

const ConfirmedInvitation: React.FC<{ params: { u_id: string } }> = async (
  props
) => {
  const response = await fetch(
    `http://localhost:8000/api/get-user/${props.params.u_id}`
  );

  const data = await response.json();

  if (data) {
    return <ConfirmedInvitationPage data={data} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default ConfirmedInvitation;
