# HTML 요소 - Grouping content

무언가를 Grpuping 하는 목적으로 사용하는 요소들이다.

## HTML p 요소

문장을 나타낼 때 사용하는 요소이다.

```html
<p>Hello world</p>
```

## HTML blockquote 요소

block quotation의 약자이다. 인용구를 가져올 때 블록 단위로 가져오겠단 의미.

```html
<blockquote>
  <p>
    HTML은 문서를 표현하기 위해 만들어진 언어지만, 현재는 웹 애플리케이션에서도
    활용됩니다.
  </p>
</blockquote>
```

## HTML ul, ol, menu, li 요소

목록을 나타내는 요소들이다.

ol : ordered list, 순서가 있는 목록을 나타낼 때 사용한다.
ul : unordered list, 순서가 없는 목록을 나타낼 때 사용한다.
li : ol, ul, menu 요소의 자식 요소로 사용한다.
menu : 버튼 여러개를 가지고 있는 목록을 나타낼 때 명시적으로 사용함.

- 클릭 가능한 무언가가 있다면 menu 요소를 사용한다.

```htm
<menu>
  <li><button type="button">굵게하기</button></li>
  <li><button type="button">취소선</button></li>
</menu>
```

## HTML dl, dt, dd 요소

dl, dt, dd 요소는 항상 같이 사용된다.

dl : definition list 정의 대상, 정의 설명
dt : definition term 정의 대상
dd : definition description 정의 설명
dl 요소 내에서 특정 요소들을 그룹해야하는 경우에 한하여 div 요소를 활용한다.

```html
<dl>
  <dt>마늘</dt>
  <dl>알싸한 맛이 나는 채소이다.</dl>
  <dl>한국인들이 많이 찾는 채소 중 하나이다.</dl>

  <dt>상추</dt>
  <dl>고기를 먹을 때 많이 찾는 채소이다.</dl>
</dl>
```

## HTML figure, figcaption 요소

figure 요소는 콘텐츠의 부연설명을 하는 콘텐츠를 담을 때 사용
figcaption 요소는 콘텐츠의 부연설명하는 콘텐츠 그 자체를 나타낼 때 사용

```html
<figure>
  <img src="nasa.jpg" alt="" />
  <figcaption>
    NASA는 미항공우주연구소로 우주 관련 연구를 하는 기관이다.
  </figcaption>
</figure>
```

## HTML main 요소

해당 애플리케이션이나 페이지에서 가장 중요한 콘텐츠를 담는 컨테이너 요소

한 페이지 내에서 한 번만 사용 가능

hidden 속성 등을 활용하여 main 요소를 감춘 경우에는 여러번 사용 가능
but 활성화 되어있는 main 요소는 `언제나 하나만 존재`해야 한다.

```html
<main hidden></main>
<main hidden></main>
<main hidden></main>
```

## HTML div 요소

div 요소는 의미 없이 CSS 등의 목적으로 여러 요소를 그루핑할 때 사용하는 요소
div 요소는 정말 최후의 수단으로만 활용

```html

```
