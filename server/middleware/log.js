function log(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.app.locals.errors = `Login Terlebih Dahulu !!`
      res.redirect("/login");
    }
  }
  
  module.exports = log;