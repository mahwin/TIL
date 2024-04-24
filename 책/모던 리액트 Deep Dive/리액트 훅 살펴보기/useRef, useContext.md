## useRef

useRef는 useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 공통점이 있다. useState와 구별되는 차이점은 두 가지이다.

- useRef는 반환값인 객체 내부에 있는 current로 값에 접근 또는 변경할 수 있다.
- `useRef는 그 값이 변하더라도 렌더링`을 발생시키지 않는다.

useRef가 렌더링을 일으키지 않는다면 외부에서 선언한 값과 뭐가 다를까

1. 컴포넌트가 여러개 선언 된다면 모두 같은 값을 참조하게 된다.
2. 컴포넌트가 렌더링 되지 않아도 컴포넌트 외부에서 선한한 값에 대한 메모리 소비가 생긴다.

일반적으로 useRef는 DOM에 접근하고 싶을 때 많이 사용한다.

```javascript
function RefComponent {
  const inputRef = useRef();

  console.log(inputRef.current);

  useEffect(() => {
    consolelog(input.current);
  },[inputRef]);

  return <input ref={inputRef} type="text" />
}

```

ref의 초기 값은 리턴 문에 할당한 DOM 요소가 아니라 넘겨받은 인수이다. 현재 코드에서는 undefined가 들어간다.

useRef를 이용해서 개발자가 렌더링을 원하지는 않지만 상태값을 저장하고 싶을때 사용할 수 있다.

```javascript
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function App() {
  const [counter, setCounter] = useState(0);
  const previousCounter = usePrevious(counter);

  function handleClick() {
    setCounter((pre) => pre + 1);
  }

  return (
    <button onClick={handleClick}>
      {counter} {previousCounter}
    </button>
  );
}
```

### useRef의 구현

```javascript
function useRef(initialValue) {
  currentHook = 5;
  return useMemo(() => ({ current: initialValue }), []);
}
```

렌더링에 영향을 미치면 안되기 때문에 {current:value}라는 형태의 객체로 되어 있다. 또, useMemo의 두번째 인자에 빈 배열을 넣음으로 항상 같은 객체를 리턴한다.

## useContext

### Context란

리액트 애플리케이션은 부모와 자식 컴포넌트가 트리 구조를 갖고 있기 때문에 부모 state를 자식에게 props 형태로 내려준다. 트리 구조가 복잡하다면 중간에 있는 컴포넌트들이 불필요하게 props를 받아야 하는 경우가 생긴다. 이런 경우 Context API를 사용하면 중간 컴포넌트들이 props를 받지 않고도 값을 사용할 수 있다.

### Context를 함수 컴포넌트에서 사용할 수 있게 해주는 useContext 훅

콘텍스트와 해당 콘텍스트를 함수 컴포넌트에서 사용할 수 있게 해주는 useContext는 다음과 같이 사용한다.

```typescript
const Context = createContext<{ hello: string } | undefined>(undefined);

function ParentComponent() {
  return (
    <Context.Provider value={{ hello: "react" }}>
      <Context.Provider value={{ hello: "jajajaja" }}>
        <ChildComponent />
      </Context.Provider>
    </Context.Provider>
  );
}

function ChildComponent() {
  const value = useContext(Context);
  return <>{value ? value.hello : ""}</>;
}
```

useContext는 상위 컴포넌트에서 만들어진 Context를 함수 컴포넌트에서 사용할 수 있도록 만들어진 훅이다. 상위 컴포넌트 <Context.Provider />에서 제공한 값을 사용하게 된다.

컴포넌트가 실핼될 때 이 콘텍스트가 존재하지 않아 예상치 못한 에러가 발생하곤 하는데 이를 방지하기 위해 useContext 내부에서 해당 콘텍스트가 존재하는 환경인지 확인하는 것이 좋다.

```typescript
import { createContext, useContext, PropsWithChildren } from "react";

const MyContext = createContext<{ name: string } | undefined>(undefined);

function ContextProvider({
  children,
  text,
}: PropsWithChildren<{ text: string }>) {
  return (
    <MyContext.Provider value={{ name: text }}>{children}</MyContext.Provider>
  );
}

function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error(
      "useMyContext는 ContextProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return context;
}

function Child() {
  // useMyContext가 타입이 명확하게 설정돼 있어서 undefined 체크하지 않아도 된다.
  // 해당 컴포넌트가 Provider 하위에 없다면 에러가 발생할 것이다.
  const { name } = useMyContext();
  return <>{name}</>;
}

export default function App() {
  return (
    <>
      {/* <Child /> */}
      <ContextProvider text="react">
        <Child />
      </ContextProvider>
    </>
  );
}
```

### useContext를 사용할 때 주의할 점

useContext를 함수 내부에서 사용한다는 것은 Provider에 의존성을 가지게 된다는 것을 의미한다. 이는 컴포넌트의 재사용성을 떨어뜨릴 수 있다. 그렇다고 최상위 컴포넌트에서 모든 Provider를 선언하는 것도 좋은 방법이 아니다. 불필요한 렌더링이 발생할 수 있기 때문이다.

컨텍스트가 미치는 범위는 필요한 환경에서 최대한 좁게 만들어야 한다.

> 콘텍스트와 useContext는 상태 관리를 위한 API가 아니다?????

상태 관리를 위한 api가 되기 위해서는 다음 두 가지 조건을 만족해야 한다.

- 어떠한 상태를 기반으로 다른 상태를 만들 수 있어야 한다.
- 필요에 따라 이러한 상태 변화를 최적화할 수 있어야 한다.

콘텍스트는 둘 중 어느 것도 하지 못한다. 단순히 props 값을 하위로 전달해 줄 뿐, useContext를 사용한다고 해서 렌더링이 최적화되지는 않는다. 쉽게 말하면 `콘텍스트와 useContext는 상태를 주입하기 위함이지 관리하기 위함`은 아니다.
