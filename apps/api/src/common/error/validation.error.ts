export class ValidationError extends Error {
  public readonly status = 400;

  constructor(message: string, public readonly metadata: any = {}) {
    super(message);
  }
}
