import User from '../classes/user'

export default {

  initUsers (users = []) {
    this.define('users', { type: [User], singular: 'user', searchField: 'username', default: users })
  },

}
