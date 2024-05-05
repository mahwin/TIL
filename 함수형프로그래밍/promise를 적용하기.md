## 이터러블이 Promise인 경우도 잘 작동하게 변경하자~!

### L.map, take 함수 수정

```javascript
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const L.map = curry(function* (f,iter){
  for (const a of iter){
    yield go1(a, f);
  }
})

const take = curry((l,iter)=>{
  const res = [];
  iter = iter[Symbol.iterator]();
  return function recur(){
    let cur;
    while(!(cur = iter.next()).done){
      const a = cur.value;
      if(a instanceof Promise) return a.then(
        a=>(res.push(a), res).length === l ? res : recur());
    return res;
    }
  }()
})
```

### L.filter에 promise 적용하기 위해 Kleisli Composition 적용

```javascript
const nop = Symbol("nop");

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

const take = curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => ((res.push(a), res).length === l ? res : recur()))
          .catch((e) => (e === nop ? recur() : Promise.reject(e)));
      }
      return res;
    }
  })();
});
```

- yield b.then((b) => (b ? a : Promise.reject(nop)));
  - b가 true이면 a를 반환하고, false이면 Promise.reject(nop)를 반환한다.
    - reject를 호출하면 Promise가 거부되기 때문에 다음 연산은 진행이 안 되어서 Kleisli Composition이 성립한다.
    - reject를 호출하면 다음 함수 대기열을 무시한 채 catch로 넘어가게 된다. take 함수에서 catch로 promise reject를 받아서 예상했던 에러인 nop이면 recur를 호출하게 된다.
    - 그 외에 인지하지 못 했던 에러면 종료시킨다.

### reduce에서 nop 지원

```javascript

const reduceF = (acc,a,f)=> a instaceof Promise ? a.then(a=>f(acc,a), e=> e===nop? acc : Promise.reject(e)) : f(acc,a);

const head = (iter) => go1(take(1,iter), ([h])=>h);

reduce = curry((f, acc, iter) => {
  if(!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);

  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc,cur.value,f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});
```

- const reduceF = (acc,a,f)=> a instaceof Promise ? a.then(a=>f(acc,a), e=> e===nop? acc : Promise.reject(e)) : f(acc,a);
- reduceF 함수는 a가 Promise이면 a.then으로 값을 받아서 f(acc,a)를 실행하고 Promise가 아니면 즉시 실행한다.
  - nop라고 하는 예상된 에러가 발생하면 우리가 예측했던 에러이므로 acc를 반환하고, 그 외의 에러는 reject를 호출한다.
  - then의 두 번째 인자를 넘겨주면 reject를 호출할 수 있다.
  - reject를 호출해서 다음 함수 대기열을 무시하고 더 뒤의 catch에서 처리할 수 있다.
