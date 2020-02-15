class UserDao {
  constructor() {
    this.nextId = 0;
    this.storage = new Map();
  }

  insert(user) {
    if (user.id === null || user.id === undefined) {
      // eslint-disable-next-line no-param-reassign
      user.id = this.nextId;
      this.nextId += 1;
    }
    this.storage.set(user.id, user);

    return user;
  }

  findById(userId) {
    return this.storage.get(userId);
  }
}

module.exports = UserDao;
