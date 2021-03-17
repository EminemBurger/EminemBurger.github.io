---
layout: post
title: event bubling 
image: js.jpg
date: 2021-03-17 10:08:20 +0200
tags: 
categories: javascript
---

***

이벤트는 사용자의 입력에 따라 추가 동작을 구현할 수 있는 기능이다. 주로 addEventListener()을 통해서 이벤트 등록을 한다.

{% highlight html %}
    <button>add one item</button>
{% endhighlight %}

{% highlight js %}
    var button = document.querySelector('button');
    button.addEventListener('click', addItem);

    function addItem(event) {
        console.log(event);
    }
{% endhighlight %}

위의 코드는 add one item이라는 버튼에 이벤트를 addEventListener로 등록해, 버튼을 클릭했을 시, addItem이 실행되게 하는 코드이다. event를 콘솔에 출력하면 해당 이벤트에 관련된 정보를 확인할 수 있다. 

***

## **Event Bubbling**
![]({{site.baseurl}}/images/eventbubbling1.png)  
한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작한다. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작한다. 이러한 현상을 **이벤트 버블링**이라 한다.

{% highlight html %}
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
{% endhighlight %}

위 코드를 작성하고 <p>를 클릭하면 alert 함수가 실행되며 p가 뜨고, 그다음 div, 마지막으로 form이 뜬다. <div>를 클릭하면 div가 뜨고, 다음 form이 뜬다. 이렇듯 요소의 핸들러가 발생하면 해당 요소의 상위 요소들의 핸들러가 하나씩 동작되어간다.


***

## **Event Bubbling 중단하기**
핸들러에게 이벤트를 완전히 처리하고 난 후 버블링을 중단하도록 명령할 수도 있다.

{% highlight html %}
<body onclick="alert(`버블링은 여기까지 도달하지 못합니다.`)">
  <button onclick="event.stopPropagation()">클릭해 주세요.</button>
</body>
{% endhighlight %}

event 메소드인 stopPropgation을 통해 이벤트 버블링을 중단시킬 수 있다.

***
## **Event Capturing**
![]({{site.baseurl}}/images/eventbubbling2.png)  
이벤트 캡처링은 이벤트 버블링과는 반대 방향으로 진행되는 이벤트 전파 방식이다. 

{% highlight js %}
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false입니다.
	});
});

{% endhighlight %}

addEventListener에서 옵션 객체에 capture:true를 설정해주면 된다. 해당 이벤트를 감지하기 위해 이벤트 버블링과 반대 방향으로 탐색한다.

***

## **Event Delegation**
이벤트 위임은 JS로 웹 앱을 구현할 때 자주 사용하게 되는 코딩 패턴이다. 

**하위 요소에 각각 이벤트를 추가하지 않고, 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식**이 이벤트 위임이다.

쉽게 말하면 이벤트 버블링의 원리를 활용해 하위 요소에 이벤트를 추가할 필요없이 상위 요소에 이벤트를 추가하면 된다는 것이다.

{% highlight html %}
<h1>오늘의 할 일</h1>
<ul class="itemList">
	<li>
		<input type="checkbox" id="item1">
		<label for="item1">이벤트 버블링 학습</label>
	</li>
	<li>
		<input type="checkbox" id="item2">
		<label for="item2">이벤트 캡쳐 학습</label>
	</li>
</ul>
{% endhighlight %}

{% highlight js %}
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
	input.addEventListener('click', function(event) {
		alert('clicked');
	});
});
{% endhighlight %}

위의 코드와 같이 input 요소에 이벤트를 등록했다. 하지만 addEventListener를 한 뒤 추가적으로 input 요소를 추가하면 마찬가지로 이벤트가 등록이 될까? 답은 **등록되지 않는다.**이다. input 요소들을 추가한 건 이벤트를 등록한 후이기 때문이다.

요소를 추가해도 이벤트를 따로 등록해주지 않으려면 어떻게 해야될까? 답은 **해당 요소의 상위 요소에 이벤트를 등록하는 것**이다. 

{% highlight js %}
var itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event) {
	alert('clicked');
});
{% endhighlight %}

이렇게 작성하면, input 요소의 상위 요소인 ul 요소, itmeList가 하위에서 발생한 클릭 이벤트를 감지하여 핸들러가 발생하게 된다. 이렇게 하면 요소를 추가해도 이벤트를 따로 등록시켜줄 필요가 없다.

***

## Reference
https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/  
https://ko.javascript.info/bubbling-and-capturing  
https://velog.io/@soulee__/JavaScript-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EB%B8%94%EB%A7%81-%EC%BA%A1%EC%B3%90-%EC%9C%84%EC%9E%84  
