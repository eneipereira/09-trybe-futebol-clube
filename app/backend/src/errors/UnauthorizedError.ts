export default class UnauthorizedError extends Error {
  constructor(message = 'Incorrect email or password') {
    super(message);

    this.name = 'UnauthorizedError';
  }
}
