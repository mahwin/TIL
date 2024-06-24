## 반응형 아키텍처와 어니언 아키텍처

반응형과 어니언 패턴은 서로 다른 단계에서 사용한다. 반응형 아키텍처는 순차적 액션 단계에 사용하고, 어니언 아키텍처는 서비스의 모든 단계에 사용한다.

`반응형 아키텍처`

반응형 아키텍처는 코드에 나타난 순차적 액션의 순서를 뒤집는다. 효과와 그 효과에 대한 원인을 분리해서 코드에 복잡하게 꼬인 부분을 풀 수 있다.

`어니언 아키텍처`

어니언 아키텍처는 웹 서비스나 온도 조절 장치 같은 현실 세계와 상호작용하기 위한 서비스 구조이다. 함수형 사고를 적용한다면 자연스럽게 쓸 수 있는 아키텍처이다.

### 반응형 아키텍처란

반응형 아키텍처는 애플리케이션을 구조화하는 방법이다. 반응형 아키텍처의 핵심 원칙은 이벤트에 대한 반응으로 일어날 일을 지정하는 것이다. 반응형 아키텍처는 웹 서비스와 UI에 잘 어울린다. 웹 서비스는 웹 요청 응답에 일어날 일을 지정하고, UI는 버튼 클릭과 같은 이벤트 응답에 일어날 일을 지정한다.

이벤트 핸들러는 X가 일어나면 Y,Z,A,B,C를 순서대로 실행하는 방식이다.

### 반응형 아키텍처의 절충점

반응형 아키텍처는 코드에 나타난 순차적 액션의 순서를 뒤집는다. X를 하고 Y를 하는 대신, X가 일어나면 언제나 Y를 실행한다. 이는 코드를 읽기 쉽고 유지보수하기도 좋다. 항상 그런것은 아니기 때문에 적절한 곳에 사용하기 위해 판단해야 한다.

#### 전역변수를 일급 함수로 만들어 사용하기

```javascript
function ValueState(initialValue) {
  let _val = initialValue;
  return {
    val: function () {
      return _val;
    },
    update: function (f) {
      const oldValue = _val;
      const newValue = f(oldValue);
      _val = newValue;
    },
  };
}
```

읽고 쓰는 코드를 명확한 메서드 호출로 변경해 상태를 일급 함수로 만들어 다루고 있다.

위에서 만든 state가 변경이 일어날 때 마다 알림을 받는 리스너를 추가하면 반응형 아키텍처를 만들 수 있다.

```javascript
function ValueState(initialValue) {
  let _val = initialValue;
  const watchers = [];
  return {
    val: function () {
      return _val;
    },
    update: function (f) {
      const oldValue = _val;
      const newValue = f(oldValue);
      if (oldValue !== newValue) {
        _val = newValue;
        watchers.forEach((w) => w(newValue));
      }
    },
    addWatcher: function (f) {
      watchers.push(f);
    },
  };
}
```

용어 정리

- watcher, event handler, listener, callback, observer
- 모두 같은 개념으로 사용된다.

### 일급 함수로 다루는 상태값의 예시

```javascript
const shopping_cart = ValueState({});

function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart.cart.update(function (cart) {
    return add_item(cart, item);
  });
  const total = calc_total(shopping_cart.cart.val());
  set_cart_total_dom(total);
  update_tax_dom(total);
}

shopping_cart.addWatcher(update_shipping_icons);
```

### FormulaCell은 파생된 값을 계산한다.

어떤 셀은 다른 셀의 값을 최신으로 반영하기 위해 파생될 수 있다. FormulaCell로 이미 있는 셀에서 파생한 셀을 만들 수 있다. 다른 셀의 변화가 감지되면 값을 다시 계산하도록 하자.

위의 예제에서 shopping_cart가 변경되면 total 값이 변경되고 total 값이 변경되어야 한다.

```javascript
function FormulaCell(upstreamCell, f) {
  const myCell = ValueState(f(upstreamCell.val()));
  upstreamCell.addWatcher(function (newValue) {
    myCell.update(function () {
      return f(upstreamCell.val());
    });
    return {
      val: MyCell.val,
      addWatcher: myCell.addWatcher,
    };
  });
}
```

적용해보자.

```javascript
const shopping_cart = ValueState({});
const cart_total = FormulaCell(shopping_cart, calc_total);

function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart.update(function (cart) {
    return add_item(cart, item);
  });
}

shopping_cart.addWatcher(update_shipping_icons);
cart_total.addWatcher(set_cart_total_dom);
cart_total.addWatcher(update_tax_dom);
```

### 함수형 프로그래밍과 변경 가능한 상태

함수형 프로그래밍을 비롯해 모드 소프트웨어는 변경 가능한 상태를 잘 관리해야 한다. 소프트웨어는 변화하는 현실 세계로부터 정보를 가져와 일부는 저장해야 한다. 중요한 것은 상태를 가능한 한 안전하게 사용해야 한다.

## 반응형 아키텍처의 특징

### 원인과 효과가 결합한 것을 분리한다.

일반적인 아키텍처의 경우 장바구니와 관련된 모든 작업에 DOM 조작이 포함되어야 한다.

ex) 추가, 삭제, 전체 삭제, ...

하지만 반응형 아키텍처의 경우 장바구니에 물건을 추가하는 작업과 DOM 조작을 분리할 수 있다.

#### 결합의 분리는 원인과 효과의 중심을 관리한다.

일반적인 아키텍처는 원인과 효과에 따라 적용해야할 코드가 NxM으로 늘어난다. 하지만, 반응형 아키텍처는 원인과 효과를 분리하면서 N+M으로 변경한다.

반응형 아키텍처를 따른다면 효과가 추가되어도 때문이다.

### 여러 단계를 파이프라인으로 처리한다.

반응형 아테틱처도 간단한 액션과 계싼을 조합해 복잡한 동작을 만들 수 있따. 조합된 액션은 파이프라인과 같다. 데이터가 파이프라인으로 들어가 각 단계에서 처리된다. 파이프라인은 작은 액션과 계산을 조합한 하나의 액션이라고 볼 수 있다.

### 타임라인이 유연해진다.

반응형 아키텍처를 사용하면 순서를 정의하는 방법을 뒤집기 때문에 타임라인이 작은 부분으로 분리된다.

### 어니언 아키텍처

어니언 아키텍처는 반응형 아키텍처보다 더 넓은 범위에서 사용된다. 어니언 아키텍처는 서비스 전체를 구성하는 데 사용하기 때문에 바깥 세계와 상호작용을 하는 부분을 다룬다.

`반응형 아키텍처`

반응형 아키텍처는 코드에 나타난 순차적 액션의 순서를 뒤집는다. 효고와 그 효과에 대한 원인을 분리해서 코드에 복잡하게 꼬인 부분을 풀 수 있다.

`어니언 아키텍처`

어니언 아키텍처는 웹 서비스나 온도 조절 장치 같은 현실 세계와 상호작용하기 위한 서비스 구조를 만든다. 함수형 사고를 적용한다면 자연스럽게 쓸 수 있다.

#### 어니언 아키텍처란

겹겹이 쌓인 양파 모양을 하고 있는 아키텍처이다.

어니언 아키텍처는 특정 계층이 꼭 필요하다고 강제하진 않지만 보통은 3가지 큰 분류로 나눈다.

1. 인터렉션
   - 바깥세상에 영향을 주거나 받는 액션
2. 도메인 계층
   - 비즈니스 규칙을 정의하는 계산
3. 언어 계층
   - 언어 유틸리티와 라이브러리

또한, 중요한 규칙 3가지를 가지고 있다.

1. 현실 세계와 상호작용은 인터렉션 계층에서 해야 한다.
2. 계층에서 호출하는 방향은 중심 방향이다.
3. 계층은 외부에 어떤 계층이 있는지 모른다.

어니언 아키텍처는 액션과 계산의 분리, 계층형 설계 방식과 잘 맞는다.

#### 전통적인 계층형 아키텍처

웹 서버를 만들 때 사용하는 전형적인 계층의 예시이다.

웹 인터페이스 계층

- 웹 요청을 도메인으로 바꾸고 도메인을 웹 응답으로 바꾼다.

도메인 계층

- 애플리케이션 핵심 로직으로 도메인 개념에 DB 쿼리나 명령이 들어간다.

데이터베이스 계층

- 시간에 따라 바뀌는 정보를 지정한다.

해당 아키텍처는 함수형 프로그래밍 방식과 잘 맞지 않는다. 데이터 베이스 계층이 가장 아래에 있다면 그 위에 있는 모든 것이 액션이되기 때문이다.

#### 함수형 아키텍처

<img width="523" alt="스크린샷 2024-06-24 오후 10 44 19" src="https://gist.github.com/assets/78193416/26f3a201-5c8b-45fd-8bf1-02b7205c4b1e">

눈에 띄는 차이점은 데이터베이스 계층과 도메인 계층의 관계이다. 함수형 아키텍처는 도메인 계층이 데이터베이스 계층에 의존하지 않는다. 데이터베이스 동작은 값을 바꾸거나 데이터베이스 접근하기 때문에 액션이다. 그래서 도메인 동작을 포함해 그래프에 가장 위에 있는 것까지 모두 액션이 된다.

함수형 아키텍처 그림에서 각 점선 끝을 연결하면 어니언 아키텍처와 같은 모양이 된다.

<img width="528" alt="스크린샷 2024-06-24 오후 10 48 28" src="https://gist.github.com/assets/78193416/a45af5d8-fc38-4618-8047-81ebc62c9781">

#### 변경과 재사용성

어떤 의미에서 소프트웨어 아키텍처는 변화를 다루는 일이다. 어떤 것들이 바꾸기 쉬운지를 이해하는 것이 아키텍처의 반은 이해하는 것이다.

어니언 아키텍처는 인터렉션 계층이 최외각이기 때문에 가장 바꾸기 쉽다. 어니언 아키텍처는 데이터베이스나 API 호출과 같은 외부 서비스를 바꾸기 쉽다. 가장 높은 계층에서 사용하기 떄문이다. 도메인 계층은 외부 서비스에 의존하지 않아서 테스트하기 좋다. 어니언 아키텍처는 좋은 인프라보다 좋은 도메인을 강조한다.

#### 도메인 규칙은 도메인 용어를 사용한다.

프로그램의 핵심 로직을 도메인 규칙 또는 비즈니스 규칙이라고 한다. 모든 로직이 도메인 규칙이 아니므로 어떤 로직이 도메인 규칙인지 판단하기 위해 코드에 나타나는 용어를 참고할 수 있다.

도메인 규칙은 꼭 도메인 용어를 사용해야 한다. 도메인 규칙에는 제품, 임지ㅣ, 가격, 할인과 같은 용어를 사용한다.
