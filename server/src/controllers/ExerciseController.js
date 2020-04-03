const mongoose = require('mongoose');

const {
  Exercise,
} = require('../models');

module.exports = {
  async addExercise(req, res) {
    try {
      const {
        username,
        description,
      } = req.body;
      const duration = Number(req.body.duration);
      const date = Date.parse(req.body.date);
      const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
      });
      const saveExercise = await newExercise.save();
      if (saveExercise) {
        res.status(200).send({
          err: false,
          message: 'Successfully added the new exercise',
          newExercise,
        });
        return;
      }
      res.status(400).send({
        err: true,
        message: 'Unable to get the exercise',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async getExercises(req, res) {
    try {
      const exercises = await Exercise.find();
      if (exercises) {
        res.status(200).send({
          err: false,
          message: 'Successfully fetched the exercises',
          exercises,
        });
        return;
      }
      res.status(400).send({
        err: true,
        message: 'Unable to get exercises',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async getExercise(req, res) {
    try {
      const {
        id: exerciseID,
      } = req.params;
      const exercise = await Exercise.findById({
        _id: exerciseID,
      });
      if (exercise) {
        res.status(200).send({
          err: false,
          message: 'Successfully fetched the exercise',
          exercise,
        });
        return;
      }
      res.status(400).send({
        err: true,
        message: 'Unable to get the exercise with the given id',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async updateExercise(req, res) {
    try {
      const {
        id: exerciseID,
      } = req.params;
      const {
        username,
        description,
      } = req.body;
      const duration = Number(req.body.duration);
      const date = Date.parse(req.body.date);
      const updatedExercise = await Exercise.findOneAndUpdate({
        _id: exerciseID,
      }, {
        username,
        description,
        duration,
        date,
      }, {
        new: true,
      });
      if (updatedExercise) {
        res.status(200).send({
          err: false,
          message: 'Successfully updated the exercise',
        });
        return;
      }
      res.status(400).send({
        err: true,
        message: 'Unable to update the exercise with the given id',
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        err: true,
        message: 'Internal server error',
      });
    }
  },

  async deleteExercise(req, res) {
    try {
      const {
        id: exerciseID,
      } = req.params;
      console.log(exerciseID);
      const deleteExercise = await Exercise.findByIdAndDelete({
        _id: mongoose.Types.ObjectId(exerciseID),
      });
      if (deleteExercise) {
        res.status(200).send({
          err: false,
          message: 'Successfully deleted the exercise',
        });
        return;
      }
      res.status(400).send({
        err: true,
        message: 'Unable to delete the exercise with the given id',
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
