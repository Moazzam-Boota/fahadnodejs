exports.errorHandeler = (error, req, res, next) => {
  let status = error.statusCode;
  let message = error.message;
  if (!error.statusCode) {
    status = 500;
    message = "Network Error " + error.message;
  }
  res.status(status).json({ status: status, message: message });
};

exports.handleMissingRecord = (res) => {
  return res.status(404).json({ message: "Record not Found" });
};
