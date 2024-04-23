# 가상 DOM과 리액트 파이버

## 가상 DOM의 탄생 배경

웹 브라우저가 HTML을 렌더링하는 과정은 고비용 작업이다. 현대 앱들은 수많은 사용자 인터렉션이 존재하기 때문에 고비용인 DOM 조작을 어떻게 최적화할 것인가에 대한 고민이 필요하다.

DOM 요소는 레이아웃, 페인팅 과정을 통해 화면에 그려진다.

`레이아웃`은 브라우저 화면의 어느 좌표에 정확히 나타나야 하는지 계산하는 과정이다. 이후에는 반드시 페인팅 과정을 거치게 된다.

`페인팅`은 레이아웃 단계를 거친 노드에 색과 같은 실제 유효한 모습을 그리는 과정이다.

개발자 입장에서 하나의 인터렉션에 인행 생긴 DOM의 모든 변경 사항을 추적하는 것은 수고스러운 일이다. 대부분의 개발자는 DOM의 변경 사항을 추적하는 것보다는 결과적으로 만들어지는 DOM만 얻고 싶어할 것이다.

이러한 문제점을 해결하기 위해 가상 DOM이 등장했다. 가상 DOM은 react-dom이 관리하는 메모리 상의 DOM이다. 리액트는 변경 사항을 브라우저에 반영할 수 있을때 실제 DOM에 가상 DOM 내용을 반영한다.

여기서 중요한 사실은 가상 DOM을 이용하는 것이 대부분의 `어플리케이션을 구현할 수 있을 정도로 빠른 것`이지 무조건 빠른 것은 아니다.

## 가상 DOM을 위한 아키텍처, 리액트 파이버

### 리액트 파이버란?

리액트 파이버는 평범한 자바스크립트 객체이다. 파이버는 파이버 재조정자가 관리하는데, DOM과 가상 DOM을 비교해 변경 사항을 수집하며, 변경 사항이 있다면 변경을 요청한다.

리액트 파이버의 목표는 리액트 웹 애플리케이션에서 발생하는 애니메이션, 레이아웃, 그리고 사용자 인터렉션에 올바른 결과물을 만드는 반응성 문제를 해결하는 것이다. 이를 위해 파이버는 다음과 같은 일을 할 수 있다.

1. 작업을 작은 단위로 분할하고 쪼갠 다음, 우선순위를 매긴다.
2. 이러한 작업을 일시 중지하고 나중에 다시 시작할 수 있다.
3. 이전에 했던 작업을 다시 재사용하거나 필요하지 않은 경우에는 버릴 수 있다.

현재는 이 모든 작업이 `비동기 과정으로 일어난다.` 과거에는 스택으로 관리해 스택이 빌 때까지 작업을 처리했지만, 리액트 파이버는 이러한 작업을 비동기로 처리한다.

사용자 인터렉션에 따른 동시 다발적인 이벤트와 애니메이션은 다양한 작업을 처리하는 현대 웹 애플리케이션에서는 피할 수 없는 문제다. 리액트 파이버는 이러한 문제를 해결하기 위해 만들어졌다.

파이버는 하나의 작업 단위로 구성돼 있다. 리액트는 이러한 작업 단위를 하나씩 처리하고 finishedWork()라는 작업으로 마무리한다. 그리고 이 작업을 커밋해 실제 DOM에 가시적인 변경 사항을 만들어낸다. 렌더 단계와 커밋 단계에 대해서 알아보자.

1. 렌더 단계에서 리액트는 사용자에게 노출되지 않는 모든 비동기 작업을 수행한다. 그리고 이 `단계에서 앞서 언급한 파이버의 작업, 우선순위를 지정하거나 중지시키거나 버리는 등의 작업이 일어`난다.

2. 커밋 단계에서는 앞서 언급한 것처럼 DOM에 실제 변경 사항을 반영하기 위한 작업,commitWork()가 실행되는데, 이 과정은 동기식이며 중단될 수 없다.

#### 리액트 파이버의 실제 구현

```javascript
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber

  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
  // dlgk vmfhvkdlffj, __DEV__ 코드는 생략
}
```

단순한 자바스크립트 객체로 되어 있는 파이버는 가급적이면 재사용된다.

`리액트에 작성돼 있는 파이버를 생성하는 다양한 함수`

```javascript
var createFiber = function () {
  return new FiberNode();
};

function createFiberFromElement(element, mode, lanes) {
  var owner = null;
  {
    owner = element._owner;
  }
  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner,
    mode,
    lanes
  );

  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }
  return fiber;
}

function createFiberFromFragement(elements, mode, lanes, key) {
  var fiber = createFiber(Fragment, elements, key, mode);
  return fiber;
}
```

주요 속성을 살펴보자

- tag: 파이버는 하나의 element에 하나가 생성되는 1:1 관계를 가진다. 여기서 1:1 매칭된 정보를 가지는 것이 바로 tag다. 1:1로 연결된 것은 리액트 컴포넌트일 수도, HTML의 DOM거나 다른 것일 수도 있다.

- stateNode: 이 속성에서는 파이버 자체에 대한 참조 정보를 가지고 있다. 이 참조를 이용해서 리액트는 파이버와 관련된 상태에 접근한다.

- child, sibling, return: 파이버 간의 관계 개념을 나타내는 속성이다. 리액트 컴포넌트 트리가 형성되는 것과 동일하게 파이버도 트리 형식을 갖는데, 이 트리 형식을 구성하는 데 필요한 정보가 이 속성에 정의된다. 차이점은 children이 없고, child만 존재한다는 것이다.

예를 통해 알아보자

```html
<ul>
  <li>하나</li>
  <li>둘</li>
  <li>셋</li>
</ul>
```

파이버의 자식은 항상 첫 번째 자식의 참조로 구성된다. 다른 형제들은 sibling으로 구성되며 return은 부모 파이버를 의미한다.

```javascript
const l3 = {
  return: ul,
  index: 2,
};

const l2 = {
  sibling: l3,
  return: ul,
  index: 1,
};

const l1 = {
  sibling:l2
  return: ul,
  index: 0,
};

const ul = {
  // ...
  child:l1,
}

```

- index: 여러 형제들(sibling) 사이에서 자신의 인덱스를 표현한다.
- pendingProps: 아직 처리 못한 props를 의미한다.
- memoizedProps: 렌더링이 완료된 후의 props를 의미한다.
- updateQueue: 파이버에 대한 변경 사항을 저장하는 큐다.

updateQueue의 구조는 다음과 같다.

```typescript
type UpdateQueue = {
  first: Update | null;
  last: Update | null;
  hasForceUpdate: boolean;
  callbackList: null | Array<Callback>; // setState로 넘긴 콜백 목록
};
```

- memoizedState: 함수 컴포넌트의 훅 목록이 저장된다. 모든 훅 리스트가 저장된다.
- alternate: 반대편 트리 파이버를 가리킨다.

이렇게 생성된 파이버는 state가 변경되거나 생명주기 메서드가 실행되거나 DOM의 변경이 필요한 시점 등에 실행된다. 이러한 작업은 리액트가 직접 실행하기도 하고 스케줄링하기도 한다.

리액트 개발 팀은 리액트는 가상 DOM이 아닌 Value UI, 즉 값으로 UI를 표현하는 것이라고 말한다. `리액트의 핵심 원칙은 UI를 문자열, 숫자, 배열과 같은 값으로 관리하는 것이다.`

### 리액트 파이버 트리

리액트 내부에는 파이버 트리가 두 개 존재한다. 하나는 현재 모습을 담은 파이버 트리이고, 다른 하나는 작업 중인 상태를 나타내는 workInProgress 트리다. 리액트 파이버의 작업이 끝나면 리액트는 단순히 포인터만 변경해 workInProgress 트리를 현재 트리로 바꿔버리는데 이를 `더블 버퍼링`이라고 한다.

더블 버퍼링을 사용하는 이유는 작업 중인 상태를 렌더링하고 싶지 않아서 이다. 현재 UI 렌더링을 위해 존재하는 트리인 current를 기준으로 모든 작업이 시작된다. 만약에 업데이트가 발생하면 파이버는 리액트에서 새로 받은 데이터로 새로운 workInProgress 트리를 빌드하기 시작한다. 모든 작업이 끝나면 다음 렌더링에 이 트리를 사용하고, workInProgress는 current가 된다.

### 파이버의 작업 순서

1. 리액트는 beginWork() 함수를 실행해 파이버 작업을 수행하는데, 더 이상 자식이 없는 파이버를 만날 때까지 트리 형식으로 시작된다.

2. 1번에서 작업이 끝난다면 그다음 completeWork() 함수를 실행해 파이버 작업을 완료한다.
3. 형제가 있다면 형제로 넘어간다.
4. 2,3이 모두 끝났다면 return으로 돌아가 자신의 작업이 완료됐음을 알린다.

`예를 통해 알아보자`

```html
<A1>
  <B1> Hi~</B1>
  <B2>
    <C1>
      <D1 />
      <D2 />
    </C1>
  </B2>
</A1>
```

1. A1의 beginWork()가 수행된다.
2. A1의 자식인 B1으로 이동해 beginWork()를 수행한다.
3. B1은 자식이 없기에 completeWork()를 수행한다. 형제인 B2로 넘어감
4. B2의 beginWork()를 수행한다. 자식이 있으므로 C1로 이동
5. C1의 beginWork()를 수행한다. 자식이 있으므로 D1로 이동
6. D1의 beginWork()를 수행한다. 자식이 없으므로 completeWork()를 수행한다. 형제인 D2로 넘어감
7. D2의 beginWork()를 수행한다. 자식이 없으므로 completeWork()를 수행한다.
8. D1, C1, B2 순으로 올라가며 completeWork()를 수행한다.
9. B2에서 형제인 B3로 이동한다.
10. B3는 자식이 없기에 completeWork()를 수행한다.
11. A1로 돌아가 completeWork()를 수행한다.
12. A1이 완성되는 순간, 최종적으로 commitWork()가 수행되고 이 중에 변경 사항을 비교해 업데이트가 필요한 변경 사항이 DOM에 반영된다.

이렇게 만들어진 파이버 트리가 있다고 가정하고 setState로 인한 업데이트는 어떻게 처리할까?

setState가 호출되면 workInProgress 트리를 다시 빌드하기 시작한다. 기존 파이버에서 업데이트된 props를 반영하고, 변경이 완료되면 workInProgress 트리를 current 트리로 바꾼다.

예전에는 트리 업데이트 과정, 재귀적으로 하나의 트리를 순회해 새로운 트리를 만드는 작업은 동기식이고 중단될 수 없었다. 그러나 현재는 우선순위가 높은 다른 업데이트가 오면 현재 업데이트 작업을 일시 중단하거나 새롭게 만들거나, 폐기할 수도 있다.

가상 DOM과 리액트의 핵심은 브라우저가 DOM을 더욱 빠르게 반영하는 것이 아니라 값으로 UI를 표현할 수 있다는 것이다.
