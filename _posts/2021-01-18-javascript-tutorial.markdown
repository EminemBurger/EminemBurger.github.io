---
layout: post
title: javascript - 화살표 함수
image: skeleton.gif
date: 2021-01-18 10:08:20 +0200
tags: 
categories: javascript
---

***

자바스크립트를 접한지 이제 1년이 되가는 것 같은데 다른 라이브러리나 앱들, 리액트나 노드js같은 것들을 배우느라 아직까지도 익숙해지지 못한것 같다.  
그래서 자바스크립트 기본기를 단련시키고자 블로그에 글을 올리기로 했다.
그럼 시작해보자.

***

## 방향표 함수

자바스크립트를 접하면서 코드를 이해하는데 가장 차질을 끼친 녀석이다. 이 녀석이 뭔가하면

{% highlight js %}
    let sum2 = (a, b) => a + b
{% endhighlight %}

이렇게 생긴 녀석이다..  무슨 뜻인지 쉽게 말하면 이렇다.  
= 다음에 오는 것은 매개변수  
=> 다음에 오는 것은 반환값  
즉, 위에 적힌 sum2는 a와 b를 매개변수로 해서 a + b를 반환하는 화살표 함수인 것이다.  
즉, 이거랑 똑같다.  

{% highlight js %}
    function sum(a,b) {
        return a + b
    }
{% endhighlight %}



생각보다 간단하지 않은가? 단, 이것의 variation이 다양해서 자바스크립트 코드를 많이 접하지 않았다면 헷갈릴 수가 있다.  
다른 예를 살펴보자.

{% highlight js %}
    let isPositive2 = number => number >= 0
{% endhighlight %}

거의 비슷하지만, = 다음에 매개변수를 감싸고 있었던 괄호가 사라진 게 눈에 띈다. 매개변수가 1개만 있을 경우, 괄호를 생략가능하다. 리턴값은 조건식이니까 아마 boolean 형식으로 반환될 것이다.   
다음 함수와 똑같다. 

{% highlight js %}
    function isPositive(number) { 
        return number >= 0
    }
{% endhighlight %}

그럼 매개변수가 없다면?  

{% highlight js %}
    let randomNumber = () => Math.random
{% endhighlight %}

다음은 화살표 함수의 간결함을 보자.

{% highlight js %}
    document.addEventListener('click', function() {
        console.log('Click')
    })
{% endhighlight %}


{% highlight js %}
    document.addEventListener('click', () => console.log('Click'))
{% endhighlight %}

차이가 느껴지는가? 화살표 함수를 쓴다면 코드를 눈에 띄게 줄일 수 있다.  

그 다음 이슈는 화살표 함수를 쓰고 안쓰고에 따른 지역성 차이인데, 이것은 아직 잘 이해가 되지 않는다. 자세한 내용은 영상에서 들어볼 수 있다. 이 포스트의 내용은 밑에 있는 영상을 참고하여 작성하였다. 

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/h33Srr5J9nY/0.jpg)](https://www.youtube.com/watch?v=h33Srr5J9nY)

