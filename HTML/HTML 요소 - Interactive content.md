# HTML 요소 - Interactive content

기존에는 JavaScript를 활용해 구현해야했던 컴포넌트를 HTML 기본 요소로 구현할 수 있게 해준다.

## HTML details, summary 요소

- details 요소는 요약 내용과, 요약 내용을 상세히 보여주는 아코디언 형태의 UI를 제공할 때 사용하는 요소이다.
- summary 요소는 details 요소 내부에서 요약본을 보여주기 위해 사용하는 요소다.
- open 속성을 사용해 노출 상태를 정할 수 있습니다.
  `<details open>`

```html
<details id="details">
  <summary>파일 복사 중...</summary>
  <p>Image.jpg 복사 완료</p>
  <p>Image.png 복사 중...</p>
</details>
```

## HTML dialog 요소

dialog 요소는 브라우저 내부에서 노출시키는 dialog를 나타낼 때 사용한다.
modal 형태의 UI를 노출 시킬 때에도 사용하며, 반드시 JavaScript를 사용해야 한다.

```html
<button id="dialog-button" type="button">Dialog 열기</button>
<button id="close-button" type="button">Dialog 열기</button>
<dialog id="dialog">
  <p>다이알로그 창</p>
</dialog>
<script>
  const dialogOpenButton = document.querySelector("#dialog-button");

  const dialogCloseButton = document.querySelector("#close-button");
  const dialog = document.querySelector("#dialog");
  dialogOpenButton.addEventListener("click", () => {
    dialog.showModal();
  });

  dialogCloseButton.addEventListener("click", () => {
    dialog.close();
  });
</script>
```
