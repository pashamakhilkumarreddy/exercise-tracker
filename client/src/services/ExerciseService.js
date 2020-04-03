import Api from './Api';

export default {
  post(exercise) {
    return Api().post('/exercises/add', exercise);
  },
  get() {
    return Api().get('/exercises');
  },
  getExercise(id) {
    return Api().get(`/exercises/${id}`);
  },
  put(id, exercise) {
    return Api().put(`/exercises/update/${id}`, exercise);
  },
  delete(id) {
    return Api().delete(`/exercises/${id}`);
  }
}