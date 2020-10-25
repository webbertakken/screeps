/**
 * Class decorator for implementing static interface
 * this statement implements both normal interface & static interface
 *
 * Usage: @implementsStatic<MyTypeStatic>()
 *
 * Original: https://stackoverflow.com/a/43674389/3593896
 */
export function implementsStatic<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
