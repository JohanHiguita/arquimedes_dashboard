const Challenge = require('../models/challenge')

/* function index(req, res) {
    return User.find({}, '-salt -password').exec()
      .then(users => res.status(200).json(users))
      .catch(handleError(res));
  } */

  /* function create(req, res) {
    const newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
  
    return newUser.save()
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          config.secrets.session,
          { expiresIn: 60 * 60 * 5 },
        );
        res.json({ token });
      })
      .catch(validationError(res));
  } */

 /*  module.exports = {
    index,
    create,
  }; */