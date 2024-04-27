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
