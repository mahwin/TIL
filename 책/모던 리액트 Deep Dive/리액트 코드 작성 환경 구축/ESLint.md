## ESLint를 활용한 정적 코드 분석

정적 코드 분석이란 코드의 실행과는 별개로 코드 그 자체만으로 코드 스멜을 찾아내어 문제의 소지가 있는 코드를 사전에 수정하는 것을 의미한다.

### ESLint의 작동 방식

ESLint가 자바스크릡트 코드를 정적 분석해 잠재적인 문제를 찾아내는 방식은 다음과 같다.

1. 자바스크립트 코드를 문자열로 읽는다.
2. 자바스크립트 코드를 분석할 수 있는 파서로 코드를 구조화한다.
3. 2에서 구조화한 트리를 AST라 하며, 이 구조화된 트리를 기준으로 각종 규칙과 대조한다.
4. 규칙과 대조했을 때 이를 위반한 코드를 알리거나 수정한다.

ESlint는 추상 구문 트리를 만드는 파서로 espree를 기본값으로 사용한다. espree를 알아보자.

```javascript
function hello(str) {}
```

위의 코드를 JSON 형태로 구조화하면 다음과 같다.

```json
{
  "type": "Program",
  "start": 0,
  "end": 22,
  "range": [0, 22],
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 22,
      "range": [0, 22],
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 14,
        "range": [9, 14],
        "name": "hello"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 15,
          "end": 18,
          "range": [15, 18],
          "name": "str"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 20,
        "end": 22,
        "range": [20, 22],
        "body": []
      }
    }
  ],
  "sourceType": "module"
}
```

단순한 자바스크립트 코드임에도 JSON으로 생성한 추상 구문 트리에는 다양한 정보가 담겨 있다. 변수인지, 함수인지, 함수명은 무엇인지 뿐만 아니라 코드의 정확한 위치와 같은 아주 세세한 정보를 담고 있기에 ESLint는 이러한 정보를 바탕으로 코드를 분석한다.

> 타입스크립트도 @typescript-eslint/typescript-estree라고 하는 espree 기반 파서를 이용하고 있다.

### ESLint의 규칙

ESLint는 다양한 규칙을 제공한다. 특정한 규칙의 모음을 plugins라고 한다. 예를 들어 debugger의 사용을 금지하고 싶다고 가정해보자. debugger는 코드 개발 과정에서만 사용해야 하는 구문으로, 프로덕션 애플리케이션에서는 절대 존재하서는 안 되는 구문이다.

debugger를 espree로 분석하면 다음과 같다.

```json
{
  "type": "Program",
  "body": [{ "type": "DebuggerStatement" },"range":[0,8]],
  "sourceType":"module",
  "range":[0,8],
}
```

body의 type이 DebuggerStatement인 것을 확인할 수 있다. debugger 사용을 제한하는 규칙인 no-debugger는 다음과 같다.

```javascript

modlue.exports = {
  meta:{
    type:"problem",
    docs:{
      description:'Disallow the use of `debugger`',
      recommended:true,
      url:"https://eslint.org/docs/rules/no-debugger"
    },
    fixable:null,
    schema:[],
    messages:{
      unexpected:'Unexpected `debugger` statement.'
    }
  }
  create(context){
    return {
      DebuggerStatement(node){
        context.report({
          node,
          messageId:'unexpected'
        });
      }
    };
  }
}
```

먼저 meta는 해당 규칙과 관련된 메타 정보를 나타낸다. messages는 규칙을 어겼을 때 반환하는 경고 문구이다. 문서화에 필요한 정보인 docs, eslint --fix로 수정했을 때 수정 가능한지 여부를 나타내는 fixable 등이 포함된다.

실제 코드에서 문제점을 확인하는 곳은 create이다. create에 있는 함수는 espree로 만들어진 추상 구문 트리를 실제로 순회해, 여기서 선언한 특정 조건을 만족하는 코드를 찾고, 이러한 작업을 코드 전체에서 반복한다.

### eslint-plugin과 eslint-config

eslint-plugin과 eslint-config는 모두 Eslint와 관련된 패키지지만 각각의 역할이 다르다.

#### `eslint-plugin`

eslint-plugin이라는 접두사로 시작하는 플러그인은 앞서 언급했던 규칙을 모아놓은 패키지다. eslint-plugin-import는 자바스크립트에서 다른 모듈을 볼러오는 Import와 관련된 다양한 규칙을 제공한다.

#### `eslint-config`

eslint-plugin과는 달리 eslint-config는 ESLint 설정을 모아놓은 패키지다. eslint-config-airbnb는 Airbnb에서 사용하는 ESLint 설정을 모아놓은 패키지로, Airbnb의 코드 스타일을 따르는 데 사용된다.

eslint-plugin을 직접 설치하는 것도 좋지만, 검증된 eslint-config를 사용하는 것도 좋다.

유명한 config 몇개만 알아보자

#### `eslint-config-airbnb`

리액트 기반 프로젝트에 적용할 ESLint 중에서는 가장 합리적인 선택이될 수 있다.

#### `eslint-config-next`

Next.js 프레임워크를 사용하는 프로젝트에 적합한 ESLint 설정이다. 자바스크립트 코드를 정적으로 분석할 뿐만 아니라 페이지나 컴포넌트에서 반환하는 JSX 구문 및 \_app, \_document 파일도 대상으로 분석한다. 게다가 핵심 웹 지표라고 하는 웹 서비스 성능에 영향을 미칠 수 있는 요소들을 분석해 제공하는 기능도 포함돼 있다.

### 나만의 ESLint 규칙 만들기

#### 이미 존재하는 규칙을 커스터마이징해서 적용하기

1. import React를 제거하자

리액트 17 버전부터는 새로운 JSX 런타임 덕분에 import React 구문이 필요없다. 이에 따라 import React를 삭제하면 번들러의 크기를 줄일 수 있다.

import React는
/_ harmony import _/ var react**WEBPACK_IMPORTED_MODULE_0** = **webpack_require**(/_! react _/ "./node_modules/react/index.js");
로 변환되어 추가된다.

물론 사용되지 않는 코드라서 번들러의 트리 쉐이킹 과정에서 삭제되지만 트리 쉐이킹 과정을 줄이는 것도 의미있기에 import React는 빼는 것이 좋다.

no-restricted-imports를 이용하자.

```javascript
module.exports = {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react",
            importNames: ["default"],
            message:
              "리액트 17부터 더 이상 필요하지 않습니다. 필요한 경우 {}로 import 해주세요.",
          },
        ],
      },
    ],
  },
};
```

![스크린샷 2024-04-26 오전 11 21 17](https://gist.github.com/assets/78193416/f7cb4a5a-f207-4b82-97d8-34137a038f84)

내가 설정한 message가 잘 출력되는 것을 확인할 수 있다.

#### 완전히 새로운 규칙 만들기

1. new Date 금지

new Date()는 사용자의 로컬 시간을 기준으로 날짜를 생성한다. new Date()의 사용만 막고, new Date(16641612631)이나 new Date('2022-01-01')은 허용하고 싶다고 가정하자.

먼저 new Date()를 expree로 분석하자

```json
{
  "type": "Program",
  "start": 0,
  "end": 10,
  "range": [0, 10],
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 10,
      "range": [0, 10],
      "expression": {
        "type": "NewExpression",
        "start": 0,
        "end": 10,
        "range": [0, 10],
        "callee": {
          "type": "Identifier",
          "start": 4,
          "end": 8,
          "range": [4, 8],
          "name": "Date"
        },
        "arguments": []
      }
    }
  ],
  "sourceType": "module"
}
```

하나씩 읽어보자

- ExpressionStatement: 해당 코드의 표현식 전체를 나타냄.
- ExpressionStatement.expression: 어떤 표현이 있는 지 나타냄.
- ExpressionStatement.expression.type : 어떤 타입인지 나타내는데 현재는 NewExpression이다. 즉 new 생성자를 사용했다는 것을 알 수 있다.
- ExpressionStatement.expression.callee는 생성자를 표현한 표현식에서 생정자에 전달하는 인수를 나타낸낸다. 여기서는 인수가 없다.

new Date()를 금지하는 규칙을 만들어보자.

1. type은 NewExpression이어야 한다.
2. callee.name이 Date여야 한다.
3. ExpressionStatemenet.expression.arguments가 빈 배열이다.

```javascript
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "should not use new Date() replacement with ServerDate()",
      recommended: false,
    },

    fixable: "code",
    schema: [],
    messages: {
      notUseNewDateGetCurrentTime:
        "Don't use new Date(). Use ServerDate() instead",
    },
  },
  create: function (context) {
    return {
      NewExpression: function (node) {
        if (node.callee.name === "Date" && node.arguments.length === 0) {
          context.report({
            node,
            messageId: "notUseNewDateGetCurrentTime",
            fix: function (fixer) {
              return fixer.replaceText(node, "ServerDate()");
            },
          });
        }
      },
    };
  },
};
```

먼저 meta 필드에 해당 규칙과 관련된 정보를 넣는다. create 필드에 만들 함수는 항상 객체를 반환해야한다. 이 객체에서는 코드 스멜을 감지할 선택자나 이벤트명 등을 선언할 수 있다. 해당 설정에서는 NewExpression이라고 하는 타입의 선택자를 키로 선언해서 모든 new 가 실행될 때 호출되게 만들었다.
분기 조건을 걸어서 new Date()를 정확히 호출한 경우메만 context.report를 통해 해당 코드 스멜을 리포터한다. meta.messges에서 메시지 정보를 가져올 수 있다. fix 를 키로 하는 함수를 활용해 자동으로 수정하는 코드도 넣어줄 수 있다.

yo와 generate-eslint를 활용해 eslint-plugin을 만들어보자.

```base
npm i -g yo
npm i -g generator-eslint
```

![스크린샷 2024-04-26 오후 3 52 32](https://gist.github.com/assets/78193416/5bc69fad-5d1f-494e-ae93-acdc752ad583)

![스크린샷 2024-04-26 오후 3 53 11](https://gist.github.com/assets/78193416/27b7d811-3663-47ab-9991-c38686c51145)

위 처럼 설정을 하고 나면, 아래와 같은 형태의 프로젝트가 생긴다.

![스크린샷 2024-04-26 오후 3 56 15](https://gist.github.com/assets/78193416/c96a885f-e172-4ec2-a993-5606112bafbb)

rules/no-new-date.js에 아까 만들었던 규칙을 작성하자.

그리고 tests에 해당 ESLint 설정에 대한 테스트를 해볼 수 있다. new Date()만 에러고 나머지는 정상작동하는 지 확인해보자.

```javascript
const ruleTester = new RuleTester();
ruleTester.run("no-new-date", rule, {
  valid: [{ code: "new Date(1238123100)" }, { code: "new Date(2022-02-02)" }],

  invalid: [
    {
      code: "new Date()",
      errors: [{ message: rule.meta.messages.message }],
      output: "ServerDate()",
    },
  ],
});
```

![스크린샷 2024-04-26 오후 3 58 12](https://gist.github.com/assets/78193416/860189ef-256e-4331-b3fb-2a5556b21583)

## 주의할 점

ESlint는 유용하지만, 다른 도구들과 함께 사용할 떄 주의해야한다.

### Prettier와의 충돌

Prettier는 코드의 포매팅을 도와주는 도구다. ESLint와 마찬가지로 코드를 정적 분석해서 문제를 해결한다는 점은 동일하지만, 목표는 다르다. `ESLint는 코드의 잠재적인 문제가 될 수 있는 분석해` 준다면, `Prettier는 포매팅과 관련된 작업`을 담당한다.

자바스크립트만 정적 분석해주는 ESLint에 반해 Prettier는 HTML,CSS 마크다운, JSON 등 다양한 언어에도 적용 가능하다.

결국 충돌이 나는 상황은 둘 다 javascript를 대상으로 하는 경우다. ESLint는 코드 스멜을 찾아내는 도구이고, Prettier는 코드를 포매팅해주는 도구이다. ESLint에서도 Prettier처럼 들여쓰기, 줄바꿈, 따움표, 최대 글자 수 등을 처리할 수 있기 때문에 충돌이 발생할 수 있다.

### 해결 방법

서로 규칙이 충돌되지 않게끔 규칙을 잘 선언하는 것이다. Prettier에서 제공하는 규칙을 어기지 않도록, ESLint에서는 해당 규칙을 끄는 방법이다. 이 경우 코드에 ESLint를 적용하는 작업과 코드의 포매팅을 하는 작업이 서로 다른 패키지에서 발생하게 된다.

두 번째 방법은 자바스크립트나 타입스크립트는 ESLint에, 그 외의 파일은 모두 Prettier에 맡기는 것이다. 그 대신 자바스크립트에 추가적으로 필요한 Prettier 관련 규칙은 모두 eslint-plugin-prettier를 사용한다. eslint-plugin-prettier는 Pretter에서 제공하는 모든 규칙을 ESLinkt에서 사용할 수 있는 규칙으로 만들어둔 플러그인이다.

### ESLinkt 규칙에 대한 예외 처리

만약 일부 코드에서 특정 규칙을 임시로 제외시키고 싶다면 eslint-disable- 주석을 사용하면 된다. 특정 줄만 제외하거나, 특정 범위에 걸쳐 제외하는 것이 가능하다.

```javascript
// 특정 줄만 제외
console.log("hello world"); // eslint-disable-line no-console

// 다음 줄 제외
/* eslint-disable-next-line no-console */
console.log("hello world");

// 특정 범위
/* eslint-disable no-console */
console.log("hello world");
console.log("hello world");
/* eslint-disable no-console */

// 파일 전체

/* eslint-disable no-console */
console.log("hello world");
```

#### react-hooks/no-exhaustive-deps

useEffect나 useMemo와 같이 의존 배열이 필요한 훅에 의존성 배열을 제대로 선언했는지 확인하는 규칙이다. 보통은 []로 선언해서 마운트될 때만 실행되도록 하거나, 일부만 포함시켜서 작성하지만 이것은 위험한 발상이다.

`괜찮다고 임의로 판단해 의존성 배열 에러를 무시한 경우`
실제로 면밀히 검토해서 괜찮은 경우라면 해당 변수는 컴포넌트의 상태와 별개로 동작한다는 의미이다. 이 경우네느 해당 변수를 어디서 어떻게 선언할지 다시 고민해 봐야 한다. 정말로 괜찮다 하더라도 이러한 작업이 반복되면 정말로 괜찮지 않은 코드에서도 동일하게 사용해 버그를 야기할 위험이 있다.

`의존성 배열이 너무 긴 경우`
의존성 배열이 너무 긴 것은 useEffect 내부 함수가 너무 길다는 말과 동일하다. useEffect가 너무 길다면 useEffect를 쪼개서 의존성 배열의 가독성과 안정성을 확보해야 한다.

`마운트 시점에 한 번만 실행하고 싶은 경우`
가장 흔히 볼 수 있는 경우로, 의도적으로 []로 모든 의존성을 제거해 컴포넌트가 마운트되는 시점에만 실행하고 싶은 경우다. 먼저 이러한 접근 방법은 과거 클래스 컴포넌트에서 사용되던 생명주기 형태의 접근 방법으로, 함수 컴포넌트의 패러다임과 맞지 않는다. 또한 [] 배열로 있다는 것은 컴포넌트의 상태값과 별개의 부수 효과가 되어 컴포넌트의 상태와 불일치가 일어날 수 있게 된다. 마지막으로, `상태와 관계없이 한 번만 실행돼야 하는 것이 있다면 해당 컴포넌트에 존재할 필요없다.`

> 모든 규칙에는 존재 이유가 있다. 귀찮다고 disable하는 것이 아니라, 왜 해당 규칙이 존재하는지 이해하고 적절한 대응을 해야 한다.
