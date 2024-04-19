## HTTP 헤더

### HTTP 헤더의 용도

- HTTP 전송에 필요한 모든 부가정보
  - 메시지 바디의 내용, 메시지 바디의 크기, 압축, 요청 클라이언트, 서버 정보, 캐시 관리 정보...
- 표준 헤더가 너무 많다.
- 표준 헤더 외에도 사용자 정의 헤더를 추가해서 사용할 수 있다.

### HTTP 헤더의 분류

<img width="689" alt="스크린샷 2024-04-19 오전 9 47 57" src="https://gist.github.com/assets/78193416/429ad066-abb5-46a3-8057-5c04f0da1a7a">

`General Header`

- 메시지 전체에 적용되는 정보

`Request Header`

- 요청 정보

`Response Header`

- 응답 정보

`Representation Header`

- 표현 데이터를 해석할 수 잇는 정보 제공
  - 데이터 타입, 길이, 압축 방법
- 표현은 요청이나 응답에서 전달할 실제 데이터

### Representation Header

- Content-Type : 표현 데이터의 타입
- Content-Encoding : 표현 데이터의 압축 방식
- Content-Language : 표현 데이터의 자연 언어
- Content-Length : 표현 데이터의 길이

#### `Content-Type`

표현 데이터의 형식을 설명

- text/html; charset=utf-8
- application/json
  - charset이 default가 utf-8이라 생략되어 있음
- image/png

#### `Content-Encoding`

표현 데이터 인코딩

- 표현데이터를 압축하기 위해 사용
- 데이터를 전달하느 곳에서 압축 후 인코딩 헤더 추가
- 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
- gzip, deflate, identity

#### `Content-Language`

표현 데이터의 자연 언어

- ko, en, en-US

#### `Content-Length`

표현 데이터의 길이

- 바이트 단위
- Transfer-Encoding을 사용하면 Content-Length를 사용하지 않음
  - Transfer-Encoding에 이미 정보가 포함됨

### 협상(콘텐츠 네고시에이션)

클라이언트가 선호하는 표현 요청, `요청시에만 사용`한다.

- Accept: 클라이언트가 선호하는 미디어 타입
- Accept-Charset: 클라이언트가 선호하는 문자 인코딩
- Accept-Encoding: 클라이언트가 선호하는 압축 방식
- Accept-Language: 클라이언트가 선호하는 자연 언어

### 협상과 우선순위

`Quality Values(q) 값이 높은게 우선이다.`

- 0~1, 클수록 높은 우선순위
- 생략하면 1
- Accept-Language: ko-KR, en;q=0.9
  - 한국어를 제일 선호하지만, 영어도 괜찮다.

`구체적인 것이 우선이다.`

- Accept: text/\*, text/plain, text/plain;format=flowed
  - text/plain;format=flowed가 제일 구체적이기 때문에 이게 우선이다.

### 전송 방식

- 단순 전송
- 압축 전송
- 분할 전송
- 범위 전송

#### `단순 전송`

컨텐츠에 대한 길이를 알 수 있는 때 사용

- Content-Length:3232

#### `압축 전송`

- Content-Encoding: gzip
- Content-Length: 1231

#### `분할 전송`

<img width="430" alt="스크린샷 2024-04-19 오전 10 45 05" src="https://gist.github.com/assets/78193416/b04fd69c-383c-4008-81ab-5327f448bab5">

- Transfer-Encoding: chunked
- 데이터를 쪼개서 보낼 때 사용
- Content-Length를 보내지 않는다.
  - 데이터의 끝을 알 수 없음.
  - 청크마다 바이트 정보들이 포함되어 있음.

#### `범위 전송`

 <img width="1022" alt="스크린샷 2024-04-19 오전 10 47 13" src="https://gist.github.com/assets/78193416/3b00bb41-3293-45dc-972b-a9f4c067d89c">

어디까지 받았으니 다음부터 주세요~!

### `일반 정보 헤더`

- From: 유저 에이전트의 이메일
- Referer: 이전 웹 페이지 주소
- User-Agent: 유저 에이전트의 정보
- Server: 서버의 정보
- Date: 메시지를 생성한 날짜

#### `From`

- 일반적으로 잘 사용되지 않음
- 검색 엔진 같은 곳에서 주로 사용
- 요청에서 사용

#### `Referer`

이전 웹 페이지의 주소. 정말 많이 사용됨.

- 현재 요청된 페이지의 이전 웹 페이지 주소
- A -> B로 이동하는 경우 B를 요청할 때 Referer: A를 포함해서 요청
- `Referer를 사용해서 유입 경로 분석 가능`
- Referer은 Referrer의 오타

#### `User-Agent`

웹 브라우저 정보, 클라이언트 애플리케이션 정보

- 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
- 통계 정보 분석에 사용
- 요청에서 사용

#### `Server`

요청을 처리하는 ORIGIN 서버의 소프트웨어 정보

#### `Date`

메시지가 발생한 날짜와 시간

- 응답에서 사용

### `특별한 정보 헤더`

#### `Host`

요청한 호스트 정보(도메인)

- 요청에서 사용
- 필수
- 하나의 서버가 여러 도메인을 처리해야 할 때

#### `Location`

- 201 Created: Location 값은 요청에 의해 생성된 리소스 URI
- 3xx Redirection: Location 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킴
  - 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 리다이렉트

#### `Allow`

허용 가능한 HTTP 메서드

- 405 Method Not Allowed 응답에서 응답에 포함해야 함
- Allow: GET, HEAD, PUT

#### `Retry-After`

- 503 Service Unavailable: 서비스가 언제 다시 사용 가능한지 알려줌
- Retry-After: Fri, 31 Dec 2021 23:59:59 GMT
- Retry-After: 120
  - 120초 이후에 다시 시도해라

### `인증 헤더`

- Authorization: 클라이언트 인증 정보를 서버에 전달
- WWW-Authenticate: 리소스 접근시 필요한 인증 방법 정의

#### `WWW-Authenticate`

리소스 접근시 필요한 인증 방법 정의

- 401 Unauthorized 응답과 함께 사용
- WWW-Authenticate: Newauth realm="apps", type=1, title="Login to \"apps\"", Basic realm="simple"
