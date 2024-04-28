# `Document metadata`

## HTML head 요소

metadata는 HTML의 head 요소에 작성한다.

## HTML meta 요소

해당 문서 혹은 애플리케이션의 Metadata를 담는 요소

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- charset 문자 인코딩을 어떻게 할 것인지 결정 -->
    <!-- 사용하고 있는 DB의 charset과 맞춰서 작업 -->
    <meta charset="UTF-8" />
    <!-- viewport, 모바일 브라우저에서 화면을 어떻게 노출시킬 지 -->
    <!-- viewport가 없으면 모바일 브라우저에서 화면 렌더링이 이상하게 동작 -->
    <!-- 모바일 브라우저 = 태블릿 PC 포함 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO에 도움을 주는 metadata -->
    <meta name="description" content="웹 사이트의 소개를 담기" />

    <!-- Social Metadata: Facebook - Open Graph -->
    <!-- Open Graph Protocol: https://ogp.me/ -->
    <meta property="og:title" content="우리는 이런 사이트예요" />
    <meta property="og:description" content="우리는 이런 서비스를 제공해요" />
    <meta property="og:url" content="urlPath" />
    <meta property="og:image" content="imgPath" />

    <!-- Social Metadata: Twitter - Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@트위터 아이디" />
    <meta name="twitter:title" content="우리는 이런 사이트예요" />
    <meta name="twitter:description" content="우리는 이런 서비스를 제공해요" />
    <meta name="twitter:url" content="url path" />
    <meta name="twitter:image" content="img path" />

    <!-- 해당 애플리케이션의 제목 -->
    <title>Document</title>

    <!-- link 요소 : 외부 문서 혹은 외부 콘텐츠와 이 콘텐츠를 연결해주는 요소 -->
    <link rel="stylesheet" href="style.css" />

    <!-- style 요소 : 페이지 내에서 사용하는 CSS를 정의하는 요소 -->
    <!-- 하나라도 많으 HTTP Request는 성능 저하를 일으킬 여지가 있다. -->
    <!-- 렌더링에 꼭 필요한 스타일만 담아두면 성능 개선에 좋다. -->
    <style>
      body {
        font-family: "Noto Sans KR", sans-serif;
      }
    </style>
  </head>
  <body></body>
</html>
```
