import expect from 'expect.js';
import Disposable from '../Disposable';

describe('Disposable', () => {
  it('should provide empty disposable', () => {
    expect(Disposable.empty.dispose).to.not.throwError();
  });

  it('calls dispose', () => {
    let disposed = false;
    const d = new Disposable(() => disposed = true);
    expect(disposed).to.equal(false);
    d.dispose();
    expect(disposed).to.equal(true);
  });

  it('calls dispose with null context', () => {
    let context;
    const d = new Disposable(function () { context = this; });
    d.dispose();
    expect(context).to.equal(null);
  });

  it('does not call dispose twice', () => {
    let disposed = false;
    const d = new Disposable(() => disposed = true);
    expect(disposed).to.equal(false);
    d.dispose();
    expect(disposed).to.equal(true);

    disposed = 42;
    d.dispose();
    expect(disposed).to.equal(42);
  });
});