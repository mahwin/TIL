# Partial.js와 함수 조립

Lodash나 Underscore.js는 _.each, _.map, \_.reduce 등의 함수를 비동기 상황에서 사용할 수 없다는 단점이 있다.

Partial.js는 함수형 자바스크립트를 더 많은 영역에서 사용하기 위해 몇 가지 기능을 확장한 함수형 자바스크립트 라이브러리다. 부분 적용, 파이프 라인, 불변 객체, 템플릿 엔진, 비동기 제어 등에 있어서 더 나은 기능들을 제공한다.

## 5.1 파이프라인

### 5.1.1 네임스페이스

Underscore.js와 Partial.js, Lodash 역시 같은 네임스페이스인 \_를 사용한다.

Partial.js와 Lodash를 동시에 사용할 경우엔 어떻게 해야할까?

Node.js나 ADM의 경우엔 원래 방식대로 하면 된다. 브라우저이고 AMD를 사용하지 않는다면 아래와 같은 순서로 스크립트를 로드하면 된다.

```html
<script src="partial.js"></script>
<script src="lodash.js"></script>
<script>
  window.원하는_변수_명 = _p;
</script>
```

### 5.1.2 즉시 실행 파이프라인, _.go와 _.mr

_.go는 파이프라인의 즉시 실행 버전이다. 첫 번째 인자로 받은 값을 다음 인자로 받은 함수에게 넘겨주고, 그 결과를 다시 다음 함수에게 넘겨주는 식으로 실행된다.
_.mr 함수를 사용해서 여러 개의 값을 리턴할 수 있다.

```javascript
_.go(
  10,
  (a) => a - 1,
  (a) => _.mr(a, a + 1),
  (a, b) => a - b
);
```

### 5.1.3 함수를 만드는 파이프라인 \_.pipe

```javascript
_.pipe(
  (a) => a + 1,
  (c) => c ** 2
);
```

### 5.1.6 비동기와 \_.go

_.go는 함수적으로만 비동기를 제어한다. _.go는 내부적으로 함수들을 순차적으로 실행해 나가면서 비동기 함수의 결과를 재귀 함수로 꺼낸 후, 다음 함수에게 이어주는 식으로 비동기 상황을 제어한다.

Partial.js가 콜백 지옥을 해결하는 방법은 다음과 같다.

```javascript
function add10(a, next) {
  setTimeout(() => next(a + 10), 1000);
}
function sub10(a, next) {
  setTimeout(() => next(a - 10), 1000);
}
_.go(
  10,
  _.callback(
    (a, next) => add10(a, next),
    (a, next) => sub10(a, next)
  )
);
```

next를 만들어 함수를 실행하고, 그 결과를 다음 함수에게 넘겨주는 방식으로 콜백 지옥을 해결한다.

### 5.1.7 중간에 멈추고 나가기

일반 함수는 함수 중간 어디서든 return 문으로 함수를 빠져나올 수 있다. 하지만 _.go는 함수를 중간에 빠져나오는 것이 불가능하다. 이를 해결하기 위해 _.stop을 사용한다.

```javascript
_.go(
  10,
  (a) => a + 1,
  _.stop,
  (a) => a + 2
);
```

## 5.2 비동기

### 5.2.1 코드 변경 없이 비동기 제어가 되는 고차 함수

Partial.js의 _.each, _.map, \_.reduce 등의 주요 함수들은 하나의 함수로 동기와 비동기 상황이 모두 대응되도록 되어 있다.

```javascript
_.go(
  [1, 2, 3],
  _.map(() => new Date()),
  JSON.stringify,
  console.log
);

_.go(
  [1, 2, 3],
  _.map(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(new Date()), 1000);
      })
  ),
  JSON.stringify,
  console.log
);
```

Promise가 아닌 비동기 함수를 사용해야 한다면 \_.callback을 사용하면 된다.

```javascript
_.go(
  [1, 2, 3],
  _.map(
    _.callback((val, i, origin, next) =>
      setTimeout(() => next(new Date()), 1000)
    )
  ),
  JSON.stringify,
  console.log
);
```

### 5.2.2 비동기 결과를 기다리는 if문, \_.if

비동기 상황에서의 제어 구조를 잘 만들려면 라이브러리들의 스펙을 아는 것보다 기본기가 더 중요하다.
즉, 함수 실행, 스코프, 이벤트 루프 등에 대해 정확히 아는 것이 중요하며, 값을 잘 다루는 것도 중요하다.

비동기 함수와 조건문을 예시로 알아보자.

```javascript
const is_1_async = (a) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a === 1), 1000);
  });
};

const is_2_async = (a) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a === 2), 1000);
  });
};

function test(a) {
  if (is_1_async(a)) {
    return "1 입니다.";
  } else if (is_2_async(a)) {
    return "2 입니다.";
  } else return "1도 2도 아닙니다.";
}
test(2); // 1입니다.
```

위 코드에서 is_1_async(a) 함수가 리턴하는 값은 프로미스기 때문에 if 조건문을 넘지 못하고 "1 입니다." 라는 잘못된 결과를 리턴하게 된다. 이를 수정해보자.

```javascript
function test2(a) {
  return is_1_async(a).then((bool) => {
    if (bool) return "1 입니다.";
    return is_2_async(a).then((bool) => {
      if (bool) return "2 입니다.";
      return "1도 2도 아닙니다.";
    });
  });
}

test2(2).then(console.log);
```

고차 함수 중 하나인 \_.if 함수를 이용하면 쉽게 비동기 로직을 처리할 수 있다.

```javascript
const test3 = _.if(is_1_async, _.constant("1 입니다."))
  .else_if(is_2_async, _.constant("2 입니다."))
  .else(_.constant("1도 2도 아닙니다."));
```

## 5.3 고차 함수

### 5.3.1 주요 고차 함수의 보조 함수에서 더 많은 인자 사용하기

Partial.js는 고차 보조 함수에서 더 많은 인자를 사용할 수 있도록 하는 기능이 있다.

Underscore.js와 비교해보자. 일반적으로 Underscore에서는 아래와 같이 클로저를 이용하거나 \_.partial을 이용한다.

```javascript
function undersocrejs1() {
  let a = 3;
  let b = 5;
  return _.map([1, 2, 3], (val) => val * a - b);
}

function undersocrejs2() {
  return _.map(
    [1, 2, 3],
    _.partial(
      (val, a, b) => {
        return val * a - b, _, a, b;
      },
      1,
      2
    )
  );
}
```

Partial.js의 경우 메인 인자 전에 더 많은 인자를 사용할 수 있다.

```javascript
function partialjs() {
  return _.map(10, 5, [1, 2, 3], (a, b, val) => val * a - b);
}
```

### 5.3.2 _.all, _.spread

이 두 함수는 파이프라인과 함께 사용할 때 유용하다. _.all은 내부 함수들에게 모두 동일한 인자를 넘겨주는 함수이다. _.spread는 받은 인자들을 하나씩 나눠 준다.

```javascript
_.go(
  10,
  _.all(
    (a) => a + 1,
    (a) => a + 2,
    (a) => a + 3
  ),
  _.spread(
    (a) => a,
    (b) => b + 2,
    (c) => c + 3
  )
);
```

\_.all의 내부 함수들은 모두 10을 인자로 받는다. 결과는 Multiple Results이다. \_.spread는 11, 12, 13을 각각 받는다.
_.all이나 _.spread의 함수 결과값이 비동기 로직이 포함되어도 비동기 결과 꺼내기 로직이 퐇마되어 있기 때문에 비동기 로직도 잘 처리할 수 있다.

## 5.4 파이프라인2

### 5.4.1 \_.go에서 this 사용

\_.go는 일반함수이기 때문에 Function.prototype.call을 사용해서 this를 바인딩할 수 있다.

```javascript
const user = { name: "ID" };
_.go.call(
  user,
  32,
  function (age) {
    this.age = age;
  },
  function () {
    console.log(this);
  },
  function () {
    this.job = "developer";
  }
);

user; // { name: 'ID', age: 32, job: 'developer' }
```

### 5.4.2 또 다른 파이프라인, \_.indent

자바스크립트에서는 부모 스코프와 자식 스코프라는 개념이 있다. 자식 스코프는 부모 스코프의 지역 변수를 참조할 수 있다. 이러한 중첩 구조의 접근 방식이 파이프라인 내에서도 필요했는데, 이를 위한 함수가 \_.indent이다.

```javascript
const f1 = _.indent(
  function () {
    console.log(this, arguments); // {parent: Window}  arguments: [1, 2] [1, 2]
    return "hi";
  },
  function () {
    console.log(this, arguments); // {parent: Window}  arguments: [1, 2] ["hi"]
  }
);
f1(1, 2);
//
```

위와 같이 \_.indent는 부모 스코프의 this와 arguments를 참조할 수 있다. \_.indent는 함수를 리턴하는 파이프라인이다. 파이프라인으로 로직을 짜다보면 최초 인자들의 값이 궁금할 때가 있는데, 이때 사용한다.

### 5.4.4 무조건 비동기로 동작하는 \_.async

_.go, _.pipe,_.indent는 내부의 함수에서 비동기 결과가 나올 경우 비동기 제어를 시작하고 아니라면 동기로 동작한다. 때로는 무조건 비동기를 일으키고 싶을 때가 있다. 이럴 때 _.async를 사용한다.

```javascript
_.go.async(1, (a) => a).then(console.log);
console.log(2);
//2
//1
```

## 5.6 지연 평가와 컬렉션 중심 프로그래밍

### 5.6.1 지연 평가

함수형 프로그래밍에서는 추상화를 함수 단위로 하고, 식과 값을 함수 단위로 다루면서 평가(실행) 시점을 정확히 다루는 식으로 로직을 설계한다. 함수 조합과 실행 시점 다루기는 함수형 프로그래밍의 최적화 도구이다.

함수형 프로그래밍에서는 어떤 곳에서 함수를 선언할 수 있는지, 어디에서 실행할 수 있는지, 즉시 실행할 수 있는지, 언제 실행할 수 있는지, 함수를 또 다른 실행 컨텍스트로 넘겨 어떻게 이어갈 수 있는지가 중요하다.

지연 평가가 올바르게 동작하기 위해서는 그 평가의 단위가 반드시 순수 함수여야 한다. 암묵적으로 의존하는 함수를 지연 평가하는 것은 위험하다.

### 5.6.2 Lodash의 체인 방식 지연 평가가 아쉬운 이유

Lodash의 경우 체인 방식의 지연 평가를 제공한다. 체인 방식의 지연 평가는 평가의 단위가 함수가 아닌 체인 객체와 그것에 쌓인 내부 상태다. 평가 시점, 평가 조건, 고체적인 알고리즘 등을 개발자가 명시적으로 선택할 수 없다는 단점이 있다.

또, Length가 200개 이상이어야 하며 iteratee가 선언한 인자 개수가 1개여야만 동작한다.

함수 선택으로 로직과 알고리즘을 선택하는 것이 함수형 프로그래밍이 가진 최적화 전략이다.

Lodash는 개발자를 대신하여 성능을 개선해 주고자 했다. 그러나 이렇게 하기 위해서 체인 객체를 관리하는 등의 선행 로직이 추가되어야 한다. 선행 로직에서 사용된 시간을 넘는 효과가 나와야만 Lodash의 도움을 받은 셈이 된다. 개발자에게 선택권이 아예 없는 것은 아니지만 편하거나 자유롭지는 않다.

Partail.js에서는 \_ 대신 L을 사용하여 지연 평가를 할 수 있다. L을 사용하면 파이프라인 내부에서 함수들의 실행 순서를 재배치하여 적절하게 평가를 지연할 수 있다.

```javascript
_.go(
  [2, 3, 4, 5, 100, 12, 3, 13],
  L.map((a) => a * a), // 5번 실행
  L.every((a) => a < 100), // 5번 실행
  console.log
);
```

실행 횟수가 줄었다고 더 나은 성능을 보장할까?

```javascript
//이게 좀 더 낫고
_.go(
  [2, 3, 4, 5, 100, 12, 3, 13],
  _every((a) => square(a) < 100)
);

//이게 좀 더더 낫고
_.go(
  [2, 3, 4, 5, 100, 12, 3, 13],
  _every((a) => a * a < 100)
);

//이게 좀 더더더 낫고
_every([2, 3, 4, 5, 100, 12, 3, 13], (a) => a * a < 100);
```

앞의 코드 중 무엇이 제일 나은지는 상황별로 다르다. 하지만 지연 평가할 대상이 무엇인지는 쉽게 판단할 수 있다.

```javascript
_.go([1, 2, 3, 4, 5], L.map(slow_or_heavy), L.every(fast));
```

map에 지연평가를 적용하지 않는다면 slow_or_heavy 함수가 5번 실행된다. 하지만 map에 지연평가를 적용한다면 slow_or_heavy 함수가 1번만 실행될 수 있다. 이러한 경우에는 매우 큰 성능 차이가 발생할 수 있다. 지연 평가의 세 가지 기준은 아래와 같다.

1. 데이터가 많을 때
2. 앞쪽 함수가 무거운 함수일 때
3. 뒤쪽으로 갈수록 필요한 재료가 적을 때

### 5.6.4 컬렉션 중심 프로그래밍

컬렉션을 다루는 것은 함수형 프로그래밍과 잘 어울리고 더욱 빛을 발한다. 컬렉션 중심 프로그래밍의 목표는 컬렉션을 다루는 좋은 로직의 함수 세트들을 만들어서 재사용성을 극대화시크는 데 있다.

4가지 유형별 대표 함수와 유형

- map : 다 돌면서 내부 재료와 연관된 각각의 새로운 값 만들기, 수집하기라 부르자.
- filter : 다 돌면서 거르기, 거르기라 부르자.
- reduce : 다 돌면서 좁히기, 좁기라 부르다.
- find : 다 돌면서 찾기, 찾기라 부르자.

각 유형별 특화 함수

- 수집하기 - pluck, values, keys, pairs 등
- 거르기 - reject, compact, difference 등
- 접기 - group_by, index_by, count_by, max, min 등
- 찾기 - some, every, take, indexOf, findIndex 등

### 5.6.5 수집하기와 거르기

- 차이점
  - 수집하기의 경우 배열의 크기는 동일하지만 내부 값을 바꾼다.
  - 거르기의 경우 배열의 크기만 변경되고 내부 값은 그대로다.
- 공통점
  - 둘 다 루프를 끝까지 돈다.
  - 결과를 만들 때 이전 인덱스의 값은 중요하지 않다.

### 5.6.6 접기와 수집하기, 거르그의 비교

- 공통점
  - 순회를 끝까지 한다.
- 차이점
  - 나가는 결과가 들어온 값과 전혀 다른 형태일 수 있다.
  - 접기의 경우 만들어 내는 결과값에는 data[0]과 data[1], ...이 다 필요하다. 따라서 지연평가를 수행할 수 없다.

### 5.6.7 찾아내기

특징으로는 루프는 빠져나오는 목표를 갖는다. 리턴값의 데이터 형도 정해져 있다.

### 5.6.8 3가지 유형 (수집하기, 거르기, 찾아내기)과 지연 평가와의 연관성

1. 수집하기와 거르기는 루프를 끝까지 돈다는 특징이 있다.
2. 수집하기와 거르기는 결과의 내부 값을 만들기 위해, 인자로 들어온 배열의 해당 번째 값만을 재료로 사용한다는 특징이 있다.

위의 특성을 기반하여 map과 filter는 순서를 바꿔도 정확히 같은 결과를 낳을 수 있다. 해당 함수에 지연 평가를 적용하는 것은 크게 의미는 없다. 하지만 찾아내기 유형의 함수가 있을 때 강력해진다. 찾아내기의 로직에 다라 멈춰야할 곳이 정해지기 때문이다.
