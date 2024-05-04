## map

```javascript
const pruducts = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const map = (f, iter) => {
  let names = [];
  for (const item of iter) {
    names.push(f(item));
  }
  return names;
};

map((item) => item.name, products);
```

## map 함수는 이터러블 프로토콜을 따르기 때문에 다형성을 가진다.

```javascript
document.querySelectorAll("*").map((node) => node.nodeName); // map 함수가 없다고 나옴.
```

- 이유는 querySelectorAll이 이터러블 프로토콜을 따르지 않기 때문이다.
- Array를 상속 받은 객체가 아니라 프로토타입에 map 함수가 없기 대문.

```javascript
map((el) => el.nodeName, doucment.querySelectorAll("*")); // 이렇게 사용하면 된다.
```

우리는 모든 값들을 제네레이터를 이용해 이터러블 프로토콜을 따르게 만들어 수 있다. 또, 이터러블 프로토콜을 따르면 map 함수를 사용할 수 있기 때문에 자바스크립트의 모든 값들을 map 함수에서 사용할 수 있다.

## filter

```javascript
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return [...res];
};

filter((item) => item.price < 20000, products);
```

## reduce

```javascript
const reduce = (f, acc, iter) => {
  // 초깃값 acc가 없을 때 iter의 첫 value를 acc로 사용한다.
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
const totalPrice = reduce((acc, product) => acc + product.price, 0, products);
```

## map, filter, reduce를 중첩해서 사용하기

```javascript
const pruducts = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];
```

20000원 이하인 상품의 가격의 총합 구하기

```javascript
reduce(
  (a, b) => a + b,
  map(
    (p) => p.price,
    filter((p) => p.price <= 20000, pruducts)
  )
);
```
