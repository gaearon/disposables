import expect from 'expect.js';
import Disposable from '../Disposable';
import SerialDisposable from '../SerialDisposable';
import CompositeDisposable from '../CompositeDisposable';
import isDisposable from '../isDisposable';

describe('isDisposable', () => {
  it('checks for dispose function', () => {
    expect(isDisposable(new Disposable())).to.equal(true);
    expect(isDisposable(new SerialDisposable())).to.equal(true);
    expect(isDisposable(new CompositeDisposable())).to.equal(true);
    expect(isDisposable({ dispose: () => {} })).to.equal(true);
    expect(isDisposable({ dispose: 42 })).to.equal(false);
    expect(isDisposable(() => {})).to.equal(false);
  });
});