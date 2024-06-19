## 일급인 것과 일급이 아닌 것을 구별하기

자바스크립트에서 일급이 아닌것

1. 수식 연산자 +,-,/,\* 등
2. 반복문
3. 조건문
4. try/catch 블록

일급으로 할 수 있는 것

1. 변수에 할당
2. 함수의 인자로 넘기기
3. 함수의 리턴값으로 받기
4. 배열이나 객체에 담기

일급이 아닌 것을 찾고 그것을 일급으로 바꿔 보면서 문제를 해결할 수 있는 새로운 능력을 얻을 수 있다. 일급으로 바꾸는 기술은 함수형 프로그래밍의 핵심이다.

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

withLogging이라는 함수를 만들어서 넘겨주는 함수를 try/catch로 감싸서 에러를 로깅하도록 만들었다.
여전히 두 가지 문제가 있다.

1. 어떤 부분에 로그를 남기는 것을 깜빡할 수 있음.
2. 모든 코드에 수동으로 withLogging 함수를 적용해야 함.

```javascript
function needLogging() {
  //
}

withLogging(function () {
  needLogging();
});
```

이런 방식으로 withLogging 함수를 사용할 수 있다. 하지만 이 방식은 코드를 지저분하게 만든다. 또, 특정 함수가 로그를 남기는 것인지에 대한 정보가 부족하다. 이를 개선해보자

```javascript
function wrapLogging(f) {
  return function (arg) {
    try {
      f(arg);
    } catch (error) {
      logError(error);
    }
  };
}

const fetchWithLogging = wrapLogging(fetch);
```
