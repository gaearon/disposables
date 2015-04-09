const noop = () => {};

/**
 * The basic disposable.
 */
export default class Disposable {
  static empty = { dispose: noop };

  constructor(action) {
    this.isDisposed = false;
    this.action = action || noop;
  }

  dispose() {
    if (!this.isDisposed) {
      this.action.call(null);
      this.isDisposed = true;
    }
  }
}