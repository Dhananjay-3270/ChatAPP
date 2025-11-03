const User = require("../models/user");

const getStatus = async (req, res) => {
  try {
    const userEmail = req.user.email;

    // Find user by email and select only the status field
    const user = await User.findOne({ email: userEmail }).select("status");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "Status retrieved successfully",
      data: {
        status: user.status // Default to offline if no status
      },
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(500).json({
      error: "Failed to fetch user status",
    });
  }
};

module.exports = { getStatus };
