const errorLogger = (err, req, res, next) => {
  console.error(
    `Message: ${err.message}, Cause: ${err.cause}, Stack: ${err.stack}`,
  );
  next(err);
};

const errorSender = (err, req, res, next) => {
  req.status(500);
  req.send("<h1>There has been an error, sorry, try reloading the page.</h1>");
};

module.exports = errorLogger;
