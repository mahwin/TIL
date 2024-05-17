### 객체로부터 쿼리스트링을 만들어주는 함수를 만드는 예제

```javascript
const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
);
const obj = { limit: 10, offset: 10, type: "notice" };

const result = queryStr(obj); // limit=10&offset=10&type=notice
```

- 왜 join을 안 쓰고 reduce를 쓸까?
  - join은 Array.prototype에 있는 메서드이다.
  - 이터러블인 경우에도 사용할 수 있게 하기 위해서 reduce를 사용한다.

join을 만들어보자

```javascript
const join = curry(sep=",", iter)=>reduce((a, b)=>`${a}${sep}${b}`, iter);

const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  join('&')
);
```

Object.entries도 이터러블이지만 제네레이터로 만들어서 지연 평가가 가능하도록 해보자

```javascript
L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join("&")
);
```

### find

- 조건에 맞는 값 하나를 찾는 함수

```javascript
const users = [{ age: 21 }, { age: 22 }, { age: 23 }, { age: 24 }, { age: 25 }];

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));
```

### L.flatten

- 이터러블 중첩을 지연해서 해제하는 함수
- 1차원 배열만 지원함.

```javascript
const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      }
    } else yield a;
  }
};
```

yield\* 를 사용하면 중첩된 이터러블을 모두 펼쳐준다.

```javascript
const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
```

#### deepFlatten

```javascript
L.deepFlatten = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};
```

### L.flatMap

- map과 flatten을 동시에 하는 함수
  - 자바스크립트 최신스팩임.
- flatten을 하고 map을 진행하는 것이 비효율이라 추가됨.
-

```javascript
L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten));
```

### 실무적인 예제

```javascript
const users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 },
    ],
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];
```

- 해다 자료에서 family의 가족 중의 성인이 아닌 사람들을 뽑아내서, 그 구성원의 이름을 4 명만 뽑자

```javascript
go(
  usrers,
  L.map((u) => u.family),
  L.flatten,
  L.filter((f) => f.age >= 20),
  L.map((f) => f.name),
  take(4),
  console.log
);
```
