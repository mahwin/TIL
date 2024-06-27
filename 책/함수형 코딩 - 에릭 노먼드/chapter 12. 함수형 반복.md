### map( ) 함수

`map( )` 함수는 배열의 각 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.

- X값이 있는 배열을 Y값으로 변환한다. map에 넘기는 함수가 계산일 때 가장 사용하기 쉽다.

```javascript
function map(array, f) {
  const newArray = [];
  forEach(array, function (element) {
    newArray.push(f(element));
  });
  return newArray;
}
```

고객 배열을 가지고 고객 이메일 주소 배열을 만든다고 가정해보자.

```javascript
map(customers, function (customer) {
  return customer.email;
});
```

### filter( ) 함수

`filter( )` 함수는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.

```javascript
function filter(array, f) {
  const newArray = [];
  forEach(array, function (element) {
    if (f(element)) {
      newArray.push(element);
    }
  });
  return newArray;
}
```

우수 고객의 이메일 주소를 찾는다고 가정해보자.

```javascript
function selectBestCustomers(customers) {
  return filter(customers, function (customer) {
    return customer.purchases.length > 2;
  });
}
```

### reduce ( ) 함수

`reduce( )` 함수는 배열의 각 요소에 대해 주어진 함수를 실행하고, 하나의 결과값을 반환한다.

```javascript
function reduce(array, init, f) {
  let acc = init;
  forEach(array, function (element) {
    acc = f(acc, element);
  });
  return acc;
}
```

모든 고객의 구매 수를 합산한다고 가정해보자.

```javascript
function countAllPurchases(customers) {
  return reduce(customers, 0, function (total, customer) {
    return total + customer.purchases.length;
  });
}
```

reduce를 이용한 min, max 함수

```javascript
function min(array) {
  return reduce(array, Infinity, function (min, element) {
    return element < min ? element : min;
  });
}

function max(array) {
  return reduce(array, -Infinity, function (max, element) {
    return element > max ? element : max;
  });
}
```

#### reduce로 할 수 있는 것들

`실행 취소/실행 복귀`

리스트 형태의 사용자 입력에 reduce()를 적용한 것이 현재 상태라고 생각해 보면, 실행 취소는 리스트의 마지막 사용자 입력을 없애는 것이라고 할 수 있다.

`테스트할 때 사용자 입력을 다시 실행하기`

시스템의 처음 상태가 초깃값이고 사용자 입력이 순서대로 리스트에 있을 때 reduce로 모든 값을 합쳐 현재 상태를 만들 수 있다.

`시간 여행 디버깅`

잘못 동작하는 경우 특정 시점 상태의 값을 보관할 수 있다.

### 정리

- 거의 모든 함수형 프로그래머들이 자주 사용하는 함수형 도구 map, filter, reduce를 구현했다.
