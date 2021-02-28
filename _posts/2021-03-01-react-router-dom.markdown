---
layout: post
title: react router dom
image: react.png
date: 2021-03-01 23:08:20 +0200
tags:
categories: libraries
---

***

## **React Router Dom 설치 및 사용법**

리액트 라우터는 리액트의 서드파티 라이브러리로 화면전환을 도와주는 역활을 한다. 기존에는 a태그를 
이용해 다른 페이지로 이동하고 화면 전체를 새로 고침했어야 됬지만, 리액트는 Single Page Application으로
 HTMl파일을 생성하는 것이 아니라, 1개의 HTMl 파일을 제어하여 컨텐츠 부분을 교체한다. 리액트 라우터 없이도
 화면전환을 할 수 있지만, 그럼에도 사용하는 이유는 사용자에게 새로고침, 뒤로가기, 즐겨찾기 등의 기능을 제공하기
 위함이다. 리액트 라우터는 페이지가 존재하는 것이 아니라 이동하는 것처럼 흉내낼 뿐이다.
{% highlight js %}

    npm install --save-dev react-router-dom

{% endhilight %}  
![]({{site.baseurl}}/images/react-router-dom1.jpg)  
최상단 App 컴포넌트를 BrowserRouter 혹은 HashRouter로 감싸주어야 react-router-dom 기능을 사용할 수 있다.
HashRouter는 지원되는 브라우저 버전도 오래됬고 현업에 사용하지 않는 추세이니 BrowserRouter를 사용하는 것을 권장한다.

**BrowserRouter**  
* HTML5의 history API를 활용해서 UI를 업데이트 한다. (history, location 객체 사용가능)
* 동적인 페이지에 적합하다. (서버에 있는 데이터들을 스크립트에 의해 처리한 후 생성되어 전달되는 웹페이지)
* 새로 고침하면 경로를 찾지 못해서 에러가 난다. (주소를 사용하여 페이지를 찾아갈 때 에러 발생 - 서버에 추가적인 세팅 필요) 
* 배포과정이 복잡하다.

**HashRouter**
* URL의 hash를 활용한 라우터.
* 주소에 #이 붙는다.
* 정적인 페이지에 적합하다. (미리 저장된 페이지가 그대로 보여지는 웹페이지)
* 검색 엔진으로 읽지 못한다. #값 때문에 서버가 읽지 못하고 페이지의 유무를 알지 못하기 때문. (실무에서 사용하지 않는다.)
* 새로고침해도 에러가 발생하지 않는다.
* 배포가 간단하다.

**Link**  
기존의 a 태그를 사용하지 않고, Link 태그를 사용하여 경로를 지정한다. 페이지의 리로드 없이 내비게이션을 
수행하기 위한 컴포넌트이다. history 객체를 이용하여 내비게이션을 수행하도록 구현한다. 

**Route**  
props로 전달받는 path의 값이 현재 URL과 매칭될 때 특정 컴포넌트를 렌더링하는 컴포넌트.
exact는 경로가 중복될 경우, 두 개 이상의 컴포넌트가 동시에 렌더링 되는 것을 막기 위함.

**Switch**  
브라우저의 현재 URL과 매칭되는 첫 번째 Route 자식 엘리먼트를 렌더링하기 위한 컴포넌트.





***

## **Reference**
https://velog.io/@jiasong214/React-React-Router-DOM  
https://it-eldorado.tistory.com/113  
