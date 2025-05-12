import { BodyPartsArray } from './BodyParts';

export type BodyOrParts = Creep['body'] | BodyPartsArray;

export class Body {
  static from(bodyOrParts: BodyOrParts): Creep['body'] {
    return Body.isSimpleBody(bodyOrParts) ? Body.fromParts(bodyOrParts) : bodyOrParts;
  }

  static fromParts(bodyParts: BodyPartsArray): Creep['body'] {
    return bodyParts.map((part) => ({ type: part, hits: 100 }));
  }

  static isSimpleBody(bodyOrParts: BodyOrParts): bodyOrParts is BodyPartConstant[] {
    return bodyOrParts.some((part) => typeof part === 'string');
  }

  static getCost(bodyOrParts: BodyOrParts): number {
    return Body.from(bodyOrParts).reduce((cost, part) => cost + BODYPART_COST[part.type], 0);
  }
}
