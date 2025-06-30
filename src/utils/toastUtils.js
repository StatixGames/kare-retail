import toast from "react-hot-toast";

export const notifySuccess = (msg) =>
  toast.success(msg, {
    icon: "✅",
    style: {
      borderRadius: "10px",
      background: "#d1fae5",
      color: "#065f46",
      fontWeight: "bold",
    },
  });

export const notifyError = (msg) =>
  toast.error(msg, {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#fee2e2",
      color: "#991b1b",
      fontWeight: "bold",
    },
  });
