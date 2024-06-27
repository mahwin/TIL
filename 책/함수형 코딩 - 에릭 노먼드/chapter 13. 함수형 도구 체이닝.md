## 체이닝

여러 단계를 하나로 엮은 체인으로 복합적인 계산을 표현할 수 있다. 함수형 도구를 조합해서 읽고 쓰기 쉽고 단순한 단계를 유지하며 매우 복잡한 계산을 할 수 있다.

### 체이닝과 비효율

체이닝은 함수가 호출될 때마다 새로운 데이터 구조를 만들어야 하기 때문에 비효율적이라 생각할 수 있지만, 가비지 컬렉터가 빠르게 처리하기 때문에 대부분 문제가 되지 않는다.

만약에 문제가 생기더라도 `스트림 결합`이라고 부르는 최적화를 기반하여 문제를 해결할 수 있다.

```javascript
const names = map(customers, getFullName);
const nameLengths = map(names, stringLength);
```

위와 같은 로직을 한번만 수행하게 최적화해보자

```javascript
const nameLengths = map(customers, function (customer) {
  return stringLength(getFullName(customer));
});
```

filter에도 적용해보자

```javascript
const goodCustomers = filter(customers, isGoodCustomer);
const withAddresses = filter(goodCustomers, hasAddress);
```

```javascript
const withAddresses = filter(customers, function (customer) {
  return hasAddress(customer) && isGoodCustomer(customer);
});
```

섣불리 최적화하지 말고 문제가 생겼을 때 개선하자.

### 체이닝 팁

1. 데이터 만들기

함수형 도구는 배열 전체를 다룰 때 잘 동작한다. 배열 일부에 대해 동작하는 반복문이 있다면 배열 일부를 새로운 배열로 나누어서 처리하자.

```javascript
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
```

2. 배열 전체를 다루기

어떻게 하면 반복문을 대신해 전체 배열을 한 번에 처리할 수 있을지 생각해보자.

3. 작은 단계로 나누기

작은 단계로 나누면 더 단순하기 때문에 목적에 맞게 로직을 짜기 쉽다.

4. 조건문을 filter로 바꾸기

반복문 안에 있는 조건문은 항목을 건너뛰기 사용하는 경우가 있다. 이런 경우 앞 단계에서 filter를 적용할 수 있다.

5. 유용한 함수로 추출하기

6. 개선을 위해 실험하기

함수형 도구를 새로운 방법으로 조합해보며 아름답고 명확한 로직을 찾아보자.

### 다양한 함수형 도구

map, filter, reduce, take 외에 다양한 도구들을 알아보자

#### pluck, invokeMap

map으로 특정 필드값을 가져오는 함수

```javascript
function pluck(array, field) {
  return map(array, function (item) {
    return item[field];
  });
}

function invokeMap(array, method) {
  return map(array, function (obj) {
    return obj[method]();
  });
}
```

#### concat, concatMap

중첩된 배열을 한 단계의 배열로 만든다.

```javascript
function concat(array) {
  const result = [];
  forEach(arrays, function (array) {
    forEach(array, function (item) {
      result.push(item);
    });
  });
  return result;
}

function concatMap(array, f) {
  return concat(map(array, f));
}
```

#### frequenciesBy, groupBy

개수를 세거나 그룹화하는 일에 사용된다. 객체 또는 맵을 리턴함.

```javascript
function frequenciesBy(array, func) {
  const result = {};
  forEach(array, function (item) {
    const key = func(item);
    if (result[key]) {
      result[key]++;
    } else {
      result[key] = 1;
    }
  });
  return result;
}

function groupBy(array, f) {
  const result = {};
  forEach(array, function (item) {
    const key = f(item);
    if (result[key]) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
  });
}
```

### 값을 만들기 위한 reduce()

장바구니 객체를 잃어버렸지만 제품을 모두 배열로 로깅하고 있다는 상황에서 제품 배열로 장바구니 객체를 만들어보자

```javascript
const itemsAdded = ['shirt','shoes','shirt','socks',...];

const shoppingCart = itemsAdded.reduce((cart, item) => {
  if(!cart[item]){
    return add_item(cart, {name:item, count:1, price: priceLookup(item)});
  } else {
    const quantity = cart[item].count;
    return setFieldByName(cart, item,'quantity', quantity + 1);
    }
  },{})
```

### 데이터를 사용해 창의적으로 만들기

위의 코드는 삭제하는 경우를 처리하지 않았다. 삭제도 포함해서 로깅해보자.

```javascript
const itemOps = [
  ["add", "shirt"],
  ["add", "shoes"],
  ["add", "shirt"],
  ["add", "socks"],
  ["remove", "shirt"],
  ["add", "shoes"],
];

function addOne(cart, item) {
  if (!cart[item]) {
    return add_item(cart, { name: item, count: 1, price: priceLookup(item) });
  } else {
    const quantity = cart[item].count;
    return setFieldByName(cart, item, "quantity", quantity + 1);
  }
}

function removeOne(cart, item) {
  if (!cart[item]) return cart;
  else {
    const quantity = cart[item].count;
    if (quantity === 1) {
      return remove_item(cart, item);
    } else {
      return setFieldByName(cart, item, "quantity", quantity - 1);
    }
  }
}

const shoppingCart = itemOps.reduce((cart, [op, item]) => {
  if (op === "add") return addOne(cart, item);
  if (op === "remove") return removeOne(cart, item);
}, {});
```

### 연습 문제 1.

소프트볼 토너먼트가 있다. 최종 명단에는 postion과 score가 가장 높은 선수의 이름이 포함된 객체가 필요하다.
evalutions 배열은 score를 기준으로 정렬되어 있다.

```javascript
const evalutions = [
  { name: "Jane", position: "catcher", score: 25 },
  { name: "Harry", position: "shortstop", score: 25 }
  { name: "John", position: "shortstop", score: 10 },
  { name: "kkk", position: "catcher", score: 17 }
];

const roster = {
  pitcher:"John",
  ...
}
```

```javascript
const roster = evalutions.reduce((acc, { name, position, score }) => {
  if (!acc[position]) {
    acc[position] = name;
  }
}, {});
```

### 메서드 연산자로 정렬하기

점 연산자를 사용해서 수직으로 정렬된 라인은 보기에 좋다. 또, 가장 위로 데이터가 들어와 가장 아래로 나가는 파이프라인으로 읽을 수도 있기에 함수형 프로그래밍에 적합하다.

### 정리

- 함수형 도구는 여러 단계의 체인으로 조합할 수 있다.
- 한수형 도구를 체인으로 조합하는 것은 SQL 같은 쿼리 언어로 볼 수 있다.
- 종종 체인의 다음 단계를 위해 새로운 데이터를 만들거나 기존 데이터를 인자로 사용해야 할 수도 있다.
