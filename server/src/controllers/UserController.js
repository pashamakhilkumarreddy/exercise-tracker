const {
  User,
} = require('../models');

module.exports = {
  async getUser(req, res) {
    try {
      const users = await User.find();
      if (users) {
        res.status(200).send({
          err: false,
          message: 'Successfully fetched users',
          users,
        });
        return;
      }

      res.status(400).send({
        err: true,
        message: 'Unable to get users',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async addUser(req, res) {
    try {
      const { username } = req.body;
      const newUser = new User({ username });
      const saveUser = await newUser.save();
      if (saveUser) {
        res.status(200).send({
          err: false,
          message: 'Successfully added a new user',
          newUser,
        });
        return;
      }
      res.status(400).send({
        err: true,
        message: 'Unable to add a new user',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },
};
