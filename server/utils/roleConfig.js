const getConfigByRole = (role) => {
  switch (role) {
    case "super_admin":
      return {
        quickActions: [
          {
            actionId: "new_chat",
            label: "Start New Chat",
            description: "Begin a new conversation with another user",
          },
          {
            actionId: "new_group",
            label: "Create Group",
            description: "Create a new group chat with multiple users",
          },
          {
            actionId: "send_file",
            label: "Send File",
            description: "Share files, images, or documents",
          },
          {
            actionId: "manage_users",
            label: "Manage Users",
            description: "Add, edit, or remove user accounts",
          },
          {
            actionId: "system_logs",
            label: "View Logs",
            description: "Access system logs and audit trails",
          },
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
          {
            actionId: "new_chat",
            label: "Start New Chat",
            description: "Begin a new conversation with another user",
          },
          {
            actionId: "new_group",
            label: "Create Group",
            description: "Create a new group chat with multiple users",
          },
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
        quickActions: [
          {
            actionId: "new_chat",
            label: "Start New Chat",
            description: "Begin a new conversation with another user",
          },
        ],
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
        quickActions: [
          {
            actionId: "new_chat",
            label: "Start New Chat",
            description: "Begin a new conversation with another user",
          },
        ],
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
