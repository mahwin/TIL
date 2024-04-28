# `Sections`

## HTML body 요소

콘텐츠를 담는 HTML 요소이다. body 요소 내부가 콘텐츠 대부분을 차지하니, 용량이나 시멘틱을 신경 써야한다.

## HTML Heading 요소

주로 제목을 나타내기 위해 사용하는 요소.
h1, h2, h3, h4, h5, h6가 있다. 1 ~ 6까지 순서대로 중요도가 낮아진다.
heading 요소를 사용하면 제목을 포함하는 `익명 영역`을 생성한다. (anonymous section)

heading 요소를 잘 활용하면 페이지 전체의 outline을 그리는 데 용이하다.

```html
<h1>HTML Sections 요소</h1>
<p>안녕하세요. 이 HTML 문서는 Sections 요소를 설명합니다.</p>

<h2>HTML Article 요소</h2>
<p>안녕하세요. 이 HTML 문서는 Sections 요소를 설명합니다.</p>

<h2>HTML Aside 요소</h2>
<p>안녕하세요. 이 HTML 문서는 Sections 요소를 설명합니다.</p>
```

## HTML section, article 요소

명시적으로 구역을 나누기 위해 사용하는 요소이다.

> 어떤 경우에 section을 쓰고, 어떤 경에우 article를 쓸까?

콘텐츠의 독립성을 기준으로 나눠야 한다.

article의 경우 독립적인 콘텐츠를 나타낼 때 사용한다.
section은 콘텐츠가 다른 요소와 연관이 있을 때 사용한다.
article 요소 & section 요소 내에서는 `heading 사용을 권장`한다.
heading을 넣음으로써 section 요소가 완성이 되는 것이다.

## HTML header, hgroup 요소

header는 특정한 콘텐츠의 시작부분을 나타내는 요소이다.
콘텐츠 내부에서도 시작부분을 명시적으로 나타낼 때 사용한다.

hgroup은 heading 요소를 그룹화 하여 제목, 부제목 관계를 만드는 요소이다.

```html
<header>
  <h1>HTML Sections 요소</h1>
  <h2>HTML Sectioning 요소</h2>
</header>
```

로 표현하면 h1과 h2는 익명 영역으로 계층이 생긴다. hgroup로 감싸면

```html
<haeder>
  <hgroup>
    <h1>HTML Sections 요소</h1>
    <h2>HTML Sectioning 요소</h2>
  </hgroup>
</header>
```

밖에서 봤을 때 h1으로 인식된다.

## HTML footer, address 요소

콘텐츠의 마무리를 하는 요소이다. copyright, 작성자 정보 작성일 등을 담는다.

address 요소는 contact information을 담는 요소이다.

> publication information은 address에 포함되지 않는다.

```html
<article>
  <!-- 컨텐츠 -->
  <footer>
    <p>
      <cite>출처 : <a href="https://www.example.com">example.com</a></cite>
    </p>
    <address>
      <p>작성자 : 홍길동</p>
      <p>연락처 : 010-1234-5678</p>
    </address>
    <!-- publication information -->
    <p>
      <time> 2024-04-28 </time>
    </p>
  </footer>
</article>
```

## HTML nav 요소

nav는 페이지 네비게이션 콘텐츠를 담는 요소

페이지 내의 네비게이션도 nav로 감싸는 것이 좋다.

```html
<nav>
  <a href="#html-section">HTML Section 요소</a>
  <a href="#html-article">HTML Article 요소</a>
</nav>
```

## HTML aside 요소

핵심 콘텐츠와 관련이 있기는 하나, 콘텐츠 전체의 흐름과는 크게 관련 없는 콘텐츠를 담는 곳이다. 콘텐츠 추천, 광고, 사이드바 등을 담는다.

```html
<aside>
  <iframe src="ad.html"></iframe>
</aside>
```

## 정리

- heading 요소를 활용하여 콘텐츠의 제목을 나타낼 수 있다.
- article, section 요소는 페이지의 구역을 나누기 때문에 굉장히 중요한 요소다.
- header, footer, nav, aside 요소는 각각 용법에 따라 적극적으로 활용
- hgroup 요소를 통해 heading을 그루핑 할 수 있다.
- address 요소를 통해 페이지 카피라이트 혹은 출처 혹은 기타 등등을 담을 수 있다.
