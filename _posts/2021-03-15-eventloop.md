---
layout: post
title: js engine 
image: js.jpg
date: 2021-03-15 10:08:20 +0200
tags: 
categories: javascript
---

***

자바스크립트는 싱글 스레드 언어다. 하지만 웹 브라우저가 자바스크립트를 실행시키는 원리를 살펴본다면 단순하게 싱글 스레드 언어라 말하기 어렵다. 

## **V8 엔진 동작 방식**
![]({{site.baseurl}}/images/event1.png)  
자바스크립트 V8 엔진 동작에는 다음과 같은 것들이 활용된다.  
**1. Call Stack**  
현재 실행중인 함수에 대한 정보들을 담아두는 스택 구조의 메모리 영역.

**2. Web APIs**  
브라우저에서 제공되는 API이다. Call Stack에서 불러온 함수가 비동기함수일 경우, Web API가 Run 함수를 호출한다. DOM, Ajax, SetTimeout 등이 이것에 해당하며, Web API에서 처리를 끝난 함수는 Callback Queue로 이동된다.

**3. Callback Queue**  
Web API에서 보내진 비동기 처리가 모이는 곳으로 Call Stack과는 다르게 선입선출되는 특징을 가진 Queue의 구조를 이루고 있다. 여기 모인 비동기함수는 Event Loop의 감시하에 놓이게 된다.

**4. Event Loop**  
CallStack과 Queue에를 감시하는 일이다. 감시하다가 Call Stack이 비게 되면 Queue에 쌓인 비동기 함수를 Call Stack으로 보내주는 역할을 한다. 이 때 보내지는 비동기함수는 Call Queue에 쌓여있는 비동기함수 중 가장 먼저 들어온 함수가 보내진다.  
Event Loop를 통해 동기함수와 비동기함수의 순서가 정해진다.


![]({{site.baseurl}}/images/engine.png)  
자바스크립트 V8 엔진의 구조는 위와 같다.
* Memory Heap : 메모리 할당이 일어나는 곳
* Call Stack : 코드 실행에 따라 스택 프레임이 쌓이는 곳 (LIFO 후입 선출)

나머지 Web APIs와 Callback Queue, Event Loop는 브라우저에서 제공되어진다.

호출 스택이 하나이므로 자바스크립트가 단일 스레드인 것은 맞다.

***

## **비동기함수 처리방식**

{% highlight js %}
console.log("1"); 
setTimeout(console.log, 5000, "2"); // 5초 후, console.log 함수 실행 
console.log("3"); // [출력] 
// 1 
// 3 
// 2

{% endhighlight %}

자바스크립트가 싱글 스레드 언어라면 setTimeout이 끝나고 console.log를 실행하기 때문에 1 2 3 순서대로 출력될 것이다. 그런데 1 3 2 라고 뜨는 이유가 무엇일까?

**line 1: console.log("1") 코드 수행**

![]({{site.baseurl}}/images/event.jpg)  
**1. Call Stack에 console.log("1") 추가**  
**2. console.log("1") 실행, 콘솔창에 '1' 출력**  
**3. 실행 완료 후 Call Stack에서 console.log("1") 제거**

**line 2: setTimeout(console.log, 5000, "2") 코드 수행**

![]({{site.baseurl}}/images/event2.jpg)  
**1. Call Stack에 setTimeout 추가**  
**2. setTimeout 실행, Web API의 Timer 스레드에 작업을 넘김**  
**3. 실행 완료된 setTimeout는 Call Stack에서 사라진다.**  


5초 간 기다리는 작업을 timer 스레드라는 서브 스레드에서 수행하는 것이다. 메인 스레드는 5초 간의 블로킹이 일어나지 않고 다음 코드를 수행할 수 있다.

**line 3: console.log("3") 코드 수행**

![]({{site.baseurl}}/images/event3.jpg)  
**1. Call Stack에 console.log("3") 적재**  
**2. console.log("3") 실행, 콘솔창에 '3' 출력**  
**3. 실행 완료된 console.log("3")는 Call Stack에서 제거** 
![]({{site.baseurl}}/images/event4.jpg)  
**1. 5초 뒤, Web API의 timer 스레드는 console.log("2")를 Callback Queue로 옮김**  
(5초의 대기를 보장하지, 정확히 5초 뒤에 실행되는 것은 아니다.)  
![]({{site.baseurl}}**/images/event5.jpg)  
**1. Event Loop가 Callback Queue에 있던 console.log("2")를 Call Stack에 추가**  
**2. Call Stack에 올라간 함수가 실행되어, 콘솔창에 '2' 출력**  
**3. 실행 완료된 console.log("2")는 Call Stack에서 제거** 

***

## **결론**
**자바스크립트 자체는 싱글 스레드가 맞다.** 하지만 자바스크립트 엔진이 독립적으로 실행되지 않고, 웹 브라우저나 Node.js와 같은 멀티 스레드 환경에 임베디드되어 실행된다. 때문에 자바스크립트는 싱글 스레드지만, 타이밍에 따라 멀티 스레드로 작업이 가능하다.

***
## Reference
https://prohannah.tistory.com/59  
https://velog.io/@xedni/JavaScript-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%91%EB%8F%99-%EC%9B%90%EB%A6%ACEvent-Loop%EC%99%80-Call-Stack-Web-API-Callback-Queue  
