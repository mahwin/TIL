## takeWhile

- `takeWhile` 연산자는 인자로 받은 함수가 `true`를 리턴하는 동안만 값을 방출합니다.

```javascript
go(
  [1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3],
  takeWhile((a) => a),
  console.log
);

// [1,2,3,4]
```

## takeUntil

- `takeUntil` 연산자는 인자로 받은 함수가 `true`를 리턴하기 전까지 값을 방출합니다.

```javascript
go(
  [1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3],
  takeUntil((a) => a),
  console.log
);
// [1]

go(
  [1, 2, 3, 4, 0, 0, 0, 0, 1, 2, 3],
  takeUntil((a) => !a),
  console.log
);
// [1, 2, 3, 4, 0]
```

## 실습을 해보자

상황 설명 : cars가 4명인 배열만 경기를 시키는데, 경기 시작전에 적절한 delay를 주는 로직을 짜려고 한다.

```tsx
const track = [
  { cars: ["A", "B", "C", "D"] },
  { cars: ["E", "F", "G", "H"] },
  { cars: ["I", "J", "K", "L"] },
  { cars: ["I", "J"] },
  { cars: [] },
];
```

```tsx
go(
  L.range(Infinity),
  L.map((i) => track[i]),
  L.map(({ cars }) => cars),
  L.map(_.delay(1000)),
  L.takeWhile(({ length: l }) => l === 4)
);
```

## 실습일 해보자 2

상황 설명 : 결제를 취소하는 로직을 짜려고 한다.

```tsx
const Impt = {
  payments: {
    1: [
      { imp_id: 11, order_id: 1, amount: 1000 },
      { imp_id: 12, order_id: 2, amount: 2000 },
      { imp_id: 13, order_id: 3, amount: 3000 },
    ],
    2: [
      { imp_id: 14, order_id: 4, amount: 4000 },
      { imp_id: 15, order_id: 5, amount: 5000 },
      { imp_id: 16, order_id: 6, amount: 6000 },
    ],
    3: [
      { imp_id: 17, order_id: 7, amount: 7000 },
      { imp_id: 18, order_id: 8, amount: 8000 },
    ],
    4: [],
    5: [],
  },

  getPayments: (page) => {
    console.log(`http://..?page=${page}`);
    return delay(1000).then(() => Impt.payments[page]);
  },

  cancelPayment: (imp_id) => Promise.resolve(`${imp_id}: 취소완료`);

  const DB = {
    getOriders : ids => delay(1000).then(() => [
      { id: 1  },
      { id: 3  },
      { id: 7  },
    ]),
  }
};

async function job(){
  // 결제된 결제모듈 측, payments를 가져온다.
  // page 단위로 가져오는데, 결제 데이터가 있을 떄까지 모두 가져와서 하나로 합친다.
  const payments = await go(
    L.range(1, Infinity), // => 언제끝날지 모르니 계속 꺼내겠다.
    L.map(Impt.getPayments),
    L.takeUntil(({sength}) => length < 3 ),
    _.flat,
  )

  // 결제가 실제로 완료된 개망점 측 주먼서 id들을 뽑는다.
  const order_ids = await go(
    payments,
    L.map(({order_id}) => order_id),
    DB.getOrders,       // DB에 저장된 실제로 결제가 완료됐다고 얘기하는 목록이다.
    _.map(({id}) => id),
  )

    // 결제모듈의 payments와 가맹점의 주먼서를 비교해서
    // 결제를 취소해야할 id들을 뽑아서
    // 결제 취소 api를 실행한다.
  await go(
    payments,
    L.reject(({order_id}) => order_ids.includes(order_id)),
    L.map(({imp_id}) => imp_id),
    _.each(Impt.cancelPayment),
  )
}

// 5초에 한 번만 job을 실행한다.
// job이 5초보다 더 걸리면, job이 끝날 때까지 기다렸다 수행하자.
// 진짜 우아한 코드임.
(function recur(){
  Promise.all([
    delay(5000),
    job()
  ]).then(recur)
})();

```
