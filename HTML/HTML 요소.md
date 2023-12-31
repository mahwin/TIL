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

### `Sections`

- heading

  - 제목을 나타내기 위해 사용
  - h1 ~ h6

  ```html
  <!-- heading 요소를 사용하면 제목을 퐇마하는 익명 영역을 생성하게 됨 -->
  <!-- heading 요소를  잘 활용하면 페이지 전체의 outline을 그리는 데 용이함-->
  <h1>h1 제목입니다.</h1>
  <p>h1 안녕하세요!</p>
  <h2>h2 제목1입니다.!</h2>
  <p>h2 안녕하세요!</p>
  <h2>h2 제목2입니다.!</h2>
  <p>h2 안녕하세요!</p>

  h1은 다음 h1을 만나기 전까지의 요소들을 감싸는 영역 자동으로 만든다.
  ```

- section, article
  - article
    - 콘텐츠의 독립성이 지켜질 경우 사용
  - section
    - 콘텐츠가 다른 콘텐츠와 연관이 있을 때 사용
  - article, section 요소 내에서는 heading 사용을 권장
  ```html
  <article>
    <h1>h1 제목입니다.</h1>
    <p>h1 안녕하세요!</p>
    <section>
      <h2>h2 제목1입니다.!</h2>
      <p>h2 안녕하세요!</p>
    </section>
    <section>
      <h2>h2 제목2입니다.!</h2>
      <p>h2 안녕하세요!</p>
    </section>
  </article>
  ```
- header, hgroup
  - header
    - 특정한 콘텐츠의 시작부분을 나타내는 요소
  - hgroup
    - heading 요소를 그룹할 때 사용하며, hgroup 내부에서 가장 높은 레벨의 heading 요소를 따라감.
    - heading 요소를 그룹화 하여 제목 - 부제목 관계를 만드는 요소.
    - hgroup가 없으면 제목 - 부제목이 아니라 계층이 생김.
    ```html
    <article>
      <header>
        <hgroup>
          <h1>h1 제목입니다.</h1>
          <h2>h2 부제목입니다.</h2>
          <p>h1 안녕하세요!</p>
        </hgroup>
      </header>
      <section>
        <h2>h2 제목1입니다.!</h2>
        <p>h2 안녕하세요!</p>
      </section>
      <section>
        <h2>h2 제목2입니다.!</h2>
        <p>h2 안녕하세요!</p>
      </section>
    </article>
    ```
- footer, address

  - footer
    - 콘텐츠의 마무리
  - address

    - contact 정보를 표현

    ```html

    <!-- copyright, 작성자 정보, 작성일 -->
    <footer>
    	<p>
    		<cite>출처: <a href=''>위키백과</a>
    	</p>
    	<address>
    		<p>
    			작성자: <a href="이메일">유석</a>
    		</p>
    		<p>
    			서울시 강남구 ...
    		</p>
    	</address>
    </footer>

    ```

- nav
  - 페이지 네비게이션 콘텐츠를 담는 요소
  ```html
  <nav>
    <a href="#html-section">html 섹션으로 이동</a>
  </nav>
  ```
- aside
  - 핵심 콘텐츠와 관련이 있지만, 콘텐츠 전체의 흐름과는 크게 관련 없는 콘텐츠를 담을 때 사용
  ```html
  <!-- 콘텐츠 추천, 광고 -->
  <aside>
    <iframe src="ad.html"></iframe>
  </aside>
  ```

### `Grouping`

- p
  - 문장을 의미한다.
- blockquote
  - 인용을 블럭 단위로 할 때 사용
  ```html
  <blockquote>
    <p>HTML은 ~~ 입니다.</p>
    <cite>MDN</cite>
  </blockquote>
  ```
- ol, ul, menu, li
  - ol
    - 순서 있는 목록
  - ul
    - 순서가 없는 목록
  - menu
    - 버튼 여러개를 가지고 있는 목록
  - li
    - 상위 요소로 ol, ul,menu를 반드시 포함해야 함.
- dl, dt, dd
  - dl
    - definition list
  - dt
    - definition term
  - dd
    - definition description
  - div
    - dl 요소 내에서 특정 요소들을 그룹해야하는 경우에 한하여 div 요소를 활용할 수 있다.
  ```html
  <dl>
    <dt>마늘</dt>
    <dd>알싸한 맛이 나는 채소이다.</dd>
    <dd><한국인이 많이 먹는다.</dd>
    <div class="expensive">
      <dt>트러플</dt>
      <dd>알싸한 맛이 나는 채소이다.</dd>
      <dd><한국인이 많이 먹는다.</dd>
    </div>
  </dl>
  ```
- figure, figcaption
  - figure
    - 콘텐츠의 부연설명을 하는 콘텐츠를 담을 때 사용
  - figcaption
    - 콘텐츠의 부연설명을 하는 콘텐츠를 작성하는 요소
  ```html
  <figure>
    <img src="nasa.jpg" alt="" />
    <figcaption>NASN는 미항공우주연구소 입니다.</figcaption>
  </figure>
  ```
- main
  - 해당 애플리케이션이나 페이지에서 가장 중요한 콘텐츠를 담는 컨테이너 요소
  - 한 페이지 내에서 한 번만 사용 가능
  - hidden 속성 등을 활용하여 main 요소를 감춘 경우에는 여러번 사용 가능
  ```html
  <main>
    <!-- 메인 콘텐츠 -->
  </main>
  ```
- div
  - 의미 없이 CSS 등의 목적으로 여러 요소를 그루핑할 때 사용
  - 최후의 수단으로만 활용

### `Text-level semantics`

HTML 요소내에서 텍스트로 취급되는 요소

- a

  - HTML 내에서 하이퍼텍스트(링크)를 생성할 때 사용하는 요소

  ```html
  <!-- href 속성은 필수값이 아님 -->
  <!-- 활성화 상태/ 비활성화 상태를 href 속성으로  css 조작 가능 -->
  <a href="https://naver.com">네이버</a>
  <!--  a 태그 안에 다른 인터렉티브 모델 불가능 -->
  <a href="https://naver.com"
    >네이버<a href="google.com">구글</a> XX

    <!-- # link-->
    <a href="#여길봐">중요한 내용으로 이동</a>

    <h1 id="여길봐">
      중요한 내용
      <h1></h1></h1
  ></a>
  ```

- em, strong
  - em(emphasis)
  - strong
  ```html
  <!-- strong 진짜 중요한 내용이라 꼭 봐야해 -->
  <!-- em 부편적인 강조 -->
  <strong>주의하세요!</strong>
  <h1>Chapter 1. <strong>Hello world</strong></h1>
  <p><em>감자</em>는 맛있어</p>
  ```
- q, cite
  - q
    - 인용구를 나타내는 요소
  - site
    - 실체가 있는 물건이나 사이트 등을 인용할 때
  ```html
  <!-- q와 blockquote의 차이-->
  <!-- q는 텍스트 내에서 인용을 표현할 때 사용 -->
  <!-- blockquote는 인용 블록을 표현할 때 사용 -->
  <p><q>HTML is awesome</q><cite>Smashing magazine</cite></p>
  ```
- dfn, abbr
  - dfn
    - 해당 페이지에서 최초로 정의된 용어를 나타낼 때 사용하는 요소
  - abbr
    - abbreviation(약어)
  ```html
  <p>
    <dfn id="whatwg">
      <abbr title="Web Hypertext Application ...">WHATWG</abbr>
    </dfn>
    는 웹 표준화 기구입니다.
  </p>
  <p>
    <a href="#whatwg">WHATWG</a>
    에서 제정한 표준에는 HTML Living Standard가 있습니다.
  </p>
  ```
- code
  ```html
  <p>HTML의 DOCTYPE에는 <code>&lt;!DOCTYPE HTML&gt;</code> 같은 것들이 있다.</p>
  ```
- span
  ```html
  <!-- 별다른 의미는 없지만, 여러개의 텍스트를 감싸야할 때 사용하는 요소 -->
  <!-- 주로 CSS 속성을 주기위해 사용 -->
  <span>텍스트</span>
  ```
- br, wbr

  - br
    - break의 약자
    - HTML 문서 내에서 줄바꿈을 일으킬 때 사용
  - wbr
    - 특정한 조건에서만 줄바꿈이 발생

  ```html
  <p>
    안녕 <br />
    반가워
  </p>

  <p>
    안녕 <wbr />
    반가워
  </p>
  <!-- 안녕 반가워로 보이다가 줄바꿈이 필요할 때 안녕\n 반가워로 나옴! -->
  ```

### `Embedded content`

외부에 있는 콘텐츠를 가져올 때 사용함

이미지, 비디오, 오디오, 다른 HTML 문서

- picture
  - 발전된 img 요소
  ```html
  <!-- source 요소를 차례로 읽으며 콘텐츠가 가져와 지면 해당 콘텐츠를 그려줌 -->
  <picture>
    <source src="image.webp" type="image/webp" />
    <source src="image.jpg" type="image/jpeg" />
    <img src="image.jpg" alt="" />
  </picture>
  ```
- video

  ```html
  <!-- 비디오를 가져와서 보여준다 -->
  <video src="video.webm" />

  <video>
    <source src="video.webm" type="video/webm" />
    <source src="video.mp4" type="video/mpeg4" />
    <track
      kind="subtitles"
      src="video.en.vtt"
      srclang="en"
      lang="en"
      label="English"
    />
  </video>

  preload => 사전 로드 여부를 결정 controls => 기본 컨트롤을 보여줄 지 결정
  autoplay => 자동 재생 여부 체크 autoplay를 사용하려면 muted 속성을 사용해
  음소거를 해둔 상태로 재생해야 한다. playsinline => 모바일 브라우저에서
  비디오가 페이지 내에서 재생되게 함 poster => 썸네일로 사용할 이미지를 지정할
  수 있게 해줌. track => 자막을 달 수 있는 엘리먼트
  ```

- audio

  ```html
  <audio src="music.mp3"></audio>

  <audio>
    <source src="music.mp3" type="audio/mpeg" />
  </audio>
  preload, autoplay, muted, controls 등을 지원함
  ```

- iframe

  - 현 HTML 문서 내에서 외부 HTML 문서를 가져올 때 사용하는 요소

  ```html
  <!-- iframe 요소와 부모 요소 사이는 격리되어 있기에 다루기 어려움 -->
  <iframe src="외부문서"></iframe>
  allow => 어떤 콘텐츠를 허용할 지 allowfullscreen => 풀 스크린을 허용할 지
  allowpaymentrequest => 결제를 허용할 지 꼭 width와 height를 지정해야 함.
  <!-- 유튜브 동영상 불러오기 -->

  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/
  bjJ4PgApkYI"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>

  frameborder => iframe border allow => 허용할 api, 저런 api를 허용해야 유튜브
  동영상을 iframe으로 재생가능
  ```

- image best practices

  ```html
  <!-- 픽셀 밀도 대응 -->
  <picture>
    <source
      src="image.webp"
      srcset="image@2x.webp 2x, image@3x.webp 3x"
      type="image/webp"
    />
    <source
      src="image.jpg"
      srcset="image@2x.jpeg 2x, image@3x.jpeg 3x"
      type="image/jpeg"
    />
    <img src="image.jpg" srcset="image@2x.jpeg 2x, image@3x.jpeg 3x" alt="" />
  </picture>

  <!-- 브라우저 크기 대응 -->
  <picture>
    <source src="small.wepb" type="image/webp" media="(max-width: 400px)" />
    <source src="medium.wepb" type="image/webp" media="(min-width: 400px)" />
    <source src="large.wepb" type="image/webp" media="(min-width: 1000px)" />
    <img src="medium.jpg" alt="" />
  </picture>
  ```

### `Tabular data`

- table, caption
  ```html
  <table>
    <!-- caption table에서 제목을 나타낼 때 쓰는 엘리먼트 -->
    <caption>
      <p>현재 상영중인 영화에 대한 정보</p>
    </caption>
    <tr>
      <td>제목</td>
      <td>작성일</td>
      <td>요약</td>
    </tr>
    <tr>
      <td>침묵의 봄</td>
      <td>2023.12.30</td>
      <td>이 영화는 ...</td>
    </tr>
  </table>
  ```
- thead, tbody, tfoot
  ```html
  <table>
    <caption>
      Super Heros!
    </caption>
    <thead>
      <tr>
        <th>제목</th>
        <th>작성일</th>
        <th>본문</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>침묵의 봄</td>
        <td>2023.12.30</td>
        <td>이 영화는 ...</td>
      </tr>
    </tbody>
    <tfoot>
      <!-- 테이블 전체를 정리하는 콘텐츠 -->
    </tfoot>
  </table>
  ```
- colgroup, col
  ```html
  <table>
    <caption>
      Super Heros!
    </caption>
    <colgroup>
      <!-- 해당 칼럼 전체에 css를 적용가능 -->
      <col class="table-cell" />
    </colgroup>
    <thead>
      <tr>
        <th>제목</th>
        <th>작성일</th>
        <th>본문</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>침묵의 봄</td>
        <td>2023.12.30</td>
        <td>이 영화는 ...</td>
      </tr>
    </tbody>
    <tfoot>
      <!-- 테이블 전체를 정리하는 콘텐츠 -->
    </tfoot>
  </table>
  ```
- tr, tdh td
  - tr : table row
  - th: table head cell
  - td : table cell
  ```html
  <!-- rowspan, colspan으로 셀 병합 -->
  <table border="1">
    <tr>
      <th rowspan="2">table header 1</th>
      <th colspan="2">table header 2</th>
    </tr>
    <tr>
      <td>table data</td>
      <td>table data</td>
    </tr>
  </table>
  ```
  ![스크린샷 2023-12-30 오후 11 26 02](https://gist.github.com/assets/78193416/52ac4aff-8cd0-4f0d-b6c0-c9884246aa9b)

### `Form`

FORM 요소는 유저가 입력하는 데이터를 입력받기 위한 요소

- Form 예시

  ```html
  <form>
  	<!-- fieldset, legend -->
  	<!-- 폼 내부에서 구역을 나눌 때 사용하는 요소 -->
  	<!-- hidden으로 가려도 상관은 없다. -->
  	<fieldset>
  		<legend>유저 정보:</legend>
  		<div>
  			<!-- input과 label을 linking 하기! -->
  			<label for="uid">아이디</label>
  			<input id="uid" type="text" required>
  		</div>

  		<div>
  			<label for="upw">비밀번호</label>
  			<input id="upw" type="password" required>
  		</div>
  	</fieldset>

  	<fieldset>
  		<legend> 배달 정보:</legend>
  		<div>
  			<label for="tel">전화번호</label>
  			<input id="tel" type="tel">
  		</div>
  		<div>
  			<label for="addr">주소</label>
  			<input id="addr" type="text">
  		</div>
  		<div>
  			<!-- input의 name을 통일 시켜야 form.data로 데이터를 불러
  						올때 하나의 데이터만 불러와짐.
  			-->
  			<h2>사이즈 선택</h2>
  			<input type="radio" id="small" name="size" value="small" checked>
  			<label for="small">스몰</label>
  			<input type="radio" id="medium" name="size" value="medium">
  			<label for="medium">미드움</label>
  			<input type="radio" id="large" name="size" value="large">
  			<label for="large">라지</label>
  		</div>
  		<div>
  			<h2>토핑 추가</h2>
  			<input type="checkbox" id="cheese" name="topping" value="cheese">
  			<label for="cheese">치즈 추가</label>
  			<input type="checkbox" id="tomato" name="topping" value="tomato">
  			<label for="tomato">토마토 추가</label>
  			<input type="checkbox" id="mushroom" name="topping" value="mushroom">
  			<label for="mushroom">버섯 추가</label>
  		</div>

  		<div>
  		 <label for="requirement">추가 요청 사항</label>
  		 <textarea id="requirement"></textarea>
  		</div>

  		</fieldset>

  		<!-- button -->
  		<!-- button의 기본 타입은 submit -->
  		<!-- js로 다루고 싶다면 type을 button으로 -->
  		<!-- 폼 초기화 type을 reset으로 -->
  		<button>주문하기</button>
  </from>
  ```

### `Interactive content`

- details, summary
  - details
    - 요약 내용과, 요약 내용을 상세히 보여주는 아코디언 형태의 UI를 제공할 때 사용하는 요소
  - summaray
    - details 요소 내부의 요약본을 보여주는 요소
  ```html
  <!-- open 속성으로 노출 상태를 정할 수 있다 -->
  <!-- $details.open =true -->
  <style>
    details > summary {
      transition: color 1s;
      color: black;
    }
    details[open] > summary {
      color: red;
    }
  </style>
  <details>
    <summary>파일 복사 중...</summary>
    <p>Image.jpg 복사 완료</p>
    <p>Image.png 복사 중...</p>
  </details>
  ```
- dialog

  ```html
  <button id="dialog-btn" type="button">Dialog 열기</button>
  <dialog>
    <h1>Add to cart</h1>
    <p>주문하신 상품은 이것이 맞습니까?</p>
    <button type="button" id="close-btn">dialog 닫기</button>
  </dialog>

  <script>
    const btn = $("#dialog-btn");
    const closeBtn = $("#close-btn");
    const dialog = $("dialog");
    btn.addEnvetListener("click", (evt) => {
      dialog.showModal();
    });
    closeBtn.addEnvetListener("click", (evt) => {
      dialog.close();
    });
  </script>
  ```
