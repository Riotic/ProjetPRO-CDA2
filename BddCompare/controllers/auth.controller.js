const passport = require('passport');

exports.sessionNew = (req, res, next) => {
    res.redirect('/');
  }

exports.sessionCreate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
      } else if (!user) {
        const errorMessage = info.message;
        res.redirect(`/?error=${errorMessage}`);
      } else {
        req.login(user, (err) => {
          if (err) {
            next(err)
          } else {
            res.redirect('/bddCompare');
          }
        })
      }
    })(req, res , next);
}

exports.sessionDelete = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
};