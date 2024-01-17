const customError = {
    Error: async (res) => {
      try {
        res.status(400).json({ message: "Some thing went wrong" });
      } catch (error) {}
    },
  };
  module.exports = customError;
  