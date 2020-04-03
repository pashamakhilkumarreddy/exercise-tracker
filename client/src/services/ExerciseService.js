import Api from './Api';

export default {
  post(exercise) {
    return Api().post('/exercises/add', exercise);
  },
  get() {
    return Api().get('/exercises');
  }
}