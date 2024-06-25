### 액션과 계산, 데이터는 어디에나 적용할 수 있다.

장보기 과정을 액션, 계산 데이터로 구분하자.

일반적인 프로그래머가 작성한 장보기 과정

![스크린샷 2024-06-25 오후 3 56 00](https://gist.github.com/assets/78193416/d5245170-b747-443d-af98-3eed7279b173)

액션을 분류해보자.

1. 냉장고 확인하기

냉장고를 확인하는 일은 확인하는 시점이 중요하기 때문에 액션이다. 냉장고가 가지고 있는 제품은 데이터이다.

2. 운전해서 상점으로 가기

운전해서 상점으로 가는 일은 운전하는 시점이 중요하기 때문에 액션이다.

3. 필요한 것 구입하기

구입하는 일도 액션이다. 구입하는 시점이 중요하기 때문이다. 좀 더 세분화하면 다음과 같다.

![스크린샷 2024-06-25 오후 4 00 14](https://gist.github.com/assets/78193416/41793720-d5a2-4365-a5c7-3f46972ba185)

정리하면 다음과 같다.

![스크린샷 2024-06-25 오후 4 01 06](https://gist.github.com/assets/78193416/8335c5fc-665f-46b7-be63-eebced3b184e)

### 이메일로 쿠폰 보내는 서비스에 함수형 사고 적용하기

이메일로 쿠폰을 보내는 서비스를 만들어보자. 친구 10명을 추천하면 더 좋은 쿠폰을 보내주려고 한다.

이메일 db에는 이메일별로 각 사용자가 추천한 친구의 수가 저장되어 있다. 또, 쿠폰 데이터베이스 테이블에는 쿠폰과 그 쿠폰의 등급이 저장되어 있다.

![스크린샷 2024-06-25 오후 4 10 45](https://gist.github.com/assets/78193416/9c6a62cb-a1d4-4b7a-a68e-83d5857b6aff)

쿠폰 보내는 과정은 다음과 같다.

1. 데이터베이스에서 구독자를 가져오기
   - db에서 구독자 가져오기는 액션이고 가져온 정보는 데이터이다.
2. 데이터베이스에서 쿠폰 목록 가져오기
   - db에서 쿠폰 목록 가져오기는 액션이고 가져온 정보는 데이터이다.
3. 쿠폰 보낼 이메일 목록 만들기
   - 이메일 목록 만들기는 계산이고 만들어진 목록은 데이터이다.
4. 목록 기반으로 이메일 전송하기
   - 이메일 전송하기는 액션이다.

유저 정보를 기반으로 발행할 쿠폰을 정하는 함수를 만들어보자.

```javascript
function subCouponRank(subscriber) {
  return subscriber.rec_count >= 10 ? "best" : "good";
}
```

쿠폰을 선택하는 함수를 만들자.

```javascript
function selectCouponsByRank(coupons, rank) {
  const result = [];

  for (const coupon of coupons) {
    if (coupon.rank === rank) {
      result.push(coupon);
    }
  }
  return result;
}
```

구독자가 받을 이메일을 계획하는 함수

```javascript
function emailForSubscriber(subscriber, goods, bests) {
  if (rank === "best")
    return {
      from: "쿠폰",
      to: subscriber.email,
      subject: "감사합니다. 우수 고객 대상 쿠폰입니다.",
      body: "best coupons: " + bests.join(", "),
    };
  else
    return {
      from: "쿠폰",
      to: subscriber.email,
      subject: "감사합니다. 좋은 고객 대상 쿠폰입니다.",
      body: "good coupons: " + goods.join(", "),
    };
}
```

보낼 이메일 목록을 준비하는 함수

```javascript
function emailsForSubscribers(subscribers, goods, bests) {
  const emails = [];
  for (const subscriber of subscribers) {
    const email = emailForSubscriber(subscriber, goods, bests);
    emails.push(email);
  }
  return emails;
}
```

조합해서 이메일 보내기

```javascript
function sendIssue() {
  const coupons = fetchCouponsFromDB();
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  const subscribers = fetchSubscribersFromDB();
  const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);
  for (const email of emails) {
    sendEmail(email);
  }
}
```

### 이미 존재하는 코드에 함수형 사고 적용하기

아래 코드는 자회사에 수수료를 보내기 위해 만든 코드이다. sendPayout 함수는 실제 은행 계좌로 송금하는 액션이다.

```javascript
function figurePayout(affiliate) {
  const owed = affiliate.sales * affiliate.commission;
  if (owed > 100) sendPayout(affiliate.bank_code, owed);
}

function affiliatePayouts(affiliates) {
  for (const affiliate of affiliates) {
    figurePayout(affiliate);
  }
}

function main(affiliates) {
  affiliatePayouts(affiliates);
}
```

### 액션은 코드 전체로 퍼진다.

액션을 부르는 함수가 있다면 그 함수도 액션이 된다. 또 그 함수를 부르는 함수도 액션이 되기 때문에 위의 코드는 모두 다 액션이 된다. 함수형 프로그래머는 액션을 가능한 사용하지 않으려고 한다. 액션을 쓰는 순간 코드 전체로 퍼져나가기 때문이다.

함수형 프로그래머는 액션을 관리하는 방법을 배워야한다.

자바스크립트에서 발생할 수 있는 액션은 다음과 같다.

1. 함수 호출
   - alert
2. 메서드 호출
   - console.log
3. 생성자
   - new Date
4. 표현식
   - 변수 참조
   - 속성 참조
   - 배열 참조
5. 상태
   - 공유하기 위해 값을 할당했고 변경 가능한 변수라면 다른 코드에 영향을 주기 때문에 액션이다.

액션을 찾기 위해 액션 코드를 모두 찾을 필요는 없다. 단지 코드가 호출 시점이나 횟수에 의존하는지 생각해보면 된다.

### 액션에 대해 자세히 알아보기

액션은 외부 세계에 영향을 주거나 받는 것을 말한다. 그리고 액션은 실행 시점과 횟수에 의존한다.

1. 언제 실행되는지 - 순서
2. 얼마나 실행되는지 - 반복

액션은 사용하기 어렵지만, 액션은 우리가 소프트웨어를 실행하려는 가장 중요한 이유이다. 액션을 잘 사용하기 위한 방법은 아래와 같다.

1. 가능한 액션을 적게 사용한다.
2. 액션은 가능한 작게 만든다.
3. 액션이 외부 세계와 상호작용하는 것을 제한할 수 있다.

- ex) 어니언 아키넥처

4. 액션이 호출 시점에 의존하는 것을 제한한다.
   - 액션이 호출 시점과 횟수에 덜 의존하도록 만드는 기법을 적용할 수 있다.

### 정리

- 함수형 프로그래머는 액션과 계산, 데이터를 구분한다.
- 액션은 실행 시점이나 횟수에 의존한다. 일반적으로 액션은 외부 세계에 영향을 주거나 받는다.
- 계산은 입렵값으로 출력값을 만드는 것이다.
- 데이터는 이벤트에 대한 사실이다.
- 함수형 프로그래머는 액션보다 게산을 좋아하고 계산보다 데이터를 좋아한다.
