# HTTP API를 설계해 보자

## API 설계는 크게 두 가지로 나뉜다

- POST 기반 등록 (collection)
- PUT 기반 등록 (store)
- 공통 설계 원칙
  - url는 리소스 그 자체여야 한다.
  - 행위는 HTTP Method로 표현한다.

## `회원 관리 시스템`

POST 기반 등록으로 설계

- 회원 목록 /members → GET
- 회원 등록 /members → POST
- 회원 조회 /members/{id} → GET
- 회원 수정 /members/{id} → PATCH, PUT, POST
- 회원 삭제 /members/{id} → DELETE

`회원 목록 /members → GET`

- 회원 정보가 너무 많다면 필터 정보를 query parameters에 추가
- 정렬하고 싶다면, 정렬 정보를 query parameters에 추가

`회원 등록 /members → POST`

- 회원 정보를 바디에 넣으면 등록되도록 만듬

`회원 조회 /members/{id} → GET`

- 회원 하나를 조회할 때는 저렇게 계층적으로 memebers 아래에 회원 식별 Id로 설계

`회원 삭제 /members/{id} → DELETE`

- 회원 하나를 삭제할 때는 저렇게 계층적으로 memebers 아래에 회원 식별 Id로 설계

`회원 수정 /members/{id} → PATCH, PUT, POST`

- 3 가지 메서드를 쓸 수 있으니 상황 별로 적절한 Method를 사용해야 함.
  - put ⇒ 기존 리소스를 삭제하고 덮음
  - patch ⇒ 부분적으로 수정
  - post ⇒ 이것도 저것도 애매하면 post !!

### POST로 회원 등록

- 클라이언트는 등록될 리소스의 URI를 모른다.
  - 회원 등록 /members → POST
- 서버가 새로 등록된 리소스 UR를 생성해준다.
  - ```text
    HTTP/1.1 201 Created
    Location: /members/100
    ```
- 컬렉션(Collection)
  - 서버가 관리하는 리소스 디렉토리
  - 서버가 리소스의 URI를 생성하고 관리
  - 여기서 컬렉션은 /members

## `파일 관리 시스템`

PUT 기반 등록으로 설계

- 파일 목록 /files → GET
- 파일 조회 /files/{filename} → GET
- 파일 등록 /files/{filename} → PUT
- 파일 삭제 /files/{filename} → DELETE
- 파일 대량 등록 /files → POST

`파일 목록 /files → GET`

- 회원 관리 시스템과 일치

`파일 조회 /files/{filename} → GET`

- 회원 관리 시스템과 일치

`파일 등록 /files/{filename} → PUT`

- 클라이언트가 filename을 넘겨줘야 함
- PUT 메소드는 똑같은 이름이 있으면, 덮어버리고 없으면 생성함
  - 저장하려는 파일 이름과 같은 기존 파일이 있다면 덮어씀

`파일 삭제 /files/{filename} → DELETE`

- 회원 관리 시스템과 일치

`파일 대량 등록 /files → POST`

- 임의로 /files에 POST 요청은 파일을 대량 등록한다고 약속하고 설계한 것
- 다른 경로를 사용해도 된다

### PUT로 신규 자원 등록할 때의 특징

- `클라이언트가 리소스 URI`를 알고 있어야 한다.
- 파일 등록 /files/{filename} → PUT
  - PUT /files/star.jpg
- 클라이언트가 직접 리소스의 URI를 지정한다.
- 스토어(Store)
  - 클라이언트가 관리하는 리소스 저장소
  - 클라이언트가 리소스의 URI를 알고 관리
  - 여기서 스토어는 /files

### POST vs PUT

- POST
  - 서버야 이런 정보 너가 알아서 저장해주고 저장한 곳 다시 보내줘!
- PUT
  - 서버야 이런 정보 이런 URI에 저장해줘!

## HTML FORM 사용한 api 설계

- HTML form은 GET, POST만 지원
  - AJAX 같은 기술을 사용해서 js로도 API 콜 가능
  - BUT 순수 HTML FORM으로만 설계한다고 가정
- 회원 목록 /members → GET
- 회원 등록 폼 /members/new → GET
- 회원 등록 /members/new, /members → POST
- 회원 조회 /members/{id} → GET
- 회원 수정 폼 /members/{id}/edit → GET
- 회원 수정 /members/{id}/edit, /members/{id} → POST
- 회원 삭제 /members/{id}/delete → POST

`회원 등록 폼 /members/new → GET`

- 회원 등록 버튼을 누르면 회원 등록 폼이 나옴

`회원 등록 폼 /members/new, /members → POST`

- 회원 등록 폼에 저장 버튼을 누를 때
- /members/new로 URI 맞추고 GET, POST로 행위를 정의할 수도 있음

`회원 수정 폼 /members/{id}/edit → GET`

- 회원 조회에서 특정 회원을 누르면 회원 수정 폼이 나옴

`회원 수정   /members/{id}/edit, /members/{id} → POST`

- 회원 수정 폼의 URI로 맞추고 GET, POST로 행위를 정의할 수도 있음

`회원 삭제   /members/{id}/delete → POST`

- DELETE를 써야하지만 POST 밖에 못 쓰니 /delete라는 `control URI`를 사용해야 함.
- 방법이 없기 때문에 규칙을 어긴 것!

### control URI

- HTML FORM은 GET, POST만 지원하기에 제약이 있음
- 이런 제약을 해결하기 위해 동사로 된 리소스 경로를 사용
- POST의 /new, /edit, /delete가 컨트롤 URI
- HTTP 메서드로 해결하기 애매한 경우 사용
- 실무에서 많이 씀
  - 최대한 리소스라는 개념을 가지고 설계하되 애매하다면 사용하자

### `참고하면 좋은 URI 설계 개념`

- 문서
  - 단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row)
  - /members/100, files/star.jpg와 같은 딱 그 하나를 의미
- 컬렉션
  - 서버가 관리하는 리소스 디렉터리
  - 서버가 리소스의 URI를 생성하고 관리
  - POST /members
- 스토어
  - 클라이언트가 관리하는 자원 저장소
  - 클라이언트가 리소스의 URI를 생성하고 관리
  - PUT /files/star.jpg
- 컨트롤러, 컨트롤 URI
  - 문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
  - 동사를 직접 사용
  - /members/{id}/delete
