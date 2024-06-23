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

## 자바스크립트에서 큐 만들기

### 자바스크립트에는 큐 자료 구축하기

큐는 자료 구조지만 타임라인 조율에 사용한다면 동시성 기본형이라고 부른다. 동시성 기본형은 자원을 안전하게 공유할 수 있는 재사용 가능한 코드를 뜻한다.

동시성 기본형을 기본적으로 제공하는 언어도 있지만 자바스크립트에는 없기 때문에 직접 구축해야 한다.

### 큐 구축하기

```javascript
function Queue(worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;
    working = true;
    const card = queue_items.shift();

    worker(cart, function () {
      working = false;
      runNext();
    });
  }
  return function (card) {
    queue_items.push(cart);
    setTimeout(runNext, 0);
  };
}
```

### 건너뛰기가 가능한 큐

```javascript
function DroppingQueue(max, wokrer) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;

    worker(item.data, function (val) {
      working = false;
      setTImeout(item.callback, 0, val);
      runNext();
    });
  }
  return function (data, callback) {
    queue_items.push({ data, callback: callback || function () {} });
    while (queue_items.length > max) queue_items.shift();
    setTimeout(runNext, 0);
  };
}
```

## 요약

- 타이밍 문제는 재현하기 어렵고, 테스트로 확인하기도 어렵다. 타임라인 다이어그램을 그려 분석하고 타임이 문제를 확인하자.
- 자원 공유 문제가 있을 때 현실에서 해결 방법을 찾아보자.
- 재사용 가능한 도구를 만들면 자원 공유에 도움이 된다. 자원 공유를 위한 도구를 동시성 기본형이라고 부른다. 동시성 기본형을 사용하면 코드가 더 단순해진다.
- 동시성 기본형은 액션을 고차 함수로 받는다. 이 고추 함수는 액션에 슈퍼 파워를 준다.
- 동시성 기본형은 스스로 만들기 어렵지 않다. 작은 단계부터 시작해 리팩터링 하자.
