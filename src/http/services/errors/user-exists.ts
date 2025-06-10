export class UserExistError extends Error {
  constructor() {
    super("Email already exists");
  }
}
