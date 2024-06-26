# HTTP 기초

### `모든 것이 HTTP`

- HyperText Transfer Protocol
- 시작은 HTML 전송용이지만, 지금은 모든 것을 HTTP로 전송한다.
  - HTML, TEXT
  - image, 음성, 영상, 파일
  - JSON, XML (API)
  - 거의 모든 형태의 데이터 전송 가능
  - 서버간에 데이터를 주고 받을 때도 대부분 HTTP를 사용

### `HTTP 역사`

- HTTP/0.9 1991년
  - GET 메서드만 지원, HTTP 헤더 X
- HTTP/1.0 1996년
  - 메서드 헤더 추가
- `HTTP/1.1` 1997년
  - 가장 많이 사용됨
- HTTP/2 2015년
  - 성능 개선
- HTTP/3 ing
  - TCP 대신에 UDP 사용

### `기반 프로토콜`

- TCP : HTTP/1.1, HTTP2
- UDP : HTTP/3
- 현재 HTTP/1.1주로 사용
  - 2 ~ 3 버전도 점점 증가하고 있다.

## `HTTP의 특징`

### `클라이언트 서버 구조`

- 클라이언트는 서버에 요청을 보내고 응답을 대기
- 서버가 요청에 대한 결과를 만들어서 응답
- 클라이언트와 서버로 나누면서 얻게 되는 장점
  - 서버와 클라이언트가 독립적으로 발전할 수 있다.
  - 비즈니스 로직은 서버에서만 다루고 클라이언트는 뷰만 신경쓰면 됨.

### `무상태 프로토콜`

- 서버가 클라이언트의 상태를 보존 X
- 무상태는 응답 서버를 쉽게 바꿀 수 있다.
  - 서버 증설하기 쉽다.
- 무상태는 로그인 등의 기능에 있어서 한계가 있다.
  - 세션과 쿠키를 이용해서 상태를 유지되는 것처럼 사용할 수 있다.
  - 서버에 문제가 생겨 세션이 날아간다면 로그인 기능에 에러가 생긴다.
- 이전 정보를 포함해야 하기 때문에 전송되는 전송량이 더 많다.

### `비 연결성`

- 각 TCP 연결을 하나의 요청과 응답에 사용하고, 완료되면 연결을 닫음.
- 연결을 끊기 때문에 서버 자원을 효율적으로 사용할 수 있다.
  - 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 정도임.
- TCP/IP 연결을 계속 맺어야 하는 오버헤드가 있음
  - 이를 해결하기 위해 HTTP 지속 연결로 해결함
  - 한 번 연결하고 데이터 HTMl, css, js, 이미지 등을 함께 다운로드
  - HTTP/2 ,HTTP/3에서는 지속 연결이 훨씬 더 최적화됨

### `HTTP 메시지`

![스크린샷 2023-10-26 오후 4 40 03](https://user-images.githubusercontent.com/78193416/278302217-6fc2aa52-2a7b-439c-947d-f11b529c5e13.png)

- empty line은 무조건 있음.

### HTTP 요청 메시지

<img width="540" alt="스크린샷 2024-04-18 오후 6 48 53" src="https://gist.github.com/assets/78193416/7ed0f193-23b6-40b4-8fca-1b4938e98131">

- 바디가 있을 수도 있음

### HTTP 응답 메시지

![스크린샷 2023-10-26 오후 4 41 01](https://user-images.githubusercontent.com/78193416/278302784-a1ec911d-c2d3-4321-9b19-c8a7c5fcdabd.png)

### HTTP start-line (요청)

- start-line = request-line
- request-line = method SP(공백) request-target SP HTTP-version CRLF(엔터)
- request-line = `HTTP 메서드` `요청 대상` `HTTP 버전`
  - HTTP 메서드
    - GET, POST, PUT, DELETE
  - 요청 대상
    - absolute-path[?query]
    - 절대경로=”/”로 시작하는 경로
  - HTTP 버전

### HTTP start-line (응답)

- start-line = status-line
- status-line = HTTP-version SP status-code SP reason-phrase CRLF
- status-line = `HTTP 버전` `HTTP 상태 코드` `이유 문구`
  - HTTP 상태 코드 : 요청 성공 실패를 나타냄
    - 200 : 성공
    - 300 : 클라이언트 요청 오류
    - 500 : 서버 내부 오류
  - 이유 문구 : 사람이 이해할 수 있는 짧은 상태 코드 설명 글

### HTTP 헤더

- header-field = field-name “:” OWS field-value OWS (OWS:띄어쓰기 허용)
- field-name은 대소문자 구문 없음.
- 헤더의 용도
  - HTTP 전송에 필요한 모든 정보가 들어가 있음.
  - 메시지 바디의 내용, 메시지 바디의 크기, 압축, 인증, 요청 클라이언트의 정보, 서버 애플리케이션 정보, 캐시 관리 정보…
  - 표준 헤더가 너무 많음
  - 필요시 임의의 헤더 추가 가능.

### HTTP 메시지 바디

- 실제 전송할 데이터
- HTML 문서, 이미지, 영상, JSON 등등 byte로 표현할 수 있는 모든 데이터
