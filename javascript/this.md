# 자바스크립트와 this

작성일: 2024년 1월 4일 오후 10:42

### 자바스크립트와 this

- 객체지향 언어에서 this는 일반적으로 함수가 속해 있는 자기 자신과 굉장히 관련이 깊다.
- js에서는 함수가 일급 객체이기 때문에 this가 모호해질 수 있다.
  - 일급 객체
    1. 변수나 데이터에 저장
    2. 함수의 인수로 전달
    3. 함수의 반환 값으로 사용
- 자바스크립트에서 모든 함수는 this를 가지고 있다.
- 함수가 호출되면 this가 가리키는 객체가 결정된다.
  - this는 동적으로 그 객체에 바인딩 된다.
  - 함수가 실행되면 함수 실행 문맥이 생성되는데 이때 디스가 바인딩된다.

### this는 어떻게 binding될까

<img width="755" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-01-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9 53 45" src="https://gist.github.com/assets/78193416/7caeddf6-190a-4701-b463-4ce8b8b9712a">

JavaScript 엔진은 코드를 실행할 때, 코드를 분석하고 실행 가능한 단위로 나누며, 각각의 실행 가능한 코드에 대해 실행 문맥(execution context)을 형성한다. 실행 문맥은 코드가 실행될 때 필요한 정보를 담고 있는 객체로, 변수, 함수 선언 등과 같은 정보를 포함한다.

### 실행 가능한 코드

- 전역 코드
  - 전역 실행 문맥 : 전역 코드가 실행될 때 생성되는 실행 문맥
- 함수 코드
  - 함수 실행 문맥 : 함수마다 별도의 실행 문맥이 생성되며, 함수 실행이 끝나면 해당 문맥은 파기
- eval 코드

### 실행 문맥에 포함된 정보

- **Variable Environment (변수 환경):** 변수와 함수 선언이 저장되는 공간
- **Lexical Environment (어휘적 환경):** 현재 실행 문맥의 어휘적인 환경 정보, 주로 스코프 체인 정보를 담고 있는 공간
- **This Binding (this 바인딩):** 현재 실행 중인 함수나 메서드가 속한 객체를 가리키는 값
- **Code Evaluation State (코드 평가 상태):** 실행 중인 코드의 진행 상태를 나타내는 정보

### JavaScript 엔진 실행 과정에서 this 바인딩

<img width="555" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-01-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10 07 35" src="https://gist.github.com/assets/78193416/f7210577-1507-4087-a9ec-168af567176e">

1. 프로그램이 실행되면 JS 엔진은 전역 실행 문맥을 만든다.
2. 실행 문맥을 기반으로 코드를 해석하다 함수를 만난다.
3. 함수를 만나면 전역 코드 실행을 멈춘다.
4. 함수 실행 문맥을 만든다.

   ⇒ 이때 this가 바인딩된다.

5. 함수가 종료되면 3으로 돌아와 전역 실행 문맥을 토대로 전역 코드를 실행한다.

<aside>
💡 Object.Fn  ⇒ Fn의 this는 Object를 가르킨다.
그렇다면 function (){}() 와 같은 즉시 실행함수의 this는 어떻게 바인딩될까?
앞으로 알아보자

</aside>

### this binding rules

- 우선순위가 존재
- 종류
  - 기본 바인딩
  - 암시적 바인딩
  - new 바인딩
  - 명시적 바인딩
    ⇒ 함수가 호출되는 상황에 따른 규칙들

### `기본 바인딩`

단독 실행 함수

```json
fn()
```

- 전역객체에 바인딩 됨
  - browser면 window 객체
    - ‘use strict’를 사용하면 전역 객체는 binding되지 않기 때문에 undefined 됨.
  - node 환경이면 global 객체

### `암시적 바인딩`

객체의 메서드로 실행되는 함수

```json
obj.fn()
```

- 암시적 바인딩
- .fn 앞에 있는 객체에 바인딩

```jsx
const obj = {
  name: "mahwin",
  getName() {
    return this.name;
  },
};

function showReturnValue(callback) {
  console.log(callback());
}

showReturnValue(obj.getName);

// obj.getName에서 암시적 바인딩이 된다면 this는 obj가 되기 때문에
// 콘솔에 mahwin이 찍혀야됨
// 실제론 undefined가
// 점연산이나 대괄호 연산을 통해 객체의 프로퍼티에 접근하면
// 참조 타입이라고 하는 특별한 값이 반환 된다.
// obj.getName와 같이 함수를 인자로 넘겨주면 참조 타입에 대한 정보
// 없이 함수의 참조값만 주기 때문에 undefined가 뜬다.
```

### 참조 타입(Reference Type)

- 점연산이나 대괄호 연산을 통해 객체 프로퍼티에 접근하면 반환되는 타입
- 자바스크립트 명세서에서 사용되는 타입
- 구성
  - base: 객체
  - name: 프로퍼티 이름
  - strict: 엄격모드 true
    - obj.getName “with use strict”
    - base: obj, name: getName, strict: true
    - 함수가 호출되면 base를 찾아 this가 바인됭됨

```jsx
const obj = {
  name: "mahwin",
  getName() {
    return this.name;
  },
};

function showReturnValue(callback) {
  console.log(callback()); // 함수의 참조값만 전달
}

obj.getName(); // => 점연산이니 참조 타입으로 암시적 바인딩
showReturnValue(obj.getName);

// .이나 대괄호 연산은 바로 함수를 호출하지 않고서는 암시적 바인딩을 기대할 수 없다.
```

### 명시적으로 this를 바인딩하자

- call
  - fn.call (context, arg1,arg2,…) context=this를 바인딩할 객체
- apply
  - fn.apply(context,args) context=this를 바인딩할 객체
- bind
  - fn.bind(context,arg1,arg2,…) context=this를 바인딩할 객체
  - **`bind`** 메서드는 함수를 호출하지 않고 새로운 함수를 반환한다.
  - 하드 바인딩이라고 부름.

### `new 바인딩`

new func()을 호출할 때 생기는 일

1. 새로운 객체 생성
   1. 해당 객체에 this가 바인딩됨.
2. 함수 코드 실행
3. 새로 생성한 객체 반환

```jsx
{
	obj ={}            // 새로운 객체 생성
	this=obj // bind
	this.name='mahwin' // 코드 실행
	return this        // 새로운 객체 반환
}
```

- 생성자 함수 내에서 this가 바인딩 되는 것을 new binding이라고 한다.

### 바인딩 우선순위

`new 바인딩 > 암시적 바인딩 > 명시적 바인딩 > 기본 바인딩`

### 화살표 함수에서 this binding

- 어휘적 this
- 렉시컬 스코프와 관계 없이 호출 당시 상황을 기준으로 this가 바인딩되는 일반 함수와 다름
- 상위 실행 문맥의 this 바인딩 컴포넌트를 참조한다.
  - 쉽게 말해 상위 스코프의 this로 바인딩 된다.

```jsx
const obj = {
  name: "mahwin",
  showMyName(sec) {
    setTimeout(() => {
      console.log(this.name);
    }, sec);
  },
};
obj.showMyName(1000); // mahwin
// 화살표 함수가 아니라 일반 함수 였으면 callback으로 넘기는 순간 this는 의미를 잃을텐데...
// 화살표 함수의 this는 showMyName 함수 실행 문맥에 있는 this와 같음.

const obj = {
  name: "mahwin",
  showMyName(sec) {
    setTimeout(function () {
      console.log(this.name);
    }, sec);
  },
};
obj.showMyName(1000); // undefined
```

### 참고자료

[https://www.youtube.com/watch?v=7RiMu2DQrb4&t=2s](https://www.youtube.com/watch?v=7RiMu2DQrb4&t=2s)
