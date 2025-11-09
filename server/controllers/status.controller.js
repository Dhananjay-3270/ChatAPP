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
        status: user.status, // Default to offline if no status
      },
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(500).json({
      error: "Failed to fetch user status",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { state, description } = req.body;

    // Validation: Check if at least one field is provided
    if (!state && !description) {
      return res.status(400).json({
        error: "At least one field (state or description) is required",
      });
    }

    // Validate state if provided
    const validStates = ["online", "offline", "away"];
    if (state && !validStates.includes(state)) {
      return res.status(400).json({
        error: "Invalid status state. Must be one of: online, offline, away",
      });
    }

    // Find user first to get current status
    const user = await User.findOne({ email: userEmail }).select("status");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Prepare update object - only update provided fields
    const updateFields = {};
    if (state) {
      updateFields["status.state"] = state;
    }
    if (description !== undefined) {
      // Allow empty string
      updateFields["status.description"] = description;
    }

    // Update user status
    await User.updateOne({ email: userEmail }, { $set: updateFields });

    // Get updated user status
    const updatedUser = await User.findOne({ email: userEmail }).select(
      "status"
    );

    return res.status(200).json({
      message: "Status updated successfully",
      data: {
        status: updatedUser.status,
      },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({
      error: "Failed to update user status",
    });
  }
};

module.exports = { getStatus, updateStatus };
