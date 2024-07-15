## 좋은 타임라인의 원칙

1. 타임라인은 적을수록 이해하기 쉽다.

새로운 타임라인이 생기면 시스템은 이해하기 어려워진다. 타임라인 수를 줄이면 이해하기 쉽지만, 타임라인 수를 항상 줄일 순 없다.

2. 타임라인은 짧을수록 이해하기 쉽습니다.

타임라인 단계을 줄이면 실행 가능한 순서를 많이 줄일 수 있다.

3. 공유하는 자원이 적을수록 이해하기 쉽다.

타임라인을 볼 때 자원을 공유하는 단계만 공유하면 된다. 자원을 공유하는 단계를 줄이면 가능한 순서를 줄일 수 있다.

4. 자원을 공유한다면 서로 조율해야 한다.

공유 자원을 많이 없애도 여전히 없앨 수 없는 공유 자원이 존재한다. 타임라인은 공유 자원을 안전하게 공유할 수 있다. 안전하게 공유한다는 말은 올바른 순서대로 자원을 쓰고 돌려준다는 말이다. 타임라인을 조율한다는 것을 실행 가능한 순서를 줄인다는 것을 의미한다. 그 과정에서 올바른 결과가 나오지 않는 순서를 없애면 분석하기 쉬워진다. 현실에서 사용하는 방법에서 착안해 재사용 가능한 조율 방법을 구축할 수 있다.

5. 시간을 일급으로 다룬다.

액션의 순서와 타이밍은 맞추기 어렵다. 타임라인을 관리하는 재사용 가눙한 객체를 만들면 타이밍 문제를 쉽게 처리할 수 있다.

## 장바구니에 아직 버그가 있다.

두 액션이 자원을 공유하지 않는다면 실행 순서를 신경 쓰지 않아도 된다. 가능한 모든 순서에서 같은 결과가 나오기 때문이다. 하지만 자원을 공유한다면 실행 순서가 중요하다.

## DOM이 업데이트되는 순서를 보장하자

특정 순서로 DOM이 업데이트되어야 문제가 없다. 클릭한 순서대로 DOM이 업데이트돼야 한다. 큐를 사용하여 액션 순서를 조율할 수 있다.

큐는 순서대로 작업을 꺼내 쓰기 때문에 모든 작업은 같은 타임라인에서 처리된다.

## 자바스크립트에서 큐 만들기

큐는 자료 구조지만 타임라인 조율에 사용한다면 동시성 기본형이라고 부른다. 동시성 기본형은 자원을 안전하게 공유할 수 있는 재사용 가능한 코드를 뜻한다.

먼저 큐에서 처리할 일과 클릭 핸들러에서 처리할 일을 나눈다. 가능한 많은 작업을 클릭 핸들러에서 처리하는 것이 좋다.

### 큐에서 처리할 작업을 큐에 넣기

큐에 처리할 작업 넣고, 첫 번째 항목 실행하기

```js
function add_item_to_cart(item) {
  cart = add_item(cart, item);
  update_total_queue(cart);
}

function calc_cart_total(cart, callback) {
  let total = 0;
  cost_ajax(cart, (cost) => {
    total += cost;
    shipping_ajax(cart, (shipping) => {
      total += shipping;
      callback(total);
    });
  });
}

const queue_items = [];

function runNext() {
  const cart = queue_items.shift();
  calc_cart_total(cart, update_total_dom);
}

function update_total_queue(cart) {
  queue_items.push(cart);
  setTimeout(runNext, 0);
}
```

두 번째 타임라인이 첫 번째 타임라인과 동시에 실행되는 것을 막기
작업 중임을 나타내는 변수를 하나 설정하고, 해당 변수를 기반하여 작업을 실행해 타임라인이 섞이지 않도록 한다.

```js
let working = false;

function runNext() {
  if (working) return;
  if (queue_items.length === 0) return;

  working = true;
  calc_cart_total(cart, (total) => {
    update_total_dom(total);
    working = false;
    runNext();
  });
}
```

큐와 관련된 코드에 전역변수 두 개가 생겼다. 이를 없애보자.

```js
function Queue() {
  const queue = [];
  let working = false;

  function runNext() {
    if (working) return;
    if (queue.length === 0) return;

    (() => {
      working = true;
      const current_task = queue.shift();
      current_task();
      working = false;
      runNext();
    })();
  }
  return function (callback, ...args) {
    queue.push(() => callback.apply(null, args));
    setTimeout(runNext(cb), 0);
  };
}

const queue = new Queue();
```

- callback, args를 함수 내에서 실행해 클로저로 해당 값들을 접근할 수 있게 한 후에 queue에 넣는다.
- working을 이용해 해당 큐에서 꺼낸 작업이 만료됐는지 확인한다.
  - 만료됐고, 큐가 채워져 있으면 작업을 꺼내서 실행한다.
  - 만료되기 전이나 큐가 비었다면 작업을 마친다.

Queue는 함수를 인자로 받아 또 다른 함수를 리턴하는 고차함수다. 어떤 함수를 새로운 타임라인에서 실행하고 한 번에 한 타임라인만 실행할 수 있도록 한다.

Queue는 액션에 순서를 보장한다.

Queue는 동시성 기본형 중 하나이다.

여러 타임라인을 올바르게 동작하도록 만드는 재사용 가능한 코드이다.

## 큐를 건너뛰도록 만들기

만약 많은 작업들이 큐에 들어오고 작업 결과의 마지막만 DOM에 반영해도 된다면 큐를 건너뛰도록 만들 수 있다.

```js
function DroppingQueue(max, worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;
    if (queue_items.length === 0) return;

    working = true;
    const current_task = queue_items.shift();
    worker(current_task, () => {
      working = false;
      current_task();
      runNext();
    });
  }
  return function (callback, ...args) {
    queue_items.push(() => callback.apply(null, args));

    while (queue_items.length > max) queue_items.shift();

    setTimeout(runNext, 0);
  };
}

const update_total_queue = DroppingQueue(1, calc_cart_total);
```

## 요약

- 타이밍 문제는 재현하기 어렵고, 테스트로 확인하기도 어렵다. 타임라인 다이어그램을 그려 분석하고 타임이 문제를 확인하자.
- 자원 공유 문제가 있을 때 현실에서 해결 방법을 찾아보자.
- 재사용 가능한 도구를 만들면 자원 공유에 도움이 된다. 자원 공유를 위한 도구를 동시성 기본형이라고 부른다. 동시성 기본형을 사용하면 코드가 더 단순해진다.
- 동시성 기본형은 액션을 고차 함수로 받는다. 이 고차 함수는 액션에 슈퍼 파워를 준다.
- 동시성 기본형은 스스로 만들기 어렵지 않다. 작은 단계부터 시작해 리팩터링 하자.
