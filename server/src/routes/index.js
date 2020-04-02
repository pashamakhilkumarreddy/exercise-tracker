const exercises = require('./exercises');
const users = require('./users');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/exercises', exercises);
};
