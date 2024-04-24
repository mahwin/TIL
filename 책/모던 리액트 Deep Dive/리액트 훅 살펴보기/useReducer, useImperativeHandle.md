## useReducer

useReducer는 useState와 비슷하지만, 좀 더 복잡한 상태 변경 로직을 적용하기에 적합하다.

useReducer()는 `state`와 `dispatcher를` 리턴하게 된다.

- `dispatcher`는 state를 업데이트 하는 함수로 action을 인자로 받는다.

useState와는 다르게 3개의 인자를 받는다.

- 첫번째 인자: reducer 함수로 action을 정의한 함수이다.
- 두번째 인자: 초기값
- 세번째 인자: 초기화 함수로 게으른 초기화가 일어난다. initialState를 인수로 세번 째 함수가 돌아간다.

```javascript
type State = {
  count: number,
};

type Action = { type: "up" | "down" | "reset", payload?: State };

function init(count: State): State {
  return count;
}

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "up":
      return { count: state.count + 1 };
    case "down":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload || { count: 0 });
    default:
      throw new Error("Unhandled action");
  }
}

function App() {
  const [state, dispatcher] = useReducer(reducer, initialState, init);

  function down() {
    dispatcher({ type: "down" });
  }

  function up() {
    dispatcher({ type: "up" });
  }

  function reset() {
    dispatcher({ type: "reset", payload: { count: 0 } });
  }
}
```

useReducer를 사용했을 때 얻게 되는 이점은 다음과 같다.

복잡한 형태의 state를 사전에 정의한 dispatcher로만 수정할 수 있게 만들어 state 값에 대한 접근은 컴포넌트에서만 가능하게 하고, 이를 업데이트하는 방법에 대한 상제 정의는 컴포넌트 밖에다 둔 당므, state의 업데이트를 미리 정의해 둔 dispatcher로만 제한하는 것이다.

=> state 값을 변경하는 시나리오를 제한적으로 두고 이에 대한 변경을 빠르게 확인할 수 있다.

#### useReducer와 useState 구현

useState는 useReducer로 구현할 수 있다.

```typescript
function useState(initialState) {
  currentHook = 1;
  return useReducer(invokeOrReturn, initialState);
}

function reducer(prevState, newState) {
  return typeof newState === "function" ? newState(prevState) : newState;
}

function init(initialArg) {
  return typeof initialArg === "function" ? initialArg() : initialArg;
}

function useState(initialState) {
  return useReducer(reducer, initialState, init);
}
```

useState와 useReducer는 세부 작동과 쓰임에만 차이가 있을 뿐, 클로저를 활용해 값을 캡쳐링해서 state를 관리하는 것은 똑같다.

## useImperativeHandle

자주 사용되지 않는 훅이지만 일부 사례에서 유용하게 활용될 수 있다.

### forwardRef

ref는 useRef에서 반환한 객체로, 리액트 컴포넌트의 props인 ref에 할당해 HTMLELement에 접근하는 용도로 흔히 사용된다. key와 마찬가지로 ref도 예약어다.

forwardRef는 ref를 자식 컴포넌트로 전달할 때 사용한다. 이는 명시적으로 ref를 전달하고 있음을 알게 해준다.

```typescript
const ChildComponent = forwardRef((props, ref) => {
  // 생략
});
```

### useImperativeHandle

useImperativeHandle은 부모에게서 받은 ref를 원하는 대로 수정할 수 있는 훅이다.

```typescript
import { useRef, forwardRef, useState, useImperativeHandle } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<{ alert: () => void }, InputProps>((props, ref) => {
  useImperativeHandle(ref, () => ({ alert: () => alert(props.value) }), [
    props.value,
  ]);

  return <input {...props} />;
});

export default function App() {
  const [text, setText] = useState("");
  const inputRef = useRef<{ alert: () => void }>(null);

  function handleClick() {
    if (inputRef.current === null) return;
    inputRef.current.alert();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <>
      <Input ref={inputRef} value={text} onChange={handleChange} />
      <button onClick={handleClick}>Focus</button>
    </>
  );
}
```

useImperativeHandle은 부모에게 전달된 ref를 자식 컴포넌트에서 사용할 수 있게 해준다.
