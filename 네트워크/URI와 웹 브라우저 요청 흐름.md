# URI와 웹 브라우저 요청 흐름

## `URI ? URL ? URN ?`

![스크린샷 2023-10-26 오후 3 05 17](https://user-images.githubusercontent.com/78193416/278303506-2c115b08-f056-4481-ac80-fc36ff32b72d.png)

> URI는 로케이터(Locator), 이름(Name) 또는 둘 다 추가로 분류될 수 있다.

### `URI` Uniform Resource Identifier

- Uniform : 리소스 식별하는 통일된 방식
- Resource : 자원, URI로 식별할 수 있는 모든 것
- Identifier : 다른 항목과 구분하는데 필요한 정보
- 로케이터(locator), 이름(name) 또는 둘 다 추가로 분류될 수 있다.
- URI = URL + URN

### `URL`

- Locator : 리소스가 있는 위치를 지정
- URN이 거의 사용되지 않기 때문에 URI = URL라고 생각해도 된다.

### `URN`

- Name : 리소스에 이름을 부여
- URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않음

![스크린샷 2023-10-26 오후 3 06 58](https://user-images.githubusercontent.com/78193416/278303596-db5c1315-407d-4f9e-840a-4b4a49bb92be.png)

### `URL 분석`

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
- https://www.google.com:443/search?q=hello&hl=ko
- `scheme`
  - 프로토콜 정보
  - 프로토콜
    - 어떤 방식으로 자원에 접근할 것인가에 대한 약속
    - http https ftp 등등
  - 특정 프로토콜인 경우 port 생략 가능.
    - http ⇒ 80, https ⇒ 443
- `[userinfo@]`
  - URL에 사용자정보를 포함해서 인증할 경우
  - 거의 사용하지 않음
- `host`
  - 호스트명
  - www.google.com
- `[:port]`
  - 접속 포트
  - 일반적으로 생략
- `[/path]`
  - 리소스 경로, 계층적 구조
  - 예
    - /home/file1.jpg
    - /members
    - /members/100
- [?query]
  - key=value 형태
  - ?로 시작, &로 추가 가능 ?kvalueeyA=A&keyB=valueB
  - query parameter, query string 등으로 부름
  - 웹서버에 제공하는 파라미터
- [#fragment]
  - html 내부 북마크 등에 사용
  - 서버에 전송하는 정보는 아니다

## `웹 브라우저의 요청 흐름`

`https://www.google.com:443/search?q=hello&hl=ko`을 분석해보자

- https로 port 유추
- www.google.com으로 DNS 조회해서 IP주소를 얻는다.
- 이를 기반으로 HTTP 요청 메시지를 생성한다
  ![스크린샷 2023-10-26 오후 3 26 01](https://user-images.githubusercontent.com/78193416/278303692-cf76f846-4636-4757-8345-08e85a99fa33.png)

### HTTP 메시지 전송

![스크린샷 2023-10-26 오후 3 27 09](https://user-images.githubusercontent.com/78193416/278303751-3bd3e7df-63b4-496d-af8d-70ac35a45759.png)

- 소켓 라이브러리를 통해서 TCP/IP로 연결을 확인한다.
- 연결이 됐다면 OS 계층으로 HTTP 요청 메시지를 보낸다.
  - 여기서 출발지와 도착지의 IP, PORT 정보가 추가된다.
- 이렇게 만들어진 TCP/IP 패킷을 인터넷 망에다가 올린다.
- 여러 인터넷 망의 node를 거쳐 서버에 도착한다.
- 서버에서 HTTP 메시지를 기반으로 해석해서 원하는 정보를 기반으로 응답 메시지를 만든다.
  ![스크린샷 2023-10-26 오후 3 34 08](https://user-images.githubusercontent.com/78193416/278303822-bf19563e-9dd0-446e-980a-e17c7e2dfec7.png)
