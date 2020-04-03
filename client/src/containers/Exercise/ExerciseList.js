import React, { Fragment, Component } from 'react';
import Exercise from './Exercise';
import ExerciseService from '../../services/ExerciseService';
import './exercise.css';

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      showMessage: false,
      message: ''
    };
  }

  async componentDidMount() {
    try {
      const exercisesData = await ExerciseService.get();
      const exercises = exercisesData.data.exercises;
      if (exercises.length) {
        this.setState({
          exercises
        });
      }
    } catch(err) {
      console.log(err);
      console.error(err.response.data.message);
    }
  }

  deleteExercise = async (e, id) => {
    try {
      const isProductDeleted = await ExerciseService.delete(id.toString());
      const updatedExercises = this.state.exercises.filter(exercise => exercise._id !== id);
      this.setState({
        exercises: updatedExercises
      });
      const { data, status } = isProductDeleted;
      if (data && status === 200) {
        this.setState({
          showMessage: true,
          message: 'Succesfully deleted the exercise'
        })
      }
      setTimeout(() => {
        console.log(`I ran`);
        this.setState({
          showMessage: false
        });
      }, 1000);
    } catch (err) {
      console.log(err);
      console.error(err.response.data.error);
    }
  }

  render() {
    return (
      <Fragment>
        <div className={`columns is-mobile is-centered is-vcentered mt-5`}>
          <div className={`column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-two-third-widescreen is-two-quarters-fullhd`} style={{'overflow': 'scroll'}}>
            <table className={`table is-hoverable is-fullwidth`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UserName</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.exercises.length ? (this.state.exercises.map((exercise, index) => <Exercise key={index.toString()} exercise = {exercise} deleteExercise={this.deleteExercise} /> )): 
                  <tr>
                    <td colSpan="5" className={`has-text-centered is-size-4`}>No Exercises found</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
        {
          this.state.showMessage ? (<article className={`message is-info`}>
            <div className={`message-body`}>
              {this.state.message}
            </div>
          </article>): null
        }
      </Fragment>
    );
  }
}
