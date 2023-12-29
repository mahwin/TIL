# HTML metadata

**Emmet을 이용하여 기본 HTML을 작성하면 다음과 같은 화면을 볼 수 있다.**

- Emmet은 HTML과 CSS의 작성의 시간을 아주 빠르게 단축 시켜주는 에디터 확장기능
- ! + TAP

기본 HTML 뼈대

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

## meta

- 해당 문서 혹은 애플리케이션의 metadata를 알려주는 요소.

### 문자 인코딩 관련 정보

`<meta charset="UTF-8" />`

- `charset`
  - 컴퓨터가 표현할 수 있는 문자의 집합
- 해당 HTML 문서의 문자 인코딩을 지정하는 메타데이터
- UTF-8 : 전세계 언어 대부분을 지원
- EUC-KR : 영문과 한국어를 지원
- DB의 charset과 맞춰서 작업🔥

### 2. 모바일, 태블릿 등의 브라우저에서 화면 뷰 관련 정보

`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`

- `name="viewport"`
  - 모바일, 태블릿 등의 브라우저에서 화면을 어떻게 노출시킬 지를 알려 준다.

### 검색엔진 최적화 관련 정보

`<meta name=”description” content=”나 이렇게 좋은 웹 페이지니까 많은 사람들한테 노출해!”>`

- `name=”description”`
  - SEO에 도움을 주는 metadata
- `content=”소개하고 싶은 내용”`
  - 크롤러에게 어떤 웹페이지로 소개하고 싶은지를 알려 주는 곳
- 없다면
  - Body 요소 내에서 의미있을 만한 것들을 긁어감.

### 소셜 메타데이터

`<meta property=”og:title” content=”sns에서 사용될 타이틀”>`

`<meta property=”og:description” content=”sns에서 어떻게 해석할 지를 적어줘야 해”>`

`<meta property=”og:url” content=”sns에서 사용 될 url">`

`<meta property=”og:image” content=”sns에서 보여질 이미지">`

- 콘텐츠의 요약내용이 **SNS에 게시되는데 최적화된 데이터를 가지고 갈 수 있도록 설정**하는 것
- 위의 내용은 Open Graph Protocol로 facebook에서 만듬.

- 트위터의 경우
  `<meta name=”twitter:card” content=”summary”>`
  [Getting started with Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)

### 타이틀

- 해당 웹, 애플리케이션의 제목

`<title>웹 페이지의 제목</title>`

### 링크

- 외부 문서 혹은 외부 콘텐츠와 이 콘텐츠를 연결해주는 요소
- 일반적인 의미의 링크인 하이퍼 텍스트를 만드는 요소는 `<a>`
- 주로 css를 연결하는 데에 사용된다.

`<link rel=”stylesheet” href=”style.css”>`

### 스타일

- 페이지 내에서 사용하는 css를 정의하는 요소
- link 요소를 사용해서 css를 불러오는 형태는 http 통신을 이용해서 외부 페이지를 불러오는 형태라 성능상의 문제가 발생.
- style 태그에서 해결할 수 있는 스타일은 여기서 해결하면 성능상의 이점이 있다.
- `<style>css 내용</style>`
- 렌더링에 꼭 필요한 스타일만 담아두면 성능 개선에 좋다.
  - 폰트 family
  - layout
