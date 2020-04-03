import React from 'react';

const Exercise = ({exercise}) => {
  return (
    <tr>
      <td>{exercise._id}</td>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date}</td>
      <td>
        <span className="buttons action-buttons">
          <button className="button is-small is-primary is-light">Update</button>
          <button className="button is-small is-link is-danger">Delete</button>
        </span>
      </td>
    </tr>
  )
}

export default Exercise;