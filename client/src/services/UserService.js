import Api from './Api';

export default {
  post(user) {
    return Api().post('/users/add', user);
  },
  get() {
    return Api().get('/users');
  }
}