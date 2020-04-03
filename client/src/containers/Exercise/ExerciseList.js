import React, { Fragment, Component } from 'react';
import Exercise from './Exercise';
import ExerciseService from '../../services/ExerciseService'

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
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
      console.log(exercises);
    } catch(err) {
      console.log(err);
      console.error(err.response.data.message);
    }
  }

  deleteExercise = (e) => {

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
                  this.state.exercises.length ? (this.state.exercises.map((exercise, index) => <Exercise key={index.toString()} exercise = {exercise} /> )): 
                  <tr>
                    <td colSpan="5" className={`has-text-centered is-size-4`}>No Exercises found</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}
