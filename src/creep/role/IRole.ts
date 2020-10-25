interface IRole {
  new (): any;
  perform: ((creep: Creep) => void) | (() => void);
}
