import expect from 'expect.js';
import Disposable from '../Disposable';
import CompositeDisposable from '../CompositeDisposable';

describe('CompositeDisposable', () => {
  let dispA;
  let dispB;
  let dispC;

  beforeEach(() => {
    dispA = new Disposable(() => { dispA.disposed = true; });
    dispB = new Disposable(() => { dispB.disposed = true; });
    dispC = new Disposable(() => { dispC.disposed = true; });
  });

  it('accepts an array of or spread disposables', () => {
    expect(() => new CompositeDisposable(dispA)).to.not.throwError();
    expect(() => new CompositeDisposable(dispA, dispB, dispC)).to.not.throwError();
    expect(() => new CompositeDisposable([dispA, dispB, dispC])).to.not.throwError();
    expect(() => new CompositeDisposable(dispA, [dispA, dispB, dispC])).to.throwError();
    expect(() => new CompositeDisposable([dispA, dispB, dispC], dispA)).to.throwError();
  });

  it('disposes children', () => {
    const composite = new CompositeDisposable(dispA, dispB);
    composite.dispose();
    expect(dispA.disposed).to.equal(true);
    expect(dispB.disposed).to.equal(true);
  });

  it('does not attempt to dispose children twice', () => {
    const composite = new CompositeDisposable(dispA, dispB);
    composite.dispose();

    dispA.disposed = dispB.disposed = 42;
    composite.dispose();
    expect(dispA.disposed).to.equal(42);
    expect(dispB.disposed).to.equal(42);
  });

  it('disposes newly added disposables like other children', () => {
    const composite = new CompositeDisposable(dispA);
    composite.add(dispB);
    composite.add(dispC);
    composite.dispose();
    expect(dispA.disposed).to.equal(true);
    expect(dispB.disposed).to.equal(true);
    expect(dispC.disposed).to.equal(true);
  });

  it('disposes removed children immediately', () => {
    const composite = new CompositeDisposable(dispA);
    composite.add(dispB);
    composite.add(dispC);
    composite.remove(dispA);
    expect(dispA.disposed).to.equal(true);
    composite.remove(dispC);
    expect(dispC.disposed).to.equal(true);
    composite.dispose();
    expect(dispB.disposed).to.equal(true);
  });

  it('treats same instances as different disposables when adding', () => {
    const composite = new CompositeDisposable(dispA);
    composite.add(dispA);
    composite.add(dispA);
    composite.remove(dispA);
    composite.dispose();
    expect(dispA.disposed).to.equal(true);
  });

  it('treats same instances as different disposables when removing', () => {
    const composite = new CompositeDisposable(dispA);
    composite.add(dispA);
    expect(composite.remove(dispA)).to.equal(true);
    expect(dispA.disposed).to.equal(true);
    expect(composite.remove(dispA)).to.equal(true);
    expect(composite.remove(dispA)).to.equal(false);
    composite.dispose();
  });

  it('ignores remove for a non-existant child', () => {
    const composite = new CompositeDisposable(dispA);
    expect(composite.remove(dispB)).to.equal(false);
    composite.dispose();
    expect(dispA.disposed).to.equal(true);
    expect(dispB.disposed).to.equal(undefined);
  });

  it('disposes newly added disposables immediately if disposed itself', () => {
    const composite = new CompositeDisposable(dispA);
    composite.dispose();
    expect(dispA.disposed).to.equal(true);
    composite.add(dispB);
    expect(dispB.disposed).to.equal(true);
    composite.add(dispC);
    expect(dispC.disposed).to.equal(true);
  });

  it('does not store children if disposed itself', () => {
    const composite = new CompositeDisposable(dispA);
    composite.add(dispB);
    composite.dispose();

    expect(composite.remove(dispA)).to.equal(false);
    expect(composite.remove(dispB)).to.equal(false);
    composite.add(dispC);
    expect(composite.remove(dispC)).to.equal(false);
  });
});