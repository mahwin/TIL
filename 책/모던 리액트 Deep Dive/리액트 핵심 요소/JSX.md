# 2.1 JSX란?

JSX는 리액트가 등장하면서 페이스북에서 소개한 새로운 구문이지만 반드시 리액트에서만 사용되지는 않는다. XML과 유사한 내장형 구문이며, 페이스북에서 만들었기 때문에 `ECMAScript라고 불리는 자바스크립트 표준의 일부는 아니다. 따라서 JSX를 트랜스파일링 없이 실행할 수 없다.`

`JSX는 다양한 속성을 가진 트리 구조`를 토큰화해 ECMAScript로 변환하는 데 초점을 두고 있다.

JSX 내부에 트리 구조로 표현하고 싶은 다양한 것들을 작성해두고, 이 `JSX를 트랜스파일이라는 과정을 거쳐 자바스크립트가 이해할 수 있는 코드로 변경`하는 것이 목표이다.

즉, 트리 구조의 데이터를 쉽게 작성하기 위한 구문이며, 해당 구문은 ECMAScript가 이해할 수 있는 코드로 변환된다.

> 리액트는 UI 라이브러리다. 웹 어플리케이션 관점에서 UI는 HTML이란 XML로 표현된다. 리액트에서는 트리 구조를 쉽게 표현하기 위해 JSX라는 문법을 도입했다.
> JSX는 트랜스파일링 과정을 거쳐서 ECMAScript이 이해할 수 있는 코드로 변경된다.

## 2.1.1 JSX의 정의

JSX는 기본적으로 JSXElement, JSXAttributes, JSXChildren, JSXStrings라는 4가지 컴포넌트를 기반으로 구성돼 있다.

### `JSXElement`

JSX를 구성하는 가장 기본 요소로, HTML의 요소와 비슷한 역할을 한다. JSXElement가 되기 위해서는 다음과 같은 형태 중 하나여야 한다.

- JSXOpeningElement: 일반적인 요소로 여는 태그이다.
  - <JSXElement>
- JSXClosingElement: 일반적인 요소로 닫는 태그이다.
  - </JSXElement>
- JSXSelfClosingElement: 스스로 종료되는 태그이다.
  - <JSXElement />
- JSXFragment: 묶을 때 사용한다.
  - <></>

> 커스텀 컴포넌트의 이름은 항상 대문자로 시작해야 한다.
> 아닐 경우 HTMLElement로 인식한다. 내장 HTMLElement 타입은 JSX.IntrinsicElements에 정의돼 있다.
> 소문자로 적으면 해당 컴포넌트가 JSX.IntrinsicElements에 속해 있지 않다고 나옴.

#### `JSXElementName`

JSXElement의 네이밍 규칙을 알아보자.

JSXElementName는 JSXElement의 요소 이름으로 쓸 수 있는 것이 무엇인지를 나타낸다.

- JSXIdentifier: 내부에서 사용할 수 있는 식별자를 의미한다.
  - $, \_ 제외한 특수문자로는 시작할 수 없다.
  ```tsx
  const C = () => <$ />;
  ```
- JSXNamespacedName: JSXIdentifier:JSXIdentifier의 조합.
  - 두 개 이상은 올바른 식별자가 아니다.
  ```tsx
  const O = () => <a:b />;   // oooooooo
  const X = () => <a:b:c />; // xxxxxxxx
  ```
- JSXMemberExpression: JSXIdentifier.JSXIdentifier의 조합.
  - 두 개 이상도 가능하다.
  ```tsx
  const O = () => <a.b />; // ooooooo
  const OO = () => <a.b.c />; // ooooooo
  ```

#### JSXAttributes

JSXElement에 부여할 수 있는 속성을 의미한다. 속성이기에 optional하다.

- JSXSpreadAttribute: 객체를 전개할 수 있는 속성이다.
  - {...AssignmentExpression} : 할당 표현식을 전개한다.
- JSXAttribute: key, value 짝을 이루어 표현한다.
  - 키는 JSXAttributeName, 값은 JSXAttributeValue로 구성된다.
  - JSXAttributeName : 속성으로 올 수 있는 이름으로 JSXIdentifier 규칙과 JSXNamespacedName 규칙을 따른다.
  - JSXAttributeValue : 속성 값으로 올 수 있는 값이다.
    - 문자열이 올 수 있다.
    - 중괄호로 감싸진 표현식이 올 수 있다.
    - JSXElement가 올 수 있다.

### JSXChildren

JSXElement의 자식 값을 나타낸다. JSX는 트리 구조를 쉽게 나타내기 위해서 만들어졌다. 따라서 JSX도 쉽게 부모 자식 관계를 표현할 수 있고, 자식을 JSXChildren이라고 한다.

- JSXChild: JSXChildren을 이루는 기본 단위다. 단어의 차이에서 알 수 있듯이 JSXChildren은 JSX를 0개 이상가질 수 있다.
  - JSXText: {,<,>,}을 제외한 문자열
  - JSXElement
  - JSXFragment
  - { JSXChildExpression } : JSXChild를 리턴하는 표현식
  ```tsx
  const App = () => <>{() => <div />}</>;
  ```

### JSXStrings

HTML에서 사용 가능한 문자열은 모두 JSXStrings에서도 사용 가능하다. 이는 HTML에서 작성한 내용을 쉽게 JSX로 변환할 수 있게 해준다.

이에 따라 자바스크립트 문자열과 이스케이프 문자 형태소를 다룰 때 차이가 발생한다. \는 자바스크립트에서는 특수문자를 처리할 때 사용되지만 HTML에서는 아무런 제약 없이 사용할 수 있다.

```tsx
<button>\</button> //  => ok
const a = \; // XXX
```

### 2.1.3 JSX의 트랜스파일링

리액트에서는 JS를 @babel/plugin-transform-react-jsx 플러그인을 사용하여 트랜스파일링한다.

```tsx
const ComponentA = <A required={true}> Hello World</A>;
const ComponentB = <>Hello World</>;
const ComponentC = (
  <div>
    <span>hello world</span>
  </div>
);
```

위 코드를 @bale/plugin-transform-react-jsx로 변환한 결과

```tsx
"use strict";

var ComponentA = React.createElement(A, { required: true }, "Hello World");

var ComponentB = React.createElement(React.Fragment, null, "Hello World");

var ComponentC = React.createElement(
  "div",
  null,
  React.createElement("span", null, "hello world")
);
```

리액트 17, 바벨 7.9.0 이후 버전에서 추가된 `자동 런타임으로 트랜스파일한 결과`

```tsx
"use strict";

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

var ComponentA = (0, _jsxRuntime.jsx)(A, {
  required: true,
  children: "Hello World",
});

var ComponentB = (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
  children: "Hello World",
});

var ComponentC = (0, _jsxRuntime.jsx)("div", {
  children: (0, _jsxRuntime.jsx)("span", { children: "hello world" }),
});
```

JSXElement를 첫 매개변수로 사용하고, 옵셔널인 JSXChildren과 JSXAttributes, JSXStrings는 이후 인수에 전달한다.

- (JSXElement, {JSXAttributes, JSXChildren }, JSXStrings)

> 트랜스파일링 되는 결과물을 어디에 사용할 수 있을까?

태그 엘리먼트를 입력 받아서 리턴하는 컴포넌트에서 사용해보자

```tsx
import { PropsWithChildren, createElement } from "react";

type TagName = keyof JSX.IntrinsicElements;

type Props = PropsWithChildren<{ tagName: TagName; optional?: unknown }>;

function Com({ tagName, optional, children }: Props) {
  return createElement(tagName, optional ? { ...optional } : null, children);
}
```
