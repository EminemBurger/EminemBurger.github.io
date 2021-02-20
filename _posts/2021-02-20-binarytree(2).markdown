---
layout: post
title: binary tree (2)
image: tree-terms.png
date: 2021-02-20 10:08:20 +0200
tags: 
categories: data-structure
---

## 레드블랙트리란
레드블랙트리 또한 avl트리와 같이 balanced binary tree의 일종이다. 각 노드에 색깔을 저장하는 공간을 추가하여 색깔을 기준으로 균형을 맞추는 트리이다.

avl 트리와 비교하자면 다음과 같다. 

|RB tree|avl tree|
|:---:|:---:|
|삽입,삭제가 빠르다| search가 빠르다|
| 대부분의 언어 map, multimap에 사용 | 조회에 속도가 중요한 database에 사용|
|느슨한 balanced | 엄격한 balanced|
|색깔을 저장하는 공간으로 인한 space complexity| 그런거 없음|

avl 트리가 rb 트리보다 효율이 떨어지는 관계로 자주 사용되지 않는다고 한다.
avl 트리와 rb 트리 모두 삽입, 삭제, 검색이 O(log N) 이지만 avl 트리의 경우, 삽입이나 삭제하는 과정에서 회전이 많이 일어나기 때문에 비효율적인 듯 하다. rb 트리는 가장 마지막에 고안된 이진 트리로서 많이 사용되고 있다.

***

## 레드블랙트리 규칙
![]({{site.baseurl}}/images/rb-tree.png)
* 모든 노드는 RED 이거나 BLACK이다.
* 루트는 BLACK이다.
* 모든 리프노드는 BLACK이다.
* 노드가 RED이면 그 노드의 자식은 모두 BLACK이다.
* 각 노드로부터 리프노드로 가는 경로는 모두 같은 수의 BLACK 노드를 포함한다.
* 새로 삽입되는 노드는 RED 이다.

![]({{site.baseurl}}/images/rb-tree1.png)
임의의 노드에서 자식이 없는 쪽은 검은색 NIL 리프노드를 붙임으로써, 레드블랙트리 규칙을 만족시킨다. 하지만 자식이 없는 모든 노드에 일일이 NIL 리프노드를 붙이는 것은, 공간 낭비가 심하므로, NIL 리프노드를 하나만 할당하고 모든 NIL 리프노드에 대한 포인터가 이를 가리키게 하면 공간 절약과 다루기도 편해진다.

***

## 레드블랙트리 삽입


색깔이 RED인 노드를 삽입할 시, 부모노드의 색깔도 RED인 경우, 레드블랙트리의 규칙이 깨지게 되는데 이 경우 레드블랙트리 삽입에서의 균형울 유지하도록 작업을 수행한다. 해당 작업은 2가지 종류가 있다.

![]({{site.baseurl}}/images/rb-tree2.png)

1. Recoloring

Recoloring을 수행하는 경우는, 삽입된 노드의 부모노드의 형제노드의 색깔이 RED인 경우이다.
이 경우, 부모노드와 부모노드의 형제노드의 색깔을 BLACk으로 바꾼다. 그리고 이러한 작업은 루트 노드에 다다를 때까지 계속해서 반복된다. Recoloring을 수행하면서 부모 노드의 형제 노드의 색깔에 따라 Recoloring을 반복할 지, Rotation을 할지 결정된다. 형제노드가 없다면 BLACK이라 보고 Rotation을 수행할 것이다. 우리는 자식이 없는 쪽은 검은색 NIL 리프노드를 붙이기로 했었다.

2. Rotation

Rotation을 수행하는 경우는, 삽입된 노드의 부모노드의 형제노드의 색깔이 BLACK인 경우다.

* LL 회전
![]({{site.baseurl}}/images/rb-tree3.png)

* LR 회전
![]({{site.baseurl}}/images/rb-tree4.png)

* RR 회전
![]({{site.baseurl}}/images/rb-tree5.png)

* RL 회전
![]({{site.baseurl}}/images/rb-tree6.png)

회전 방식은 지난번에 포스팅했던 avl 트리와 완전히 동일하다. 다른점이 있다면 회전이 완료되고, 노드의 색깔에 따라 Recoloring이 수행되고, 루트노드까지 반복적으로 수행되는 과정에서 다시 Rotation이 발생할 수도 있다. 

***

rb 트리의 삭제는 복잡하므로, 다른 포스팅에서 다루겠다.



### Reference 
https://nesoy.github.io/articles/2018-08/Algorithm-RedblackTree
https://itstory.tk/entry/%EB%A0%88%EB%93%9C%EB%B8%94%EB%9E%99-%ED%8A%B8%EB%A6%ACRed-black-tree
https://www.geeksforgeeks.org/red-black-tree-set-2-insert/
