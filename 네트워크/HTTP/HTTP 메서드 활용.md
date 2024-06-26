## HTTP 메서드 활용

### 클라이언트에서 서버로 데이터 전송

- `쿼리 파라미터`를 통한 데이터 전송
  - GET
    - GET도 바디가 있지만 거의 사용하지 않는다.
  - 주로 정렬 필터(검색어)
- `메시지 바디`를 통한 데이터 전송
  - POST, PUT, PATCH
  - 회원 가입, 상품주문, 리소스 등록, 리소스 변경

### 정적 데이터 조희

- 이미지, 정적 텍스트 문서
- 조회는 GET 사용
- 정적 데이터는 일반적으로 쿼리 파라미터 없이 리소스 경로로 단순하게 조회 가능

### 동적 데이터 조희

- 주로 검색, 게시판 목록에서 정렬 필터
- 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 사용
- 조회는 GET 사용
- GET은 쿼리 파라미터 사용해서 데이터를 전달
  - GET /search?q=hello&hl=ko HTTP/1.1

### HTML Form 데이터 전송

```html
<form action="/save" method="post">
  <input type="text" name="username" />
  <input type="text" name="age" />
  <button type="submit">전송</button>
</form>
```

- 전송 버튼을 누르면 웹 브라우저가 알아서 http 메세지를 만들어줌.
- 생성된 HTTP 메시지

```text
  POST /save HTTP/1.1
  Host: localhost:8080
  Content-Type: application/x-www-form-urlencoded

  username=Kim&age=20
```

- Content-Type:application/x-www-form-urlencoded
  - 아래 데이터 형식을 이해할 수 있게 알려주는 내용
  - 한국어가 포함된다면 김 => %EA%B9%80으로 변환해서 전송함.
- 쿼리 파라미터랑 유사하게 데이터를 만들어서 body에 넣어주네!

- form tag의 method가 get이라면

```text
  GET /save?username=kim&age=20 HTTP/1.1
  Host: localhost:8080
```

- input 데이터를 쿼리 스트링으로 변경해서 전송함.
- GET은 조회에만 쓰기로 했으니까 조회일 때는 써도 좋다!

```html
<form action='/save' method='post' enctype="multipart/form-data">
     <input type= 'text' name='username'>
     <input type= 'text'name='age'>
     <input type='file' name='file1'>
     <button type='submit'> 전송 <button>
 </form>
```

- enctype="multipart/form-data 란?
  - file을 포함해서 보내기 위해 웹 브라우저에게 알려주는 것
  - 바이너리 데이터를 전송할 때 사용함.

```text
POST /save HTTP/1.1
HOST: localhost:8080
Content-type: multipart/form-data; boundary=----XXX
Content-Length: 10457

------XXX
Content-Disposition: form-data; name='username'

kim
------XXX
Content-Disposition: form-data; name='age'

20
------XXX
Content-Disposition: form-data; name='file1'; filename="fileName.png"
Content-Type: image/png

109238a90p332ask1aknfpqkw01... (이미지에 대한 바이트 정보...)
------XXX

```

- enctype="multipart/form-data"라고 하면 웹 브라우저가 자동으로 Content-type: multipart/form-data; boundary= ----XXX 형식으로 데이터의 경계를 잘라줌.

### HTML Form 데이터 전송 정리

- HTML Form submit 시 POST 전송
  ex) 회원 가입, 상품 주문, 데이터 변경
- Content-Type: application/x-www-form-urlencoded 사용

  - form의 내용을 메시지 바디를 통해서 전송(key-value, 쿼리 파라미터 형식)
  - 전송 데이터를 url encoding 처리
  - abc김 -> abc%EA%B9%80

- HTML Form 은 GET 전송도 가능
- Content-Type: multipart/form-data
  - 파일 업로드 같은 바이너리 데이터 전송시 사용
  - 다른 종류의 여러 파일과 폼의 내용 함께 전송 가능
- HTML Form 전송은 GET, POST만 지원

### HTTP API 데이터 전송

- 직접 HTTP 메시지를 만들어서 보내면 된다.

  ```text
  POST /members HTTP/1.1
  Content-Type: application.json

  {
    "username":"young",
    "age":20
  }
  ```

- 백엔드 시스템 통신에 많이 사용됨.
- 앱 클라이언트
  - 아이폰, 안드로이드에서 전송할 때
- 웹 클라이언트
  - Form 전송 대신 js를 이용한 통신에 사용(AJAX)
- POST, PUT, PATCH: 메시지 바디를 통해 데이터 전송
- GET: 조회, 쿼리 파라미터로 데이터 전달
- Content-Type: application/json을 주로 사용
  - TEXT, XML, JSON 등이 있긴함.
