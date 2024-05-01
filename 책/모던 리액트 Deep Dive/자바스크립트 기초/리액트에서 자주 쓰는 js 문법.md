## 구조 분해 할당

배열 또는 객체의 값을 말 그대로 분해해 `개별 변수에 즉시 할당`하는 것을 의미한다.

### 객체 구조 분해 할당

```javascript
const object = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

// 나머지 프로퍼티를 objectRest에 할당
const { a, ...objectRest } = object;
objectRest; // { b: 2, c: 3, d: 4 }

// 프로퍼티 이름 변경
const { a: newA, b: newB } = object;
newA; // 1;

// 기본값 설정
const { a = 10, e = 10 } = object;
a; // 1
e; // 10

// 계산된 속성 이름 방식도 가능
const key = "myKey";
const object = {
  myKey: "value",
};

const { [key]: newValue } = object;
newValue; // value

// [key]로 값을 꺼내기만 했고 할당은 안해서 Error
const {[key]} = object;
```
