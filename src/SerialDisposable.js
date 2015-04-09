import isDisposable from './isDisposable';

export default class SerialDisposable {
  constructor() {
    this.isDisposed = false;
    this.current = null;
  }

  /**
   * Gets the underlying disposable.
   * @return The underlying disposable.
   */
  getDisposable() {
    return this.current;
  }

  /**
   * Sets the underlying disposable.
   * @param {Disposable} value The new underlying disposable.
   */
  setDisposable(value = null) {
    if (value != null && !isDisposable(value)) {
      throw new Error('Expected either an empty value or a valid disposable');
    }

    const isDisposed = this.isDisposed;
    let previous;

    if (!isDisposed) {
      previous = this.current;
      this.current = value;
    }

    if (previous) {
      previous.dispose();
    }

    if (isDisposed && value) {
      value.dispose();
    }
  }

  /**
   * Disposes the underlying disposable as well as all future replacements.
   */
  dispose() {
    if (this.isDisposed) {
      return;
    }

    this.isDisposed = true;
    let previous = this.current;
    this.current = null;

    if (previous) {
      previous.dispose();
    }
  }
}