// works with passport as a middleware, redirect user to index page if he is not connected
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).redirect('/');
    }
  }