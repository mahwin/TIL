## useRef

```tsx
declare namespace React {
  ...
  function useRef<T>(initialValue: T): { current: T };
  function useRef<T>(initialValue: T | null): RefObject<T>;
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  ...
}
```

3가지 오버로딩이 있다. 파악하기 위해서는 RefObject와 MutalbleRefObject를 알아야 한다.

`RefObject`

```tsx
declare namespace React {
  interface RefObject<T> {
    readonly current: T | null;
  }
}
```

`MutalbleRefObject`

```tsx
declare namespace React {
  interface MutableRefObject<T> {
    current: T;
  }
}
```

큰 차이는 없어 보인다. 누가 더 넓은 타입일까?

RefObject는 유니온 이면서 readonly라서 더 넓은 타입이다.

useRef에 null을 인수로 제공하지 않으면 ref 속성에서 에러가 발생한다.

```tsx
const inputEl = useRef();

<input ref={inputEl} />;
```

> 'MutableRefObject<undefined>' 형식은 'LegacyRef<HTMLInputElement> | undefined' 형식에 할당할 수 없습니다.
> 'MutableRefObject<undefined>' 형식은 'RefObject<HTMLInputElement>' 형식에 할당할 수 없습니다.

    'current' 속성의 형식이 호환되지 않습니다.
      'undefined' 형식은 'HTMLInputElement | null' 형식에 할당할 수 없습니다.ts(2322)

해당 정보를 토대로 useRef에 아무것도 지정하지 않으면 MutableRefObject<undefined> 타입이라는 사실을 알 수 있다.

또, ref 속성의 인자로는 LegacyRef<HTMLInputElement> | undefined 타입이 필요하다.

LegacyRef를 타입을 확인하자.

```tsx
type LegacyRef<T> = string | Ref<T>;

type Ref<T> = RefCallback<T> | RefObject<T> | null;

type RefCallback<T> = {
  bivarianceHack(instance: T | null): void;
}["bivarianceHack"];

interface RefObject<T> {
  readonly current: T | null;
}
```

우리는 현재 MutableRefObject<undefined> 타입이 왜 LegacyRef<HTMLInputElement>에 할당할 수 없는지 알고 싶다.

LegacyRef<HTMLInputElement>를 구성하는 유니언 중에는 RefObject<HTMLInputElement>가 있다.

RefObject<HTMLInputElement>는 current는 readonly면서 HTMLInputElement | null만 할당할 수 있다. 그래서 MutableRefObject<undefined>는 할당할 수 없고 MutableRefObject<null>은 할당할 수 있다.

오버로딩 순서에 의해 null이 있으면 RefObject로 타입을 정해주고 없으면 MutableRefObject로 타입을 정해준다.

```tsx
declare namespace React {
  ...
  function useRef<T>(initialValue: T): { current: T };
  function useRef<T>(initialValue: T | null): RefObject<T>;
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  ...
}

const mutable = useRef<HTMLInputElement>();
const refObject = useRef<HTMLInputElement>(null);
```

## useEffect

```tsx
declare namespace React {
  ...
  function useEffect(effect: EffectCallback, deps?: DependencyList): void;

  type DependencyList = ReadonlyArray<unknown>;
  type EffectCallback = () => (void | Destructor);

  declare const UNDEFINED_VOID_ONLY : unique symbol;

  type Destructor = () => void | {[UNDEFINED_VOID_ONLY]:never}
  ...
}
```

- unique symbol은 고유한 symbol을 의미한다.

여기서 눈여겨 볼 점은 Destructor이다. Destructor의 반환 값은 void이거나 undefined만 반환할 수 있다.

단순히 () => void로 타입을 정의하면 반환 값을 무시하는 것이지 반환 값이 있는 경우에 에러를 던지지는 않는다.

```tsx
type Fn = () => void;

const fn: Fn = () => {
  return 1;
};

declare const Sym: unique symbol;

type CanNotReturnValue = () => void | { [Sym]: never };

const fn2: CanNotReturnValue = () => {
  return a; // Error
};
```

위의 CanNotReturnValue는 void | undefined으로 변환할 수 있다.
위처럼 명시한 이유는 strictNullChecks 옵션을 사용하면 void|undefined가 void로 변환되기 때문이다.

## useMemo, useCallback

```tsx
declare namespace React {
  ...
  function useCallback<T extends Function>(callback:T,deps: DependencyList):T
  function useMemo<T>(factory: () => T, deps: DependencyList|undefined): T;
  ...
}
```

useCallback에서 T extends Function라고 한 이유는 (...args:any)=>any로하면 집어넣는 콜백함수의 타이핑을 안 해도 되는 문제가 발생함. 그래서 T extends Function으로 제한을 둔 것이다.

deps? 가 아닌 DependencyList|undefined로 타입을 정의한 이유는 deps를 undefined이라고 반드시 집어넣어라는 의미.

useCallback을 직접 타이핑해보자.

```tsx
const onSubmitForm = useCallback((e) => {
  e.preventDefault();
  // 내부 로직
}, []);

const onChange = useCallback((e) => {
  // 내부 로직
},[])

const () => {
  <>
    <form onSubmit={onSubmitForm} />
    <input onChange={onChange} />
  </>
}
```

Dom 속성에 대해서 확인해보자.

```tsx
declare namespace React {
  ...
  interface DOMAttributes<T> {
    children?: ReactNode | undefined;
    dangerouslySetInnerHTML?: {
      __html: string;
    } | undefined;
    ...
    // Form Events
    onChange?: FormEventHandler<T> | undefined;
    onChangeCapture?: FormEventHandler<T> | undefined;
    onBeforeInput?: FormEventHandler<T> | undefined;
    onBeforeInputCapture?: FormEventHandler<T> | undefined;
    onInput?: FormEventHandler<T> | undefined;
    onInputCapture?: FormEventHandler<T> | undefined;
    onReset?: FormEventHandler<T> | undefined;
    onResetCapture?: FormEventHandler<T> | undefined;
    onSubmit?: FormEventHandler<T> | undefined;
    onSubmitCapture?: FormEventHandler<T> | undefined;
    onInvalid?: FormEventHandler<T> | undefined;
    onInvalidCapture?: FormEventHandler<T> | undefined;
    ...
  }

  ...
}
```

얻어낸 정보를 토대로 핸들러 함수를 타이핑하자

```tsx
const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback((e) => {
  e.preventDefault();
  // 내부 로직
}, []);

const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
  // 내부 로직
  e.target.value;
}, []);
```

## JSX 타입 이해하기

```tsx
declare global {
  namespace JSX {
    type ElementType = string | React.JSXElementConstructor<any>;
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface IntrinsicAttributes extends React.Attributes {}
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}

    interface IntrinsicElements {
      // HTML
      a: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >;
      form: React.DetailedHTMLProps<
        React.FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
      >;
      input: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      // SVG
      svg: React.SVGProps<SVGSVGElement>;
    }
  }
}
```

declare global은 모듈 파일 안에서 전역 타입을 만드는 선언 방식이다. declare global 안에 namespace JSX가 있으니 Import 없이 JSX.Element, JSX.IntrinsicElements를 사용할 수 있다.

사용했던 input, form은 JSX.IntrinsicElements.input, JSX.IntrinsicElements.form인 것을 알 수 있다.

이들은 React.DetailedHTMLProps으로 되어 있다.

`React.DetailedHTMLProps`

```tsx
declare namespace React {
  ...
  type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;
  ...
}
```

`React.HTMLAttributes`

```tsx
declare namespace React {
  ...
 interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // React-specific Attributes
        defaultChecked?: boolean | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
        suppressContentEditableWarning?: boolean | undefined;
        suppressHydrationWarning?: boolean | undefined;
        ...
  }
  ...
}
```

HTMLAttributes에는 HTML에서 사용할 수 있는 속성이 모여 있다. DOMAttributes와 AriaAttributes를 상속받아 사용한다.

DOMAttributes는 children, dangerouslySetInnerHTML와 같은 React 전용 속성과 onChange, onSubmit과 같은 DOM 이벤트를 담고 있다.

`React.ClassAttributes`

```tsx
declare namespace React {
  interface Attributes {
    key?: Key | null | undefined;
  }
  interface RefAttributes<T> extends Attributes {
    ref?: Ref<T> | undefined;
  }
  interface ClassAttributes<T> extends Attributes {
    ref?: LegacyRef<T> | undefined;
  }
}
```

ClassAttributes는 리액트 컴포넌트라면 속성으로 가질 수 있는 key와 ref를 가진다.

```tsx
type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;
```

React.DetailedHTMLProps는 HTMLAttributes를 제약으로 두고 있는 E와 ClassAttributes의 인터섹션이므로 E가 정확히 무엇이냐에 따라 form과 input의 속성이 정해진다.

FormHTMLAttributes와 InputHTMLAttributes를 확인해보자.

`FormHTMLAttributes`

```tsx
declare namespace React {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string | undefined;
    action?: string | undefined;
    autoComplete?: string | undefined;
    encType?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
    rel?: string | undefined;
  }
}
```
