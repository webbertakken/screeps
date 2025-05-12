export type BodyPartsArray = BodyPartConstant[];

export class BodyParts {
  static create(bodyParts: BodyPartsArray): BodyPartsArray {
    return bodyParts;
  }

  static addMoveParts(bodyParts: BodyPartsArray): BodyPartsArray {
    return [...bodyParts, ...bodyParts.map(() => MOVE as BodyPartConstant)];
  }
}
