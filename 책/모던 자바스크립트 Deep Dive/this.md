# this

this는 메서드가 `자신이 속한 객체를 가리키는 식별자`거나 `자신이 만들어내는 인스턴스를 가리키는 자기 참조 변수`이다.

this는 자바스크립트 엔진에 의해서 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. this는 `함수 호출 방식에 의해 동적으로 결정`된다.

## 함수 호출 방식과 this 바인딩

this는 함수 코드를 평가하는 시점이 아니라 함수가 호출되는 시점에 바인딩된다.

### 자바스크립트의 함수 호출 방식

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```javascript
function foo() {
  console.log(this);
}
```

`일반 함수 호출`

```javascript
foo(); //windonw
```

`메서드 호출`

```javascript
const parent = { foo };
parent.foo(); // { foo: f }
```

`생성자 함수 호출`

```javascript
new foo(); // foo {}
```

`call/apply/bind`

```javascript
const parent = { name: "mahwin" };
foo.call(parent); // parent
foo.apply(parent); // parent
foo.bind(parent)(); // parent
```

### 일반 함수 호출

기본적으로 this에는 전역 객체가 바인딩된다. 중첩 함수도 마찬가지이다. this는 객체의 프로퍼티나 메서드를 참조하기 위한 참조 변수이므로, 전역 객체를 가리키는 것은 바람직하지 않다. strict mode가 적용되면 this는 undefined가 바인딩된다.

메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 this는 전역 객체를 가리킨다.

```javascript
const obj = {
  outer() {
    console.log(this); // obj
    function inner() {
      console.log(this); // window
    }
  },
};
```

콜백 함수도 일반 함수로 호출된다면 this는 전역 객체를 가리킨다.

```javascript
const obj = {
  outer() {
    console.log(this); // obj
    setTiemeout(function () {
      console.log(this); // window
    }, 1000);
  },
};
```

> 일반 함수로 호출된 모든 함수 내부의 this에는 전역 객체가 바인딩된다.

메서드의 this와 메서드 내에서 정의한 헬퍼 함수의 this가 다른 것은 큰 문제가 된다. this를 통일 시키기 위해 3가지 방법을 사용할 수 있다.

1. this를 변수에 할당

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj
    const self = this;
    setTiemeout(function () {
      console.log(self.value); // 100
    }, 1000);
  },
};
```

2. 화살표 함수 사용

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj
    setTiemeout(() => {
      console.log(this.value); // 100
    }, 1000);
  },
};
```

화살표 함수의 내부 this는 상위 스코프의 this를 가리킨다.

3. bind, apply, call 사용

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj
    setTiemeout(
      function () {
        console.log(this.value); // 100
      }.bind(this),
      1000
    );
  },
};
```

### 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 앞에 기술한 객체가 바인딩된다.

```javascript
const person = {
  name: "mahwin",
  getName() {
    console.log(this.name);
  },
};

person.getName();
```

this는 평가 시점이 아니라 호출 시점에 바인딩되므로, 메서드를 다른 변수에 할당하고 호출하면 this가 변경될 수 있다.

```javascript
const person = {
  name: "mahwin",
  getName() {
    console.log(this.name);
  },
};

const person2 = { name: "jane" };
person2.getName = person.getName;
person2.getName(); // jane

const f = person.getName;
f(); // undefined or ''
```

### 생성자 함수 호출

생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

new Circle(5); // Circle { radius: 5, getDiameter: f }
```

new 키워드 없이 호출하면 어떻게 될까? 리턴하는 값이 없기 때문에 undefined가 반환된다. 또, this는 전역 객체를 가리킨다. window.radius에 특정한 값이 들어가게 된다.

```javascript
Circle(10);
console.log(window.radius); // 10
```

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

apply, call, bind 메서드는 Function.prototype의 메서드다. 이 메서드들을 사용하면 this를 원하는 값으로 명시적으로 바인딩할 수 있다. apply와 call은 함수를 즉시 호출하고, bind는 this가 바인딩된 함수를 리턴한다는 차이가 있다. apply와 call은 인수 전달 방법만 다르다. apply는 배열로, call은 인수 리스트로 전달한다.

`bind 사용 예시`

```javascript
const person = {
  name: "mahwin",
  foo1(cb) {
    setTimeout(cb, 1000);
  },

  foo2(cb) {
    setTimeout(cb.bind(this), 1000);
  },
};

person.foo1(function () {
  console.log(this); // window
});
person.foo2(function () {
  console.log(this); // mahwin
});
```

## 정리

| 함수 호출 방식   | this 바인딩                         |
| ---------------- | ----------------------------------- |
| 일반 함수 호출   | 전역 객체                           |
| 메서드 호출      | 메서드를 호출한 객체                |
| 생성자 함수 호출 | 생성자 함수가 생성할 인스턴스       |
| apply/call/bind  | 메서드의 첫 번째 인수로 명시한 객체 |
