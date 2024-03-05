## DI란?

- DI는 의존성 주입으로 메인 모듈이 직접 다른 하위 모듈에 대한 의존성을 주기보다는 중간에 의존성 주입자를 두어 의존성을 주입하는 방식을 말한다.

```js
class Developer {
  develop() {}
}

class BackendDeveloper extends Developer {
  develop() {
    this.writeJava();
  }

  writeJava() {
    console.log("writing java");
  }
}

class FrontendDeveloper extends Developer {
  develop() {
    this.writeJavascript();
  }

  writeJavascript() {
    console.log("writing javascript");
  }
}

class Project {
  constructor(developers) {
    this.developers = developers;
  }

  code() {
    this.developers.forEach((develop) => {
      develop.develop();
    });
  }
}

function main() {
  const developers = [];
  developers.push(new BackendDeveloper());
  developers.push(new BackendDeveloper());
  developers.push(new FrontendDeveloper());
  developers.push(new BackendDeveloper());
  developers.push(new BackendDeveloper());
  const project = new Project(developers);
  project.code();
}

main();
```

## DIP란?

- 의존성 주입을 할 때는 의존관계역전원칙이 적용된다.
  - 상위 모듈은 하위 모듈에 의존 해서는 안 된다. 둘 다 추상화에 의존해야 한다.
  - 추상화는 세부사항에 의존해서는 안 된다. 세부사항은 추상화에 의존해야 한다.

## 의존성 주입의 장점

- 외부에서 모듈을 생성하여 집어넣는 구조라 모듈들을 쉽게 교체할 수 있는 구조이다.
- 단위 테스팅과 마이그레이션이 쉽다.
- 모듈간의 결합도가 낮아진다.

## 의존성 주입의 단점

- 모듈이 더 생기기 때문에 복잡도가 증가한다.
- 의존성 주입이 컴파일이 아닌 런타임에 일어나기 때문에 의존성 주입 관련 에러를 찾기 어렵다.
