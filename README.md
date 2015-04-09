# disposables

Disposables let you safely compose resource disposal semantics.
Think DOM nodes, event handlers, socket connections.

This tiny package includes several disposables:

* [`Disposable`](https://github.com/gaearon/disposables/blob/master/modules/Disposable.js) ensures its `dispose` action runs only once;
* [`CompositeDisposable`](https://github.com/gaearon/disposables/blob/master/modules/CompositeDisposable.js) ensures a group of disposables are disposed together;
* [`SerialDisposable`](https://github.com/gaearon/disposables/blob/master/modules/SerialDisposable.js) switches underlying disposables on the fly and disposes them.

This implementation of disposables is extracted from [RxJS](https://github.com/Reactive-Extensions/RxJS/blob/master/src/core/disposables).
I took the liberty to tweak the code style to my liking and provide this as a standalone package.

The API is *mostly* the same as RxJS except stricter in a few places.
It does not strive for 100% API compatibility with RxJS, but general disposable behavior should match.

It's best if you consult the source and tests, as classes are small and few.

### Why Use This Over RxJS

* You only need disposables and not observables;
* RxJS is still figuring out [its modularity story](https://github.com/Reactive-Extensions/RxJS-Modular) and [it's not ready](https://github.com/Reactive-Extensions/RxJS-Modular/issues/4#issuecomment-90879664).

Really, there are no other reasons.

### License

Like the original RxJS code, it is licened under Apache 2.0.
