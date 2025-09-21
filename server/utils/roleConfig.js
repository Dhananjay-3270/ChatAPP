const getConfigByRole = (role) => {
  switch (role) {
    case "super_admin":
      return {
        quickActions: [
          { actionId: "new_chat", label: "Start New Chat" },
          { actionId: "new_group", label: "Create Group" },
          { actionId: "send_file", label: "Send File" },
          { actionId: "manage_users", label: "Manage Users" },
          { actionId: "system_logs", label: "View Logs" },
        ],
        status: {
          active: true,
          hide: false,
          actions: {
            edit: true,
          },
        },
      };
    case "admin":
      return {
        quickActions: [
          { actionId: "new_chat", label: "Start New Chat" },
          { actionId: "new_group", label: "Create Group" },
        ],
        status: {
          active: true,
          hide: false,
          actions: {
            edit: false,
          },
        },
      };
    case "user":
      return {
        quickActions: [{ actionId: "new_chat", label: "Start New Chat" }],
        status: {
          active: true,
          hide: false,
          actions: {
            edit: false,
          },
        },
      };
    default:
      return {
        quickActions: [{ actionId: "new_chat", label: "Start New Chat" }],
        status: {
          active: true,
          hide: false,
          actions: {
            edit: false,
          },
        },
      };
  }
};

module.exports = { getConfigByRole };
