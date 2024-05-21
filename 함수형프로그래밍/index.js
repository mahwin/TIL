const _ = {};
const L = {};
const Sym = {};

// 아무일도 하지 않는 것을 나타내는 심볼
// 발생하는 에러가 예측 가능한 에러라는 것을 나타내기 위해 사용
Sym.nop = Symbol("nop");

// 아무일도 하지 않는 함수
function noop() {}

// go
_.go = (...args) => _.reduce((a, f) => f(a), args);

// 비동기, 동기 함수를 구분하지 않고 사용할 수 있도록
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

// curry
_.curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

// pipe
_.pipe =
  (...fs) =>
  (a) =>
    _.go(a, ...fs);

const head = (iter) => go1(_.take(1, iter), ([h]) => h);

// reduce
_.reduce = _.curry((f, acc, iter) => {
  if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc =
        a instanceof Promise
          ? a.then((a) => f(acc, a), e == Sym.nop ? acc : Promise.reject(e))
          : f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

// range
_.range = _.curry((l) => {
  const res = [];
  let i = -1;
  while (++i < l) res.push(i);

  return res;
});

L.range = _.curry(function* (l) {
  let i = -1;
  while (++i < l) yield i;
});

// take
_.take = _.curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;

    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise)
        return a
          .then((a) => ((res.push(a), res).length == l ? res : recur()))
          .catch((e) => (e == Sym.nop ? recur() : Promise.reject(e)));
      res.push(a);
      if (res.length == l) return res;
    }
  })();
});

L.take = _.curry(function* (l, iter) {
  for (const a of iter) {
    yield a;
    if (--l == 0) return;
  }
});

// map
L.map = _.curry(function* (f, iter) {
  for (const a of iter) yield go1(a, f);
});

_.map = _.curry((f, iter) => _.go(iter, L.map(f), _.take(Infinity)));

// filter
L.filter = _.curry(async function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise)
      yield b.then((c) => (c ? a : Promise.reject(Sym.nop)));
    else if (b) yield a;
  }
});

_.filter = _.curry((f, iter) => _.go(iter, L.filter(f), _.take(Infinity)));

// find
_.find = _.curry((f, iter) => _.go(iter, L.filter(f), _.take(1), ([a]) => a));

// flatten
const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = _.curry(function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
});

_.flatten = _.pipe(L.flatten, _.take(Infinity));

// deepFlat
// yield *iterable은 for (const val of iterable) yield val;
L.deepFlat = _.curry(function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
});

_.deepFlat = _.curry(_.pipe(L.deepFlat, _.take(Infinity)));

// flatMap
L.flatMap = _.curry(_.pipe(L.map, L.flatten));

_.flatMap = _.curry(_.pipe(L.map, _.flatten));
