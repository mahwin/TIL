# HTML Tabular data

HTML 내에서 표를 나타낼 때 사용하는 요소들을 Tabular data라고 한다.

## HTML table 요소

표의 컨테이너이다. 내부에서 표를 나타내기 위한 요소들이 포함된다.

```html
<table>
  <caption>
    표의 제목
  </caption>
  <tr>
    <td>표의 셀</td>
    <td>표의 셀</td>
    <td>표의 셀</td>
  </tr>
  <tr>
    <td>표의 셀</td>
    <td>표의 셀</td>
    <td>표의 셀</td>
  </tr>
</table>
```

## HTML caption 요소

caption 요소는 table의 제목이나 설명을 나타낼 때 사용하는 요소이다.
caption은 필수는 아니지만, 가급적으로 넣어주는 것이 좋다.

```html
<table>
  <caption>
    <p>2024년 넷플릭스 업데이트 기대작</p>
  </caption>
  <tr>
    <td>제목</td>
    <td>작성일</td>
    <td>요약</td>
  </tr>

  <tr>
    <td>안녕 조제, 호랑이</td>
    <td>2024-04-29</td>
    <td>요약</td>
  </tr>
</table>
```

## HTML thead, tbody, tfoot

table 요소 내부에서 표의 구조를 나타내기 위해 사용하는 요소들이다.
tfoot은 테이블 전체를 정리하는 콘텐츠를 나타낼 때 사용한다.

```html
<table>
  <caption>
    Super Heros!
  </caption>
  <thead></thead>
  <tbody></tbody>
  <tfoot></tfoot>
</table>
```

## HTML colgroup, col 요소

TABLE 요소 내에서 여러 셀에 한번에 스타일을 넣고싶은 경우 사용한다.

```html
<style>
  .hero--name {
    width: 25%;
  }
  .real--name {
    width: 25%;
  }
  .hero--team {
    width: 50%;
  }
</style>
<table>
  <caption>
    Super Heros!
  </caption>
  <colgroup>
    <col class="hero--name" />
    <col class="real--name" />
    <col class="hero--team" />
  </colgroup>
  <thead></thead>
  <tbody></tbody>
</table>
```

COL 요소에서 SPAN 속성을 사용해서 여러 CELL에 같은 스타일을 부여할 수도 있다.

```html
<style>
  .hero--name {
    width: 25%;
  }
  .hero--team {
    width: 50%;
  }
</style>
<table>
  <caption>
    Super Heros!
  </caption>
  <colgroup>
    <col span="2" class="hero--name" />
    <col class="hero--team" />
  </colgroup>
  <thead></thead>
  <tbody></tbody>
</table>
```

## HTML tr, th, td 요소

th, td의 수는 항상 맞아야한다.
테이블의 병합은 rowspan이나 colspan 속성을 통해서 이루어진다.

```html
<table>
  <tr>
    <th>table header</th>
    <th>table header</th>
    <th>table header</th>
  </tr>
  <tr>
    <th>table header</th>
    <td>table data</td>
    <td>table data</td>
  </tr>
</table>
```

## HTML table의 용법

table은 표를 나타낼 때 사용한다.

- 게시판의 게시글 목록을 나타낼 때
- 회원가입 폼

```html
<table>
  <caption>
    회원가입
  </caption>
  <tr>
    <th>아이디</th>
    <td><input /></td>
  </tr>
</table>
```

단, table을 레이아웃을 구성하기 위해서 사용해서는 안 된다.

- 이메일 마크업을 해야할 경우엔 예외적으로 table을 사용한다.

```html
<table role="presentation"></table>
```

role 옵션을 사용해서 table이 presentation을 나타내는 것임을 알려줄 수 있다.
