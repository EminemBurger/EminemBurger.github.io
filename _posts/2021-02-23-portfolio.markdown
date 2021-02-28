---
layout: post
title: portfolio project
image: portfolio.gif
date: 2021-02-23 23:08:20 +0200
tags:
categories: project
---

***

이번 포스트는 라즈베리파이를 이용해서 24시간동안 돌아가는 웹 사이트를 구현해보려고 한다.  
처음으로 만들어보기에 가볍게 포트폴리오만 올려보도록 했다.  

***

## **라즈베리파이 설정**

우선 라즈베리파이를 준비해야 한다. 나같은 경우 라즈베리파이와 연결할 모니터, 키보드가
없었기에 원격접속을 하였다. 원격 접속을 하기 위해선 라즈베리파이의 sd 카드에 wpa_supplicant.conf와
ssh 파일을 넣어야 한다. ssh는 파일의 내용작성없이 확장자 또한 없이 넣어야한다. ssh 파일을 넣으면
라즈베리파이 내에서 ssh 접속을 허용하도록 설정이 변경되는 듯 하다. 그리고 wap_supplicant.conf 파일 내에 다음과
같이 내용을 작성해준다.


{% highlight js %}

country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
   update_config=1
   network={
    ssid="사용하는 공유기 이름"
    psk="사용하는 공유기 비밀번호"
}

{% endhighlight %}

작성하고 sd 카드에 파일을 넣어주고 라즈베리파이를 부팅하면 이제 원격으로 접속할 수 있다.
원격 접속은 putty를 통해서 하면된다. 아직 라즈베리파이의 ip 주소를 모르므로 접속할 수가 없다.
공유기가 라즈베리파이에 할당한 ip 주소를 확인해야한다. 나는 iptime 공유기를 사용하고 있었기에
관리자 기본 접속 주소인 192.168.0.1에 접속하여 라즈베리파이의 ip 주소를 확인했다.

![]({{site.baseurl}}/images/portfolio1.JPG)  
위의 사진처럼 고급설정 - 네트워크 관리 - 내부 네트워크 설정에 들어가보면
라즈베리파이에 전원이 연결되어 있다면 목록에 raspberrypi란 이름으로 뜰 것이다.
라즈베리파이의 ip 주소를 확인했으면 이제 putty로 접속하면 된다.

![]({{site.baseurl}}/images/portfolio2.JPG)  
putty가 설치되있지 않으면 다운받고, Host Name에 라즈베리파이의 ip 주소를 입력해주고
Open 버튼을 누르면 된다. 

![]({{site.baseurl}}/images/portfolio3.JPG)  
성공적으로 접속하면 아이디와 비밀번호르 입력하라고 뜨는데, 처음으로 라즈베리파이를
부팅했다면 기본 아이디는 pi이며, 비밀번호는 raspberry이다. 

로그인을 했으면 라즈베리파이 운영체제에서 사용 가능한 패키지들을 다음 명령어들로 업데이트와 업그레이드를 해준다.

{% highlight js %}

sudo apt-get update
sudo apt-get upgrade

{% endhighlight %}

***
## **Docker 설치**

그리고 라즈베리파이 자체에 라이브러리를 설치해도 되지만, 이번에는 docker를 활용해서 환경을 구현하기로 하였다.

{% highlight js %}

curl -sSL https://get.docker.com | sh

{% endhighlight %}

위 명령어를 입력해 docker를 설치한다.

{% highlight js %}

sudo usermod -aG docker pi

{% endhighlight %}

그리고 사용자를 docker 그룹에 추가해줘야 한다. 기본적인 사용자 이름은 pi 이다. 위 명령어를 통해 추가해준다.


{% highlight js %}

docker version

{% endhighlight %}

설치가 성공적으로 진행됬는지 확인해보기 위해 version 확인을 해보자. 성공적으로 설치가 됬다면
docker의 version이 뜰 것이다. 만약 에러가 난다면 라즈베리파이를 재부팅해보자. 나같의 경우 docker를 설치한 직후
바로 version 확인을 하면 사용자가 docker 그룹에 추가된 것이 반영이 안 된것인지 에러가 발생하였다.

docker를 성공적으로 작성했다면 Dockerfile을 작성해보자.

***

## **Dockerfile 형식**

{% highlight js %}

FROM node:12
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "server.js"] 

{% endhighlight %}


* FROM : docker base image , 기반이 되는 이미지. 형식은 이미지이름:태그 이다. node:12는 node.js의 이미지이며 12버전을 의미한다.
* WORKDIR : "RUN", "CMD" 명령이 실행될 작업 디렉터리를 의미한다. 통상적으로 /usr/src/app 으로 작성한다고 한다. 이미지를
만들 때 해당 폴더를 만들어 그곳에서 앱을 실행시킨다고 한다.
* COPY : 파일복사를 의미한다. 형식은 COPY (호스트 내부 복사 경로) (이미지 내부 저장 경로) 이다. Dockerfile을 작성할 떄 별도의 폴더를 생성하고,
그 안에 이미지 생성에 필요한 파일들을 넣어둔다.  .은 현재 위치한 경로를 의미한다.
* RUN : FROM 명령에서 설정한 베이스 이미지에 대해 실행하며, 패키지 설치 및 명령 실행에 사용된다.
* EXPOSE : 외부로 노출시킬 포트 번호를 의미한다. 본인은 4000번 포트에 앱이 바인딩되어 있으므로 4000으로 작성하였다. 포트 번호는 임의로 정하면 된다.
* CMD : 이미지를 바탕으로 생성된 컨테이너 실행 시 매번 명령을 실행한다. []로 씌워준 것은 exec 형식으로, 쉘을 호출하지 않고 직접 실행한다.  인수는 JSON 배열로 지정한다.

***
## **포트폴리오 코드**

{% highlight js %}

const express = require('express')
const app = express();
const path =require('path')

app.use(express.static(path.join(__dirname, '/')));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/test.html');
});

app.listen(4000, () => console.log("Server is running!"))

{% endhighlight %}

Dockerfile에서 CMD를 통해 실행시키는 server.js의 코드이다. 코드는 간단하다. express를 통해 서버를 생성하고,
현재 경로에 위치한 test.html, 포트폴리오를
4000번 포트로 내보낸다. 이 때문에 Dockerfile 내 EXPOSE에서 4000으로 작성하였다. dirname은 현재 경로를 의미한다. 
정적 페이지에 가까워 웹 서버에 바로 띄워도 되지만, 웹 서버와 웹 애플리케이션 서버를 나누어 사용하는 구조를
익혀보기 위해 이런 방식으로 하였다.

***

## **웹 서버 vs 웹 애플리케이션 서버**

이제 웹 서버인 nginx를 설치해야 한다. 방금 코드를 통해 서버를 생성하지 않았나요? 물어볼 수도 있기에, 웹 서버와 
웹 애플리케이션 서버에 대해 말해두고자 한다.  
![]({{site.baseurl}}/images/nginx1.jpg)  
우리가 Node.js에서 express를 통해 생성한 서버는 웹 애플리케이션 서버이다. 웹 서버와 웹 애플리케이션 서버의 차이에 대해서 알아보자.

**웹 서버**  
클라이언트의 요청을 받아서 처리하고, 그 결과를 웹 클라이언트에 응답한다. 정적 페이지만 처리하기에 HTML, CSS, javascript 파일을
클라이언트에 제공할 때 웹 서버를 사용한다. 동적 페이지 처리가 필요할 경우, 웹 애플리케이션 서버에 처리를 넘긴다.

**웹 애플리케이션 서버**  
웹 서버로부터 동적 페이지 요청을 받아, 요청을 처리하고 그 결과를 웹 서버에 반환한다. 주로
동적 페이지 생성을 위한 프로그램 실행과 데이터베이스 연동 기능을 처리한다.

물론 웹 애플리케이션 서버를 통해 웹 서버의 역활까지 수행할 수 있지만,
웹 서버와 웹 애플리케이션 서버가 분리되면서, 서로의 역활을 구분하여 사용하는 것이 좋다.
동적 페이지를 처리하는 경우, 정적 페이지보다 수십패의 메모리를 소비하기 때문에, 웹 애플리케이션
서버가 정적 페이지까지 처리하는 것은 비효율적이기 떄문이다.

아파치나 nginx와 같은 웹 서버를 통해 서버 유지보수와 트래픽 관리같은 서버 운영을 할 수 있다. 
하지만 신경써야할 것이 많고 어렵기도 하고 비용도 많이 든다! 그래서 업계에서 PaaS (Platform as a Service)가
많이 사용된다. PaaS는 AWS와 같은 클라우드 서비스 제공 업체에서 제공하는 서비스 중 하나로, 서버관리를 AWS에서 해준다. 
low level에 대해 개발자의 부담을 덜어주어, 웹 애플리케이션 개발에 집중할 수 있다. 그래도 고오급 개발자가 되길 원한다면
웹 서버를 관리하는 방법에 대해 알아 두는 것 또한 좋을 것이다.

***

## **nginx 설치 및 설정**

nginx는 웹 서버의 종류 중 하나로, 아파치에서 제공하는 기능이 없고 보안 문제들은 Nginx 자체에서 
처리해준다고 한다. 적은 수의 쓰레드로 효율적인 일 처리를 하고, 쓰레드당 할당되는 메모리도 적게 사용하는 구조이므로
규모가 작고 정적 데이터 처리가 많은 서비스를 제공하는데 적합하다. 안전성과 확장성, 호환성 면에서는
아파치, 성능을 추구한다면 nginx가 우세하다고 한다.

{% highlight js %}

sudo apt-get install nginx
sudo /etc/init.d/nginx start

{% endhighlight %}

명령어를 통해 nginx를 설치하고, 설치가 완료되면 nginx를 실행한다. 
실행이 정상적으로 되면 라즈베리파이의 ip에 접속하면 nginx 환영 문구가 뜰 것이다.

{% highlight js %}

cd /etc/init.d/sites-available

{% endhighlight %}

위의 경로로 이동한다. sites-available은 가상 서버 환경들에 대한 설정 파일들이 위치하는 곳이다.  
sudo nano [파일이름] 명령어를 통해 가상서버 파일을 작성한다.


{% highlight js %}
	listen 80; # 기본포트는 80. 변경하려면 conf/nginx.confdml listen을 수정한다.

	location / {
		proxy_set_header X-Real-IP & remote_addr; # 실제 접속자의 IP를 X-Real-IP 헤더에 입혀서 전송.
		proxy_set_header X-Forwarded-For $ proxy_add_x_forwarded_for; # nginx의 ip를 헤더에 덧붙힌다.
		proxy_set_header Host $http_host;
		proxy_set_header X-Nginx-Proxy true; # nginx를 reverse proxy server로 설정
		

		proxy_pass http://192.168.0.11:5000/; # 실질적으로 요청할 서비스를 명시. 들어온 요청을 어디로 포워딩 할지 정한다.
		proxy_redirect off;
	}

    gzip on;
    gzip_comp_level 2;
    gzip_proxied any;
    gzip_min_length  1000;
    gzip_disable     "MSIE [1-6]\."
    gzip_types text/plain text/css application/json application/x-javascript te$


{% endhighlight %}

다음과 같이 작성해준다. 리버스 프록시 서버는 클라이언트에서 요청을 받아 처리를 한 뒤, 적절한
서버에 전달해주는 서버를 뜻한다. gzip는 텍스트를 압축해 전송해주는 모듈이다.
listen은 http 표준 포트인 80번을 사용한다. 80번 포트를 통해 요청을 받을 것이다.
클라이언트가 80번 포트를 통해 요청을 보낼 수 있도록 포트포워딩을 해줄것이다.
proxy-pass는 라즈베리파이의 ip주소:임의의 포트번호 형식으로 작성해주면 된다.

***

## **포트포워딩**

포트번호를 통해서 서버는 요청을 받았을 때, 웹 사이트 요청을 했는지 FTP를 이용한 파일 요청을 받았는지 알고
그에 대한 처리를 할 수 있다. 최상위 도메인을 관리하는 단체인 IANA에서는 포트 번호에 따라 쓰임새를 정해두었다.
80번은 주로 HTTP - 웹 페이지 전송으로 웹 사이트 요청을 받는데 사용되는 포트이다.

**포트포워딩은 외부에서 특정 포트를 통해 유입되는 모든 패킷을, 내부의 ip의 특정 포트로 전달하는 것을 의미한다.**

포트포워딩을 해주지 않으면 외부에서 라즈베리파이로 접근할 수 없다. 어느 포트로 접근할지 지정해주지 않았기 때문이다.

![]({{site.baseurl}}/images/portforwarding.jpg)  

공유기 관리자에 들어가 포트포워딩을 설정해준다. 고급 설정 - NAT/라우터 관리에서 외부 80번 포트가
내부 80번 포트에 포트포워딩되도록 규칙을 생성하자.
외부에서 인터넷을 통해 접근하면 포트 80번은 HTTP 요청을 받는 곳으로 지정되있기에 외부의
요청은 포트 80을 통해 들어온다. 
그렇게 공유기의 외부 ip 주소 포트 80번을 통해 접근할 경우, 내부 ip 포트 80번으로 연결해준다.
내부 ip는 라즈베리파이의 ip 주소로 해준다. 내부 ip 주소는 공유기에서 내부적으로 할당한 ip로, 다른 사용자가
ip를 알고있다해도 접근할 수 없다.
포트포워딩이 제대로 되었다면, 공유기의 외부 ip 주소를 입력하면 제작한 웹 사이트가 뜬다.
공유기의 외부 ip 주소는 공유기 관리자에서 확인할 수 있다. 외부 ip 주소는 다른
사용자가 접근할 수 있기 때문에 공개하지 않는 것이 보안에 좋다.

*** 

## **도메인 등록**

도메인은 ip 주소 대신 사용하는 명칭같은 것으로, 도메인 등록을 하려면
등록 업체에서 도메인을 구입해야한다.. 돈 내는 것이 싫다면 무료 도메인 사이트인
freenom을 사용하는것을 권한다. 단, 어디까지나 테스트용으로 사용해볼 수 있는 수준이고,
직접 사용해 본 결과 지속적으로 도메인 연결이 되지는 않았다..
어느 사이트를 사용하건 자유지만, 나는 카페24에서 할인되는 도메인을 구매하였다.

![]({{site.baseurl}}/images/portfolio4.JPG)

도메인을 구매하면 호스팅 센터에서 도메인을 관리할 수 있다. 도메인을 연결하려면
도메인 부가서비스 - DNS 관리에 들어간다.

![]({{site.baseurl}}/images/portfolio5.JPG)

도메인을 클릭하고 DNS 관리 버튼을 누른다.

![]({{site.baseurl}}/images/portfolio6.JPG)  
![]({{site.baseurl}}/images/portfolio7.JPG)  

호스트 IP (A 레코드) 관리를 누르고 레코드를 추가한다.
ip 주소는 공유기의 외부 ip 주소를 입력해준다. 

***

## **후기**


![myImage](https://media.giphy.com/media/Ewp3iPauiVG0ekDLm4/giphy.gif)

라즈베리파이를 사용해 포트폴리오를 웹 사이트 형식으로 올려보면서 
그 속에서 네트워크와 관련된 지식들을 생각보다 많이 접하게 되어서, 그동안
학과에서 배워왔던 전공지식들, 눈에 보이지 않아 너무 추상적이라 생각된 개념들이
결국엔 다 중요한 것이라는 걸 깨닫게 되었다. 아직도 배울것이 산더미처럼 많고,
내 자신이 어디까지 성장할 수 있을지 모르겠지만 나는 내가 하고 싶은 일을 하고,
만들고 싶은 것을 만들고 싶다. 오늘도

![myImage](https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif)

수고했습니다

## **Reference**
https://blog.d0ngd0nge.xyz/docker-dockerfile-write/  
https://dico.me/server/articles/259/ko  
https://rrhh234cm.tistory.com/456  
https://victorydntmd.tistory.com/231  
http://makeshare.org/bbs/board.php?bo_table=raspberrypi&wr_id=68  


