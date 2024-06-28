## 객체를 다루기 위한 고차 함수

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
let shirt = {
  name: "shirt",
  options: {
    color: "red",
    size: "M",
  },
};

function incrementSize(item) {
  const options = item.options;
  const size = options.size;
  const newSize = size + 1;
  const newOptions = objectSet(options, "size", newSize);
  const newItem = objectSet(item, "options", newOptions);
  return newItem;
}

function incrementSize(item) {
  return update(item, "options", (options) => {
    return update(options, "size", (size) => {
      return size + 1;
    });
  });
}
```

- 데이터가 중첩된 만큼 update를 호출해야 한다. 이를 해결하기 위해 nestedUpdate 함수를 만들어보자.ㄴ

```javascript
function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) {
    return modify(obj);
  }

  const [first, ...rest] = keys;
  return update(obj, first, (value) => nestedUpdate(value, rest, modify));
}
```

### 중첩된 구조를 설계할 때 주의할 점

깊이 중첩된 구조를 설계할 때 생각해야 하는 것이 있다. 깊이 중첩된 데이터에 nestedUpdate()를 쓰려면 긴 키 경로가 필요하다. 키 경로가 길면 중간 객체가 어떤 키를 가졌는지 기억하기 어렵다.

```javascript
httpGet("http://my-blog.com/api/category/blog", (blogCategory) => {
  renderCategory(
    nestedUpdate(blogCategory, ["posts", "12", "author", "name"], capitalize)
  );
});
```

블로그 API로 blog라는 분류에 있는 값을 JSON으로 가져와 콜백을 처리하는 코드이다. posts, id, author, name와 같은 중간 키들을 모두 기억하고 있어야할까? 이런 문제를 해결할 때 추상화 벽을 적용할 수 있다.

```javascript
function updatePostById(category, id, modify) {
  return nestedUpdate(category, ["posts", id], modify);
}

function updateAuthor(post, midify) {
  return update(post, "author", modify);
}
function capitalizeName(author) {
  return update(author, "name", capitalize);
}

updatePostById(blogCategory, "12", (post) => {
  return updateAuthor(post, capitalizeName);
});
```

### 고차함수 정리

1. 배열을 반복할 때 for 반복문 대신 사용하기
2. 중첩된 데이터를 효율적으로 다루기
3. 카피-온-라이트 원칙 적용하기
4. try/catch 로깅 규칙을 코드화하기
