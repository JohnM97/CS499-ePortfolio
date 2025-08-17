const createError = require('http-errors');

function handleUnauthorized(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: err.name + ": " + err.message });
  }
  next(err);
}

function handleNotFound(req, res, next) {
  next(createError(404));
}

function handleGeneralError(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
}

module.exports = {
  handleUnauthorized,
  handleNotFound,
  handleGeneralError
};
