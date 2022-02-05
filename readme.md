# ToDo App

My Toy.

## JEST와 함께 ToDo List로 TEST 연습하기

### 단위 테스트 세팅

> 2022.02.05

테스트를 쉽게 진행할 수 있을 것이라고 생각했는데 전혀 그렇지 않았다. 내가 이해하기로 단위 테스트는 내가 테스트 하고자 하는 특정 함수를 테스트 하는 것을 알고 있었는데... jest에서 이상하게 export되지 않은 변수와 함수 모두를 불러와서 오류를 뿜어댔다.

일단 selector가 없는 새로운 자바스크립트 파일을 만들고 간단한 테스트를 했다.

```js
test("1", () => {
  expect(typeof randomNumber()).toBe("number");
});
```

randomNumber를 만드는 함수라 return type을 체크했다. 테스트가 통과한 것을 볼 수 있었다.

### 무엇을 테스트 해야할까?

당장 무엇을 테스트 해야할지 잘 모르겠다. 사실 [프론트엔드에서 TDD가 가능하다는 것을 보여드립니다.](https://www.youtube.com/watch?v=L1dtkLeIz-M)를 보고 그동안 하고 있던 고민을 한방에 해소해주는 듯한 영상이라 나의 테스트에 적용해보려고 했는데... 안된다. 이유를 찾아야한다.
