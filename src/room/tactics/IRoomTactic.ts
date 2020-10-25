import { RoomManager } from '../RoomManager';

export interface IRoomTactic {
  new (): any;
  execute: ((manager: RoomManager) => void) | (() => void);
}
