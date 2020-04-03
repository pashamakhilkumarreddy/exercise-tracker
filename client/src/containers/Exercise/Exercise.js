import React from 'react';
import { Link } from 'react-router-dom';

const Exercise = ({exercise, deleteExercise}) => {
  return (
    <tr>
      <td>{exercise._id}</td>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date}</td>
      <td>
        <span className="buttons action-buttons">
          <Link to={`/exercises/${exercise._id}`}>
            <button className="button is-small is-primary is-light">Update</button>
          </Link>
          <button className="button is-small is-link is-danger" onClick={e => deleteExercise(e, exercise._id)}>Delete</button>
        </span>
      </td>
    </tr>
  )
}

export default Exercise;