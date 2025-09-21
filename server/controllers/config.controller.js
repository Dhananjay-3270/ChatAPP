const getConfigDetails = async (req, res) => {
  res.status(200).json({
    message: "Config details fetched successfully",
    data: {
      appName: "ChatApp",
      version: "1.0.0",
    },
  });
};
module.exports = { getConfigDetails };
