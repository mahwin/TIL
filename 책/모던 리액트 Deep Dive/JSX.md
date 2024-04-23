# JSX

JSX는 리액트에 종속적이지 않은 독자적인 문법이다. JSX는 페이스북에서 소개한 새로운 구문이기 때문에 ECMAScript 사양에 포함되어 있지 않다. 따라서 일반적인 Node나 웹 브라우저 환경에서는 반드시 `JSX가 트랜스파일링을 거쳐 자바스크립트 코드로 변환`되는 과정이 필요하다.

JSX의 설계 목적은 JSX 내부에 `트리 구조로 표현`하고 싶은 다양한 것들을 작성해두고, 이 JSX를 트랜스파일링 후 자바스크립트가 이해할 수 있는 코드로 변경하는 것이다.

JSX는 XML 스타일의 트리 구문을 쉽게 작성하기 위한 문법이다.

JSX는 기본적으로 `JSXElement`, `JSXAttributes`, `JSXChilden`, `JSXExpression으로` 구성된다.

## JSXElement

JSXElement는 다음과 같은 형태 중 하나여야 한다.

`JSXOpeningElement`, `JSXClosingElement`

- 반드시 짝을 이루어야 한다.
- `JSXOpeningElement`로 시작했다면 반드시 동일한 요소로 같은 계층에 `JSXClosingElement`가 있어야 한다.

`JSXSelfClosingElement`

- `JSXOpeningElement`와 `JSXClosingElement`를 합친 형태이다.

`JSXFragment`

- 아무런 요소가 없는 상태로 여러 요소를 묶어주는 역할을 한다.

> 리액트 컴포넌트는 항상 대문자로 시작해야 한다. HTML 태그명과 커스텀 컴포넌트를 구분하기 위함이다.

### JSXElementName

JSXElement의 요소 이름으로 쓸 수 있는 것은 의미한다.

1. 자바스크립트 식별자 규칙을 따른다.

- `_` , `$` 외의 특수문자는 사용할 수 없다. 숫자로 시작할 순 없다.

2. `:` 을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자다

- `<foo:bar> </foo:bar>`
- 하나만 가능

1. `.` 을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자다

- `<foo.bar> </foo.bar>`
- 여러개 가능

## JSXAttributes

JSXElement에 부여할 수 있는 속성으로 옵셔널이다.

### JSXSpreaAttributes

자바스크립트의 전개 연산자와 동일한 역할을 한다. 조건문 표현식, 화살표 함수, 할당식 등 다양한 것이 {...} 안에 들어갈 수 있다.

### JSXAttribute

키, value 형태로 이루어진다. 키는 JSXAttributeName, value는 JSXAttributeValue로 이루어진다.

### JSXAttributeName

1. 자바스크립트 네이밍과 동일하다
2. `:` 도 추가적으로 사용할 수 있다.

### JSXAttributeValue

1. " ", ' ' 로 감싸진 문자열이 올 수 있다.
2. {} 으로 감싸진 자바스크립트 표현식이 올 수 있다.
3. JSXElement도 올 수 있다.

## JSXChildren

JSXEelement의 자식 요소를 나타낸다.

### JSXChild

- JSXChildren을 이루는 기본 단위이다. JSXChildren은 0개 이상의 JSXChild로 이루어진다.

1. `{`,`<`,`>`,`}`를 제외한 문자열이 값으로 올 수 있다. 제외한 문자열은 다른 JSX 문법과 혼동을 줄 수 있기 때문이다. 이 문자들을 표현하고 싶다면 문자열로 표시하자. `{'{} <>'}`

2. JSXElement가 올 수 있다.
3. JSXFragment가 올 수 있다.
4. JSXChildExpression이 올 수 있다.

```javascript
return <>{(() => "foo")()}</>;
```

## JSXStrings

HTML에서 사용 가능한 문자열 모두 JSXStrings에서도 가능하다.

자바스크립트에는 특수문자를 처리할 때 사용되는 이스케이프 문자가 있지만 HTML에서는 아무런 제약 없이 사용할 수 있다.

`JSX에서는 \를 이스케이프로 처리하지 않는다.`

## JSX 예제

```javascript
const ComA = <A>안녕하세요.</A>;

// self closing 형태
const ComB = <B />;

// 옵션을 { }와 전개 연산자로 넣을 수 있음

const ComC = <A {...{ required: true }} />;

// 속성만 넣어도 가능

const ComD = <A required />;

// 속성으로 JSXElement를 넣는 것도 가능하다.

const ComE = <B ccc={<A />}></B>;
```

## JSX의 트랜스 파일링

JSX는 @bable/plugin-transfrom-react-jsx 플러그인을 사용해 트랜스 파일링을 한다. 트랜스 파일링 후에야 자바스크립트가 이해할 수 있는 형태로 변환된다.

```javascript
const ComA = <A required={true}>Hello World</A>;

// 트랜스 파일링 후

("use strict");
var ComA = React.createElement(
  A,
  {
    required: true,
  },
  "Hello World"
);
```
