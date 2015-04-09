import expect from 'expect.js';
import Disposable from '../Disposable';
import SerialDisposable from '../SerialDisposable';

describe('SerialDisposable', () => {
  let dispA;
  let dispB;
  let dispC;

  beforeEach(() => {
    dispA = new Disposable(() => { dispA.disposed = true; });
    dispB = new Disposable(() => { dispB.disposed = true; });
    dispC = new Disposable(() => { dispC.disposed = true; });
  });

  it('throws on bad disposable', () => {
    const serial = new SerialDisposable();
    expect(() => serial.setDisposable(42)).to.throwError();
    expect(() => serial.setDisposable({})).to.throwError();
    expect(() => serial.setDisposable(0)).to.throwError();
    expect(() => serial.setDisposable('')).to.throwError();
  });

  it('lets you get and set the current disposable', () => {
    const serial = new SerialDisposable();
    expect(serial.getDisposable()).equal(null);
    serial.setDisposable(dispA);
    expect(serial.getDisposable()).equal(dispA);
    serial.setDisposable(null);
    expect(serial.getDisposable()).equal(null);
    serial.setDisposable();
    expect(serial.getDisposable()).equal(null);
    serial.setDisposable(dispA);
    expect(serial.getDisposable()).equal(dispA);
  });

  it('disposes the current disposable on own dispose', () => {
    const serial = new SerialDisposable();
    serial.setDisposable(dispA);
    expect(dispA.disposed).to.equal(undefined);
    serial.dispose();
    expect(dispA.disposed).to.equal(true);
  });

  it('disposes the just current disposable if is disposed itself', () => {
    const serial = new SerialDisposable();
    serial.dispose();
    serial.setDisposable(dispA);
    expect(dispA.disposed).to.equal(true);
    serial.setDisposable(null);
    serial.setDisposable(dispB);
    expect(dispB.disposed).to.equal(true);
  });

  it('disposes the previous disposable ', () => {
    const serial = new SerialDisposable();
    serial.setDisposable(dispA);
    expect(dispA.disposed).to.equal(undefined);
    serial.setDisposable(dispB);
    expect(dispA.disposed).to.equal(true);
    expect(dispB.disposed).to.equal(undefined);
    serial.setDisposable(null);
    expect(dispB.disposed).to.equal(true);
    serial.setDisposable(dispC);
    expect(dispC.disposed).to.equal(undefined);
    serial.setDisposable(null);
    expect(dispC.disposed).to.equal(true);
  });

  it('does not attempt to dispose the child twice', () => {
    const serial = new SerialDisposable();
    serial.setDisposable(dispA);
    serial.dispose();
    expect(dispA.disposed).to.equal(true);

    dispA.disposed = 42;
    serial.dispose();
    expect(dispA.disposed).to.equal(42);
  });
});