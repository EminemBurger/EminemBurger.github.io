---
layout: post
title: react hook
image: react.png
date: 2021-02-20 23:08:20 +0200
tags:
categories: libraries
---

***
## **React Hook은 무엇인가요?**

오늘은 리액트의 주요기능인 리액트 훅에 대해서 알아보고자 한다. 리액트 훅은 기존에 클래스형 컴포넌트에서만 할 수 있었던 기능인, 상태값 관리, 컴포넌트의 생명주기 함수를 함수형 컴포넌트에서 사용할 수 있게 해주는 기능이다.

기존의 컴포넌트 생명주기 함수는 작성해야하는 코드도 많았고 가독성 또한 좋지 않았기에 리액트 훅을 사용하는 것을 권장한다.

***
## **Hook API**

기본 hook
* useState
* useEffect
* useContext

추가 hook
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeHandle
* useLayoutEffect   
* useDebugValue

***

## **useState**

![]({{site.baseurl}}/images/reacthook1.JPG)  
기존 class 컴포넌트에서 사용하던 this.state와 동일한 역활을 한다.
useState는 state 변수와 state를 업데이트하는 함수, 두 가지 쌍을 반환한다.
첫 번째 인자가 state 변수이고, 두 번째 인자는 state를 업데이트하는 함수이다.
두 번째 인자에 선언된 함수로 state 변수를 변경할 시, 렌더링이 다시 일어난다.

![]({{site.baseurl}}/images/reacthook2.JPG)  
다음과 같이 그대로 함수쓰듯이 사용하면 된다. 함수의 인자로 변경할 값을 전달해주면 해당 값으로 변경이 된다.

***
## **useEffect**

![]({{site.baseurl}}/images/reacthook3.JPG)  
useEffect는 기존 클래스 컴포넌트에서 사용되던 컴포넌트 생명주기 함수들, componentDidMount나 componentWillMount와 같은 함수들의 기능을 사용할 수 있게 해주는 함수이다. 렌더링되면서 effect, 함수가 실행된다. 두 번째 인자를 통해 특정한 상태가 update 되었을 때 effect가 실행되도록 설정할 수 있다. 검사할 값을 넣으면 해당 값이 update 되었을 때 effect가 실행된다.

위 사진은 두 번째 인자로 빈 배열을 전달해 componentDidMount만 실행되도록 하였다. 만약 배열을 생략한다면 리렌더링 될 때마다 실행된다. 

useEffect안에 return 문을 작성하면 cleanup함수로 사용된다. 언마운트 될 때만 cleanup 함수를 실행시키려면 두 번째 인자로 빈 배열을, 특정값이 update 되기 직전에 cleanup 함수를 실행하고 싶을 때, 두 번째 인자로 검사하고 싶은 값을 넣어준다.

두 번째 인자에 특정 값을 넣게 되면 컴포넌트가 처음 마운트 될 떄, 지정된 값이 바뀔 때, 언마운트 될 때, 값이 바뀌기 직전에 모두 호출된다.

useEffect 안에서 사용하는 상태나 props가 있다면, useEffect안의 두 번째 인자에 넣어주는 것이 규칙이다. 만약 넣지 않으면, 최신 상태값을 가리키지 않게 된다.

두 번째 인자를 생략하면 리렌더링 될 떄마다 실행된다.

***
## **useContext**

추후에 useContext를 사용해보고 완전히 이해하게 되면 작성하겠다.

***


### **Reference** 
https://medium.com/@dayong/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85-react-hooks-1-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%86%8C%EA%B0%9C-eb02161b3ce4  
https://bravenamme.github.io/2020/04/08/react-hook/  
https://hocheon.tistory.com/79  
https://xiubindev.tistory.com/100  


