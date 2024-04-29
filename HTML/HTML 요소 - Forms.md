# HTML 요소 - Forms

유저의 입력을 받을 수 있는 몇 안 되는 요소 중 하나이다.
FROM 요소는 개별 엘리먼트의 사용도 중요하지만 Best Practice를 이해하는 것이 중요하다.

## HTML label, input 요소

label for, input의 Id를 일치 시켜서 링킹하는 것이 중요하다.

```html
<form>
  <div>
    <label for="uid">아이디</label>
    <input id="uid" type="text" />
  </div>
  <div>
    <label for="upw">비밀번호</label>
    <input id="upw" type="password" />
  </div>
  <div>
    <label for="utel">전화번호</label>
    <input id="utel" type="tel" />
  </div>
  <div>
    <label for="uaddr">주소</label>
    <input id="uaddr" type="text" />
  </div>
</form>
```

## HTML fieldset, legend 요소

form 내부에서 구역을 나눌 때 사용하는 요소들이다.

```html
<form>
  <fieldset>
    <legend>유저 정보</legend>
    <div>
      <label for="uid">아이디</label>
      <input id="uid" type="text" />
    </div>
    <div>
      <label for="upw">비밀번호</label>
      <input id="upw" type="password" />
    </div>
    <div>
      <label for="utel">전화번호</label>
      <input id="utel" type="tel" />
    </div>
  </fieldset>
  <fieldset>
    <legend>배달 정보</legend>
    <div>
      <label for="uaddr">주소</label>
      <input id="uaddr" type="text" />
    </div>
  </fieldset>
</form>
```

위 처럼 명시적으로 구역을 나눌 수 있다. legend가 안 쓰인다면 작성하고 hidden으로 가릴 수 있다!

## HTML button 요소

button의 기본 타입은 submit이다. submit 동작이 아닌 자바스크립트를 동작시키고자 한다면 button으로 변경해야 한다.

form 내부의 값을 리셋시키고자 한다면 reset 타입을 사용한다.

```html
<form>
  <fieldset>
    <legend>유저 정보</legend>
  </fieldset>
  <fieldset>
    <legend>배달 정보</legend>
  </fieldset>
  <button type="submit">주문하기</button>
</form>
```

## HTML radio, checkbox, textarea 요소

`radio` 여러 요소 중 하나를 선택해야 할 때 사용한다.

- name이 같아야 input들을 하나로 그루핑할 수 있다.

```html
<div>
  <h2>사이즈 선택</h2>
  <input type="radio" name="size" value="small" checked />
  <label for="small">스몰</label>
  <input type="radio" name="size" value="medium" />
  <label for="medium">미디움</label>
  <input type="radio" name="size" value="medium" />
  <label for="large">라지</label>
</div>
```

`checkbox` 여러 요소 중 여러개를 선택할 수 있다.

```html
<div>
  <h2>토핑 추가</h2>
  <input type="checkbox" id="cheese" name="topping" />
  <label for="cheese">치즈 추가</label>
  <input type="checkbox" id="tomato" name="topping" />
  <label for="tomato">토마토 추가</label>
  <input type="checkbox" id="mushroom" name="topping" />
  <label for="mushroom">버섯 추가</label>
</div>
```

`textarea` 여러 줄의 입력을 지원함

```html
<div>
  <label for="requirement">추가 요청 사항</label>
  <textarea id="requirement" />
</div>
```

### input의 autocomplete, required 속성

`autocomplete` 사용자가 입력한 내용을 기억하고 다음에 입력할 때 자동완성을 제공한다.

`required` 필수 입력 요소를 나타낸다.

```html
<form>
  <fieldset>
    <legend>유저 정보</legend>
    <div>
      <label for="uid">아이디</label>
      <input id="uid" type="text" autocomplete="username" />
    </div>
    <div>
      <label for="upw">비밀번호</label>
      <input id="upw" type="password" autocomplete="current-password" />
    </div>
    <div>
      <label for="utel">전화번호</label>
      <input id="utel" type="tel" />
    </div>
  </fieldset>
</form>
```
