## vitest를 알아보자

자바스크립트 진영에서 사용되는 테스트 프레임워크
vite.config.js에 테스팅에 관련된 설정을 추가할 수 있다.

```tsx
export default defineConfig({
  plugins: [react(), eslint({ exclude: ["/virtual:/**", "node_modules/**"] })],
  test: {
    globals: true, // => import 없이 vitest 관련 모듈을 사용할 수 있다.
    environment: "jsdom", // jsdom을 기반으로 테스트가 실행되도록 설정.
    setupFiles: "./src/utils/test/setupTests.js", // 나머지 테스트 관련된 설정을 해당 파일에 작성했다.
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
```

`it 함수`

- 테스트의 실행 단위로서 테스트 디스크립션, 기대 결과에 대한 코드를 작성
- it 함수는 test 함수의 alias로서 동일한 역할을 수행
  - 사용되는 맥락을 다르게 함으로 테스트 코드의 가독성을 높임
    - it은 should ~~~
    - test는 if ~~~
- 기대 결과와 실제 결과가 같다면 테스트는 성공적으로 통과

`단언(assertion)`

- 테스트가 통과하기 위한 조건을 기술하여 검증을 실행

`Matcher`

- 기대 결과를 검증하기 위해 사용되는 일종의 API 집합
- vitest에서는 다양한 기본 매처를 제공하며, 이를 `확장하여 단언을 실행`할 수 있다.

`describe`
테스트를 그룹화하는 역할을 한다. 원하는 테스트들을 그룹핑하여 독립적인 환경에서 테스트할 수 있게 돕는다.

### setup과 teardown

모든 테스트는 `독립적으로 실행`되어야 한다.
이를 가능하게 하기 위해 setup과 teardown이 있다.

`setup`
테스트를 실행하기 전 수행해야 하는 작업

- beforeAll : 모든 테스트가 실행되기 전 수행해야 하는 작업
- beforeEach : 각 테스트가 실행되기 전 수행해야 하는 작업

describe 블록 안에서 beforeEach를 사용하여 테스트 환경을 독립적으로 구성할 수 있다.

실행 순서는 `beforeAll -> beforeEach -> describe 안의 beforeEach` 순으로 실행된다.

`teardown`
테스트를 실행한 뒤 수행해야 하는 작업

- afterAll : 모든 테스트가 실행된 후 수행해야 하는 작업
- afterEach : 각 테스트가 실행된 후 수행해야 하는 작업
  - 테스트에 의해 변경된 상태를 초기화하는 용도

## Testing Library

UI 컴포넌트 테스트를 도와주는 라이브러리

특정 테스트 프레임워크에 종속되지 않고, 다양한 환경에서 사용할 수 있다.

UI 컴포넌트를 `사용자가 사용하는 방식`으로 테스트 하자라는 철학을 갖고 있다.

`사용자가 사용하는 방식` => DOM 노드를 쿼리(조회)하고, 사용자와 비슷한 방식으로 이벤트를 발생시키자.

## 단위 테스트의 대상

state나 로직처리 없이 UI만 그리는 컴포넌트는 검증하지 않는다.

- 해당 검증은 스토리북과 같은 도구를 통해 검증

간단한 로직 처리만 하는 컴포넌트는 상위 컴포넌트의 통합 테스트에서 검증한다.
공통 유틸 함수는 단위 테스트로 검증한다.

- 다른 모듈과의 의존성이 없다.
- 여러 곳에서 사용되기 때문에 검증을 통해 안정성을 높인다.

## 모킹이란

실제 모듈이나 객체와 동일한 동작을 하도록 만든 모의 모듈이나 객체로 실제를 대체하는 것.

vi.mock()를 사용해 특정 모듈을 모킹할 수 있다.

외부 모듈과 의존성을 모킹으로 테스트에서 제외하고, 필요한 부분만 분리하여 테스트할 수 있다.

- 외부 모듈의 테스트는 배제하자.

### 모킹 초기화

모킹된 객체를 초기화하여 다른 테스트에 영향을 주지 않도록 한다.
이를 위해 setup과 teardown을 사용한다.

vi.clearAllMocks(), vi.resetAllMocks(), v.restoreAllMocks()를 활용해서 초기화 할 수 있다.

```javascript
afterEach(() => {
  // 모킹된 모의 객체 호출에 대한 히스토리를 초기화
  // 모킹된 모듈의 구현 자체는 초기화되지 않는다.
  vi.clearAllMocks();
});

afterAll(() => {
  // 모킹 모듈에 대한 모든 구현을 초기화
  vi.resetAllMocks();
});
```
