---
layout: post
title: Hoisting & Closer
image: js.jpg
date: 2021-03-09 10:08:20 +0200
tags: 
categories: javascript
---

***

우선 Javascript의 변수 선언 방식인 Var, let, const에 대해서 알아보자.

* **var**  
{% highlight js %}
    var name = 'kim';
    console.log(name); // kim

    var name = 'dim';
    console.log(name); // dim

{% endhighlight %}

var은 변수 선언이 되어있어도, 해당 변수명으로 계속해서 다시 선언할 수 있다. 
유연한 변수선언으로 간단한 테스트에는 편리할 수 있지만, 코드양이 많아지고 복잡해지는 과정에서
값이 어디서 어떻게 바뀌고 사용되는지 추적하기 어렵다. 

그래서 이를 보완하기 위해 변수 선언 방식으로 let 과 const 추가되면서 쓰이지 않게된 선언 방식이다.

* **let**
{% highlight js %}
    let name = 'kim';
    console.log(name); // kim

    let name = 'dim';
    console.log(name); 
    // Uncaught SyntaxError: Identifier 'name' has already been declared

    name = 'react';
    console.log(name); // react

{% endhighlight %}

let은 var처럼 변수를 재선언하는 것이 허락되지 않는다. 단, 변수값을 재할당하는 것은 가능하다. 

* **const**
{% highlight js %}

    const name = 'kim';
    console.log(name); // kim

    const name = 'dim';
    console.log(name); 
    // Uncaught SyntaxError: Identifier 'name' has already been declared

    name = 'react';
    console.log(name); 
    // Uncaught TypeError: Assignment to constant variable.

{% endhighlight %}

const는 let에서 허락되었던 변수 재할당도 허락하지 않는다. 즉, 초기에 변수선언할 때, 설정된 변수값과 이름은 변하지 않는다.


***

## **Hoisting**
함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 기법을 말한다.
함수가 아닐 경우, 전역 컨텍스트의 최상위로 변경이 된다.

**변수의 경우**  
{% highlight js %}
    console.log(a); // undefined

    var a = 1;

    console.log(a); // 1
{% endhighlight %}

보통 프로그래밍 언어에서는 선언되지 않은 변수를 참조할 경우, 에러가 발생한다.
하지만 자바스크립트에서는 호이스팅때문에 에러가 위의 코드와 같이 에러가 발생하지 않는다.

var a = 1; 에서 var a; 는 해당 스코프의 최상위에 선언된다. 그래서 첫번째 console.log에서
Reference error가 발생하지않고 undefined라고 콘솔창에 출력되는 것이다.  
값을 할당하는 a = 1; 까지 해당 스코프의 최상단에 위치시키지는 않는다.

**함수의 경우**  
* **함수표현식**
{% highlight js %}
    d();  // ERROR 
    // d의 값인 함수는 최상단에 선언되었지만 할당까지 최상단으로 위치시키지 않기 때문.

    var d = function() {
        ...
    };

    d();
{% endhighlight %}

함수표현식은 변수를 만들고 함수를 할당해주는 표현식으로, 위와 같이 미리 선언해두지 않으면 에러가 발생한다.

* **함수선언식**

{% highlight js %}
     j();

    function j () {
        ...
    };

    j();
{% endhighlight %}

함수선언식은 말그대로 함수 자체를 선언한 표현식이며, 위와 같이 미리 선언해두지 않아도 호이스팅이 되어 실행가능하다.

**결론**  
Hositing은  코드의 가독성과 유지보수에 좋지 않다. 발생시키지 않게 하기 위해서 가급적 **var를 사용하지 않고 let과 const를 사용하는 것을 권장**한다.

***

## **Closuer**

클로저는 어휘적 범위 지정(Lexical scoping)에 의한 기법으로, 함수와 함수가 선언된 어휘적 환경의 조합이다. 
클로저안에 정의된 함수는 만들어진 환경을 기억한다.

흔히 함수 내에서 함수를 정의하고 사용하면 클로저라고 한다. 대개는 정의한 함수를 리턴하고 사용은 바깥에서 하게 된다.

{% highlight js %}

    function func1() {
        var name = "Gozila";
        function func2() {
            alert(name); // Gozila
        }
        func2();
    }

    func1();

{% endhighlight %}

func1 함수는 func2 함수를 생성한다. func2는 func1 안에서 정의된 내부 함수이며, func1 함수 본문에서만 사용될 수 있다.
func2 내부엔 자신만의 지역변수가 없다. 그런데 func2는 func1의 지역변수, name에 접근하여 alert를 정상적으로 수행한다.
이는 내부 함수가 외부 함수의 환경을 기억하고 있으므로 외부 함수의 변수에 접근할 수 있는 것이다. 이것이 바로 클로저이다.

이는 함수가 리턴하고 실행이 종료되어도 어휘적 환경에 대한 참조를 유지하므로 func1이 호출될 떄, name은 사용할 수 있는 상태로 남게 된다.


**실용적인 Closure**  
클로저는 어떤 데이터(어휘적 환경)와 그 데이터를 조작하는 함수를 연관시켜주기 때문에 유용하다. 
이것은 객체가 어떤 데이터(객체의 속성) 하나 혹은 그 이상의 메소드들을 연관시킨다는 점에서 객체지향
프로그래밍과 분명히 같은 맥락에 있다.

오직 하나의 메소드를 가지고 있는 객체를 일반적으로 사용하는 모든 곳에 클로저를 사용할 수 있다.

웹 페이지에 글자 크기를 조정하는 몇 개의 버튼을 추가한다고 가정하자.
다음은 body 요소의 font-size를 픽셀 단위로 설정하는 HTML 문서이다.

{% highlight html %}
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

{% endhighlight %}

다음은 자바스크립트 코드이다.

{% highlight js %}
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
{% endhighlight %}

클로저를 사용해 익명함수가 size를 참조하여 body 요소의 font-size의 값을 수정한다.

{% highlight js %}
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
{% endhighlight %}

{% highlight html %}
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
{% endhighlight %}

버튼을 누를 시, onclick을 통한 이벤트 발생으로 버튼에 해당하는 객체가 참조되며,
객체에 할당된 makeSizer() 함수가 호출되며 클로저가 사용되고 body의 요소인 font-size가 변경된다.

실용적인지는 솔직히 잘 모르겠지만, 메소드가 아닌 객체를 호출했다는 점에서 객체 지향적이라고 봐도 될 듯하다.


**Closure을 통한 익명성 보장**  
일반적으로 자바스크립트에서 객체지향 프로그래밍을 말하면 Prototype을 통해 객체를 다루거나,
class를 사용하는 것을 말하지만, Protoype이나 class를 사용해도 객채 내의 변수에 쉽게 접근할 수 있다는 점이 있다.

{% highlight js %}
class dd {
    constructor(name) {
        this.name = name;
    }
}


let user = new dd('kim');
console.log(user.name); // kim
user.name = 'dim';
console.log(user.name); // dim
{% endhighlight %}

이런식으로 손쉽게 변수에 접근해 값을 변경할 수 있다.

{% highlight js %}

function Hello(name) {
  this._name = name;
}

Hello.prototype.say = function() {
  console.log('Hello, ' + this._name);
}

var hello1 = new Hello('승민');

hello1.say(); // 'Hello, 승민'
hello1._name = 'anonymous';
hello1.say(); // 'Hello, anonymous'

{% endhighlight %}

Prototype을 써도 마찬가지로 값이 변경가능하다.

{% highlight js %}
function hello(name) {
    var _name = name;
    return function() {
      console.log('Hello, ' + _name);
    };
  }
  
  var hello1 = hello('승민');
  var hello2 = hello('현섭');
  var hello3 = hello('유근');
  
  hello1(); // 'Hello, 승민'
  hello2(); // 'Hello, 현섭'
  hello3(); // 'Hello, 유근'

  hello1('asd'); // 'Hello, 승민'
  console.log(hello1()._name); // TypeError: Cannot read property '_name' of undefined
  console.log(hello1._name); // undefined
{% endhighlight %}

위와 같이 클로저를 사용하면 외부에서 _name 변수에 접근할 방법이 없다.  

hello1('asd'); 는 hello1()은 hello의 내부 익명함수를 뜻하는데, 인자를 받고 있지 않으므로 'asd' 값을 줘봤자 _name의 값을 바꿀수 없다.

hello1()._name은 역시 hello1()은 내부 익명함수이므로, 내부 익명함수는 속성으로 _name을 가지고 있지 않으므로 접근할 수 없다.

hello1._name 역시 될리가 없다. hello1은 내부 익명함수이다. hello1()과 hello1의 차이는 함수를 호출하고 안하고의 차이다. 
둘 다 hello 내의 익명함수이다. undefined라고 뜨는 이유는 자바스크립트가 객체 내에 해당 속성이 존재하지 않아도
undefined라고 하고 에러를 발생시키지 않기 때문이다.

이러한 이유들로 클로저를 활용해 익명성 보장을 할 수 있다.

***
## Reference
https://velog.io/@bathingape/JavaScript-var-let-const-%EC%B0%A8%EC%9D%B4%EC%A0%90  
https://velog.io/@surim014/JavaScript%EC%97%90%EC%84%9C%EC%9D%98-Hoisting%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80  
https://hyunseob.github.io/2016/08/30/javascript-closure/  

