import React from 'react';
import { ExerciseList, CreateExercise, EditExercise } from '../containers/Exercise';
import { CreateUser, EditUser } from '../containers/User';


import {
  Route,
  Switch
} from 'react-router-dom';

export default () =>
  <Switch>
    <Route path="/" exact component={ExerciseList} />
    <Route path="/edit/:id" exact component={EditExercise} />
    <Route path="/create" exact component={CreateExercise} />
    <Route path="/user" exact component={CreateUser} />
  </Switch>