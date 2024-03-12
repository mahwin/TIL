function createReactiveObject() {
  return new Proxy(
    {},
    {
      get(target, key) {
        return target[key];
      },
      set(target, key, value) {
        if (target[key] === undefined) {
          target[key] = value;
          return;
        }
        if (target[key] !== value) {
          console.log("변경 감지", `${target[key]} -> ${value}`);
          target[key] = value;
        }
      },
    }
  );
}

const reactiveObj = createReactiveObject();
reactiveObj.name = "a";
reactiveObj.name = "a";

reactiveObj.name = "b";
reactiveObj.name = "a";
