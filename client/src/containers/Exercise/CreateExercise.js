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
      users: []
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
      const usersData = await UserService.get();
      if (usersData.data.users.length) {
        const users = usersData.data.users.map(userDetail => userDetail.username);
        this.setState({
          users,
          username: usersData.data.users[0].username
        });
      }
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message)
    }
  }

  handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const exercise = {
        ...this.state
      }
      const addNewExercise = await ExerciseService.post(exercise);
      const { data, status } = addNewExercise;
      if (status === 200) {
        window.location = '/';
      }
      console.log(addNewExercise);
      console.log(exercise);
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message);
    }
  }
  render() {
    return (
      <Fragment>
        <div className={`columns is-mobile is-centered is-vcentered mt-5`}>
          <div className={`column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-two-third-widescreen is-two-quarters-fullhd`}>
            <form className={`auth-form`} onSubmit={this.handleSubmit}>
              <h1 className={`title`}>Create a New Exercise</h1>
              <div className={`field`}>
                <label htmlFor="username" className={`label`}>Username</label>
                <div className={`control`}>
                  <div className={'select is-primary is-medium ' + (this.state.users.length ? '' : 'is-loading')}>
                    <select name="username" onChange={this.handleChange} value={this.state.username}>
                      {
                        this.state.users.map((username, index) => <option key={index.toString()} value={username}>{username}</option>)
                      }
                    </select>
                  </div>
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
                <button className={`button is-primary is-fullwidth`}>Create Exercise</button>
              </div>
            </form>
          </div>          
        </div>
      </Fragment>
    );
  }
}