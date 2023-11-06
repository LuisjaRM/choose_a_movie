const notFound = async (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not Found",
  });
};

module.exports = notFound;
