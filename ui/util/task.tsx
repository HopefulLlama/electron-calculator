export default class {
  condition: () => boolean;
  perform: (_: any) => any;

  constructor(condition: () => boolean, perform: (_: any) => any) {
    this.condition = condition;
    this.perform = perform;
  }
}