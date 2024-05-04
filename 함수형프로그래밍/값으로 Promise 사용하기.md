## 콜백 패턴과 프로미스

```javascript
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}

function add20(a) {
  return new Promise((resolve) => setTiemout(() => resolve(a + 20), 100));
}
```

### 콜백 패턴과 프로미스 사용

```javascript
add10(5, (res) => {
  add10(res, (res) => {
    add10(res, (res) => {
      console.log(res);
    });
  });
});

add20(5).then(add20).then(add20).then(console.log);
```

프로미스는 프로미스라는 class를 통해서 만들어진 인스턴스를 반환한다. 프로미스 인스턴스 `대기, 성공, 실패를 다루는 일급 값`으로 이루어져있다.

즉, 프로미스 인스턴스를 통해 여러 작업을 편리하게 할 수 있다.

### 함수합성 관점에서의 프로미스

- 비동기 작업을 안전하게 합성할 수 있는 도구이다.
- 딜레이가 있더라도 함수를 적절한 시점에 평가해서 합성시키기 위한 도구

```javascript
const g = (a) => a + 1;
const f = (a) => a * a;

Promise.resolve(2)
  .then(g)
  .then(f)
  .then((res) => {
    // 마지막으로 평가된 값이 res에 담긴다.
  });
```

### Kleisli Composition

- 오류가 있을 수 있는 상황에서 함수를 안전하게 합성하기 위한 규칙
- 프로그래밍에선 외부 요인에 의해서 아래와 같은 식이 성립할 수 있다.
- f(g(x)) !== f(g(x))

```javascript
const users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];

const getUserById = (id) => find((user) => user.id === id, users);

const f = ({ name }) => name;
const g = getUserById;

const fg = (id) => f(g(id));

fg(2); // bb
```

- 함수 f,g 각각은 안전하지만 합성을 했을 때 에러가 발생할 수 있다.

```javascript
const getUserById = (id) =>
  find((user) => user.id === id, users) || Promise.reject("없어요!");

const fg = (id) => Promise.resolve(id).then(g).then(f);
```

## Promise를 go, pipe, reduce에 적용하기

```javascript
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  return go1(acc, function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

const go = (...args) => reduce((a, f) => f(a), args);

go(
  1,
  (a) => a + 10,
  (a) => Promise.resolve(a + 100),
  (a) => a + 1000
);
```

### promise.then의 중요한 규칙

- then 메서드로 반환한 값은 반드시 프로미스가 아니다.

```javascript
Promise.resolve(Promise.resolve(1)).then(console.log); // 1
```

- 프로미스가 중첩되어 있어도 한번의 then으로 원하는 값을 얻을 수 있다.

```javascript
new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(
  console.log
); // 1
```
