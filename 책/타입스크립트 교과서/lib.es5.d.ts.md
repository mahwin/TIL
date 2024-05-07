## 3.0.0 `lib.es5.d.ts 분석하기`

lib.es5.d.ts에는 타입스크립트에서 기본적으로 제공하는 타입 선언이 모여 있다.

내장 Array 타입을 확인해보자

```tsx
interface Array<T> {
	find<S extends T>(predicate: (value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
  find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
	...
}
```

js는 배열의 속성도 버전에 따라 달라지기 때문에 배열을 타이핑할 때 사용하는 Array도 js 버전에 맞추고자 lib.es2015.iterable.d.ts 등의 파일에도 배열 타입이 선언되어 있다.

확장자 명이 ts가 아니고 `d.ts인 이유는 구현부는 없고 타입 선언`만 존재하기 때문이다.

### 3.1 `Partial, Required, Readonly, Pick, Record`

Partial, Required, Readonly, Pick, Record는 타입스크립트 공식 사이트의 Reference 중 Utility Types에서 매핑된 객체 타입을 사용하는 것만 추린 것이다.

`Partial`

기존 객체의 속성을 전부 옵셔널로 만드는 함수

```tsx
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type Result = MyPartial<{ a: string; b: number }>;
```

`Required`

- Partial과 반대로 모든 속성을 required로 만듬
- 옵셔널 속성을 requried로

```tsx
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};
```

- 옵셔널 속성을 제거하기

```tsx
type T = {
  a: string;
  b?: string;
};

const 그대로: { [K in keyof T]: string } = {
  a: "asdf", // a is required
};

const 옵셔널적용: { [K in keyof T]?: string } = {};

const 마이너스물음표연산자추가: { [K in keyof T]-?: string } = {
  a: "필수야",
  b: "필수야",
};
```

Readeonly 속성을 requried로

```tsx
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Readeonly 속성을 끄기

```tsx
type MyReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};
```

`Pick`

특정 속성만 뽑아내기

- K 로 넣어주는 타입이 꼭 T의 속성이여야 함

```tsx
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

- K extends keyof T
  - T의 객체 속성 중에 K에 포함되는 것

K로 넣어주는 타입이 꼭 T의 속성일 필요는 없는 타입

```tsx
type MyPickUpgrade<T, K> = {
  [P in K extends keyof T ? K : never]: T[P];
};
```

- K extends keyof T ? K : never
  - K가 유니온 타입이라면 분배법칙이 일어나고 T의 프로펄티 속성과
    - 일치하면
    - [P in K]:T[P]
    - 불일치하면
    - [P in never] 가 되어서 의미 없어짐
- K에 T에 해당하는 속성이 하나라도 없는 경우에 {} 타입이 리턴된다.

`Record`

모든 속성이 일치하는 객체 만들기

```tsx
type InCorrect<K extends keyof unknown, T> = {
  [P in K]: T;
};

type Correct<K extends keyof any, T> = {
  [P in K]: T;
};
```

- **`keyof unknown`**는 모든 가능한 프로퍼티 키의 집합을 나타내지 않고, 오히려 런타임에 무엇이든 될 수 있는 불확실한 상태를 나타내는 타입임. 그래서 ts 컴파일러는 알지 못 해서 쓸모 없어짐.
- keyof는 객체 타입의 프로퍼티 키(key)를 추출하는 데 사용되고 keyof any를 하면 모든 객체 타입의 key이기 때문에 string | number | symblo이 된다!

### 3.2 Exclude, Extract, Omit, NonNullable

분배법칙을 활용하는 타입들

`Exclude`

- 특정 타입에서 지정한 타입을 제거하는 타입

```tsx
type Exclude<T, U> = T extends U ? never : T;
```

`Extract`

- 특정 타입에서 지정한 타입만 추출하는 타입

```tsx
type Extract<T, U> = T extends U ? T : never;
```

`Omit`

- 특정 객체에서 지정한 속성을 제거하는 타입
- Pick 타입과 Exclude 타입을 조합해서 구현한다

```tsx
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyExclude<T, U> = T extends U ? T : never;

type MyOmit<O, K extends keyof any> = MyPick<O, MyExclude<keyof O, K>>;
```

- exclude로 객체 타입의 프로퍼티 중엔 K에 속하는 속성만 빼내고 Pick 타입으로 선택함.

`NonNullable`

- null과 undefined를 제거하는 타입

```tsx
type MyNonNullable1<T> = T extends null | undefined ? never : T;

type MyExclude<T,U> =  T extends U ?  T: never;
type MyNonNullable2<T> = MyExclude<MyExclude<T,null>,undefined>

⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
type MyNonNullable3<T> = T & {};
⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
```

- { } 객체는 null, undefined 빼고 다!

`Optional`

일부 속성만 옵셔널하게 만드는 코드

```tsx
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

- optional하게 할 속성을 제거한 객체 & optional하게 할 속성만 남기고 optional하게 한 객체
- <{’req’:123,’optional’:123 } ,’optional’>
- ’req’:123 & ’optional’? :123 ⇒ 원하는 값.

### 3.3 `Parameters, ConstructorParameters, ReturnType, InstanceType`

infer를 이용한 Utility Types들

```tsx
type MyParams <T extends (...args:any) => any>
= T extends (...args: infer P) => any ? P : never;

type MyConParms<T extends abstract new (...args:any) => any> any>
= T extends abstract new (...args: infer P) => any ? P : never;

type MyReturn<T extends (...args:any) => any>
= T extends  (...args:any)=> infer R ? R :any;

type MyInstanceReturn<T extends abstract new (...args:any) => any>
= T extends abstract new (...args: any) => infer R ? R : any
```

- (...args:any) => any 모든 종류의 함수
- abstract new (...args:any) => any 모든 종류의 생성자 함수

### 3.4 `ThisType`

메서드들에 this를 한 방에 주입하는타입

```tsx
type Coin = { name: string; amount: number };

type Methods = {
  addCoin(this: Coin & Methods): void;
  minusCoin(this: Coin & Methods): void;
};

type CoinWallet = {
  coin: Coin;
  methods: Methods;
};

const coinWallet: CoinWallet = {
  coin: {
    name: "bitcoin",
    amount: 3,
  },
  methods: {
    addCoin() {
      this.amount++;
    },
    minusCoin() {
      this.amount--;
    },
  },
};
```

- this.coin.amount로 접근하는 게 아니라 this에 타이핑을 Coin & Mehtods로 했기 때문에 this.amount로 속성에 접근, this.addCoin로 접근 가능하다.
- methods가 늘어난다면 this 타이핑하는 부분이 늘어날텐데 ThisType으로 해결 가능하다.

```tsx
type Coin = { name: string; amount: number };
type Methods = {
  addCoin(): void;
  minusCoin(): void;
};
type CoinWallet = {
  coin: Coin;
  methods: Methods & ThisType<Coin & Methods>;
};

const coinWallet: CoinWallet = {
  coin: {
    name: "bitcoin",
    amount: 3,
  },
  methods: {
    addCoin() {
      this.amount++;
    },
    minusCoin() {
      this.amount--;
    },
  },
};
```

### 3.5 `forEach 만들기`

myForEach를 만들어서 사용하자. lib.es5.d.ts에는 Array를 인터페이스로 만들어두었기 때문에 Array에 메소드를 추가할 수 있다.

```tsx
interface Array<T> {
	myForEach(cb:()=>void):void)
}

[1,2,3].myForEach(()=>{});
```

- forEach에 들어가는 인수 ( element, index,origin)
  ```tsx
  interface Array<T> {
  	myForEach(cb:(element:T,index:number,origin:T[])=>void):void);
  }
  ```
- 3가지 인수만 들어간다고 생각하겠지만 콜백함수에서 사용할 this를 직접 지정할 수도 있음.
  - forEach((el,index,origin)⇒{}, thisArg?:any)
  ```tsx
  interface Array<T> {
  	myForEach(cb:(element:T,index:number,origin:T[])=>void):void,thisArg?:any);
  }
  ```
  - lib.es5.d.ts의 타이핑 그대로 타이핑하면 this가 제대로 추론되지 않음. (ts는 완벽하지 않다)
  ```tsx
  interface Array<T> {
    myForEach<K = Window>(
      callback: (this: K, v: T, i: number, a: T[]) => void,
      thisArg?: K
    ): void;
  }
  ```
  - 다음과 같이 타이핑하면 this를 사용하지 않으면 this는 Window 타입이고 사용한다면 사용한 타입을 가르키게 된다.
  ```tsx
  [1, "2", false].myForEach(
    function () {
      this;
    },
    { a: "b", c: 123 }
  );
  // this가 제대로 추론됨 {'a':string,'c':number}
  ```

### 3.6 `map 만들기`

- 100% 정확하게 타이핑하는 것은 매우 어려운 일이다.
- `적당히 쓸 만하게 타이핑하는 것`이 중요하다

- forEach vs map의 차이
  - map은 같은 length를 가진 배열을 반환한다는 것.
  - 콜백함수가 리턴한 값이 배열의 요소라는 것

```tsx
interface Array<T> {
  myMap<R>(cb: () => R): R[];
}

[1, "2", false].myMap(function () {
  return false;
});
```

- params를 타이핑하자

```tsx
interface Array<T>{
	myMap<R>(cb:(element:T, index:number, originT[])=>R):R[];
}
```

- this도 타이핑하자

```tsx
interface Array<T> {
  myMap<R, K = Window>(
    cb: (this: K, element: T, index: number, origin: T[]) => R,
    thisArg?: K
  ): R[];
}
[1, "a", false].myMap(
  function (this) {
    return this;
  },
  { a: 123 }
);
```

### 3.7 `filter 만들기`

- forEach,map과 filter의 차이점.
  - truthy falsy 결과로 요소를 반환할 지 말지 정함.
  - 반환 하는 타입은 결과 요소의 타입의 배열임
  - 빈 배열일 수도 있음
  - 콜백 함수가 참이면 요소의 타입을 리턴함
  - value is 요소 타입으로 타이핑하면 됨.

```tsx
interface Array<T> {
  myFilter<S extends T>(
    cb: (element: T, index: number, origin: T[]) => element is S,
    thisArg?: any
  ): S[];
}

[1, 2, 3].myFilter((el) => el > 2);
```

- 🔥 Signature '(el: number): boolean' must be a type predicate.
- 콜백 함수가 타입 서술함수가 아니라는 에러가 발생함.
- 타입 서술 함수를 사용해도 에러가 발생하는 경우

  - 자바스크립트 코드를 그대로 사용할 수 없고 타입스크립트를 위해 변경해서 사용해야함.
  - 타입 서술 함수는 꼭 boolean을 반환해야 함.

  ```tsx
  [1, 2, 3].myFilter((v, i, a): v is never => {}); // XX
  [1, 2, 3].myFilter((v, i, a): v is never => false); // OO

  [{ num: 1 }, { num: 2 }, { num: 3 }].filter(function (
    v
  ): v is { num: number } {
    return v.num % 2;
  });
  [{ num: 1 }, { num: 2 }, { num: 3 }].filter(function (
    v
  ): v is { num: number } {
    return (v.num % 2) % 2 === 1;
  });
  ```

- 꼭 타입 서술 함수가 필요한 대상에만 서술 함수로 타이핑할 수 있을까?

  - 오버로딩 전

  ```tsx
  [1, 2, 3].myFilter((el) => el > 2); // => number[]로 잘 추론됨
  [1, 2, 3].myFilter((v, i, a) => {}); // => number[]로 잘 못 추론됨
  ```

  - 오버로딩 후
    - 콜백함수의 return 값이 항상 boolean일 필요는 없으니 unknown을 리턴함.

  ```tsx
  interface Array<T> {
    myFilter<S extends T>(
      cb: (element: T, index: number, origin: T[]) => element is S,
      thisArg?: any
    ): S[];
    myFilter(
      cb: (element: T, index: number, origin: T[]) => unknown,
      thisArg?: any
    ): T[];
  }

  [1, 2, 3].myFilter((el) => el > 2); // number[]로 잘 추론
  [1, 2, 3].myFilter((v, i, a): v is never => false); // never[]로 잘 추론
  ```

### 3.8 `reduce 만들기`

- reduce가 다른 고차함수와 다른점은 params가 4개 라는 것과 각각의 파라메타가 완전 다름.
- param1 : 누적값 param2: 현재값, param3: 인덱스, param4: 원본 배열
- 초기값이 있냐 없냐에 따라 달라짐
  - 초기값이 있으면 초기값의 타입이 리턴 타입이고
  - 초기값이 없다면 원본 배열의 요소가 리턴 타입임.
  - 초기값이 있을 때와 없을 때를 각각 오버로드해서 타이핑하자
  ```tsx
  interface Array<T> {
    // 초기값이 없을 때 원본 배열의 요소가 리턴 타입임.
    myReduce(cb: (a: T, b: T, c: number, d: T[]) => T, iv?: T): T;
    // 초기값이 있을 때
    myReduce<S>(cb: (a: S, b: T, c: number, d: T[]) => S, iv: S): S;
  }
  ```

### 3.9 `flat`

- ES2019에 추가된 배열 메소드
- 배열의 차원을 낮출 때 사용
- 파라미터로 number를 받으면 Number는 재귀적으로 몇 번까지 수행할 지를 나타냄

```tsx
[1, [2, [3, [4]]]].flat(4); => [1,2,3,4]
```

### 3.10 Promise, Awaited 타입 분석

```tsx
(async() => {
    const a = await Promise.resolve('123') // string
		const pAll = await Promise.all(['string',Promise.resolve(123)])// string|number
})()

(async()=>{
    const chain = await Promise.relove('string Start')
		.then(()=>123);
		.then(()=>true);
		.catch((err))=>{console.log(err)} // boolean | void
})();
```

`li.es2015.promise.d.ts`

```tsx
interface PromiseConstructor {
  readonly prototype: Promise<any>;

  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ): Promise<T>;

  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>;

  reject<T = never>(reason?: any): Promise<T>;

  resolve(): Promise<void>;

  resolve<T>(value: T): Promise<Awaited<T>>;

  resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
}

declare var Promise: PromiseConstructor;
```

- 기존 js에 있는 Promise 객체에 타입만 붙이기 위에 declare를 사용함.
- PromiseConstructor 인터페이스가 실제 Promise 객체의 타입이다.

```tsx
const str1 = Promise.resolve("promise");
// str1 => Primise<Awaited<string>>인데 Promise<string>으로
const str2 = await Promise.resolve("promise");
// str2 => Awaited<Primise<Awaited<string>>인데 string으로
export {};
```

- export {}
  - **"Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022',**
  - 최상위에서 await 표현식을 사용하는 것은 module 옵션이 es2022나 esnext로 설정된 경우에만 허용된다.
  - export { }를 붙이면 파일이 ES module로 취급된다.

`lib.es5.d.ts`

```tsx
// Awaited Type

type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F, ...args: infer_): any }
  ? F extends (value: infer V, ...args: infer _) => any
    ? Awaited<V>
    : never
  : T;
```

- 3번의 중첩 컨디셔널 타입

  1. T extends null | undefined ?
     - Awaited<null> ⇒ null // Awaited<undefined> =>undefined
  2. T extends object & { then(onfulfilled: infer F, ...args: infer\_):any} ?

     - T가 string, boolean, number이면 object가 아니기 때문에 그 타입이 그대로 리턴됨.
     - 객체여도 then(onfulfilled: infer F, ...args: infer\_):any를 만족해야함
       - 리턴 타입은 any니까 신경쓰지 말고
       - 결국 then 메서드를 가지고 있어야 하며…
       - 그냥 프로미스 객체는 { then(onfulfilled: infer F, ...args: infer\_) : any를 반드시 만족한다라고 생각하자.

     ```tsx
     interface Promise<T> {
       then<TResult1 = T, TResult2 = never>(
         onfulfilled?:
           | ((value: T) => TResult1 | PromiseLike<TResult1>)
           | undefined
           | null,
         onrejected?:
           | ((reason: any) => TResult2 | PromiseLike<TResult2>)
           | undefined
           | null
       ): Promise<TResult1 | TResult2>;
       catch<TResult = never>(
         onrejected?:
           | ((reason: any) => TResult | PromiseLike<TResult>)
           | undefined
           | null
       ): Promise<T | TResult>;
     }
     ```

  3. F extends ((value:infer V, ...args: infer \_) => any

     - 왜 infer를 두 번 연달아 할까?
       - F가 infer되면 다시 F가 extends ((value:infer V, ...args: infer \_) => any를 만족하는 지 체크함.

     ```tsx
     Promise.resolve("hi").then((data) => {
       data;
     });
     ```

     - Promise.resolve('hi')는 Promise<string>임
       - Promise 인스턴스를 리턴함
       - Promise 인스턴스는 then 메서드를 호출할 수 있음
       - then의 첫번째 매개변수 타입이 F임
       - F는 (data)⇒{data} 임.
       - 다시 F의 첫 매개변수 타입이 V고 V는 data 타입임.
