# HTML 요소

### HTML 요소별 카테고리

- Document metadata
- Embedded content
- Sections
- Tabular data
- Grouping content
- Forms
- Text-level semantics
- Interactive elements

### Document metadata

이 문서에 대한 설명 임과 동시에 외부 문서가 해당 문서를 가져갈 때 어떤 식으로 가져가면 되는지에 대한 정보를 담고 있다.

- head
- title
- meta
- link
- style

### Sections

- body
- h1, h2, h3, h4, h5, h6
- article
- hgroup
- section
- header
- nav
- footer
- aside
- address

### Grouping content

- p
- dl
- blockquote
- dt, dd
- ol
- figure
- ul
- figcaption
- menu
- main
- li
- div

### Text-level semantics

- a
- abbr
- em
- code
- strong
- span
- cite
- br
- q
- wbr
- Dan

## Embedded content

- img
- picture, source
- video, source, track
- audio, source
- iframe

### Tabular data

- table
- tr
- caption
- td
- colgroup, col
- th
- tbody
- thead
- tfoot

### Forms

- form
- button
- fieldset
- textarea
- legend
- select
- label
- option
- input

### Interactive elements

- details
- summary
- dialog

### `Document metadata`

- meta
  - 해당 문서 혹은 애플리케이션의 metadata를 담는 요소
  ```html
  <meta charset="UTF-8" />
  <!-- charset 문자 인코딩을 어떻게 할 것인지 결정 -->
  <!-- 사용하고 있는 DB의 charset과 맞춰서 작업 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- viewport 모바일 브라우저에서 화면을 어떻게 노출시킬 지 -->
  <!-- viewport가 없으면 모바일 브라우저에서 화면 렌더링이 이상하게 동작 -->
  <!-- 모바일 브라우저 = 태블릿 PC 포함 -->
  <meta name="description" content="우리는 이런 서비스를 제공해요" />
  <!-- description이 없다면 SEO가 body 안의 내용을 긁어감 -->

  <!-- Social Metadata: Facebook - Open Graph -->
  <!-- Sharing Debugger: https://developers.facebook.com/tools/debug -->
  <meta property="og:title" content="우리는 이런 사이트예요" />
  <meta property="og:description" content="우리는 이런 서비스를 제공해요" />
  <meta property="og:url" content="url path" />
  <meta property="og:image" content="img path" />

  <!-- Social Metadata: Twitter - Twitter Card -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@트위터 아이디" />
  <meta name="twitter:title" content="우리는 이런 사이트예요" />
  <meta name="twitter:description" content="우리는 이런 서비스를 제공해요" />
  <meta name="twitter:url" content="url path" />
  <meta name="twitter:image" content="img path" />
  ```
- title
  - 해당 어플리케이션의 제목을 담는 요소
  ```html
  <title>해당 어플리케이션의 제목</title>
  ```
- link
  - 외부 문서 혹은 외부 콘텐츠와 이 콘텐츠를 연결해주는 요소
  ```html
  <link rel="stylesheet" href="./style.css" />
  ```
- style
  - 페이지 내에서 사용하는 CSS를 정의하는 요소
  ```html
  <!-- link로 연결한 css는 HTTP Request를 일으킬 가능성이 있다 -->
  <!-- 이는 성능 저하를 일으킬 여지가 있다 -->
  <!-- style 요소 내부에 렌더링에 꼭 필요한 스타일만 담아두면 성능 개선에 좋다 -->

  <style>
    body {
      ...;
    }
  </style>
  ```
