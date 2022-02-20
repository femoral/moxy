export abstract class Mapper<TInput, TOutput> {
  abstract map(input: TInput): TOutput;

  mapArray(inputList: TInput[]): TOutput[] {
    return inputList.map((input) => this.map(input));
  }
}
