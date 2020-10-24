import { CreepRole } from './CreepRole';
import { CreepLayout } from './CreepLayout';

export class CreepBlueprint {
  public name: string;
  public role: CreepRole;
  public layout: CreepLayout;

  constructor(role: CreepRole, layout: CreepLayout) {
    this.name = Math.random().toString(36).substring(7);
    this.role = role;
    this.layout = layout;
  }
}
