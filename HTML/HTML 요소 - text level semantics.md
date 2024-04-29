# HTML Text-level semantics

HTML 내에서 텍스트로 취급되는 요소.
텍스트 사이에서 텍스트로 취급되는 요소

## HTML a 요소

HTML 내에서 하이퍼텍스트 (링크)를 생성할 때 사용하는 요소

```html
<a href="https://naver.com">네이버</a>
```

href 속성은 필수 값은 아니다.
href 속성이 없는 경우, 클릭해도 반응하지 않는다. (비활성화)

```html
<a>네이버</a>
```

인터렉티브 콘텐츠 내에는 다른 인터렉티브 콘텐츠를 넣어서는 안 되기 때문에
a 요소 내부에 a 요소를 넣을 순 없다.

이를 해결하기 위해서는 div 요소를 사용한다. 아래와 같이 인터렉티브 요소를 외부에다가 만들고 css로 위치를 조정한다.

```html
<div>
  <a href="https://google.com">
    <h1>Google</h1>
    <p>세계 1위 검색 포털이다</p>
  </a>
  <button type="button">선호하는 URL에 추가</button>
</div>
```

a요소 안에 블럭 요소는 넣을 수 없다 => XX HTML4에서는 그랬지만, 지금은 아니다.

a 요소에 hash(#)를 사용하면 페이지 내에서 이동하는 기능을 사용할 수 있다. id를 기반으로 이동 가능. 이를 hash link라고 한다.

```html
<nav>
  <a href="#html-em"> HTML em 요소 </a>
</nav>

<h2 id="html-em">HTML em 요소</h2>
```

## HTML em, strong 요소

강조를 나타내는 요소이다.

strong은 조금 더 강한 강조 : warning, attention
=> 이 문장은 꼭 봐야해
em은 보편적인 강조

```html
<strong>주의하세요!</strong>
<h1>Chapter 1.<strong>HTML이란 </strong></h1>

<em>감자</em>는 맛있습니다.
```

## HTML cite, q 요소

q 요소는 인용구를 나타내는 요소이다. 문장을 인용해 왔을 때 사용한다.
cite 요소는 실체가 있는 물건이나 사이트 등을 인용해올 때 사용함.

```html
<p>
  <q>HTML is awesome</q>
  is on the
  <cite>Smashing magazine</cite>
</p>
```

## HTML dfn, abbr 요소

dfn은 해당 페이지에서 최초로 정의된 용어를 나타낼 때 사용하는 요소이다.
abbr 요소는 약어를 나타내는 요소

최초로 정의된 용어는 보통 약어로 표현되기 때문에 dfn과 abbr를 같이 사용하는 경우가 많다.

```html
<p>
  <dfn id="whatwg">
    <abbr title="Web Hypertext Application ..."> WHATWG </abbr> </dfn
  >는 웹 표준화 기구입니다.
</p>
<p>
  <a href="#whatwg">WHATWG</a>에서 제정한 표준에는 HTML Living Standard가
  있습니다.
</p>
```

## HTML code 요소

컴퓨터 코드를 나타낼 때 사용하는 요소이다.

```html
<p>
  HTML의 DOCTYPE에는 <code><!DOCTYPE html></code>
</p>
```

## HTML span 요소

별다른 의미는 없지만, 여러개의 텍스트를 감싸야할 때 사용하는 요소
div와 마찬가지로 `최후의 수단으로 활용`하자. CSS 목적이나 lang 속성을 사용할 때 사용한다.

## HTML br, wbr 요소

break의 약자이다. HTML 문서 내에서 줄바꿈을 일으킬 때 사용한다. 줄바꿈을 일으킬 수 있는 유일한 요소이다.

wbr 요소는 특정한 조건에서만 줄바꿈이 발생하도록 하는 요소이다.
즉, 한줄로 나타낼 수 없을 때만 줄바꿈이 발생한다.

br은 반드시 줄바꿈이 일어난다.

```html
<p>
  안녕하세요. <wbr />
  반갑습니다.
</p>
```

## 정리

- a
  - 하이퍼링크를 생성할 때 사용하는 요소
  - hash link를 사용하여 페이지 내 이동 가능
  - href는 필수값이 아니다.
  - 내부에 인터렉티브 요소를 넣을 순 없다.
- em, strong
  - 강조를 나타내는 요소
  - strong은 강한 강조, em은 보편적인 강조
  - 대부분은 em만으로도 충분하다
- cite, q
  - q는 문장을 인용 했을때 사용한다.
  - cite는 실체가 있는 물건이나 사이트 등을 인용할 때 사용
- dfn, abbr
  - dfn은 최초로 정의된 용어를 나타낼 때 사용
  - abbr은 약어를 나타낼 때 사용
- code
  - 코드를 작성할 때 사용한다.
- span
  - 별다른 의미는 없지만, 여러개의 텍스트를 감싸야할 때 사용하는 요소
- br, wbr
  - br은 줄바꿈을 일으킬 때 사용하는 요소
  - wbr은 특정한 조건에서만 줄바꿈이 발생하도록 하는 요소
