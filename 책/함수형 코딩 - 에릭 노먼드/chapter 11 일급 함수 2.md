## 카피-온-라이트 리팩터링하기

### 배열에 대한 카피-온-라이트 리팩터링

함수 본문을 콜백으로 바꾸기 리팩터링을 적용하자.

```javascript
function arraySet(array, idx, value) {
  const copy = array.slice();
  copy[idx] = value;
  return copy;
}

function push(array, elem) {
  const copy = array.slice();
  copy.push(elem);
  return copy;
}
```

위의 코드를 withArrayCopy 함수를 적용해보자

```javascript
function withArrayCopy(array, modify) {
  const copy = array.slice();
  modify(copy);
  return copy;
}

function arraySet(array, idx, value) {
  return withArrayCopy(array, (copy) => {
    copy[idx] = value;
  });
}

function push(array, elem) {
  return withArrayCopy(array, (copy) => {
    copy.push(elem);
  });
}
```

withArrayCopy로 모든 배열 조작 함수를 감싸면 코드 중복을 줄일 수 있다. 또, 동작을 최적화하기 매우 좋다.

```javascript
const a1 = drop_firsh(array);
const a2 = push(a1, 10);
const a3 = push(a2, 10);
const a4 = arraySet(a3, 2, 42);
// 4번의 얇은 복사가 일어난다.
```

```javascript
const a4 = withArrayCopy(array, (copy) => {
  copy.shift();
  copy.push(10);
  copy.push(20);
  copy[2] = 42;
});
// 1번의 얇은 복사가 일어난다.
```

### 객체에 대한 카피-온-라이트 리팩터링

```javascript
function withObjectCopy(object, modify) {
  const copy = Object.assign({}, object);
  modify(copy);
  return copy;
}

function objectSet(object, key, value) {
  return withObjectCopy(object, (copy) => {
    copy[key] = value;
  });
}
```

### 로그를 처리하기 위한 함수

```javascript
function withLogging(f) {
  try {
    f();
  } catch (error) {
    logToSnapErrors(error);
  }
}

withLogging(function () {
  fetch();
});
```

로그를 남기기 위한 일반적인 시스템이 생겼지만, 여전히 두 가지 문제가 있다.

1. 어떤 부분에 로그를 남기는 것을 깜빡할 수 있다.
2. 모든 코드에 수동으로 withLogging을 적용해야 한다.

```javascript
try {
  saveUserData(user);
} catch (error) {
  logToSnapErrors(error);
}
// 해당 코드를 명확하게 하기 위해 로그를 남기지 않는다는 것을 명시하자

function saveUserDataWithLogging(user) {
  try {
    saveUserDataNoLogging(user);
  } catch (error) {
    logToSnapErrors(error);
  }
}
```

### wrapLogging 함수로 중복 제거하기

```javascript
function wrapLogging(f) {
  return function (arg) {
    try {
      f(arg);
    } catch (error) {
      logToSnapErrors(error);
    }
  };
}
const saveUserDataWithLogging = wrapLogging(saveUserDataNoLogging);
```

### 정리

- 고차 함수로 패턴이나 원칙을 코드로 만들 수 있다. 고차 함수를 사용하지 않는다면 일일이 수작업을 해야 한다.
- 고차 함수로 함수를 리턴하는 함수를 만들 수 있다.
- 고차 함수를 사용하면서 실도 있다. 고차 함수는 많은 중복 코드를 없애 주지만 가독성을 해칠 수도 있다.
