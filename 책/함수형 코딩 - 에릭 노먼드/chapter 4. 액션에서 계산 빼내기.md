## 마트 예제를 통해 액션에서 계산을 빼보자

```javascript
const shopping_cart = [];
let shopping_cart_total = 0;

function add_item_to_cart(name, price) {
  shopping_car.push({
    name: name,
    price: price,
  });
  calc_cart_total();
}

function calc_cart_total() {
  shopping_cart_total = 0;
  for (const item of shopping_cart) {
    shopping_cart_total += item.price;
  }
  set_cart_total_dom(); // 합계를 DOM에 반영
}
```

구매 합계가 20 달러 이상이면 무료 배송 기능을 추가하자. 장바구니 합계가 20달러가 넘는 제품의 구매 버튼 옆에 무료 배송 아이콘을 표시하자

`절차지향 코드`

```javascript
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();

  for (const button of buy_buttons) {
    const item = button.item;
    if (item.price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}
function calc_cart_total() {
  shopping_cart_total = 0;
  for (const item of shopping_cart) {
    shopping_cart_total += item.price;
  }
  set_cart_total_dom();
  update_shipping_icons();
}
```

장바구니의 금액 합계가 바뀔 떄마다 세금을 다시 계산해야 하는 기능이 생겼다.

```javascript
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}
function calc_cart_total() {
  shopping_cart_total = 0;
  for (const item of shopping_cart) {
    shopping_cart_total += item.price;
  }
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
```

### 재사용하기 쉽게 만들기

결제팀과 배송팀이 해당 코드를 사용하려고 한다. 그런데 이 코드는 재사용하기 어렵다. 왜냐하면 DOM을 직접 조작하기 때문이다.

좀 더 범용적이게 변경하기 위한 조건은 아래와 같다.

- 전역변수에 의존하지 않아야 한다.
- DOM을 사용할 수 있는 곳에서 실행된다고 가정하지 말자
- 함수가 결과값을 리턴해야 한다.

![스크린샷 2024-06-25 오후 5 43 53](https://gist.github.com/assets/78193416/96f88b72-87ea-46ad-8b10-4d5d7aab0b0e)

만들어낸 모든 코드가 실제로는 액션이다. 이를 분리해보자.

## 함수에는 입력과 출력이 있다.

모든 함수는 입력과 출력이 있다. 입력은 함수가 계산을 하기 위한 외부 정보이다. 인수 뿐만 아니라 전역 변수를 읽는 행위도 입력이다. 출력은 함수가 계산을 마친 결과이다. return 값 뿐만 아니라 외부에 미치는 영향 모두를 포함한다.

```tsx
let total = 0;

function add_to_total(amount) {
  console.log(`Old total: ${total}`);
  total += amount;
  return total;
}
```

- total 이란 상위 스코프 변수를 읽음 (입력)
- console.log 호출 (출력)
- 전역 변수 total 값을 변경 (출력)
- return (출력)

위처럼 입력과 출력은 명시적이거나 암묵적일 수 있다.
함수에 암묵적 입력과 출력이 있으면 액션이 된다.

함수형 프로그래머는 암묵적 입력과 출력을 부수 효과라고 부른다. 부수 효과는 함수가 하려는 주요 기능이 아니다.함수가 하려는 주된 일은 계산 결과를 return 하는 것이다.

## 재사용성과 입출력은 관련있다.

암묵적 입출력을 방지하고, 재사용성 높은 코드를 작성하기 위한 tip

1. DOM 업데이트와 비즈니스 로직은 분리되어야 한다.

DOM을 업데이트하는 일은 함수에서 어떤 정보가 나오는 것이기 때문에 출력이다. 하지만 리턴 값이 없어서 암묵적 출력이 된다. 이를 비즈니스 로직과 분리하자.

2. 전역변수가 없어야 한다.

전역변수를 읽고 쓰는 함수는 암묵적 입력, 출력을 하고 있다. 이를 없애자.

3. 전역변수에 의존하지 않아야 한다.

4. DOM을 사용할 수 있는 곳에서 실행된다고 가정하면 안 된다.

함수 로직 상에서 DOM을 사용한다는 것도 암묵적 출력이다.

5. 함수가 결과값을 리턴해야 한다.

암묵적인 출력이 아니라 명시적인 출력을 사용해야 한다.

## 액션에서 계산 빼내기

계산에 해당하는 코드를 분리한다. 그리고 입력값은 인자로 출력값은 리턴값으로 바꾼다.

적용해보자

```javascript
function calc_cart_total() {
  shopping_cart_total = cal_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons();
}

function cal_total(cart) {
  let total = 0;
  for (const item of cart) {
    total += item.price;
  }
  return total;
}
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}

function add_item(cart, name, price) {
  const new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  });
  return new_cart;
}
```

## 액션

- 액션은 암묵적인 입력 또는 출력을 가지고 있다.
- 계산의 정의에 따르면 계산은 암묵적인 입력이나 출력이 없어야 한다.
- 전역, 공유변수는 일반적으로 암묵적 입력 또는 출력이 된다.
- 암묵적 입력은 인자로 바꿔서 사용할 수 있다.
- 암묵적 출력은 리턴값으로 바꿀 수 있다.
- 함수형 원칙을 적용하면 액션은 줄어들고 계산은 늘어난다.
