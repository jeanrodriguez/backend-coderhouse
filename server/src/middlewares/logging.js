const logger = function (req, res, next) {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
};

export default logger;
