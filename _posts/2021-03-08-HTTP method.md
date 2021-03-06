---
layout: post
title: HTTP
image: http.png
date: 2021-03-08 23:08:20 +0200
tags:
categories: network
---

***

## **HTTP**

Hyper Text Transfer Protocol의 약자로, 인터넷에서 데이터를 주고 받는 프로토콜.
사람들이 브라우저를 통해 확인하는 웹 상의 데이터는 HTTP에 의해 전달된다. Protocol은
규약 혹은 규칙을 뜻한다. 브라우저 주소창에 URL을 입력하면 데이터를 요청하고 보여주는 것은
브라우저의 몫이다. 요청받은 데이터를 가져오는 것은 웹 서버의 역활이며, HTTP는 서버와
클라이언트 간의 규칙이다. 클라이언트의 요청을 HTTP Request, 서버의 응답은 HTTP Response라고 한다.

## **HTTPS**

HTTPS는 웹 서버와 브라우저 간 정보를 암호화된 상태로 주고받는 반면, HTTP는 정보를 평문으로 주고받기 때문에
오가는 정보를 중간에서 탈취당할 위험이 크다. 따라서 HTTPS 사용이 권장된다.

HTTPS는 Hyper Text Transfer Protocol **Secure** 의 약자로 HTTP를 통한 데이터의 보안을 위한 조치가 취해진
HTTP가 확장된 버전이다. HTTP와 HTTPS의 차이점은 SSL을 이용해 데이터를 안전하게 전송하는 것이다.

SSL은 Secure Socket Layer의 약자로, 보안 소켓 레이어이다. SSL은 제 3자 인증기관에서 발급받을 수 있으며,
인증서에는 해당사이트의 공개키와 사이트의 정보들이 있다. SSL은 symmentic 암호화 기반이다. 공개키는
누구든지 알아도 상관없고, 개인키는 복호화 해야하는 대상만 알고 있다. 인증서가 전송될 때는 인증기관에서 제공하는
개인키로 암호화되서 전송된다.

인증 기관이 만약 가짜 사이트, 해커가 인위적으로 만들었다면 사용자의 정보가 노출될 위험이 있는데 이를 막기 위해
인증기관의 공개키를 브라우저에게 알려주고 브라우저에서는 해당사이트에서 제공하는 공개키가 아닌, 브라우저의 공개키를 
사용하기 때문에 대상이 인증기관인지 아닌지 판별할 수 있다.


1. 클라이언트는 SSL로 암호화된 페이지 요청.
2. 서버는 공개키를 인증서와 함께 전송.
3. 인증서가 제 3 인증기관으로부터 서명된 것인지 확인. 날짜가 유효한지, 인증서가 사이트와 관련있는지 확인.
4. 클라이언트는 브라우저의 공개키를 사용해 URL, 대칭키, http 데이터들을 암호화해서 전송. 대칭키는 서버와 암호화 통신을 할 때 사용할 키로 따로 생성 후 전달.
5. 서버는 개인키를 이용하여 URL, http 데이터들을 복호화한다. 
6. 요청받은 URL에 대한 응답을 복호화하면서 얻은 클라이언트가 보낸 대칭키를 이용하여 브라우저로 전송.
7. 클라이언트는 대칭키를 이용해 http 데이터와 html 문서를 복호화하고, 화면에 렌더링된다.
   

***

## **HTTP 메소드**
HTTP 메소드는 주어진 URL에 대한 수행되길 원하는 행동을 나타낸다.

1. **GET** : 클라이언트가 서버에게 리소스를 요청할 떄 사용. 오직 데이터를 받기만 한다.
2. **POST** : 클라이언트가 서버의 리소스를 새로 만들 때 사용. 
3. **PUT** : 클라이언트가 서버의 리소스를 수정할 떄 사용.
4. **DELTE** : 클라이언트가 서버의 리소스를 삭제할 때 사용.
5. **HEAD** : GET과 동일한 응답을 요구하지만, 응답 본문을 포함하지 않는다.
6. **PATCH** : 클라이언트가 서버의 리소스의 부분만을 수정할 때 사용.
7. **CONNECT** : 클라이언트가 목적 리소스로 식별되는 서버로의 터널을 맺을 때 사용.
8. **OPTIONS** : 클라이언트가 서버에서 해당 URL이 어떤 메소드를 지원하는지 확인할 때 사용
9. **TRACE** : 클라이언트가 서버간 통신 관리 및 디버깅을 할 때 사용

***

## **HTTP 메소드의 특징**

1. **GET**
* 캐싱이 가능하다.
* 북마크가 가능하다.
* 브라우저에 기록이 남는다.
* URL에 Query String 형식으로 데이터를 전송하기 때문에 보안에 취약하다.
* URL의 최대 길이가 있다. (각 브라우저, 각 서버 별 다르다)
* 초과된 데이터는 절단되어 보내진다.
* 같은 요청이면 모든 응답은 동일해야 한다.

2. **POST**
* 캐싱이 불가능하다.
* 브라우저에 기록이 남지 않는다.
* 북마크가 불가능하다.
* 데이터의 길이에 제한이 없다.
* 같은 요청이라도 응답이 각각 다르다.

3. **PUT**
* 캐싱이 불가능하다.
* 같은 요청이면 모든 응답은 동일해야한다.

4. **DELETE**
* 캐싱이 불가능하다.
* 같은 요청이라도 응답이 각각 다르다.
 
***

## **HTTP 상태 코드**

* 1XX (정보) : 요청을 받았으며 프로세스를 계속 진행한다.
* 2XX (성공) : 요청을 받았으며 인식했고 수용했다.
* 3XX (리다이렉션) : 요청 완료를 위해 추가 작업 조치가 필요하다.
* 4XX (클라이언트 오류) : 요청의 문법이 잘못되었거나 요청을 처리할 수 없다.
* 5XX (서버 오류) : 서버가 명백히 유효한 요청에 대해 충족을 실패했다. 

### **1XX Information Responses**
* 100 Continue : 진행중임을 나타내는 응답코드. 현재까지의 진행상황에 문제가 없으며
클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알려준다.
* 101 Switching Protocol : 클라이언트에 의해 보낸 업그레이드 요청 헤더에 대한
응답코드. 서버에서 프로토콜을 변경할 것을 의미. Websocket 프로토콜 전환 시에 사용.
* 102 Processing (WebDAV) : 서버가 요청을 수신하였으며 이를 처리하고 있지만, 아직 제대로
된 응답을 알려줄 수 없다는 응답 코드.

### **2XX Successful Response**
* 200 OK : 요청이 성공적으로 수행 되었다는 응답코드. 정보는 요청에 따른 응답으로 변환.
* 201 Created : 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었다는 응답코드. 일반적으로 POST나 PUT 요청 이후의 응답 코드.
* 202 Accepted : 요청을 수신하였지만 그에 응하여 행동할 수 없다는 응답코드. 다른 프로세스에서 처리 또는 서버가 요청을 다루고 있거나
배치 프로세스를 하고 있는 경우 요청을 처리하지 못할 때 발생하는 응답코드.
* 203 Non-Authoritative information : 서버가 요청을 성공적으로 처리했지만, 다른 소스에서 수신된 정보를 제공하고 있다.
* 204 No-Content : 요청에 대해서 성공적으로 처리했지만 콘텐츠를 제공하지 않을 때 발생하는 응답코드.
* 205 Reset-Content : 서버가 요청을 성공적으로 처리했지만 콘텐츠를 표시하지 않는다. 204 응답과 달리 이 응답은 요청자가 문서보기를 재설정 할 것을 요구한다.

### **3XX Redirection**
* 300 Multiple Choice : 서버가 요청에 대해서 하나 이상의 응답이 가능. 서버가 사용자에 따라 수행할 작업을 선택하거나 요청자가 선택할 수 있는 작업 목록 제공
* 301 Moved Permanentitly : 요청할 페이지를 새 위치로 영구적으로 이동. GET 또는 HEAD 요청에 대한 응답으로 이 응답을 표시하면 요청자가 자동으로 새 위치에 전달된다.
* 302 Found : 요청한 리소스의 URI가 변경되었음을 의미하는 응답코드.
* 303 See Other : 요청자가 다른 위치에 별도의 GET 요청을 하여 응답을 검색해야 할 경우, 서버가 클라이언트에서 보내는 응답.
* 304 Not Modified : 마지막 요청 이후 요청한 페이지는 수정되지 않았다. 서버가 이 응답을 표시하면 페이즈이 컨텐츠를 표시하지 않는다. 요청자가
마지막으로 페이지를 요청한 후 페이지가 변경되지 않으면 이 응답을 표시하도록 서버를 구성해야 한다.
* 305 Use Proxy : 요청한 응답은 반드시 프록시를 통해서 접속해야 하는 것을 알려주는 응답코드. 보안상의 걱정으로 사용되지 않는 추세.
* 307 Temporary Redirect : 클라이언트가 요청한 리소스가 다른 URI에 있으며, 이전 요청과 동일한 메소드를 사용하여 요청해야할 때, 서버가 클라이언트에 이 응답을 직접 보낸다.

### **4XX Client error response**
* 400 Bad Request : 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미하는 응답코드.
* 401 Unauthorized : 클라이언트가 요청한 응답을 받기 위해서는 스스로를 인증해야 한다는 의미의 응답코드.
* 403 Forbidden : 서버가 요청을 거부하고 있다는 응답코드. 클라이언트가 미승인이어서 요청을 거부. 401과 다른점은 클라이언트가 누구인지 알고있다.
* 404 Not Found : 서버가 요청받은 리소스를 찾을 수 없다는 응답코드. 브라우저에서는 알려지지 않는 URL를 의미한다. 리소스 자체가 존재하지 않음을 의미할 수 있다.
* 405 Method Not Allowed : 요청한 메소드는 서버에서 알고 있지만, 제거되었고 사용할 수 없다는 응답코드. 어떤 API에서 리소스를 삭제하는 것을 금지.
* 406 Not Acceptable : 요청한 페이지가 요청한 컨텐츠 특성으로 응답할 수 없다는 응답코드.
* 407 Proxy Authentication Required : 401과 비슷하지만, 프록시에 의해 완료된 인증이 필요하다는 응답코드.
* 408 Request Timeout : 서버의 요청 대기가 시간을 초과하였다는 응답코드.
* 409 Conflict : 서버가 요청을 수행하는 중에 충돌이 발생했다는 응답코드.
* 410  Gone : 서버가 요청한 리소스가 영구적으로 삭제되었을 때 발생하는 응답코드. 404 응답코드와 비슷하다.

### **5XX Server Error**
* 500 Internal Server Error : 서버에 오류가 발생하여 요청을 수행할 수 없다.
* 501 Not Implemented : 서버에 요청을 수행할 수 있는 기능이 없다. 예를 들어 서버가 요청 메소드를 인식하지 못할 때 이 코드를 표시.
* 502 Bad GateWay : 서버가 게이트웨이로부터 잘못된 응답을 수신했음을 의미하는 응답코드.
* 503 Service Unavailable : 서버가 요청을 처리할 준비가 되지 않았을 때 발생하는 응답코드. 유지보수를 위해 서버가 작동이 중단되었거나 과부하가 걸렸을 시 발생.
* 504 Gateway Timeout : 서버가 게이트웨이 프록시 역활을 수행하고 있거나 업스트림 서버에서 제때 요청을 받지 못했을 경우 발생하는 응답코드.
* 505 HTTP Version Not Supported : 서버가 요청에 사용된 HTTP 프로토콜 버전을 지원하지 않는다는 의미의 응답코드. 


***

## **Reference**

https://medium.com/@lunay0ung/protocol-http%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C-84a896c5fc93  
https://donghwi-kim.github.io/jekyll/update/2015/02/21/SSL.html  
https://programmer93.tistory.com/38  
https://ifuwanna.tistory.com/4  
https://brunch.co.kr/@leedongins/65  


