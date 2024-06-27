## 중복과 추상화를 잘할 수 있는 리팩터링 기법

### 코드의 냄새: 함수 이름에 있는 암묵적 인자

함수 본문에서 사용하는 어떤 값이 함수 이름에 나타난다면 함수 이름에 있는 암묵적 인자는 코드의 냄새가 된다.
특징으로는 거의 똑같이 구현된 함수가 있거나 함수 이름이 구현에 있는 다른 부분을 가리킨다.

`암묵적 인자를 드러내기`

암묵적 인자를 드러내기 리팩터링을 적용해 암묵적 인자가 일급 값이 되도록 함수에 인자를 추가하자.

단계

1. 함수 이름에 있는 암묵적 인자를 확인한다.
2. 명시적인 인자를 추가한다.
3. 함수 본문에 하드 코딩된 값을 새로운 인자로 바꾼다.
4. 함수를 호출하는 곳을 고친다.

`함수 본문을 콜백으로 바꾸기`

언어 문법 중 어떤 문법은 일급이 아니다. 함수 본문을 콜백으로 바꾸기 리팩터링으로 함수 본문에 어떤 부분을 콜백으로 바꾸어 일급으로 만들 수 있다. 이렇게 하면 일급 함수로 어떤 함수에 동작을 전달할 수 있다.

단계

1. 함수 본문에서 바꿀 부분의 앞부분과 뒷부분을 확인한다.
2. 리팩터링 할 코드를 함수로 빼낸다.
3. 빼낸 함수의 인자로 넘길 부분을 또 다른 함수로 빼낸다.

### 코드의 냄새: 암묵적 출력

```javascript
function setPriceByName(cart, name, price) {
  const item = cart[name];
  const newItem = objectSet(item, "price", price);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

function setShippingByName(cart, name, ship) {
  const item = cart[name];
  const newItem = objectSet(item, "shipping", price);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}
```

거의 구현이 같은 함수들이 여럿 존재한다. 이를 암묵적 인자를 드러내기 리팩터링으로 해결할 수 있다.

setPriceByName, setShippingByName 처럼 함수 이름에 price, shipping와 같은 암묵적인 인자를 명시적인 인자로 바꾸자.

```javascript
function setFieldByName(cart, name, field, value) {
  const item = cart[name];
  const newItem = objectSet(item, field, value);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}
```

리팩토링으로 암묵적인 인자인 price, shipping을 명시적인 인자 (일급)으로 바꿔서 전달했다.

## 일급인 것과 일급이 아닌 것을 구별하기

자바스크립트에서 일급이 아닌것

1. 수식 연산자
2. 반복문
3. 조건문
4. try/catch 블록

일급으로 할 수 있는 것

1. 변수에 할당
2. 함수의 인자로 넘기기
3. 함수의 리턴값으로 받기
4. 배열이나 객체에 담기

일급이 아닌 것을 찾고 그것을 일급으로 바꿔 보면서 문제를 해결할 수 있는 새로운 능력을 얻을 수 있다. 일급으로 바꾸는 기술은 함수형 프로그래밍의 핵심이다.

### 위 처럼 필드명을 문자열로 사용하면 버그가 생기지 않을까?

타입스크립트와 같은 정적 타입 언어를 사용하면 이런 문제를 해결할 수 있다. 하지만 자바스크립트는 동적 타입 언어이기 때문에 이런 문제가 발생할 수 있다. 이를 해결하기 위해 필드명이 올바른지 확인하는 절차가 필요하다.

```javascript
const validItemFields = ["price", "shipping"];

function setFieldByName(cart, name, field, value) {
  if (!validItemFields.includes(field)) {
    throw new Error("유효하지 않은 필드명");
  }
  // 그대로
}
```

### 함수 본문을 콜백으로 바꾸기

### 예시 상황

여러 함수들이 있는데, 해당 함수가 런타임에 발생하는 에러를 log로 남기고 싶다.

```javascript
function withLogging(f) {
  try {
    f();
  } catch (e) {
    writeErrorLog(e);
  }
}
```

위와 같은 방식으로 콜백 함수로 빼내게 되면 함수의 실행을 제어할 수 있다.

### 정리

- 일급 값은 변수에 저장할 수 있고 인자로 전달하거나 함수의 리턴값으로 사용할 수 있다. 일급 값은 코드로 다룰 수 있는 값이다.
- 언어에는 일급이 아닌 기능이 많이 있다. 일급이 아닌 기능은 함수로 감싸 일급으로 만들 수 있다.
- 어떤 언어는 함수를 일급 값처럼 쓸 수 있게 지원한다.
- 고차 함수는 다른 함수에 인자로 넘기거나 리턴값으로 받을 수 있는 함수이다. 고차 함수로 다양한 동작을 추상화할 수 있다.
- 함수 이름에 있는 암묵적 인자는 함수의 이름으로 구분하는 코드의 냄새이다. 이 냄새는 코드로 다룰 수 없는 함수 이름 대신 일급 값인 인자로 바꾸는 암묵적 인자를 드러내기 리팩터링을 적용해서 없앨 수 있다.
- 동작을 추상화하기 위해 본문을 콜백으로 바꾸기 리팩터링을 사용할 수 있다.
