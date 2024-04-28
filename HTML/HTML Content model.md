# HTML Content model

## Content model

콘텐츠 모델은 모든 HTML 요소가 가지고 있으며, 어떤 요소의 부모 / 자식 관계를 나타낼 때 보통 콘텐츠 모델로 추정할 수 있다.

- 예외 경우도 있지만, 대부분의 경우 콘텐츠 모델 만으로도 요소의 행동을 파악할 수 있다.

### HTML 명세서

![스크린샷 2023-12-29 오후 8 53 33](https://gist.github.com/assets/78193416/e18738b7-9919-48cd-a500-ca38b598551e)

### `Categories`

- 카테고리는 이 요소가 속해있는 콘텐츠 모델들을 나타낸다.

### `Contexts in which this element can be used`

- 이 요소를 어디서 활용할 수 있는 지를 확인 가능.
- As a child of an hqroup element.
  - hqroup 요소의 자식 요소로 사용
- Where heading content is expected.
  - heading content를 사용할 수 있는 곳

### `Content model`

- 요소의 자식 요소나 요소의 부모 요소로 포함되어야 하는 콘텐츠에 대한 대략적인 설명

### `Content model의 종류`

- Metadata content
- Flow content
- Sectioning content
- Heading content
- Phrasing content
- Embedded content
- Palpable content
- Script-supporting elements

### Metadata content

메타 데이터 콘텐츠는 나머지 콘텐츠의 동작이나 표현을 정의하거나, 다른 문서와 이 문서 간의 관계를 나타내고 이 문서에 대한 정보를 표현할 때 사용한다.

- Base
- style
- `link`
- template
- `meta`
- `title`
- `script`
- noscript

### Flow content

문서의 body 요소 내부에 들어갈 수 있는 대부분의 요소는 Flow 콘텐츠에 속한다.

- div
- section
- 아주 아주 많다.

### Sectioning content

Sectioning 콘텐츠는 heading과 footer의 범위를 정하는 콘텐츠.

- article
- aside
- nav
- section

### Heading content

heading 콘텐츠는 섹션의 헤더를 정의함.

섹션의 헤더에는 명시적으로 Sectioning content를 사용하는 것과 암묵적인 것이 있다.
가급적이면 직접적으로 section 엘리먼트를 사용하자.

- h1
- h2
- h3
- h4
- h5
- h6
- hgroup

### Phrasing content

HTML 문서 내에서 텍스트를 표시하는 요소.

Text 노드를 포함하는 경우가 대부분 해당한다.

- span
- p
- …

### Embedded content

문서 내에서 외부 컨텐츠를 가져올 때 사용하는 콘텐츠.

이미지, 비디오, 오디오, 외부 문서 등을 가져올 수 있다.

- audio
- mathML
- canvas
- Object
- embed
- picture
- iframe
- svg
- img
- video

### Interactive content

유저와 상호작용이 발생하는 모든 요소를 의미한다.

interactive content 내부에 interactive content를 넣을 순 없다.
예외적으로 `속성명이 있을 때만 interfactive content로 취급되는 경우`가 있다.

- a, img, audio, video

- a (href)
- iframe
- textarea
- audio (controls)
- img (usemap)
- video (controls)
- input
- button
- label
- details
- select

### Palpable content

Flow 콘텐츠나 Phrasing 콘텐츠는 자식 노드가 적어도 1개 이상 존재해야 한다.

만약 콘텐츠가 자식 노드를 가지지 않거나 숨김 상태인 경우 Palpable content라 지칭한다.

⇒ 콘텐츠가 자식 노드를 가지지 않거나 숨김 상태인 경우를 Palpable content라고 지칭한다

### Script-supporing content

스크립트를 지원하기 위해 사용하는 요소

- script
- template

### Transparent content model

일부 요소는 Transparent 콘텐츠 모델을 지니는 데, 이 의미는 어떤 콘텐츠에 속하느냐에 따라 콘텐츠 모델이 달라지는 걸 의미한다.

대표적으로 a 요소가 있다. a 요소가 p 요소 안에 있을 때 Phrasing content로 취급된다.
a 요소의 경우 쓰임이 다양하기 때문에 부모 요소의 모델을 따라가도록 설계가 되어있다.

### Paragraphs

Paragraph는 콘텐츠 모델은 아니지만, Flow 콘텐츠 내에 텍스트가 들어가 있거나, Phrasing content가 여럿 묶여 있는 경우를 Paragraph라고 취급하게 된다.

```html
<section>
  <h1>제목</h1>
  paragraphs로 읽히는 부분
  <p>paragrphs로 당연히 읽히는 부분</p>
</section>
```

명시적으로 paragrphs로 표현하지 않아도 암묵적으로 paragrphs로 취급한다. 하지만, 암묵적인 동작은 최대한 지양하는 것이 좋다.

### The nothing content model

일부 요소는 자식 노드를 전혀 포함하지 않는 경우도 존재한다.

이런 경우를 nothing content model이라 부른다.

- template

### 요약

- HTML 내의 모든 요소는 `콘텐츠 모델`을 가진다.
- 하나의 요소가 여러 카테고리를 지닐 수 있으며, 스펙 내에서 콘텐츠 모델이 보통 이 요소의 포함 관계를 보여준다.
- 일부 요소들의 콘텐츠 모델은 콘텐츠 포함 관계에 따라 달라
  - transparent content model
