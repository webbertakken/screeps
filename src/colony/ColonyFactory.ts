import { Colony } from './Colony';

export class ColonyFactory {
  public static create(): Colony {
    return new Colony();
  }
}
