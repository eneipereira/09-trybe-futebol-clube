export default class UserNotFound extends Error {
  constructor(message = 'Incorrect email or password') {
    super(message);

    this.name = 'UserNotFound';
  }
}
