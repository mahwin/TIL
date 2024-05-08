## Axios 직접 타이핑하기

```tsx
interface Axios {}
declare const axios: Axios;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

(async () => {
  try {
    const res = await axios.get<Post>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(res.data.id);
    const res2 = await axios.post<Post>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    console.log(res2.data.id);
  } catch (e) {
    if (axios.isAxiosError<{ message: string }>(e)) {
      console.log(e.response?.data.message);
    }
  }
})();
```

get,post,IsAxiosError를 직접 타이핑하자.

```tsx
interface AxiosResponse {}

interface Axios {
  get<ResponseData>(utl: string): AxiosResponse;
  post<ResponseData>(utl: string, requestData: unknown): AxiosResponse;
  isAxiosError<ResponseData>(error: unknown): AxiosResponse;
}
```

- Interface는 이름이 같으면 자동 병합 가능하다.

axios로 서버가 보내주는 데이터는 항상 data라는 이름으로 오기 때문에 AxiosResponse에 data라는 이름으로 타입을 정의해준다.

```tsx
interface AxiosResponse<ResponseData> {
  data: ResponseData;
}

interface Axios {
  get<ResponseData>(utl: string): AxiosResponse<ResponseData>;
  post<ResponseData>(
    utl: string,
    requestData: unknown
  ): AxiosResponse<ResponseData>;
  isAxiosError<ResponseData>(error: unknown): AxiosResponse<ResponseData>;
}
```

isAxiosError라는 메서드에 서술함수로 타이핑하자. axios 에러 객체는 response에 data라는 이름으로 오기 때문에 AxiosError 타입을 하나 만들자.

```tsx
interface AxiosError<ResponseData> {
  response?: AxiosResponse<ResponseData>;
}

interface AxiosResponse<ResponseData> {
  data: ResponseData;
}

interface Axios {
  get<ResponseData>(utl: string): AxiosResponse<ResponseData>;
  post<ResponseData>(
    utl: string,
    requestData: unknown
  ): AxiosResponse<ResponseData>;
  isAxiosError<ResponseData>(
    error: unknown
  ): error is AxiosResponse<ResponseData>;
}
```

이제 new Axios()와 static으로 사용하는 경우를 타이핑하자

```tsx
// Axios 클래스

declare class CAxios {
  constructor();
  get<ResponseData>(utl: string): AxiosResponse<ResponseData>;
  post<ResponseData>(
    utl: string,
    requestData: unknown
  ): AxiosResponse<ResponseData>;
}
new CAxios().get("www.naver.com");

// Axios 인스턴스

interface Axios {
  <ResponseData>(config: Config): AxiosResponse<ResponseData>;
}
axios({ url: "www.naver.com", method: "get" });

// axios Static

interface Axios {
  create(): Axios;
}
axios.create().get("www.naver.com");
```

최종 타입

```tsx
interface AxiosError<ResponseData> {
  response?: AxiosResponse<ResponseData>;
}

interface AxiosResponse<ResponseData> {
  data: ResponseData;
}

declare class CAxios {
  constructor();
  get<ResponseData>(utl: string): AxiosResponse<ResponseData>;
  post<ResponseData>(
    utl: string,
    requestData: unknown
  ): AxiosResponse<ResponseData>;
}

interface Axios extends CAxios {
  <ResponseData>(config: Config): AxiosResponse<ResponseData>;
  isAxiosError<ResponseData>(error: unknown): error is AxiosError<ResponseData>;
  create(): Axios;
}
```
