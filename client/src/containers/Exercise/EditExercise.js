import React, { Fragment, Component } from 'react';
import DatePicker from 'react-datepicker';
import ExerciseService from '../../services/ExerciseService';
import UserService from '../../services/UserService';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      showForm: true,
      showError: false,
      errMessage: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    console.log(this.state);
  }

  handleDateChange = date => {
    this.setState({
      date
    })
  }

  async componentDidMount() {
    try {
      const exerciseData = await ExerciseService.getExercise(this.props.match.params.id);
      const { data, status } = exerciseData;
      if (data && status === 200) {
        this.setState({
          username: data.exercise.username,
          description: data.exercise.description,
          duration: data.exercise.duration,
          date: new Date(data.exercise.date.toString()),
        });
      } else {
        this.setState({
          showForm: false
        });
      }
    } catch (err) {
      this.setState({
        showForm: false
      });
      console.log(err);
      console.error(err.response.data.message)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { showForm, showError, errMessage, ...exercise } = this.state;
      const updateExercise = await ExerciseService.put(this.props.match.params.id, exercise);
      const { data, status } = updateExercise;
      if (status === 200) {
        window.location = '/';
      } else {
        this.setState({
          showError: true,
          errMessage: data.message
        });
      }
      console.log(updateExercise);
    } catch (err) {
      this.setState({
        showError: true,
        errMessage: err.response.data.message
      });
      console.log(err);
      console.error(err.response.data.message);
    }
  }
  render() {
    return (
      <Fragment>
        <div className={`columns is-mobile is-centered is-vcentered mt-5`}>
          <div className={`column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-two-third-widescreen is-two-quarters-fullhd`}>
            <form className={'auth-form ' + (this.state.showForm ? '' : 'display-none')} onSubmit={this.handleSubmit} >
              <h1 className={`title`}>Update Exercise</h1>
              <div className={`field`}>
                <label htmlFor="username" className={`label`}>Username</label>
                <div className={`control`}>
                  <input id="username" className={`input`} type="text" name="username" placeholder="Please enter the Username" value={this.state.username} onChange={this.handleChange} />
                </div>
              </div>
              <div className={`field`}>
                <label htmlFor="description" className={`label`}>Description</label>
                <div className={`control`}>
                  <input id="description" className={`input`} type="text" name="description" placeholder="Please enter the Description" value={this.state.description} onChange={this.handleChange} />
                </div>
              </div>
              <div className={`field`}>
                <label htmlFor="duration" className={`label`}>Duration</label>
                <div className={`control`}>
                  <input id="duration" className={`input`} type="text" name="duration" placeholder="Please enter the Duration" value={this.state.duration} onChange={this.handleChange} />
                </div>
              </div>
              <div className={`field`}>
                <label htmlFor="date" className={`label`}>Date</label>
                <div className={`control`}>
                  <DatePicker id="date" className={`input`} name="date" selected={this.state.date} onChange={this.handleDateChange} />
                </div>
              </div>
              <div className={`control`}>
                <button className={`button is-primary is-fullwidth`}>Update Exercise</button>
              </div>
            </form>
            <div className={'tile is-parent ' + (this.state.showForm ? 'display-none' : '')}>
              <article className={`tile is-child notification is-danger has-text-centered`}>
                <p className={`title`}>No Exercise Found</p>
                <p className={`subtitle`}>Please check your query</p>
                <div className={`content`}></div>
              </article>
            </div>
          </div>          
        </div>
        {
          this.state.errMessage ? (<article className={`message is-info`}>
            <div className={`message-body`}>
              {this.state.message}
            </div>
          </article>): null
        }
      </Fragment>
    );
  }
}