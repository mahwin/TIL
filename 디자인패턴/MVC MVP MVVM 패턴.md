## MVC 패턴이란?

- 모델, 뷰, 컨트롤러로 이루어진 디자인 패턴이다.

  - 모델: 어플리케이션의 데이터인 데이터베이스, 상수, 변수 등을 뜻한다.

  - 뷰: 모델을 기반으로 해서 그려진, 사용자에게 보여지는 인터페이스를 뜻한다. 정보를 저장하지 않아야 하며, 변경이 일어나면 컨트롤러에게 알려야 한다.

  - 컨트롤러: 모델과 뷰를 연결하는 역할을 한다. 사용자의 입력을 받아 모델을 변경하거나, 모델의 변경을 뷰에 반영하는 역할을 한다.

## MVC 패턴의 장점

- 애플리케이션의 구성 요소를 세 가지 역할로 구분하여 개발 프로세스에서 각각의 구성 요소에만 집중해서 개발할 수 있다.
- 모델과 뷰는 서로 독립적이기 때문에, 재사용성과 확장성이 용이하다.

## MVC 패턴의 단점

- 모델과 뷰가 서로 의존성이 높아지면, 컨트롤러가 복잡해진다.

## MVP 패턴이란?

- MVC에서 C가 P로 교체된 패턴이다. V와 P는 1:1 관계이므로 MVC보다 더 강한 결합을 지닌 디자인 패턴이다.

## MVVM 패턴이란?

- MVC에서 C가 VM으로 교체된 패턴이다. VM은 뷰를 추상화한 계층이며 VM : V = 1 : N이라는 관계를 갖는다.

- VM은 커맨드와 데이터바인딩을 가진다.
  - 커맨드 : 여러 요소에 대한 처리를 하나의 액션으로 처리할 수 있는 기법
  - 데이터바인딩 : 화면에 보이는 데이터와 브라우저 상의 메모리 데이터를 일치시키는 기법

### 차이 비교

| 특징 | MVC                    | MVP                    | MVVM                 |
| ---- | ---------------------- | ---------------------- | -------------------- |
| 관계 | 컨트롤러와 뷰는 1:n    | 프레젠터와 뷰는 1:1    | 뷰모델과 뷰는 1:n    |
| 참조 | 뷰는 컨트롤러를 참조 X | 뷰는 프레젠터를 참조 O | 뷰는 뷰모델을 참조 O |
