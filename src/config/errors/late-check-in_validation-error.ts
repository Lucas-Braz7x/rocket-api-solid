export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      "O Checki não pode ser validado, pois, já passou 20min de sua criação"
    );
  }
}
