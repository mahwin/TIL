## HTTP/x.x 버전의 특징

### `HTTP/1.0`

`1.0 버전`에서는 HTTP 요청마다 TCP 연결이 필요했기 때문에 RTT가 늘어나는 문제가 있었다.

- keep alive 헤더를 통해 여러 요청을 하나의 TCP 연결로 처리할 수 있도록 지원했지만, default는 아니였음.

### `HTTP/1.1`

`1.1 버전`은 `1.0 버전`에 비해 크게 3가지가 개선되었다.

1. 기본적으로 keep alive가 활성화되어 있어 여러 요청을 하나의 TCP 연결로 처리할 수 있도록 지원한다.
2. 호스트 헤더를 통해 여러 도메인을 하나의 IP 주소로 처리할 수 있도록 지원한다.
3. 대역폭 최적화를 통해 다운로드 재개가 가능하게 된다.
   - Range:bytes=5000-

같은 큐에 있는 패킷이 무겁다면 뒤의 패킷이 지연되는 HOL(Head of Line) Blocking 문제가 있다.

### `HTTP/2`

`2.0 버전`은 `1.1 버전`가 가진 HOL 문제를 해결했다.

### 바이너리 포맷 계층

애플리케이션 계층과 전송 계층 사이에 바이너리 포맷 계층을 추가한다. 이전 버전에서는 일반 텍스트 메시지를 줄바꿈으로 데이터를 나눴다면 `2.0 버전` 부터는 바이너리 포맷으로 데이터를 더 작게 나눠 프레임으로 캡슐화한다.

<img width="908" alt="스크린샷 2024-04-18 오전 11 01 50" src="https://gist.github.com/assets/78193416/e0f50955-2ffb-4e1a-b330-b07914b0e462">

### 멀티플렉싱

<img width="933" alt="스크린샷 2024-04-18 오전 11 05 16" src="https://gist.github.com/assets/78193416/95e5a1c6-c9b0-4ed1-83da-968da819631a">

단일 TCP연결의 여러 스트림에서 여러 HTTP 요청과 응답을 비동기적으로 보낼 수 있게 된다. HTTP/2는 리소스를 작은 프레임으로 나누고 이를 스트림으로 프레임을 전달한다. 각각의 프레임은 스트림ID, 해당 청크의 크기를 나타내는 정보가 추가되었기 때문에 재조립하는 과정을 통해 순서를 맞출 수 있다.

### 서버푸시

서버가 클라이언트에게 필요하다고 판단되는 추가적인 리소스를 요청 없이 보내는 작업을 의미한다.

### 헤더압축

공통되는 헤더들은 제외한채 보내는 등의 헤더 압축 기법을 사용해 헤더의 크기를 줄였다.
허프만 인코딩을 사용해 헤더를 압축한다.

### `HTTP/3`

<img width="677" alt="스크린샷 2024-04-18 오전 11 09 49" src="https://gist.github.com/assets/78193416/afd9354e-8ab4-44b5-bf4b-2ab5f001267e">

`3.0 버전`은 `2.0 버전`의 TCP 연결을 UDP로 변경했다. UDP는 TCP보다 빠르지만 신뢰성이 떨어지는 특징이 있다. 이를 보완하기 위해 QUIC 프로토콜을 사용한다.

`2.0 버전`은 클라이언트와 서버간의 연결을 맺어 세션을 만드는데 필요한 핸드셰이크와 암호화통신을 구축하기 위한 TLS 핸드셰이크가 각각 필요하다.

`3.0 버전`은 TLS로 암호화통신을 구축할 때 단 한번의 핸드셰이크를 활용해 세션을 만들고 암호화통신을 구축한다.
