export const useIdGenerator = () => {
  const task = () => {
    const date = new Date();

    const time_string = date.toLocaleTimeString();

    const date_arr = date.toLocaleDateString().replaceAll("/", "-").split("-");

    const day = date_arr[1];
    const month = date_arr[0];
    const year = date_arr[2];

    return `tsk-${year}${month}${day}${time_string.replaceAll(":", "")}`;
  };

  const workspace = () => {
    const date = new Date();

    const time_string = date.toLocaleTimeString();

    const date_arr = date.toLocaleDateString().replaceAll("/", "-").split("-");

    const day = date_arr[1];
    const month = date_arr[0];
    const year = date_arr[2];

    return `wks-${year}${month}${day}${time_string.replaceAll(":", "")}`;
  };

  const user = () => {
    const date = new Date();

    const time_string = date.toLocaleTimeString();

    const date_arr = date.toLocaleDateString().replaceAll("/", "-").split("-");

    const day = date_arr[1];
    const month = date_arr[0];
    const year = date_arr[2];

    return `usr-${year}${month}${day}${time_string.replaceAll(":", "")}`;
  };

  return {
    task: () => task(),
    workspace: () => workspace(),
    user: () => user(),
  };
};
