import { showNotification } from "@mantine/notifications";

export const showError = (message: string) => {
  return showNotification({
    title: "Error",
    message,
    color: "red",
  });
};

export const showSuccess = (message: string) => {
  return showNotification({
    title: "Success",
    message,
    color: "green",
  });
};
