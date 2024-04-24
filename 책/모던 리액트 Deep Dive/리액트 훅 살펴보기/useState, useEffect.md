## useState

함수 컴포넌트 내부에서 상태를 정의하고 관리할 수 있게 한다.

### useState 내부를 구현한 모습을 통해 알아보자

```javascript
const MyReact = function () {
  const global = {};
  let index = 0;

  function useState(initialState) {
    if (!global.states) {
      // 애플리케이션 전체의 states 배열을 초기화한다.
      // 최초 접근이ㅏㄹ면 빈 배열로

      global.states = [];
    }

    const currentState = global.states[index] || initialState;

    global.states[index] = currentState;

    const setState = (function () {
      let currentIndex = index;

      return function (value) {
        global.states[currentIndex] = value;
      };
    })();

    index += 1;
    console.log(global.states[index]);
    return [currentState, setState];
  }
  function MyComponent(){
    const [value,setValue] = useState(0);
  }
```

- global.states: 애플리케이션 전체에서 사용할 상태를 저장하는 배열
- index: useState가 호출될 때마다 증가하는 인덱스
  - useState를 호출할 때 마다 index를 증가된다.
- setState에서는 현재 index를 클로저로 가둬놔서 이후에도 계속 동일한 index에 접근할 수 있다.

## 게으른 초기화

일반적으로 useState는 기본값으로 원시값을 넣는 경우가 많지만 특정 함수를 인수로 넣어줄 수 있다. 이렇게 함수를 넘기는 것을 게이른 초기화라고 한다.

```javascript
const [v, setV] = useState(1 + 3);

// 게으른 초고화
const [lazyV, setLazyV] = useState(() => 1 + 3);
```

리액트 공식 문서에서는 게이른 초기화는 useState의 초깃값이 복잡하거나 계산 비용이 많이 드는 경우에 사용하라고 권장한다. 이 게이른 `초기화 함수는 오로지 state가 처음 만들어질 때만 사용되는 장점`이 있다.

## useEffect

많은 개발자들이 useEffect를 class 컴포넌트의 생명주기를 대체한다고 생각하지만 이는 잘못된 생각이다. useEffect는 애플리케이션 내 `컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘`이다.

useEffect는 두가지 인자를 받는다. 첫 인자로는 부수 효과를 만들어낼 함수를 넣고 두번째 인자로는 의존성 배열을 넣는다.

useEffect는 단순하게 state와 props의 변환 속에서 일어나는 렌더링 과정에서 실행되는 부수 효과 함수이다.

## 클린업 함수의 목적

useEffect가 첫 인자로 콜백 함수를 받는데, 이 함수 내에서 반환되는 함수를 클린업 함수라고 하며, 이벤트를 등록하고 지울 때 사용한다.

```javascript
import { useState, useEffect } from "react";

function App() {
  const [val, setVal] = useState(0);
  function handleClick() {
    setVal((prev) => prev + 1);
  }
  useEffect(() => {
    function addMouseEvent() {
      console.log(val);
    }
    window.addEventListener("click", addMouseEvent);
  }
  return ()=> {
    console.log('clean up',val);
    window.removeEventListener('click',addMouseEvent);
  }
  );
}
```

![스크린샷 2024-04-24 오후 2 14 04](https://gist.github.com/assets/78193416/bd39c827-5cfe-4197-b5bb-e276d025f30d)

흔히하는 착각으로 return 에 unmount 시에 실행되는 것이라고 생각하는데, 사실은 deps가 변경될 때마다 실행된다. 위 이미지를 보면 deos의 값이 변경될 때마다 실행되는 것을 확인할 수 있다.

함수 컴포넌트가 리렌더링됐을 때 의존성 변화가 있었을 당시 이전의 값을 기준으로 실행되는 개념이다.

## 의존성 배열

useEffect의 두번째 인자로 의존성 배열을 넣어주면 해당 배열의 값이 변할 때만 부수 효과 함수가 실행된다. 아무것도 넣지 않으면 랜더링이 일어날 때마다 실행된다.

그렇다면 useEffect 없이 사용해도 렌더링될 때마다 호출되니 상관없지 않을까?

```javascript
function Compo() {
  console.log("렌더링 진행");
}

function Compo() {
  useEffect(() => {
    console.log("렌더링 진행");
  });
}
```

위 코드는 같아보이지만 명백한 차이가 있다.

1. 서버사이드 관점에서 useEffect는 클라이언트 사이드에서 실행되는 것을 보장한다.
2. useEffect는 렌더링 직후에 실행되지만, 일반 함수는 렌더링 과정에서 실행된다.

### useEffect 내부를 구현한 모습을 통해 알아보자

```javascript
const MyCom = (function () {
  const global = {};
  let index = 0;
  function useEffect(cb, deps) {
    const hooks = global.hooks;

    let prevDeps = hooks[index];

    let isChanged = prevDeps
      ? deps.some((dep, i) => !Object.is(dep, prevDeps[i]))
      : true;

    if (isChanged) {
      cb();
      index++;
      hooks[index] = deps;
    }
  }
  return { useEffect };
})();
```

- Object.is: 는 값만 비교한다. 즉, useEffect의 디펜던시 값들의 얕은 비교만 진행한다.

### useEffect를 사용할 때 주의할 점

#### 의존성 배열에 빈 배열을 넣는 것은 주의해야 한다.

useEffect에 의존성 배열에 []를 넣는 행위는 보통 컴포넌트가 처음 마운트 될 때만 실행되는 효과를 낸다. useEffect의 목적은 컴포넌트가 렌더링될 때마다 실행되는 것이 아니라 특정 값이 변경됐을 때만 실행되는 것이다. 빈 배열은 관찰해서 실행하는 값과는 별개라는 것이다.

useEffect는 반드시 의존성 배열로 전달한 값이 변경에 의해 실행돼야 하는 훅이다.

빈 배열은 아니지만 특정 값의 변경 시점을 피할 목적이라면 메모이제이션을 적절히 활용해 보는 것을 권장한다.

#### 첫 번째 인수에 함수명을 부여하자

함수에 적절한 이름을 붙이면 왜 만들어졌는지 파악하기 쉽다.

#### 거대한 useEffect는 금지

useCallback과 useMemo 등으로 사전에 정제한 내용들만 useEffect에 담아두자

#### 불필요한 외부 함수를 만들지 말자

```javascript
const controllerRef = (useRef < AbortController) | (null > null);
const fecthInformation = useCallback(
  async (id: number) => {
    controllerRef.current?.abort() = new AbortController();
    controllerRef.current = new AbortController();

    const result = await fetchInfo(id,{signal:controllerRef.current.signal})
    setInfo(await result.json());
  },
  []
);

useEffect(()=>{
  fetchInformation(id);
  return ()=> controllerRef.current?.abort();
},[fetchInformation, id]);
```

```javascript
useEffect(() => {
  const controller = new AbortController();
  (async () => {
    const result = await fetchInfo(id, { signal: controller.signal });
    setInfo(await result.json());
  })();
  return () => controller.abort();
}, [id]);
```

이처럼 useEffect 내부에서 사용할 함수를 외부로 빼는 것은 불필요한 함수를 만들어낸다.

> 왜 useEffect의 콜백 인수로 비동기 함수를 바로 넣지 않는가?

비동기 함수는 항상 프로미스를 반환하한다. 하지만 useEffect의 첫 번째 함수의 리턴 값은 클린업 함수를 기대하기 때문에 aysnc 함수를 받기 보다는 내부적으로 즉시 실행 함수로 async를 사용하는 편이다.
