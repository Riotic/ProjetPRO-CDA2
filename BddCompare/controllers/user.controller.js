const { createUser } = require('../queries/user.queries');

// exports.userNew = (req, res, next) => {
//     res.render('layouts/signup', { error: null});
// }

exports.userCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createUser(body);
    req.login(user, (err) => {
      if (err) { next(err) }
      res.redirect('/');
    })
  } catch(e) {
    res.render('signup', { error: e.message });
  }
}