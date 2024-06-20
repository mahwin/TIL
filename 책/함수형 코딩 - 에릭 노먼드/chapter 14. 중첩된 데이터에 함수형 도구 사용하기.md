### 함수형 도구 update

update는 객체를 다루는 함수형 도구이다.

```javascript
function update(obj, key, modify) {
  const value = obj[key];
  const newValue = modify(value);
  const newObj = objectSet(obj, key, newValue);
  return newObj;
}
```

다음과 같이 사용할 수 있다.

```javascript
function increateField(item, field) {
  return update(item, field, (n) => n + 1);
}
```

### 중첩된 객체 다루기

```javascript
function updateOption(item, option, modify) {
  return update(item, "options", (options) => update(options, option, modify));
}
```

### nestedUpdate

중첩된 객체의 값을 변경하는 함수

```javascript
function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) {
    return modify(obj);
  }

  const [first, ...rest] = keys;
  return update(obj, first, (value) => nestedUpdate(value, rest, modify));
}
```

### 고차함수 정리

1. 배열을 반복할 때 for 반복문 대신 사용하기
2. 중첩된 데이터를 효율적으로 다루기
3. 카피-온-라이트 원칙 적용하기
4. try/catch 로깅 규칙을 코드화하기
