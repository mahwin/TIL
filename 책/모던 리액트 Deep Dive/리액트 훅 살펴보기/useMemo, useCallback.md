## useMemo

useMomo는 비용이 큰 연산에 대한 결과를 메모이제이션하고, 해당 결과를 반환하는 훅이다. 첫 번째 인자로 콜백 함수를 받고, 두 번째 인자로 의존성 배열을 받는다. 의존성 배열에 있는 값이 변경될 때만 콜백 함수를 실행한다.

값 뿐만 아니라 컴포넌트도 가능하다.

```javascript
import { useState, useMemo, useEffect } from "react";

function ExpensiveComponent({ value }: { value: number }) {
  useEffect(() => {
    console.log("비싼 컴포넌트 렌더링");
  });
  return <span>{value + 1000}</span>;
}

function App() {
  const [value, setValue] = useState(10);
  const [_, triggerRendering] = useState(false);

  const MemoizedExpensiveComponent = useMemo(
    () => <ExpensiveComponent value={value} />,
    [value]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  function handleClick() {
    triggerRendering((pre) => !pre);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <button onClick={handleClick}>렌더링 발생!</button>
      {MemoizedExpensiveComponent}
    </>
  );
}

export default App;
```

하지만 React.memo를 사용하는 것이 더 현명하다.

## useCallback

useCallback은 인수로 넘겨받은 콜백 함수 자체를 기억한다.

```javascript
import { memo, useEffect, useState } from "react";

type Props = {
  value: boolean,
  name: string,
  onChange: () => void,
};

const ChildComponent = memo(({ value, name, onChange }: Props) => {
  useEffect(() => {
    console.log("rendering", name);
  });

  return (
    <>
      <h1>
        {name} {value ? "켜짐" : "꺼짐"}
        <button onClick={onChange}></button>
      </h1>
    </>
  );
});

export default function App() {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const toggle1 = () => {
    setState1(!state1);
  };

  const toggle2 = () => {
    setState2(!state2);
  };

  return (
    <>
      <ChildComponent name="1" value={state1} onChange={toggle1} />
      <ChildComponent name="2" value={state2} onChange={toggle2} />
    </>
  );
}
```

해당 예제의 경우 우리가 원하는 렌더링은 `state1`과 `state2`가 변경될 때만 발생하길 원한다. 하지만 state1, state2 둘 중 하나만 변경되어도 두 개의 Child 컴포넌트가 발생된다. 그 이유는 리렌더링과정에서 toggle 함수들이 재생성되고, 주소 값이 바뀌게 된다.

이를 방지하고자 useCallback을 사용한다.

```javascript
const toggle1 = useCallback(() => {
  setState1(!state1);
}, [state1]);
```

#### useCallback의 구현

일반적으로 useCallback은 useMemo를 사용해서 구현한다.

```javascript
function useCallback(cb, args) {
  currentHook = 8;
  return useMomo(() => cb, args);
}
```

useMemo와 useCallback의 차이점은 메모이제이션 대상이 값인지 함수인지 이다.

리액트에서는 불필요하게 코드가 길어지고 혼동을 야기할 수 있어 제공하는 것으로 보인다.

```javascript
const handleClick1 = useCallback(() => {
  setState1((prev) => !prev);
}, []);

const handleClick2 = useMemo(() => {
  return () => setState1((prev) => !prev);
}, []);
```
