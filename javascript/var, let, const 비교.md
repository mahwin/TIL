# var, let, const 비교

## Var에 대해서 알아보자

`Scope of var`

var는 함수 안과 밖에서 각각 다른 스코프를 가진다.

- 함수 안에서 사용되는 var는 함수 안에서만 접근할 수 있다.
- 함수 밖에서 사용되는 var는 전역 변수로 사용된다.

`var는 재선언되고 업데이트될 수 있다.`

```jsx
var 변수 = "hi";
var 변수 = "hi2";
변수 = "hi3";
```

`var의 호이스팅`

var 변수는 호이스팅에 의해 최상단으로 끌어올려지고, undefined으로 초기화된다.

### Let에 대해서 알아보자

`let 변수의 스코프는 블록을 기준으로 한다.`

```jsx
if (true) {
  var 변수_var = 3;
  let 변수_let = "say hi";
}
console.log(변수_var); // 3
console.log(변수_let); // 변수_let is not defined
```

`let은 업데이트될 수 있지만, 재선언은 불가능하다`

let의 경우 업데이트는 자유롭지만, 같은 블록 내에서 재선언은 불가능하다.

`let의 호이스팅`

let 역시 선언은 맨 위로 끌어올려지지만, 초기화는 일어나지 않는다. 그래서 해당 변수에 접근하면 Reference Error(참조 오류)가 발생한다.

## Const에 대해서 알아보자

`Const 변수의 스코프는 블록을 기준으로 한다.`

const 선언도 블록 범위 내에서만 접근 가능하다.

`Const은 업데이트도, 재선언도 불가능하다`

`const의 호이스팅`

const 선언도 맨 위로 끌어올려지지만, 초기화는 일어나지 않는다. 그래서 해당 변수에 접근하면 Reference Error(참조 오류)가 발생한다.

`const 객체는 업데이트가 가능하다`

정리

- var 선언은 전역 범위 또는 함수 범위이며, let과 const는 블록 범위이다.
- var 변수는 범위 내에서 업데이트 및 재선언할 수 있다. let 선언은 업데이트 할 수 있지만, 재선언은 할 수 없다. const 변수는 업데이트와 재선언 둘 다 불가능하다.
- 세 선언 모두 최상위로 호이스팅된다. var 변수는 초기화까지 일어나 undefined으로 초기화된다. 나머지는 초기화되지 않기 때문에 접근할 경우 Reference Error(참조 오류)가 발생한다.
- var와 let은 초기화하지 않은 상태로 선언할 수 있지만, const는 선언 중에 초기화해야한다.

참고자료

[https://www.freecodecamp.org/korean/news/var-let-constyi-caijeomeun/](https://www.freecodecamp.org/korean/news/var-let-constyi-caijeomeun/)
