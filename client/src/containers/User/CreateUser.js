import React, { Fragment, Component } from 'react';
import UserService from '../../services/UserService';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        ...this.state
      }
      console.log(user);
      const addNewUser = await UserService.post(user);
      const { data, status } = addNewUser;
      console.log(addNewUser);
      if (status === 200) {
        this.setState({
          username: ''
        })
      }
    } catch (err) {
      console.error(err.response.data.message);
    }

  }
  render() {
    return (
      <Fragment>
        <div className={`columns is-mobile is-centered is-vcentered mt-5`}>
          <div className={`column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-two-third-widescreen is-two-quarters-fullhd`}>
            <form className={`auth-form`} onSubmit={this.handleSubmit}>
              <h1 className={`title`}>Create a New User</h1>
              <div className={`field`}>
                <label htmlFor="username" className={`label`}>Description</label>
                <div className={`control`}>
                  <input id="username" className={`input`} type="text" name="username" placeholder="Please enter the Username" value={this.state.username} onChange={this.handleChange} />
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