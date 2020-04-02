const router = require('express').Router();

const { ExerciseController } = require('../controllers');

router.route('/').get(ExerciseController.getExercises);
router.route('/add').post(ExerciseController.addExercise);
router.route('/:id').get(ExerciseController.getExercise).delete(ExerciseController.deleteExercise);
router.route('/update/:id').put(ExerciseController.updateExercise);

module.exports = router;
