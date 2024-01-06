# CORS

작성일: 2024년 1월 5일 오후 11:47

### 브라우저에서의 통신 보안을 유지하기 위해 다양한 메커니즘이 사용된다.

- 자원 출처를 기준으로
  - SOP ( Same Origin Policy)
    - 같은 출처면 허용할게
  - CORS (Cross-Origin Resource Sharing)
    - 다른 출처지만, 자원을 공유하는 곳(서버)에서 인지하고 있으면 허락할게
- 통신 암호화
  - SSL/TLS
    - 해당 프로토콜을 사용하여 데이터를 안전하게 전송.
  - HSTS (HTTP Strict Transpont Security)
    - SSL/TLS를 사용한 HTTPS 사용을 강제.
- XSS 공격 방지

  - CSP (Content Security Policy)

    - 허용된 리소스 및 스크립트의 출처를 명시적으로 지정하고,

           허용되지 않은 스크립트의 실행을 차단

<aside>
💡 브라우저는 자원 출처를 기준으로 어떤 보안 메커니즘을 따를까?

</aside>

자원 출처와 관련된 보안 정책은 크게 두 가지로 나뉜다.

`SOP`

> The **same-origin policy (**[SOP](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)**)** is a critical security mechanism that restricts how a document or script loaded by one [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) can interact with a resource from another origin.

⇒ 한 출처에서 로드한 문서 또는 스크립트가 다른 출처의 리소스와 상호 작용하는 방식을 제한

출처 : [https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

`CORS`

> **Cross-Origin Resource Sharing** ([CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)) is an [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP)-header based mechanism that allows a server to indicate any [origins](https://developer.mozilla.org/en-US/docs/Glossary/Origin) (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

⇒ 자체 출처가 아닌 다른 출처의 리소스에 접근할 수 있게 하는 HTTP 헤더 기반 메커니즘이며, 이때 프리플라이트 리퀘스트가 사용될 수 있다.

출처 : [https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

<aside>
💡 SOP와 CORS의 공통점

</aside>

### **Resource** Origin과 관련된 보안 메커니즘이다.

`Origin`

> Web content's **origin** is defined by the *scheme* (protocol), *hostname* (domain), and *port* of the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL) used to access it. Two objects have the same origin only when the scheme, hostname, and port all match.

⇒ origin은 URL의 protocol, hostname, port를 합친 것을 의미.

![origin.png](/images/브라우저/CORS/0.png)

출처 : [https://da-nyee.github.io/posts/web-cors/](https://da-nyee.github.io/posts/web-cors/)

```
domain의 비교는 string value로 비교하기 때문에 해당 도메인의 실제 ip 주소와 해당 도메인은
다른 hostname으로 판단된다.

localhost 와 127.0.0.1은 다르다.
```

### `SOP와 CORS는 브라우저 보안 메커니즘이다`

- 브라우저가 아닌 어플리케이션은 Origin이 달라도 자원에 접근할 수 있다.

  - postman과 Insomnia에서는 COSR 설정없이도 통신을 주고 받을 수 있다.

  ```jsx
  // 3000번 포트에서 get 요청을 수행하는 Node.js 서버
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    res.send({ data: "서버에서 보낸 데이터" });
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
  });
  ```

  - Insomnia
    ![스크린샷 2024-01-05 오후 5.38.11.png](/images/브라우저/CORS/1.png)
  - postman
    ![스크린샷 2024-01-05 오후 5.44.29.png](/images/브라우저/CORS/2.png)

- 서버에서 다른 서버의 자원에 접근할 수 있다.
  ![스크린샷 2024-01-05 오후 5.58.35.png](/images/브라우저/CORS/3.png)
  ```jsx
  // 3000번 포트에서 3001번 포트로 get 요청
  fetch("http://localhost:3001")
    .then((res) => {
      return res.json();
    })
    .then((res) => console.log(res));
  ```
  - Node 서버 두 개 가동 후 3000번 포트에서 3001번 포트로 get 요청을 보낸 경우 정상 작동
    - 포트가 다른데 리소스에 접근할 수 있다 .
      - 서버는 SOP를 따르지 않는다.
      - CORS를 따르지 않는 것은 아님!
- 브라우저에서 origin이 다른 곳에 요청을 할 경우
  ![스크린샷 2024-01-05 오후 5.26.46.png](/images/브라우저/CORS/4.png)
  - cors 문제인지 확인하기 위해 화이트 리스트에 와일드카드(”\*”, 모든 출처 허용) 추가 후 정상작동 확인
  ```jsx
  const cors = require("cors");
  app.use(cors(origin:"*"));
  ```

<aside>
💡 도메인과 해당 도메인이 나타내는 ip를 서로 다른 origin으로 인식하는가.

</aside>

```jsx
// 서버 (3000 port)
const cors = require("cors");
app.use(cors({ origin: ["http://127.0.0.1:5500"] }));
// 프론트 (5500 port)
fetch("http://localhost:3000").then(...)
```

![스크린샷 2024-01-05 오후 9.46.40.png](/images/브라우저/CORS/5.png)

```jsx
// 서버 (3000 port)
app.use(cors({ origin: ["http://localhost:5500"] }));
```

![스크린샷 2024-01-05 오후 9.47.33.png](/images/브라우저/CORS/6.png)

<aside>
💡 request를 보내는 곳의 오리진을 찍어보자

```jsx
app.get("/", (req, res) => {
  const origin = req.get("Origin") || req.headers.origin;
  console.log(`자원을 요청한 클라이언트 : ${origin}`);
  res.send({ data: "서버에서 보낸 데이터" });
});
```

</aside>

차례 대로

1. 브라우저
2. 어플리케이션
3. Node server

![스크린샷 2024-01-05 오후 5.45.25.png](/images/브라우저/CORS/7.png)

⇒ headers의 origin도 브라우저가 설정해주는 것을 알 수 있음.

### CORS 접근제어 시나리오

- 단순 요청
- preflight 요청
- 인증정보 포함 요청

### `단순 요청 시나리오`

- 이름과 달리 3가지 조건을 만족해야 보내는 요청 시나리오
- 특정 메서드
  - GET, POST, HEAD
- 특정 Content-Type
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain
- 특정 헤더
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type

<video src="/images/브라우저/CORS/1.mov" controls muted=true autoplays></video>

### `preflight 요청의 시나리오`

1. OPTIONS 메서드를 통해 다른 도메인의 리소스에 요청이 가능한 지 사전 체크 하는 과정
2. 요청이 가능하다는 response가 오면 실제 요청을 보낸다.

<aside>
💡 왜 두번 통신 preflight가 더 많이 사용될까?
1. cors 에러가 날수도 있는데, 무거운 바디를 보내는 것은 네트워크 낭비가 아닐까?
2. cors 에러를 터트리는 쪽은 브라우저인데, 서버는 해당 요청을 다 처리한 후에 response를 보내게 되니 손해가 아닐까 ?
3. 캐싱된 값으로 실제 request를 보내지 않으니 실제로는 네트워크 비용을 절감할 수 있지 않을까?

</aside>

### preflight로 사전 체크 받기 위해 header에 포함되어야 할 내용

- Origin
  ⇒ 어디서 보내는 요청인지
- Access-Control-Request-headers
  ⇒ 실제 요청에 추가할 수 있는 헤더가 무엇인지
- Access-Control-Request-Method
  ⇒ 실제 요청에 사용할 Method가 무엇인지

![스크린샷 2024-01-05 오후 10.12.48.png](/images/브라우저/CORS/8.png)

### preflight에 대한 서버의 응답

- Access-Control-Allow-Origin
  ⇒ 서버 측에서 허용하는 출처
- Access-Control-Allow-Headers
  ⇒ 서버 측 허가 메서드
- Access-Control-Allow-headers
  ⇒ 서버 측 허가 헤더
- Access-Control-Max-Age
  ⇒ preflight 응답 캐싱하는 기간

![스크린샷 2024-01-05 오후 10.21.56.png](/images/브라우저/CORS/9.png)

### 인증정보 포함 요청 시나리오

인증 관련 헤더를 포함해서 요청을 보낼때 사용되며, 인증 정보를 제외하곤 Preflight 요청과 비슷하다.

- 일반적인 HTTP 요청은 Preflight로
- 인증 정보를 담은 HTTP 요청은 Credentialed Request로

### `Preflight와 Credentialed Request 비교`

Preflight와 마찬가지로 Origin(브라우저)과 Access-Control-Allow-Origin(서버 설정)을 비교해 다르다면 CORS Error를 반환하고, 같다면 본 요청을 보내는 식으로 진행된다.

다른점으로는 Credentialed request의 경우 요청 헤더에 인증 정보를 담긴다는 점과, Access-Control-Allow-Origin에 와일드카드(\*)를 사용할 수 없다는 것이다.

<aside>
💡 왜 인증정보가 포함된 요청에는 Access-Control-Allow-Origin: ‘*’를 사용할 수 없을까?

⇒ 쿠키나 세션과 같은 인증 관련된 중요한 정보가 오는 요청인데, 모든 origin을 허용하게 되면 보안상 문제가 발생할 수 있지 않을까?

</aside>

```jsx
브라우저
fecth(url,{
	...
	credentials:include,
})
서버
// Access-Control-Allow-Credentials:true 로 설정
// Access-Control-Allow-Origin: "*" // XXX
// express with cors 모듈
app.use(
  cors({
	...
	credentials: true,
  origin: ["http://localhost:5500"], // "*"는 안됨.
  })
);
```

CORS 시나리오 요약

> 일반적인 HTTP 요청은 대부분 preflight reqeust 방식으로 동작하고, 인증관련 된 요청은 Credentialed request 방식으로 동작한다.

학습하며 느낀점

학습하기 전엔 CORS 에러가 발생하면, 왜 내 local에서 띄운 서버에 내가 접근할 수 없도록 막아놨을까를 생각하며, CORS를 귀찮은 존재라고 생각했는데, 학습을 해보니 귀찮은 존재는 CORS가 아닌 SOP였으며, CORS는 통신 보안도 지키면 다른 자원에 안전하게 접근할 수 있게 도와주는 꼭 필요한 정책이었다.
