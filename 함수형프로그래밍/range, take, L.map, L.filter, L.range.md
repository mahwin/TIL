### range

```javascript
const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
```

제네레이터로 만든 L.range는 느긋하게 동작한다. 이터러블를 만들어서 next를 호출할 때마다 값을 생성하고, next를 호출하지 않으면 값을 생성하지 않는다.

### take

- 이터러블을 받아서 필요한 만큼만 짤라서 사용할 수 있는 함수

```javascript
const take = (l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
};

take(10, L.range(100));
```

## 제네레이터/이터레이터 프로토콜로 구현하는 지연 평가

### L.range

```javascript
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};
```

### L.map

- 평가를 미루는 성질을 갖고 있는 이터레이터를 반환하는 제네레이터.

```javascript
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};
```

### L.filter

```javascript
L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
```

### map, filter 계열 함수들이 가지는 결합 법칙

- 사용하는 데이터가 무엇이든지
- 사용하는 보조 함수가 순수 함수라면 무엇이든지
- 아래와 같이 결합한다면 둘 다 결과가 같다.

[[mapping,mapping]] [[filtering,filtering]]
=== [[mapping,filtering]] [[mapping,filtering]]

[[mapping,mapping]] [[filtering,filtering]] [[mapping,mapping]]
=== [mapping,filtering,mapping] [mapping,filtering,mapping]
