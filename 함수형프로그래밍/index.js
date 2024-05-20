const _ = {};
const L = {};
const C = {};

// go
_.go = (...args) => _.reduce((a, f) => f(a), args);

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

// reduce
_.reduce = _.curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
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
  console.log(l, iter);
  const res = [];

  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
});

L.take = _.curry(function* (l, iter) {
  for (const a of iter) {
    yield a;
    if (--l == 0) return;
  }
});

// map

L.map = _.curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

_.map = _.curry((f, iter) => _.go(iter, L.map(f), _.take(Infinity)));

// filter
L.filter = _.curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
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

const it = _.flatMap(
  (a) => a,
  [
    [1, 2],
    [3, 4],
    [5, 6],
  ]
);
