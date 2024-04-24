## useLayoutEffect

useEffect와 시그니처가 동일한다. 차이점은 useLayoutEffect의 경우 모든 DOM의 변경 후에 동기적으로 발생한다는 것이다.

> 시그니처가 동일하다는 것은 사용 예시나 훅의 형태가 동일한 것을 의미한다.

여기서 DOM의 변경은 렌더링이지, 실제 브라우저에 반영하는 시점은 아니다. 실행 순서는 다음과 같다.

1. 리액트가 DOM을 업데이트
2. useLayoutEffect가 실행
3. 브라우저에 변경 사항을 반영
4. useEffect가 실행

언제 사용하는 것이 좋을까?

DOM을 그린 후에 스크롤 위치를 계산하는 등 화면에 DOM이 반영되기 전에 하고싶은 작업을 할 때 유용하다.

### useDebugValue

프로덕션 웹서비스에서 사용하는 훅은 아니다. 이 훅은 개발 과정에서만 사용되는데 디버깅을 도와주는 훅이다.

```javascript
import { useDebugValue, useState } from "react";

function useDate() {
  const date = new Date();
  useDebugValue(date, (date) => `현재 시간 : ${date.toISOString()}}`);
  return date;
}

export default function App() {
  const date = useDate();
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount((pre) => pre + 1);
  }
  return (
    <>
      <h1>
        {count} {date.toISOString()}
      </h1>
      <button onClick={handleClick}></button>
    </>
  );
}
```

useDebugValue는 두번째 인자로 함수를 받는데 이 함수는 디버깅 시에 사용된다. 이 함수는 첫번째 인자로 받은 값에 변경이 생기면 호출된다. 리액트 개발자 도구를 사용해서 해당 정보를 확인할 수 있다.

useDebugValue는 오직 다른 훅 내부에서만 실행할 수 있다. 만약 컴포넌트 레벨에서 실행한다면 작동하지 않는다. 공통 훅을 제공하는 라이브러리나 대규모 웹 애플리케이션에서 디버깅 관련 정보를 제공하고 싶을 때 유용하게 사용한다.
