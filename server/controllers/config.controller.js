const { getConfigByRole } = require("../utils/roleConfig");

const getConfigDetails = async (req, res) => {
  try {
    const role = req?.user?.role || "user";
    const roleConfig = getConfigByRole(role);

    const baseConfig = {
      greeting: {
        active: true,
        hide: false,
      },
      recentChats: {
        active: true,
        hide: false,
      },
      status: roleConfig.status,
      quickActions: roleConfig.quickActions,
    };

    return res.status(200).json({ data: baseConfig });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch config" });
  }
};

module.exports = { getConfigDetails };
