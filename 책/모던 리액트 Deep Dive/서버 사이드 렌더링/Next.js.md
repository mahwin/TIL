## Nest.js

Next.js는 서버 사이드 렌더링 프레임워크로 가장 많은 인기를 얻고 있다.

Next.js는 Vercel이라는 미국 스타트업에서 만든 풀스택 웹 애플리케이션을 구축하기 위한 리액트 기반 프레임워크다. PHP 대용품으로 만들어졌다.

### Next.js 시작하기

Next.js는 create-next-app을 제공해 개발자가 빠르게 Next.js 기반 프로젝트를 생성할 수 있게 돕는다.

`npx create-next-app --ts`로 프로젝트를 생성하면 다음과 같은 package.json이 생성된다.

`package.json`

```json
"dependencies": {
    "next": "^14.2.3",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
```

- next: Next.js의 기반이 되는 패키지
- eslint-config-next: Next.js 기반 프로젝트에서 사용하도록 만들어진 ESLink 설정으로, 구글과 협업해 만든 핵심 웹 지표에 도움이 되는 규칙들이 내장돼 있다.

#### `next.config.js`

Next.js 프로젝트의 환경 설정을 담당하며, Next.js를 자유자재로 다루려면 반드시 알아야 하는 파일이다.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
```

@type으로 시작하는 주석은 자바스크립트 파일에 타입스크립트의 타입 도움을 받기 위해 추가된 코드다. 해당 코드가 있으면 next의 NextConfig를 기준으로 타입 도움을 받을 수 있고, 없다면 일일이 타이핑해야 한다.

- reactStrictMode: Next.js에서 리액트의 StrictMode를 사용할지 여부를 결정한다. StrictMode는 개발 모드에서만 동작하며, 애플리케이션의 잠재적인 문제를 알려주는 기능을 제공한다.
- swcMinify: 번들링과 컴파일을 더욱 빠르게 수행하기 위한 도구로 바벵ㄹ의 대인알고 볼 수 있다. Rust로 적성되었고, 병렬로 처리한다는 점 등에서 이점이 있다. 해당 속성은 SWC를 기반으로 코드 최소화 작업을 할 것인지의 여부이다.

#### `pages/_app.tsx`

\_app.tsx는 애플리케이션의 전체 페이지의 시작점이다. 페이지의 시작점이라는 특징 때문에 웹 애플리케이션에서 공통으로 설정해야 하는 것들을 여기에서 실행한다.

1. 에러 바운더리를 사용해 애플리케이션 전역에서 발생하는 에러 처리
2. reset.css 같은 전역 CSS 선언
3. 모든 페이지에 공통으로 사용 또는 제공해야 하는 데이터 제공 등

#### `pages/_document.tsx`

\_document.tsx는 Next.js의 서버 사이드 렌더링을 위한 파일이다. 이 파일은 서버 사이드 렌더링을 위한 HTML 문서의 구조를 정의한다.

1. `<html>`이나 `<body>`에 DOM 속성을 추가하고 싶다면 해당 파일을 사용한다.
2. \_app.tsx는 렌더링이나 라우팅에 따라 서버나 클라이언트에서 실행될 수 있지만 \_document.tsx는 서버에서만 실행된다.
3. Next.js에는 두 가지 `<head>`가 존재하는데 하나는 next/document에서 제공하는 head이고, 다른 하나는 next/head에서 기본적으로 제공하는 head가 있다. 브라우저의 `<head>` 태그와 동일하지만 next/document의 head는 오로지 \_document.tsx에서만 사용할 수 있다. next/head는 페이지에서 사용할 수 있으며, SEO에 필요한 정보나 title 등을 담을 수 있다. 또한 next/document의 `<Head/>` 내부에서는 `<title/> ` 을 사용할 수 없다. 공통 title이 필요하다면 \_app에, 페이지마다 다른 title이 필요하다면 파일 내부에서 next/head를 사용해 title을 설정한다.
4. getServersideProps나 getStaticProps등 서버에서 사용 가능한 데이터 불러오기 함수는 여기에서 사용할 수 없다.

#### `pages/_error.tsx`

해당 페이지는 클라이언트에서 발생하는 에러 또는 서버에서 발생하는 500 에러를 처리할 목적으로 만들어졌다. Next.js 프로젝트 전역에서 발생하는 에러를 적절하게 처리하고 싶다면 이 페이지를 활용하면 된다. 단, 프로덕션으로 빌드해야만 보임

#### `pages/404.tsx`

404 페이지를 정의할 수 있는 파일이다. 없다면 기본적으로 제공되는 404 페이지가 보인다.

#### `pages/500.tsx`

서버에서 발생하는 에러를 핸들링하는 페이지이다. \_error.tsx와 500.tsx가 둘 다 있다면 500.tsx가 먼저 실행된다.

#### `pages/index.tsx`

Next.js는 라우팅이 파일명으로 이어지는 구조이다. /pages 디렉터리를 기초로 구성되며, 각 페이지에 있는 default export로 내보낸 함수가 해당 페이지의 루트 컴포넌트가 된다.

1. /pages/index.tsx: 루트 페이지로, 홈 페이지를 의미한다.
2. /pages/hello.tsx: /hello 페이지를 의미한다.
   - 주의할 점은 /hello/index.tsx와 /pages/hello.tsx를 같은 주소로 바라보게 된다.
3. /pages/post/[id].tsx: 동적 라우팅을 사용할 때 사용하는 파일이다. [id]는 동적으로 변하는 값이다.

### 서버 라우팅과 클라이언트 라우팅의 차이

Next.js는 서버 사이드 렌더링을 수행하지만 동시에 싱글 페이지 애플리케이션과 같이 클라이언트 라우팅 또한 수행한다. Next.js는 최초 페이지 렌더링은 서버에서 수행된다.

클라이언트 사이드 렌더링을 위해 Next.js는 next/link라는 라우팅 컴포넌트를 제공한다.
`<a>` 대신 `<Link>` 등을 사용하는 행위로 클라이언트 사이드에서 렌더링을 수행하게 할 수 있다.

내부 페이지 이동 시 다음과 같은 규칙을 지켜 클라이언트 사이드 렌더링이 일어나도록 하자

1. `<a>` 대신 `<Link>` 등을 사용하자
2. window.location.push 대신 router.push를 사용하자.

### /pages/api/ 디렉터리

/pages/api/ 디렉터리는 Next.js에서 API를 제공하는 디렉터리다. 해당 디렉터리에 파일을 생성하면 해당 파일이 API 엔드포인트가 된다.

## Data Fetching

Next.js에서는 서버 사이드 렌더링 지원을 위한 몇 가지 데이터 불러오기 전략이 있다. getStaticProps, getServerSideProps, getStaticPaths 함수를 이용해서 데이터 패칭을 하는데, pages 아래 디렉토리에 있는 파일에서만 사용할 수 있다. 또, 예약어로 지정되어 반드시 정해진 함수명으로 export를 사용해 함수를 파일 외부로 내보내야 한다.

### getStaticProps, getStaticPaths

이 두 함수는 어떠한 페이지를 CMS나 블로그, 게시판과 같이 사용자와 관련 없이 정적으로 결정된 페이지를 보여주고자 할 때 사용되는 함수다. getStaticProps, getStaticPaths는 반드시 함께 있어야 사용할 수 있다. 예를 들어 /pages/post/[id]와 같은 페이지가 있다고 가정하자

```typescript
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const post = await fetchPost(id);
  return {
    props: {
      post,
    },
  };
};

export default function Post({ post }: { post: Post }) {}
```

getStaticPaths는 정적으로 결정된 페이지에 접근 가능한 주소를 정의한다. getStaticProps는 정의한 페이지를 기준으로 요청이 왔을 때, props를 반환한다.

이렇게 코드를 짜면 build하는 시점에 정적인 HTML 페이지를 완성할 수 있다.

getStaticPaths 함수의 반환값 중 하나인 fallback 옵션은 paths에 미리 빌드해 둘 몇 개의 페이지만 리스트로 반환하고, truesk 'blocking'으로 값을 선언할 수 있다. 이렇게 하면 next build를 실행할 때 미리 반환해 둔 paths에 기재돼 있는 페이지만 앞서와 마찬가지로 미리 빌드하고, 나머지 페이지의 경우에는 다음과 같이 동작한다.

> 다시 생각해보자. post와 관련된 글들이 대량이라면 모든 페이지를 미리 SSG로 만드는 것이 타당할까? 그렇지 않다. 그래서 Next.js는 fallback 옵션을 제공한다. 일반적으로 사람들이 많이 찾는 페이지의 경우에 스태틱하게 빌드하고, 아니라면 요청이 들어올 때 페이지를 만들어서 던져주는 것이 낫다. 이것이 바로 fallback 옵션이다.

`fallback = true`

```typescript
function Post({ post }: { post: Post }) {
  const router = useRoute();
  if (router.isFallback) {
    // 빌드되지 않은 페이지에 대한 접근이 왔을 때
    return <div>Loading</div>;
  }
}
```

`fallback = blocking`
단순히 빌드가 완료될 때까지 사용자를 기다리게 하는 옵션. 서버 사이드 렌더링이 완료되면 그때 해당 페이지를 제공한다.

### getServerSideProps

해당 함수는 서버에서 실행되는 함수이며 해당 함수가 있다면 무조건 페이지 진입 전에 이 함수를 실행한다. 이 함수는 응답값에 따라 페이지의 루트 컴포넌트에 props를 반환할 수도, 혹은 다른 페이지로 리다이렉트시킬 수도 있다. 이 함수가 있다면 Next.js는 꼭 서버에서 실행해야 하는 페이지로 분류해 빌드 시에도 서버용 자바스크립트 파일을 별도로 만든다.

```typescript
import type { GetServerSideProps } from "next";

export default function Post({ post }: { post: Post }) {
  // 렌더링
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id = "" },
  } = context;
  const post = await fetchPost(id.toString());
  return {
    props: { post },
  };
};
```

해당 페이지는 아래 HTML으로 렌더링된다.

```html
<!-- 생략... -->

<body>
  <div id="__next" data-reactroot=""></div>
  <!-- 생략... -->
  <script id="__NEXT_DATA__" type="application/json">
    {
      "props": {
        "pageProps": {
          "post": { "title": "제목", "content": "내용" }
        },
        "__N_SSP": true
      },
      "page": "/post/[id]",
      "query": { "id": 1 },
      "buildID": "development",
      "isFallback": false,
      "gssp": true,
      "scriptLoader": []
    }
  </script>
</body>
```

특이한 점은 왜 script 태그 안에 props가 들어가 있는 것이다. 또, id는 `__NEXT_DATA__`가 지정되어 있다. 왜 script 형태로 삽입된 것일까?

리액트의 서버 사이드 렌더링을 이해해야 한다.

1. 서버에서 fetch 등으로 렌더링에 필요한 정보를 가져온다.
2. 1에서 가져온 정보를 기반으로 HTML을 완성한다.
3. 2번의 정보를 클라이언트에 제공한다.
4. 3번 정보를 바탕으로 클라이언트에서 hydrate 작업을 한다. 이 작업은 DOM에 리액트 라이프사이클과 이벤트 핸들러를 추가하는 작업이다.
5. 4번 작업인 hydrate로 만든 리액트 컴포넌트 트리와 서버에서 만든 HTML이 다르다면 불일치 에러를 뱉는다.
6. 5번 작업도 1번과 마찬가지로 fetch 등을 이용해 정보를 가져와야 한다.

1번과 6번은 fetch 시점에 따라 결과물을 불일치가 발생할 수 있으므로 1번에서 가져온 정보를 결과물을 HTML에 script 형태로 내려주는 것이다. Next.js는 이 정보를 window 객체에 저장한다.

props의 결과물을 HTML에 정적으로 작성해서 내려주기 때문에 JSON으로 변환할 수 있는 값만 넣을 수 있다.

또, 무조건 서버에서 실행되기 때문에

1. window, document와 같이 브라우저에서만 접근할 수 있는 객체에는 접근할 수 없다.
2. API 호출 시 서버는 자신의 호스트를 유추할 수 없기 때문에 반드시 완전한 주소를 제공해야 한다.
3. 여기에서 에러가 발생한다면 500.tsx와 같이 미리 정의해둔 에러 페이지로 리다이렉트된다.

getServerSideProps의 인수인 context는 다음과 같은 속성을 가진다.

- pathname: 현재 경로명. 단 실제 경로가 아닌 페이지상 경로다.
- asPath: 브라우저에 표시되는 실제 경로를 의미한다.
- query: URL에 존재하는 쿼리, 여기에는 pathname에 있는 [id] 값도 포함된다.
- req: Node.js에서 제공하는 HTTP request 객체
- res: Node.js에서 제공하는 HTTP response 객체

## 스타일 적용하기

### 전역 스타일

\_app.tsx를 활용해 전역 CSS를 적용할 수 있다.

### 컴포넌트 레벨 CSS

styled-components, emotion과 같은 라이브러리를 사용해 컴포넌트 레벨 CSS를 적용할 수 있다.

`_document.tsx`

```typescript
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumnetContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default function MyDocument() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (
  ctx: DocumnetContext
): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};
```

- ServerStyleSheet는 styled-components의 스타일을 서버에서 초기화해 사용되는 클래스다. 이 클래스를 인스턴스로 초기화하면 styled-components가 작동하기 위한 다양한 기능을 가지고 있다.
- originalRenderPage는 ctx.renderPage를 담아두고 있다. 기존의 ctx.renderPage가 하는 작업에 추가적으로 styled-components 관련 작업을 하기 위해 별도로 분리했다.
- ctx.renderPage에는 기존에 해야 하는 작업과 함께 enhanceApp, 즉 App을 렌더링할 때 추가로 수행하고 싶은 작업을 정의했다.
  - 여기서 추가로 하는 작업이 바로 sheet.collectStyles(<App {...props} />)이다. sheet.collectStyles는 StyleSheetManager라고 불리는 Context.API로 감싸는 역할을 한다. 즉 <App/> 위에 styled-components의 Context.API로 한 번 더 감싼 형태이다.
- const initialProps = await Document.getInitialProps(ctx)는 기존의 \_document.tsx가 렌더링을 수행할 때 필요한 getInitialProps를 생성하는 작업을 한다.
- return은 기존에 기본적으로 내려주는 props에 추가적으로 styeld-components가 모아둔 자바스크립트 파일 내 스타일을 반환한다. 이렇게 하면 서버 사이드 렌더링 시에 최초로 \_documnet가 렌더링될 때, styled-components에서 수집한 스타일도 함께 내려줄 수 있다.

즉, 리액트 트리 내부에서 사용하고 있는 styled-components의 스타일을 모두 모은 다음, 이 각각의 스타일에 유니크한 클래스명을 부여해 스타일이 충돌하지 않게 클래스명과 스타일을 정리해 이를 \_document.tsx가 서버에서 렌더링할 때 React.Context의 형태로 제공하는 것이다. 이런 과정을 거치지 않으면 FOUC(Flash of Unstyled Content)가 발생할 수 있다.

이렇게 설정을 했다고 가정하면 어떤식으로 html이 렌더링 될까?

```typescript
import styled from "styled-components";

const ErrorButton = styled.button`
  color: red;
  font-size: 16px;
`;

export function Button() {
  return (
    <>
      <ErrorButton type="button">경고 !</ErrorButton>
    </>
  );
}

<style data-styled="" data-styled-version="5.3.5">
.bXq0dA {
  color:red;
  font-size:16px;
}

data-styled.g1[id="Button_ErrorButton-sc-8cb2349-0"] {
  content:"bXq0dA";
}
<button type='button' class="Button_ErrorButton-sc-8cb2349-0 bXq0dA">

```
