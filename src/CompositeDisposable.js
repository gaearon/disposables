import isDisposable from './isDisposable';

/**
 * Represents a group of disposable resources that are disposed together.
 */
export default class CompositeDisposable {
  constructor(...disposables) {
    if (Array.isArray(disposables[0]) && disposables.length === 1) {
      disposables = disposables[0];
    }

    for (let i = 0; i < disposables.length; i++) {
      if (!isDisposable(disposables[i])) {
        throw new Error('Expected a disposable');
      }
    }

    this.disposables = disposables;
    this.isDisposed = false;
  }

  /**
   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
   * @param {Disposable} item Disposable to add.
   */
  add(item) {
    if (this.isDisposed) {
      item.dispose();
    } else {
      this.disposables.push(item);
    }
  }

  /**
   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
   * @param {Disposable} item Disposable to remove.
   * @returns {Boolean} true if found; false otherwise.
   */
  remove(item) {
    if (this.isDisposed) {
      return false;
    }

    const index = this.disposables.indexOf(item);
    if (index === -1) {
      return false;
    }

    this.disposables.splice(index, 1);
    item.dispose();
    return true;
  }

  /**
   * Disposes all disposables in the group and removes them from the group.
   */
  dispose() {
    if (this.isDisposed) {
      return;
    }

    const len = this.disposables.length;
    const currentDisposables = new Array(len);
    for (let i = 0; i < len; i++) {
      currentDisposables[i] = this.disposables[i];
    }

    this.isDisposed = true;
    this.disposables = [];
    this.length = 0;

    for (let i = 0; i < len; i++) {
      currentDisposables[i].dispose();
    }
  };
}