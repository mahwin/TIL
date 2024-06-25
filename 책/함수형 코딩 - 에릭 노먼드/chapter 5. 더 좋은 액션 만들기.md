## 비즈니스 요구 사항과 설계를 맞추기

액션에서 계산을 빼내는 리팩터링은 단순하고 기계적이다. 기계적인 리팩터링이 항상 최선의 구조를 만드는 것은 아니다. 좋은 구조로 바꾸는 것도 더 좋은 액션을 만드는 하나의 기법이다.

### 비즈니스 요구 사항과 설계를 맞추기

아래 코드는 무료 배송을 결정하는 코드이다. 비즈니스 요구 사항은 장바구니에 담긴 제품을 주문할 때 무료 배송인지 확인하는 것인데 제품의 합계와 가격으로 무료 배송을 확인하고 있다. 이것은 비즈니스 요구 사항에 맞지 않다.

```javascript
fucntion gets_free_shipping(total, item_price){
  return total + item_price >= 20;
}
```

요구 사항에 맞춰 변경하자.

```javascript
function gets_free_shipping(cart) {
  return calc_total(cart) >= 20;
}

function update_shpping_icons() {
  const buttons = get_buy_buttons_dom();
  for (const button of buttons) {
    const item = button.item;
    const new_cart = add_item_to_cart(item, shopping_cart);

    if (gets_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}
```

### 좋은 액션을 만들기 위한 원칙

### 암묵적 입력과 출력은 적을수록 좋다.

인자가 아닌 모든 입력은 암묵적 입력이고 리턴값이 아닌 모든 출력은 암묵적 출력이다. 액션에서 모든 암묵적 입력과 출력을 없앨 수는 없지만, 줄이는 것은 매우 바람직하다.

어떤 함수에 암묵적 입력과 출력이 있다면 다른 컴포넌트와 강하게 연결된 컴포넌트라고 할 수 있다. 다른 곳에서 사용할 수 없기 때문에 모듈이 아니다.

### 설계는 엉켜있는 코드를 푸는 것이다.

함수를 잘 분리하면 다음과 같은 효과를 얻을 수 있습니다.

1. 재사용하기 쉽다.

2. 유지보수하기 쉽다.

3. 테스트하기 쉽다.

#### add_item() 함수 더 좋은 설게로 바꾸기

```javascript
function add_item(cart, name, price) {
  const new_cart = cart.slice(); // 배열 복사
  new_cart.push({ name, price }); // item 객체 생성, 추가
}
return new_cart; // 복사본 리턴
```

- add_item 함수는 cart의 아이템 구조에 대해서도 알고 있어야 한다. 이를 분리해보자

```javascript
function add_item(cart, item) {
  const new_cart = cart.slice();
  new_cart.push(item);
}
return new_cart;

function make_cart_item(name, price) {
  return { name, price };
}

add_item(shopping_cart, make_cart_item("apple", 10));
```

### 카피-온-라이트 패턴 적용하기

add_item 함수는 크기가 작고 괜찮은 함수지만 일반적인 함수가 아니다. 이를 개선해보자

```javascript
function add_element_last(array, elem) {
  const new_array = array.slice();
  new_array.push(elem);
  return new_array;
}

function add_item(cart, item) {
  return add_element_last(cart, item);
}
```
