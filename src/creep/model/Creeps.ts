export class Creeps {
  public static get count(): number {
    return Object.keys(Game.creeps).length;
  }
}
