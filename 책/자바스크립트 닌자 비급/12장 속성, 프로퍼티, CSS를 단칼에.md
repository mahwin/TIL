# 12장 속성, 프로퍼티, CSS를 단칼에

자바스크립트는 브라우저 DOM과 섞어서 다룰 수밖에 없다.

DOM 속성과 프로퍼티는 많은 웹 페이지 개발자들에게 혼란을 안겨준다.

속성과 프로퍼티는 중요한 개념이다. 속성은 DOM을 어떻게 만들어낼 것인가에 대한 필수적인 할목이며, 프로퍼티는 런타임 동안 엘리먼트 정보를 저장해두는 주요 수단이자 해당 정보에 어떤 방식으로 접근해야 하는지를 나타낸다.
간단한 예제로 알아보자.

```html
<img src="old_img_path" />
<script type="text/javascript">
  const img = document.getElementsByTagName("img")[0];
  const newSrc = "/new_img_path";

  img.src = newSrc;
</script>
```

위의 코드를 살펴보자 img.src는 우리가 넣어준 new_img_path가 되어야할 것 같은데 실제로는 http://localhost/new_img_path가 된다.
또, getAttribute('src')를 사용하면 /new_img_path가 나온다.

이러한 일은 CSS와 스타일에서도 반복된다. 동적 웹 애플리케이션을 구축할 때 마주치는 많은 어려움은 스타일을 얻거나 설정할 때의 복잠함과 관련이 있다.

## 12.1 DOM 속성과 프로퍼티

엘리먼트의 속성 값에 접근할 떄, 두 가지 방식 중 하나를 선택할 수 있다. 전통적인 DOM 메서드인 getAttribute와 setAttribute를 사용하거나, 또는 접근하려는 속성과 대응하는 프로퍼티를 사용할 수 있다.

속성과 프로퍼티는 서로 연결되어 있지만, 같은 값을 공유하지는 않는다.

```js
const div = document.createElement("div");
div.id = "myDiv";
div.id === div.getAttribute("id"); // true
```

속성과 프로퍼티와 관련해서 살펴봐야 할 다섯 가지 중요한 부분이 있다.

- 크로스 브라우저와 관련한 이름 문제
- 이름 제약사항
- HTML과 XML의 차이
- 사용자 정의 속성의 작동 방식
- 성능

`크로스 브라우저 이름 문제`

브라우저 간 호환성은 프로퍼티 이름이 더 좋다.

예를 들어 class라는 속성은 대부분의 브라우저에서 class라는 이름을 사용하여 접근할 수 있지만, 인터넷 익스플로러에서는 속성 이름으로 className을 사용해야 한다.

`이름 제약사항`

속성 이름은 DOM 메서드에 전달하는 문자열이기 때문에 자유롭게 이름을 지을 수 있다. 하지만 프로퍼티 이름은 점 연산자 표기법을 사용하는 식별자로 간주되고, 자바스크립트의 식별자 규칙을 따라야 하기 때문에, 프로퍼티 이름 형식은 다소 제한된다. 그리고 몇몇 예약어는 프로퍼티 이름으로 사용할 수 없다.

ECMAScript 명세는 특정 키워드를 지정하고 있는데, 이 키워드들은 프로퍼티 이름으로 사용할 수 없기 때문에, 그 대안으로 다른 이름을 정의할 필요가 있다. 예를 들어 label의 for는 자바스크립트의 for와 겹치기 때문에 htmlFor가 된다.

| 속성 이름   | 프로퍼티 이름 |
| ----------- | ------------- |
| for         | htmlFor       |
| class       | className     |
| readonly    | readOnly      |
| maxlength   | maxLength     |
| cellspacing | cellSpacing   |
| rowspan     | rowSpan       |
| colspan     | colSpan       |

```js
const label = document.getElementsByTagName("label")[0];
label.htmlFor === label.getAttribute("for"); // true
```

`HTML과 XML의 차이`

pass

`사용자 정의 속성의 작동 방식`

엘리먼트가 가진 모든 속성이 프로퍼티로 표현되지는 않는다. 태생적으로 HTML DOM에 지정된 속성들은 프로퍼티로도 표현되지만, 엘리먼트에 임의로 지정한 사용자 정의 속성은 프로퍼티로 자동으로 표현되지 않는다.
이런 사용자 정의 속성 값에 접근하려면 DOM 메서드인 getAttribute와 setAttribute를 사용해야 한다.

- tip : data-접두어를 사용해서 사용자 정의 속성임을 확실히 하는 것이 좋다.

`성능`

일반적으로 프로퍼티 접근이 DOM 속성 메서드보다 빠르다. 그러니 프로퍼티로 접근할 수 있다면 프로퍼티를 없다면 DOM 메서드를 사용하자.

```js
const translations = {
  for: "htmlFor",
  class: "className",
  // 생략
};

window.attr = function (element, name, value) {
  const property = translations[name] || name;
  const propertyExists = typeof element[property] !== "undefined";

  if (typeof value !== "undefined") {
    if (propertyExists) {
      element[property] = value;
    } else {
      element.setAttribute(name, value);
    }
  }
  return propertyExists ? element[property] : element.getAttribute(name);
};

window.attr = function (element, name, value) {
  const property = translations[name] || name;
  const propertyExists = typeof element[property] !== "undefined";

  if (arguments.length === 3) {
    propertyExists
      ? (element[property] = value)
      : element.setAttribute(name, value);
  }

  return propertyExists ? element[property] : element.getAttribute(name);
};
```

아래가 내가 작성한 코드 value 값을 undefined으로 하고 싶다면 해당 코드는 setter인데도 getter가 호출된다. 그렇기에 직접 사용자가 입력을 했냐 안 했냐로 체크하기 위해 arguments를 사용했다.

### 12.2.2 URL 정규화

현대 브라우저는 URL을 나타내는 프로퍼티의 값을 읽으면, 원래 지정한 형태가 아닌 표준 형식의 URL로 자동으로 변경된 값을 반환한다.

### 12.2.3 style 속성

&lt;div style="color:red"&gt; &lt;/div&gt;

해당 엘리먼트의 style text 자체를 얻고 싶으면 어떻게 해야할까?

일반적으로 $el.style.color을 통해서 red 값을 얻을 수는 있지만 style 프로퍼티는 원본 문자열을 파싱한 결과를 가지고 있는 객체이기 때문에 그대로 얻기 힘들다.

cssText를 사용하면 스타일 원본 문자열을 얻을 수 있다.

나머지 내용 예전 내용이라 pass
